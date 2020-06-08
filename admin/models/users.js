
const mongoose=require("./dbConn.js")

const UserSchema=mongoose.Schema({
	username:{
		type:String,
		unique:true,
		required:true
	},
	password:{
		type:String
	},
	gender:{
		type:String
	},
	avatar:{
		type:String
	},
	phone:{
		type:String
	},
	userId:{
		type:String
	},
	state:{
		type:Number,
		default:1
	}
});

// 将数据模型暴露出去
module.exports=mongoose.model("users",UserSchema)