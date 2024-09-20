async function handler(req: Request){ //Request
    //console.log(req.method);
   //console.log(req.headers);


    const file = await Deno.open('./hello.html') //Open html files
    const fileStream = file.readable; //Just to chunk the entire file
    const htmlHeaders = new Headers()
    htmlHeaders.append('content-type', 'text/html')

    return new Response(fileStream, {
        headers: htmlHeaders
    });  // Response
}

//Listens to 127.0.0.1.8000
Deno.serve({
    port: 8000,
    hostname: "127.0.0.1",
    }, 
    handler
); // listen to this 127.0.0.1 --> IP address 8000:port number
//http://localhost:8000 (localhost DNS name for IP address 127.0.0.1)

