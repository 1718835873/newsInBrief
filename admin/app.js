const express=require("express");
const app=express();
const path=require("path")
const fs=require("fs")
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({
	extended:false
}))
app.use(bodyParser.json())

// 实现文件数据一起上传
const multiparty=require("multiparty")


const cors=require("cors")
app.use(cors())

// 定义静态资源目录
app.use("/static",express.static(path.join(__dirname,"./public")))

app.listen(3000,()=>{
	console.log("app start!")
})

const User=require("./models/users.js");
const randomArt =require("./models/randomArt.js")
const Love =require("./models/love.js")
const Discuss =require("./models/discuss.js")
//登录
app.post("/login",(req,res)=>{
	let userInfo={
		username:req.body.username,
		password:req.body.password
	}
	User.findOne({username:userInfo.username},(err,data)=>{
		if(err){
			res.send({
				code:400,
				msg:"登录失败"
			})
		}
		if(data){
			res.send({
				code:200,
				msg:"登录成功",
				data:data
			})
		}else{
			// 随机生成六位用户id
			var Num="";
			for(var i=0;i<6;i++)
			{
			Num+=Math.floor(Math.random()*10);
			}
			
			let postData={
				username:req.body.username,
				password:req.body.password,
				avatar:"http://localhost:3000/static/user-unlogin.png",
				gender:"",
				phone:"",
				userId:Num
			}
			User.create(postData,(err,data)=>{
				if(err){
					res.send({
						code:400,
						msg:"登录失败"
					})
				}
				if(data){
					res.send({
						code:200,
						msg:"注册成功",
						data:postData
					})
				}else{
					res.send({
						code:400,
						msg:"登录失败"
					})
				}
			})
		}
	})
})

// 获取添加简讯的数据
app.post("/add",(req,res)=>{
	  let form = new multiparty.Form({uploadDir:"./public"});
		form.parse(req,(err,fields,files)=>{
			if(err){
				// console.log("出错了",err)
				res.send({
					code:400,
					msg:"简讯添加失败"
				})
			}else{
				let inputFile =files.file[0]
				var uploadPath=inputFile.path;
				// console.log("文件路径",uploadPath)
				// console.log(typeof uploadPath)
				var arrPath=uploadPath.split("\\")[1]
				let dstPath="./public/"+arrPath
				fs.rename(uploadPath,dstPath,(err)=>{
					if(err){
						res.send({
							code:400,
							msg:"简讯添加失败"
						})
					}
					// 文章图片地址
					let newPath="http://localhost:3000/static/"+arrPath
					let time=new Date().getTime()
					// 文章其他信息
					let addData={
						title:fields.title[0],
						source:fields.source[0],
						author:fields.author[0],
						content:fields.content[0],
						articleImg:newPath,
						create_time:time,
						love:0,
						discuss:0,
						sharea:0
					}
					randomArt.create(addData,(err,data)=>{
						if(err){
							res.send({
								code:400,
								msg:"添加简讯失败"
							})
						}else{
							// console.log("添加的数据结果:",data)
							res.send({
								code:200,
								msg:"添加简讯成功"
							})
						}
					})
				})
			}
		})
})

// 获取简讯中的数据
app.get("/getAllArticle",(req,res)=>{
	randomArt.find({},(err,data)=>{
		if(err){
			// console.log(err)
			res.send({
				code:400,
				msg:"获取数据失败"
			})
		}
		if(data){
			
			// console.log("获取的数据",data)
			res.send({
				code:200,
				msg:"数据获取成功",
				data:data
			})
		}
	})
})


// 根据收藏_id删除收藏
app.get("/delLove/:id",(req,res)=>{
	Love.deleteOne({_id:req.params.id},(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"取消收藏失败"
			})
		}
		if(doc){
			res.send({
				 code:200,
				 msg:'取消收藏成功'
			})
		}
	})
})

// 随机获取简讯中的一条数据
app.get("/randomOne",(req,res)=>{
	randomArt.aggregate([{$sample:{size:1}}],(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"获取数据失败"
			})
		}
		if(doc){
			res.send({
				code:200,
				msg:"获取数据成功",
				data:doc
			})
		}
	})
})

