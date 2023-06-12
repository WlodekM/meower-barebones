async function getJSONData(url, params) {
	const response = await fetch(url + new URLSearchParams(params));
	const jsonData = await response.text();
	return (Promise.resolve(jsonData));
}
function deHTML(input) {
	let dhout = input
	dhout = dhout.replaceAll("&", "&amp;");
	dhout = dhout.replaceAll("<", "&lt;");
	dhout = dhout.replaceAll(">", "&gt;");
	dhout = dhout.replaceAll('"', "&quot;");
	dhout = dhout.replaceAll("'", "&apos;");
	dhout = dhout.replaceAll("\n", "<br>");
	return dhout
}
const IMAGE_HOST_WHITELIST = [
	// Meower
	"https://http.meower.org/",
	"https://assets.meower.org/",
	"https://api.meower.org/",
	"https://forums.meower.org/",
	
	// not everyone can add urls to go.meower.org, should be fine
	"https://go.meower.org/",
	"https://nextcloud.meower.org/",

	// cubeupload
	"https://u.cubeupload.com/",
	"https://cubeupload.com/",

	// imgBB
	"https://i.ibb.co/",

	// Tenor
	"https://media.tenor.com/",
	"https://tenor.com/",
	"https://c.tenor.com/",

	// Scratch (assets file uploading exists)
	"https://assets.scratch.mit.edu/",
	"https://cdn2.scratch.mit.edu/",
	"https://cdn.scratch.mit.edu/",
	"https://uploads.scratch.mit.edu/",

	// Discord
	"https://cdn.discordapp.com/",
	"https://media.discordapp.net/",
];
const urlSearchParams = new URLSearchParams(window.location.search);
console.log(urlSearchParams);
const params = Object.fromEntries(urlSearchParams.entries());
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let hpage = params.page; // "some_value"
let is404 = params.error; // "some_value"
console.log(`Page: ${hpage}`);
var data_
$(document).ready(function () {
	$("body").prepend(``)
	reload()
	$("#reload").click(function () {
		reload()
	});
	$("#logo").click(function () {
		reload()
	});
	$("#postbutton").click(function () {
		fetch('https://webhooks.meower.org/post/home', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "post": $(".type-message").val(), "username": $("#username").val() })
		})
			.then(response => response.text())
			.then(response => reload())
			.then($(".type-message").innerHTML = "")
	});

});
function ghome(data) {
	data_ = JSON.parse(data)
	data_copy = JSON.parse(data)
	$("#posts").empty();
	if (data_["error"] == false) {
		data_["autoget"].forEach(element => {
			try {
				if (element["unfiltered_p"] && (document.getElementById("badwords").checked)) {
					if (["Discord", "Webhooks", "Revower"].includes(element["u"])) {
						element["u"] = element["unfiltered_p"].split(":")[0]
						element["unfiltered_p"] = element["unfiltered_p"].split(":").slice(1).join(":")
					}
					$("#posts").append(`<div class="post"><span id=username>${element["u"]}</span><p>${deHTML(element["unfiltered_p"])}</p></div>`)
					// console.log(`${element["u"]}${element["unfiltered_p"]}`)
				} else {
					// console.log(`${element["p"]}`)
					if (["Discord", "Webhooks", "Revower"].includes(element["u"])) {
						var originalUsername = element["u"]
						element["u"] = element["p"].split(":")[0]
						element["p"] = element["p"].split(":").slice(1).join(":")
						if (originalUsername == "Webhooks") {
							element["u"] = `${element["u"]} <badge>WEBHOOK</badge>`
						} else {
							element["u"] = `${element["u"]} <badge>BRIDGED</badge>`
						}
					}
					const iterator = element["p"].matchAll(
						/\[([^\]]+?): (https:\/\/[^\]]+?)\]/gs
					);
					images = [];
					while (true) {
						const result = iterator.next();
						if (result.done) break

						try {
							new URL(result.value[2]);
						} catch (e) {
							continue;
						};

						if (!IMAGE_HOST_WHITELIST.some(o => result.value[2].toLowerCase().startsWith(o.toLowerCase()))) return;

						images.push({
							title: result.value[1],
							url: result.value[2],
						});
						// Prevent flooding
						if (images.length >= 3) break;
					}
					images = images;
					$("#posts").append(`<div class="post" id="${element["post_id"]}"><span id=username>${element["u"]}</span><p>${deHTML(element["p"])}</p></div>`)
					$(`#${element["post_id"]}`).append(`<div class="post-images" id="${element["post_id"]}-images"></div>`)
	
					images.forEach(imag => {
						console.log(`${element["post_id"]}-images : ${imag["url"]}`);

						$(`#${element["post_id"]}-images`).append(`<img src="${imag["url"]}">`)
					});
				}
			} catch (err) {
				console.log(`ERROR ON:${element}; ${err}`);
			}
		});
	} else {
		$("#posts").append(`<div class="post"><span id=username>There was an error while trying to get the page</span><p>Error: ${data_["type"]}</p><img src=https://raw.githubusercontent.com/meower-media-co/http-meower/main/imgs/${errors[data_["type"]]}.jpg></div>`)
		//<img src=https://http.dog/${errors[data_["type"]]}.jpg>
	}

}
function reload() {
	if (hpage == null) {
		if (is404) {
			getJSONData('https://api.meower.org/404')
				.then((data) => { ghome(data) })
		} else {
			getJSONData('https://api.meower.org/home')
				.then((data) => { ghome(data) })
		}
	} else {
		console.log(`Loading page ${hpage}`);
		getJSONData(`https://api.meower.org/home?`, { "page": hpage })
			.then((data) => { ghome(data) })
	}
}