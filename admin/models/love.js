const mongoose=require("./dbConn.js")
const Schema=mongoose.Schema;

// 这是添加的属性
const addSchema=new Schema()
addSchema.add({articleTitle:String,articleImg:String})
// 这是添加的属性


let loveSchema=new Schema({
	userId:{
		type:String
	},
	articleId:{
		type:String
	},
	isLove:{
		type:Boolean,
		default:false
	},
	love_time:{
		type:Date,
		default:Date.now()
	}
})
loveSchema.add(addSchema)
module.exports=mongoose.model("love",loveSchema)