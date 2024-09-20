
async function handler(req:Request){
    const url = new URL(req.url);
    const userPattern = new URLPattern({
        pathname: '/profile/:username'
    })
    const userIdPattern = new URLPattern({
        pathname: '/posts/:postId/:userId'
    })

    if(userPattern.test(url)){
        const urlUserPath = userPattern.exec(url);
        const stringNew = urlUserPath?.pathname.groups.username;
        return new Response("Hello" + `${stringNew}`);
    }  
    else if(userIdPattern.test(url)){
        const urlIdPath = userIdPattern.exec(url);
        const postDummy = urlIdPath?.pathname.groups.postId;
        const userDummy = urlIdPath?.pathname.groups.userId;
        return new Response("All posts for:" + `${userDummy}` + "and" + `${postDummy}`);
    } 
    return new Response("Hello Welcome");
}





Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler);