// Read the users file
const file = await Deno.readTextFile('./movies.json');
//Turn into JS object
const users = JSON.parse(file);

// Then convert into string

// Now I want to get all the users with the country: Italy
// http://localhost:8000/users?country=Italy

// http: Type of Request
// localhost- hostname
// 8000 - the port at which the server is listening to 
// /users - Users Route
// county = Italy -- the paremeters to check 
// General - http://localhost:8000/users?key1=value1&key2=value2


async function handler(req:Request){
    const usersRoute = new URLPattern({
        pathname: '/movies'
    });
    const url = new URL(req.url);
    if(usersRoute.test(url)){ // /users route matches
        const usersString = JSON.stringify(users); //First change to JSON and then stringify it 
        const countryParam = url.searchParams.get("genre"); //Search for the key word

        //if there is a keyword called "country" then execute this
        if(countryParam !== null){
            const filteredUsers = [];
            for(const user of users){
                if(user.country === countryParam){
                    filteredUsers.push(user);
                }
            }
            return new Response(JSON.stringify(filteredUsers), {
                headers: {
                    "content-type": "applications/json"
                },
            })
        }

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