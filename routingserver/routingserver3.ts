
async function handler(req:Request){
    const url = new URL(req.url);
    const imagePattern = new URLPattern({
        pathname: "/(.+\\.jpg)", //Check rege conversion to get correct path
    })

    if(imagePattern.test(url)){
        const matches = imagePattern.exec(url);
        const filename = matches?.pathname.groups.filename
        if(!filename) return new Response("File Not Found");
        try{
            const image = await Deno.open('./images.jpg');
            return new Response(image.readable);
        }
        catch(e){
            return new Response("Error", e.message);
        }
    }
    const file = await Deno.open('./hello.html');
    return new Response(file.readable);
}



Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)
