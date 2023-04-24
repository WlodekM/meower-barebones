async function getJSONData(url, params) {
	const response = await fetch(url + new URLSearchParams(params));
	const jsonData = await response.text();
	return(Promise.resolve(jsonData));
}
function deHTML( input ) {
	let dhout = input
	dhout = dhout.replaceAll("&", "&amp;");
	dhout = dhout.replaceAll("<", "&lt;");
	dhout = dhout.replaceAll(">", "&gt;");
	dhout = dhout.replaceAll('"', "&quot;");
	dhout = dhout.replaceAll("'", "&apos;");
	return dhout
}
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
	data  = '['+data+']'
	console.log(data);
	data_ = JSON.parse(data)
	data_copy = JSON.parse(data)
	console.log(data_);
	$("#posts").empty();
	data_.forEach(element => {
	try {
		$("#posts").append(`<div class="post"><span id=username>${element["title"]}</span><p>From:${deHTML(element["user"])}</p></div>`)
	} catch(err) {
		console.log(`ERROR ON:${JSON.stringify(element)}`);
	}
	});
	
}
function reload() {
		getJSONData('https://weewee-api.fakefurry.repl.co/mail?user=WlodekM@pmail.pm')
		.then((data) => {ghome(data)})
}
//{"user":"WlodekM@pmail.pm@pmail.pm","to":"WlodekM@pmail.pm","title":"Test","content":"Helo world!"},{"user":"WlodekM@pmail.pm","to":"WlodekM@pmail.pm","title":"first post made using API","content":"this post wasn't made manually in the JSON file!"},{"user":"WlodekM@pmail.pm","to":"WlodekM@pmail.pm","title":"WlodekM's email","content":"[c]"},{"user":"WlodekM@pmail.pm","to":"WlodekM@pmail.pm","title":"WlodekM's email 2","content":"Oh my goood no waiaiaiaieey\n\nalso, kys"},{"to":"WlodekM@pmail.pm","title":"Hello world!","content":"This is the first PMail e-mail"},{"user":"WlodekM@pmail.pm@pmail.pm","to":"WlodekM@pmail.pm","title":"Hello world!","content":"h"}