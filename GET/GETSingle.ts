interface User{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    county: string;
    city: string;
}

//Define what kind of data types are each of the property

const file = await Deno.readTextFile('./users.json');

//Line 32 will throw an error whene you put user in the arrow function
// to avoid it json:User[] to ensure user is in User[]
const json: User[] = JSON.parse(file);


async function handler(req:Request){
    const url = new URL(req.url);
    const usersRoute = new URLPattern({
        pathname: "/users/:name"
    });

    if(usersRoute.test(url)){
        //const jsonString = JSON.stringify(json);
        const test = usersRoute.exec(url);

        //Because toSearch was a string, we have to convert it to number
        //Because user.id is a number, in order to check if they are equal
        //We have to do that.
        const toSearch = Number(test?.pathname.groups.name);
        const matchingUser = json.find((user) => user.id === toSearch);
        console.log(matchingUser);
        const stringer = JSON.stringify(matchingUser);

        return new Response(stringer);
    }
    return new Response("Hello");
}



Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)



