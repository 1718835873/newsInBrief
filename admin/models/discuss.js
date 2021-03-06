const mongoose=require("./dbConn.js")
let discussSchema=mongoose.Schema({
	userId:{
		type:String
	},
	userName:{
		type:String
	},
	avatar:{
		type:String
	},
	articleId:{
		type:String
	},
	articleTitle:{
		type:String
	},
	articleContent:{
		type:String
	},
	articleImg:{
		type:String
	},
	content:{
		type:String
	},
	discuss_time:{
		type:Date,
		default:Date.now()
	},
	isDiscuss:{
		type:Boolean,
		default:false
	}
})
module.exports=mongoose.model("discuss",discussSchema)