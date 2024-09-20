interface User{
    id : number,
    name: string,
}

async function handler(req:Request){
    const url = new URL(req.url);
    const userPathname = new URLPattern({
        pathname: "/user/:id"
    });
    if(userPathname.test(url)){
        const userID = userPathname.exec(url);
        const toID = Number(userID?.pathname.groups.id);
        const file = await Deno.readTextFile('./forDeleteUsers.json');
        const userJson : User[] = JSON.parse(file);
        const updatedUsers = userJson.filter((user : User) => user.id!==toID);
        await Deno.writeTextFile('forDeleteUsers.json',JSON.stringify(updatedUsers));
        return new Response("Hello", {status:200});
    }
    return new Response(null, {status: 404});
}







Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)