// 根据id更改收藏数量  生成收藏表
app.post("/love",(req,res)=>{
	let postLove={
		userId:req.body.userId,
		articleId:req.body.articleId,
		isLove:true,
		articleTitle:req.body.articleTitle,
		articleImg:req.body.articleImg
	}
	// Love.findeOneAndUpdate({userId,articleId,isLove,love_time},{userId,articleId,isLove,love_time,articleTitle,articleImg})
	Love.create(postLove,(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"收藏失败"
			})
		}
		if(doc){
			randomArt.updateOne({_id:postLove.articleId},{$inc:{love:1}},(err,doc)=>{
				if(err){
					console.log(err)
					return
				}
				if(doc){
					console.log("doc",doc)
				}
			})
			res.send({
				code:200,
				msg:"收藏成功",
				data:doc
			})
		}
	})
})
// 获取收藏表中的数据
app.get("/getAllDiscuss",(req,res)=>{
	Discuss.find({},(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"获取数据失败"
			})
		}
		if(doc){
			res.send({
				code:200,
				msg:"获取数据成功",
				data:doc
			})
		}
	})
})

// 更具用户Id获取收藏中的数据
app.get("/getLoveById/:id",(req,res)=>{
	let get_love_id=req.params.id
	Love.find({userId:get_love_id},(err,data)=>{
		if(err){
			res.send({
				code:400,
				msg:"用户获取数据失败"
			})
		}
		if(data){
			res.send({
				code:200,
				msg:"用户获取数据成功",
				data:data
			})
		}
	})
})
// 根据文章id和用户id获取用户点赞数量
app.post("/loveById",(req,res)=>{
	console.log("用户Id和文章id",req.body)
	Love.find({$and:[{"userId":req.body.userId},{"articleId":req.body.articleId}]},(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"获取数据失败"
			})
		}
		if(doc){
			res.send({
				code:200,
				msg:'获取数据成功',
				data:doc
			})
		}
	})
})

// 根据id更改评论数量  生成评论表
app.post("/discuss",(req,res)=>{
	console.log("获取的数据:",req.body)
	let sendDate=req.body
	Discuss.create(sendDate,(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"评论失败"
			})
		}
		if(doc){
			
			let discuss_id=sendDate.articleId
			console.log("评论文章的Id",discuss_id)
			console.log("评论的id",discuss_id)
			randomArt.updateOne({_id:discuss_id})
			randomArt.updateOne({_id:discuss_id},{$inc:{discuss:1}},(err1,doc1)=>{
				if(err1){
					console.log(err1)
					return
				}
				if(doc1){
					res.send({
						code:200,
						msg:"评论成功"
					})
				}
			})
			
		}
	})
})


// 根据评论表中的_id删除评论
app.get("/delDiscuss/:id",(req,res)=>{
	console.log(req.params.id)
	Discuss.deleteOne({_id:req.params.id},(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:'删除评论失败'
			})
		}
		if(doc){
			res.send({
				code:200,
				msg:"删除评论成功"
			})
		}
	})
})


// 根据用户id和简讯Id判断用户是否评论该文章
app.post("/isDiscssById",(req,res)=>{
	let is_article_id=req.body.articleId;
	let is_user_id=req.body.userId;
	Discuss.find({$and:[{articleId:is_article_id},{userId:is_user_id}]},(err,data)=>{
		if(err){
			res.send({
				code:400,
				msg:"获取数据失败"
			})
		}
		if(data){
			res.send({
				code:200,
				msg:"获取数据成功",
				data:data
			})
		}
	})
	
	
})


// 根据文章的id获取评论表
app.get("/getDiscuss/:id",(req,res)=>{
	let get_article_id=req.params.id;
	Discuss.find({articleId:get_article_id},(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"获取失败"
			})
		}
		if(doc){
			res.send({
				code:200,
				msg:"获取成功",
				data:doc
			})
		}
	})
})
// 根据用户id获获取评论中的数据
app.get("/getDiscussById/:id",(req,res)=>{
	// let discuss_by_id=req.params.id;
	
	Discuss.find({userId:req.params.id},(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"获取数据失败"
			})
		}
		if(doc){
			res.send({
				code:200,
				msg:"获取数据成功",
				data:doc
			})
		}
	})
})

// 根据模糊信息查询简讯
app.get("/search/:searchV",(req,res)=>{
	let regexp=new RegExp(req.params.searchV,'i')
	
	randomArt.find({$or:[{title:{$regex:regexp}},{content:{$regex:regexp}},{author:{$regex:regexp}}]},(err,doc)=>{
		if(err){
			console.log(err)
			res.send({
				code:400,
				msg:"查询失败"
			})
		}
		if(doc){
			res.send({
				code:200,
				msg:"查询成功",
				data:doc
			})
		}
	})
})

