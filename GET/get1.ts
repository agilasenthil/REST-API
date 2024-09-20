
async function handler(req:Request){
    const method = req.method;
    if(method === "GET"){
        const url = req.url;
        const moviesPathname = new URLPattern({
            pathname: "/movies"
        });
        if(moviesPathname.test(url)){
            const file = await Deno.readTextFile('./movies.json');
            const json = JSON.parse(file);
            const fileToReturn = JSON.stringify(json);
            return new Response(fileToReturn);

        }
    }
    return new Response("Not Found", {status: 404});
}


Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler);


// On suggestion, for more codes, we wouldbe using file often, so better 
// to declare it as a global variable
