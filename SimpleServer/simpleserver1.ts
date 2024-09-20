//Start a Deno workspace 
//on port 9000
//Respond to each request with both the request method and url as a String:

async function handler(req:Request){
    const method = req.method;
    const url = req.url;
    return new Response(`${method}` + " " + `${url}`)
}


Deno.serve({
    port: 9000,
    hostname: "127.0.0.1"
}, handler);