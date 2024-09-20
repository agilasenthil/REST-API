

async function handler(req:Request){
    // const file = await Deno.readTextFile('./forPostUsers.json')//Important info: The file must be 
    // updated,make it closer as possible. Dont write this as a global variable. 
    // Write it as close as possible where you are creating a resource
    // const users = JSON.parse(file) //Convert to JSON Object
    const url = new URL(req.url);
    const usersRoute = new URLPattern({
        pathname: "/users"
    })
    if(usersRoute.test(url) && req.method === 'POST'){
        const file = await Deno.readTextFile('./forPostUsers.json');
        let users = JSON.parse(file);
        const user = await req.json(); //InstanceMethod
        //Make sure the fields are present and which to make it as a required field
        //Validate the body the user gave

        const id = Math.floor(Math.random()*1000);
        const newUser = {id, ...user}; //Push the user and id first
        users = [...users, newUser]; //After the existing users, add the new user
        await Deno.writeTextFile('./forPostUsers.json', JSON.stringify(users));
        return new Response(JSON.stringify(newUser), {status: 201});
    }
    return new Response(null, {status: 404});
}


Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)