
// Read the users file
const file = await Deno.readTextFile('./users.json');
//Turn into JS object
const users = JSON.parse(file);

//Then convert into string



async function handler(req:Request){
    const usersRoute = new URLPattern({
        pathname: '/users'
    });
    const url = new URL(req.url);
    if(usersRoute.test(url)){ // /users route matches
        const usersString = JSON.stringify(users);
        return new Response(usersString, {
            headers: {
                "content-type" : "applications/json",
            },
        })
    }

    return new Response(null, {status: 404});
}




Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)