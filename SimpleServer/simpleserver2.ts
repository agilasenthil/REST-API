// Respond to each request with JSON containing the Method and URL
// Check the header content type to json


async function handler(req:Request){
    const method = req.method;
    const url = req.url;
    const obj = {url, method};
    const objString = JSON.stringify(obj);

    const headersChanged = new Headers();
    headersChanged.append('content-type', 'applications/json');

    return new Response(objString,{
        headersChanged,
    });
}


Deno.serve({
    port: 9000,
    hostname: "127.0.0.1"
}, handler);