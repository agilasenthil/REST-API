
async function handler(req:Request) {
    const url = req.url;
    const file = await Deno.readTextFile('./storage.json');
    console.log(file); //Its a string
    const json = JSON.parse(file); // Takes a string and gives output as object
    console.log(json);//Its an object
    //add url to the logs array
    json.logs.push(url);
    const newJson = JSON.stringify(json)//Takes an object and gives string
    Deno.writeTextFile('storage.json',newJson);//Write it in the designated file
    return new Response("Hello");
}

Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler);