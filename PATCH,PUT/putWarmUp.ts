async function handler(req:Request){
    const method = req.method;
    if(method === "PUT" || method === "PATCH"){
        return new Response("Hello", {status: 200});
    }
    return new Response(null, {status: 404});
}




Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)