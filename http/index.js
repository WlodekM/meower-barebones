async function getJSONData(url, params) {
	const response = await fetch(url + new URLSearchParams(params));
	const jsonData = await response.json();
    console.log(jsonData);
	return(Promise.resolve(jsonData));
}
$(document).ready(function(){
    getJSONData("https://api.github.com/repos/meower-media-co/http-meower/git/trees/main?recursive=1","")
    .then(data_ =>  
    {
        data_=data_["tree"]
        var final_data = []
        data_.forEach(element => {
            if(element["path"].includes("imgs/")) {
                final_data.push(element["path"].replaceAll("imgs/",""))
            }
        });
        final_data.forEach(element => {
            $("#http").append(`<a href="https://http.meower.org/${element}" target="_blank"><div class=container><p>${element}</p><img src="https://http.meower.org/${element}"></div></a>`)
        })
    }
    )
});