// 根据id获取简讯
app.get("/getArticle/:id",(req,res)=>{
	let id=req.params.id;
	// console.log("id:",id)
	randomArt.findOne({_id:id},(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"获取信息失败"
			})
		}
		if(doc){
			res.send({
				code:200,
				msg:"获取数据成功",
				data:doc
			})
		}
	})
})
// 获取评论表中的数据 更具用户id

// 根据id删除简讯
app.get("/del/:id",(req,res)=>{
	let del_id=req.params.id;
	randomArt.deleteOne({_id:del_id},(err,doc)=>{
		if(err){
			res.send({
				code:400,
				msg:"删除简讯失败"
			})
		}
		if(doc){
			res.send({
				code:200,
				msg:"删除简讯成功"
			})
		}
	})
})

// 根据id更新简讯
app.post("/updateArticle/:id",(req,res)=>{
	let update_id=req.params.id;
	console.log(update_id)
	let addData={
			title:req.body.title,
			source:req.body.source,
			author:req.body.author,
			content:req.body.content
		}
		console.log(addData)
		randomArt.update({_id:update_id},{$set:addData},(err,data)=>{
			if(err){
				res.send({
					code:400,
					msg:"更新简讯失败"
				})
			}else{
				console.log(data)
				// console.log("添加的数据结果:",data)
				res.send({
					code:200,
					msg:"更新简讯成功"
				})
			}
		})

	
})

// 更新头像图片
app.post("/updateImg",(req,res)=>{
	let form = new multiparty.Form({uploadDir:"./public"});
	form.parse(req,(err,fields,files)=>{
		console.log("数据:",fields)
		console.log("文件数据:",files)
		if(err){
			// console.log("出错了",err)
			res.send({
				code:400,
				msg:"1更换头像失败"
			})
		}else{
			let inputFile =files.file[0]
			var uploadPath=inputFile.path;
			// console.log("文件路径",uploadPath)
			// console.log(typeof uploadPath)
			var arrPath=uploadPath.split("\\")[1]
			let dstPath="./public/"+arrPath
			fs.rename(uploadPath,dstPath,(err)=>{
				if(err){
					res.send({
						code:400,
						msg:"2更换头像失败"
					})
				}
				// 文章图片地址
				let newPath="http://localhost:3000/static/"+arrPath
				// 文章其他信息
				let addData={
					avatar:newPath,
				}
				let _id=fields._id[0]
				// 先根据Id删除数据库中的图片地址
				User.findOne({_id:_id},(err,data)=>{
					if(err){
						console.log(err)
						return;
					}
					console.log(data)
					console.log(data.avatar)
					fs.unlink(data.avatar,(err)=>{
						if(err){
							console.log(err)
							return
						}
					})
				})
				User.updateOne({_id:_id},addData,(err,data)=>{
					if(err){
						res.send({
							code:400,
							msg:"3更换头像失败"
						})
					}else{
						// console.log("添加的数据结果:",data)
						res.send({
							code:200,
							msg:"更换头像成功",
							src:newPath
						})
					}
				})
			})
		}
	})
})

// 更新手机号码
app.post("/updatePhone",(req,res)=>{
	let phone=req.body.phone;
	
	let phone_id=req.body._id
	User.updateOne({_id:phone_id},{phone:phone},(err,doc)=>{
		if(err){
			console.log(err)
			res.send({
				msg:"修改手机号码失败",
				code:400
			})
			return;
		}
		console.log("doc",doc)
		if(doc){
			res.send({
				msg:"修改手机号码成功",
				code:200
			})
		}
	})
})
// 更新用户名

app.post("/updateUsername",(req,res)=>{
	let username=req.body.username;
	let username_id=req.body._id;
	
	User.update({_id:username_id},{username:username},(err,doc)=>{
		if(err){
			console.log(err)
			res.send({
				code:400,
				msg:"用户修改用户名失败"
			})
		}
		if(doc){
			console.log("修改用户名的数据",doc)
			res.send({
				code:200,
				msg:"用户修改用户名成功"
			})
		}
	})
})

// 更新性别
app.post("/updateGender",(req,res)=>{
	let gender=req.body.gender;
	
	let gender_id=req.body._id
	User.updateOne({_id:gender_id},{gender:gender},(err,doc)=>{
		if(err){
			console.log(err)
			res.send({
				msg:"修改用户性别失败",
				code:400
			})
			return;
		}
		console.log("doc",doc)
		if(doc){
			res.send({
				msg:"修改用户性别成功",
				code:200
			})
		}
	})
})













// 操作
