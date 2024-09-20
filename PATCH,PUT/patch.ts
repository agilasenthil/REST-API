async function handler(req:Request){
    const url = new URL(req.url);
    const usersMethod = new URLPattern({
        pathname: "/user/:id"
    });
    if(usersMethod.test(url)){
        const file = await Deno.readTextFile('./forPutUsers.json');
        const usersJson = JSON.parse(file);
        const userToPatch = await req.json();
        const userID = Number(userToPatch['id']);
        for(let i=0;i<usersJson.length;i++){
            if(usersJson[i].id === userID){
                // Found the user to update
                // Lets update
                usersJson[i] = {...usersJson[i], ...userToPatch}
                await Deno.writeTextFile('forPutUsers.json',JSON.stringify(usersJson));
                return new Response(JSON.stringify(usersJson[i]), {status:200,
                    headers : {"content-type" : "application/json"}
                });
            }
        }
        
    }
    return new Response(null, {status: 404});
}





Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)