
interface logsStorage{
    logs: string[];
}
//Interface tells that logs is an array of strings
//Using an object
const objectStorage: logsStorage = {
    logs: []
};

//Using map
const mapStorage = new Map();
mapStorage.set("logs", []);

async function handler(req:Request){
    const url = req.url;

    //To store in an object
    objectStorage.logs.push(url);
    console.log(objectStorage); 

    //To Store in the map
    mapStorage.set("logs", [...mapStorage.get('logs'), url])
    console.log(mapStorage);

    return new Response("Hi");
}




Deno.serve({
    port: 8000,
    hostname: "127.0.0.1"
}, handler)