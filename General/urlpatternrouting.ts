
async function handler(req:Request){
    const url = new URL(req.url);
    const rawPattern = new URLPattern({
        pathname: "/lion",
    });
    const meowPattern = new URLPattern({
        pathname: "/meow",
    });

    if(rawPattern.test(url)){
        return new Response("Lion");
    }
    else if(meowPattern.test(url)){
        return new Response("Meow");
    }
    else{
        return new Response("My face");
    }
}


Deno.serve(handler);