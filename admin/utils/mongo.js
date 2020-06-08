const mongoClient=require("mongodb").MongoClient;

const url="mongodb://localhost:27017"
const dbName="blog"

function conn(callback){
	mongoClient.connect(url,(err,client)=>{
		if(err){
			console.log(err)
			return;
		}else{
			let db=client.db(dbName);
			callback && callback(db)
			client.close();
		}
	})
}

module.exports={
	conn
}