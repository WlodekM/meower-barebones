function parse_meower_api_data(data,allow_swear) {
	data_ = JSON.parse(data)
    let result = null
	if(data_["error"] == false){
	data_["autoget"].forEach(element => {
		try {
			if(element["unfiltered_p"] && allow_swear) {
				if(["Discord","Webhooks","Revower"].includes(element["u"])) {
					element["u"]            = element["unfiltered_p"].split(":")[0]
					element["unfiltered_p"] = element["unfiltered_p"].split(":").slice(1).join(":")
				}
                result.push({"user":element["u"],"post":element["unfiltered_p"]})
			} else {
				if(["Discord","Webhooks","Revower"].includes(element["u"])) {
					element["u"] = element["p"].split(":")[0]
					element["p"] = element["p"].split(":").slice(1).join(":")
				}
				result.push({"user":element["u"],"post":element["p"]})
			}
		} catch(err) {
			console.log(`ERROR ON:${element}`);
		}
		});
	} else {
        result = data_["type"]
	}
    return(result)
}