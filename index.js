export default {
	fetch(request) {
		console.log("[" + request.method + "] " + request.url)
		let response = {
			"method": request.method,
			"url": request.url,
		}
		if (request.method === "POST"){
			response["success"] = true
		}else{
			response["success"] = false
		}
		return new Response(
			JSON.stringify(response, null, 4), 
			{ headers: { 'content-type': 'application/json', }, }
		);
	}
};