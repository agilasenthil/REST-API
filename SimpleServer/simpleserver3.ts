async function handler(req:Request) {
    const file = await Deno.open('./hello.html');

    const headers = new Headers();
    headers.append('content-type', 'text/html')
    const fileNew = file.readable;
    return new Response(fileNew, {
        headers: headers
    });
}



Deno.serve({
    port: 9000,
    hostname: "127.0.0.1",
}, handler);