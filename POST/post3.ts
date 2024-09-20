


async function handler(req:Request){
    const url = new URL(req.url);
    const herosPath = new URLPattern({
        pathname: "/hero"
    });
    if(herosPath.test(url)){
        const file = await Deno.readTextFile('./heros.json');
        let heroJson = JSON.parse(file);
        const toAdd = await req.formData();
        const id = Math.floor(Math.random()*1000);
        const name = toAdd.get("name");
        const cool = Boolean(toAdd.get("cool"));
        const hero = {id, name, cool};
        heroJson = [...heroJson, hero];
        await Deno.writeTextFile('./heros.json',JSON.stringify(heroJson));
        return new Response(JSON.stringify(hero));
    }
    return new Response("Not a POST Response", {status:404});
}







Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)