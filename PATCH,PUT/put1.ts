
async function handler(req:Request){
    const url = new URL(req.url);
    const userPathname = new URLPattern({
        pathname: "/user/:id"
    });
    if(userPathname.test(url) && req.method === "PUT"){
        const file = await Deno.readTextFile('./putUsers.json');
        const userJson = JSON.parse(file);
        const userToUpdate = await req.json();
        const userID = Number(userToUpdate['id']);
        for(let i=0;i<userJson.length;i++){
            if(userJson[i].id === userID){
                userJson[i] = userToUpdate;
                await Deno.writeTextFile('putUsers.json',JSON.stringify(userJson));
                return new Response(JSON.stringify(userJson[i]), {status:200});
            }
        }
    }
    return new Response(null, {status: 404});
}





Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)