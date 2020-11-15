const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

//Initialize Redis
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

//Get a reference from the original exec function 
const exec = mongoose.Query.prototype.exec;

//Create the cache toggle inside mongoose query
mongoose.Query.prototype.cache = function () {
    this.useCache = true;
    //By returning 'this', we can now chain .cache() to our queries that we want cached.
    return this;
}


//Use a normal function, so as to not alter the value of 'this'
// but declare it as async in order to be able to use 'await'
mongoose.Query.prototype.exec = async function () {
    if(!this.useCache){
        return await exec.apply(this, arguments);
    }
    //'this' will reference the query produced.
    //Create our redis key & stringify for valid use with redis
    const key = JSON.stringify(Object.assign({}, this.getFilter(), {
        collection: this.mongooseCollection.name
    }));
    
    //Check if we have a value for 'key' in redis
    const cacheVal = await client.get(key);
    //If we do have, return that
    if(cacheVal){
        console.log("Serving Cache")
        //Convert cache back to mongoose model.
            // First parse the JSON
            const cachedDoc = JSON.parse(cacheVal);
            //If its an array
            return Array.isArray(cachedDoc) ? 
            //Map thru each model and create the corresponding model
            cachedDoc.map(d => new this.model(d))
            :
            //If its not an array simple create a new model
            new this.model(cachedDoc);
    }
    //Else, run the query and store the result in redis.
    const result = await exec.apply(this, arguments);
    //If there is no result, do not store any cache, it breaks redis client for windows.
    if(!result) {
        return result;
    } 
    console.log("Serving Query");
    client.set(key, JSON.stringify(result), 'EX', 60 * 5);
    return result;
}