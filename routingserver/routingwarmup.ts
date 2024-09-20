 //Start a Deno server which listens to port 8000
//if the path is Hello , print(Hello);
// if the path is something else, print(Bye)

async function handler(req:Request){
    const path = new URL(req.url); //The entire URL object
    //req.url --> only the URL

    const pathForNow = path.pathname;

    if(pathForNow == '/hello'){
        return new Response("Hello");
    }
    else{
        return new Response("Okay Bye");
    }
}


Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
 }, handler);