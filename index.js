export default {
	fetch(request) {
		console.log("[" + request.method + "] " +request.url)
		if (request.url === "https://ny-firsker.massesos.workers.dev/"){
		return new Response('Hello xxx!, the url is ' + request.url, {
			headers: {
				'content-type': 'text/plain',
			},
		});
	}else{
		console.log("else was triggered")
		return new Response('Wrong ... URL:' + request.url)
	}
	},
};
