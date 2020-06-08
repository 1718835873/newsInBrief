const mongoose =require("./dbConn.js")

const articleSchema=mongoose.Schema({
	title:String,
	source:String,
	author:String,
	articleImg:String,
	content:String,
	love:{
		type:Number,
		default:0
	},
	share:{
		type:Number,
		default:0
	},
	discuss:{
		type:Number,
		default:0
	},
	create_time:{
		type:Date,
		default:Date.now()
	}
})
module.exports=mongoose.model("randomArt",articleSchema)
