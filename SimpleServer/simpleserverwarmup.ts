//Start a Deno workspace 
//Start a Deno server on port 9000 returning "Hello!"
//Start you server using deno run 

async function handler(req:Request){
    return new Response("Hello");
}


Deno.serve({
    port : 9000,
    hostname: "127.0.0.1"
}, handler);



