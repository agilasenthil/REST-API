// Do the same if else routing do with URLPattern API
async function handler(req:Request){
    const url = new URL(req.url);
    const pathName = url.pathname;

    if(pathName == '/register'){
        return new Response("Registered!");
    }
    else if(pathName == '/login'){
        return new Response("Logged In!");
    }
    else if(pathName == '/logout'){
        return new Response("Logged Out !");
    }
    else{
        return new Response("Not Found");
    }
}

Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
},handler)



