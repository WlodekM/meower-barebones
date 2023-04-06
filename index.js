async function getJSONData(url, params) {
	const response = await fetch(url + new URLSearchParams(params));
	const jsonData = await response.text();
	return(Promise.resolve(jsonData));
  }
const urlSearchParams = new URLSearchParams(window.location.search);
console.log(urlSearchParams);
const params = Object.fromEntries(urlSearchParams.entries());
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let hpage = params.page; // "some_value"
let is404 = params.error; // "some_value"
console.log(`Page: ${hpage}`);
var data_
$(document).ready(function(){
	$("body").prepend(``)
	reload()
	$("#reload").click(function(){
		reload()
	});
	$("#logo").click(function(){
		reload()
	});
	$("#postbutton").click(function(){
		fetch('https://webhooks.meower.org/post/home', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "post": $(".type-message").val(),"username":$("#username").val() })
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
	if(data_["error"] == false){
	data_["autoget"].forEach(element => {
		try {
			if(element["unfiltered_p"] && (document.getElementById("badwords").checked)) {
				$("#posts").append(`<div class="post"><span id=username>${element["u"]}</span><p>${element["unfiltered_p"]}</p></div>`)
				// console.log(`${element["u"]}${element["unfiltered_p"]}`)
			} else {
				// console.log(`${element["p"]}`)
				if(["Discord","Webhooks","Revower"].includes(element["u"])) {
					element["u"] = element["p"].split(":")[0]
					element["p"] = element["p"].split(":").slice(1).join(":")
				}
				$("#posts").append(`<div class="post"><span id=username>${element["u"]}</span><p>${element["p"]}</p></div>`)
			}
		} catch(err) {
			console.log(`ERROR ON:${element}`);
		}
		});
	} else {
		$("#posts").append(`<div class="post"><span id=username>There was an error while trying to get the page</span><p>Error: ${data_["type"]}</p><img src=https://raw.githubusercontent.com/meower-media-co/http-meower/main/imgs/${errors[data_["type"]]}.jpg></div>`)
		//<img src=https://http.dog/${errors[data_["type"]]}.jpg>
	}
	
}
function reload() {
	if(hpage == null) {
		if (is404) {
			getJSONData('https://api.meower.org/404')
			.then((data) => {ghome(data)})
		} else {
			getJSONData('https://api.meower.org/home')
			.then((data) => {ghome(data)})
		}
	} else {
		console.log(`Loading page ${hpage}`);
		getJSONData(`https://api.meower.org/home?`,{"page":hpage})
		.then((data) => {ghome(data)})
	}
}