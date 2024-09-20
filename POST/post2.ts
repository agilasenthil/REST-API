async function handler(req:Request){
    const url = new URL(req.url);
    const animalPathname = new URLPattern({
        pathname: "/animal"
    });
    if(animalPathname.test(url)){
        const file = await Deno.readTextFile('./post1forest.json');
        let animals = JSON.parse(file);

        let animal = await req.json();
        //Adding validation. 
        // Validate it if count is present or not
        const hasCount = Object.hasOwn(animal, "count");
        if(!hasCount){
            const error = JSON.stringify({"error" : "count field is missing"});

            return new Response(error,{status: 400});
        }
        // If count is an integer or not
        const count = animal["count"];
        if(!Number.isInteger(count)){
            const error1 = JSON.stringify({"error" : "count field is not an integer"});
            return new Response(error1, {status: 400});
        }
        const id = Math.floor(Math.random()*1000);
        animal = {id, ...animal};

        animals = [...animals, animal];
        Deno.writeTextFile('./post1forest.json', JSON.stringify(animals));
        console.log(animals);

        return new Response(JSON.stringify(animal), {status: 201});

    }
    return new Response("Found");
}





Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)