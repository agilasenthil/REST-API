
interface User {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        country: string;
        city: string;
      }


const file = await Deno.readTextFile('./movies.json');
const json: User[]= JSON.parse(file);

async function handler(req:Request){
    const url = new URL(req.url);
    const userPathname = new URLPattern({
        pathname: "/movies/:id"
    })

    if(userPathname.test(url)){
        const match = userPathname.exec(url);

        const toFind = Number(match?.pathname.groups.id);
        const matchingUser = json.find((user) => user.id === toFind);
        return new Response(JSON.stringify(matchingUser));

    }

    return new Response("Not Found" , {status: 404});

}


Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)