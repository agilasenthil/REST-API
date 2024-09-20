

async function handler(req:Request){
    const url = new URL(req.url);
    const uploadPath = new URLPattern({
        pathname: "/upload"
    });
    if(uploadPath.test(url)){
        const body = await req.formData();
        console.log(body);
        const file = body.get("fileUpload");
        console.log(file);
        if(file instanceof File){
            await Deno.writeFile(`${file.name}`, 
                new Uint8Array(await file.arrayBuffer()));
            return new Response(null, {status:201});
        }
        return new Response(); 
    }



    return new Response("Hello");

}



Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)