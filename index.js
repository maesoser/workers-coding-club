import { Router } from "itty-router"
import frontend from "./index.html"
import result from "./result.html"

const router = Router()

router.get('/index.html', (request, env, context) => showPage(request, env, context))
router.get('/random/?', (request, env, context) => calculateNumber(request, env, context))
router.all('*', () => new Response('Not Found.', { status: 404 }))

export default {
	fetch: router.handle
}

async function calculateNumber(request, env, context){

	// I get the "to" and "from" parameters from the url
	const { searchParams } = new URL(request.url)
	const to = searchParams.get('to')
	const from = searchParams.get('from')

	// Create a random number
	const randomNumber = Math.floor(Math.random() * to) + from;

	// Prepare the response
	const response =  new Response(
		result, 
		{ 
			headers: { 
				'content-type': 'text/html; charset=utf-8',
				'cache-control': 'public, max-age=30',
			}, 
		}
	)
	// Rewrite the response to add the number
	return new HTMLRewriter().on("h1", new TitleRewritter(randomNumber)).transform(response)
}

// Show the frontend
async function showPage(request, env, context){
	return new Response(
		frontend, 
		{ 
			headers: { 
				'content-type': 'text/html; charset=utf-8',
				'cache-control': 'public, max-age=30',
			}, 
		}
	)
}

// This is the rewitter for my class
class TitleRewritter {
	constructor(number) {
	  this.number = number
	}
	element(element) {
		element.prepend(this.number)
	}
}