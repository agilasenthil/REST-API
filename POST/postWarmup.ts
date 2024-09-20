
async function handler(req:Request){
    const method = req.method;
    if(method === 'POST'){
        const body = await req.json();
        console.log(body);
        return new Response("Found Out", {status: 201});
    }
    return new Response(null, {status: 404});
}





Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)