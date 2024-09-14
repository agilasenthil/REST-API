async function handler(req: Request){ //Request
    return new Response("Hello!");  // Response
}

//Listens to 127.0.0.1.8000
Deno.serve({
    port: 8000,
    hostname: "127.0.0.1",
    }, 
    handler
); // listen to this 127.0.0.1 --> IP address 8000:port number
//http://localhost:8000 (localhost DNS name for IP address 127.0.0.1)

