// Get the request method, if its GET then return status as 200
// Or else return status as 404

async function handler(req:Request){
    const url = new URL(req.url);
    const method = req.method;
    if(method === "GET"){
        return new Response("Success", {status: 200});
    }
    return new Response("Not Found", {status: 404});
}

Deno.serve({
    port:8000,
    hostname: "127.0.0.1"
}, handler);