async function handler(req:Request){
    const url = new URL(req.url);
    const usersMethod = new URLPattern({
        pathname: "/user/:id"
    });
    if(usersMethod.test(url)){
        //Replace the user given
        const userBody = await req.json();
        const userID = Number(userBody['id']);
        const file = await Deno.readTextFile('./forPutUsers.json');
        const userJson = JSON.parse(file);
        for(let i=0;i<userJson.length;i++){
            if(userJson[i].id === userID){
                //Found the User
                // Now Replace
                userJson[i] = userBody;
                await Deno.writeTextFile('forPutUsers.json', JSON.stringify(userJson));
                return new Response(JSON.stringify(userBody), {status: 200});
            }   
        }
    }
    return new Response(null, {status: 404});
}





Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)