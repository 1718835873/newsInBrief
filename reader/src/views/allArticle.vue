<template>
  <div class="all-article">
    <div class="container">
      <div class="top-area">
        <div class="heart">
          <div class="top-main">
            <div class="left-top-area">
              <p><img src="http://localhost:3000/static/user-unlogin.png" alt=""></p>
              <p>{{username}}</p>
            </div>
            <div class="right-top-area">
              <p @click="goAdd">添加</p>
              <p @click="outin">退出</p>
            </div>
          </div>
        </div>
      </div>
      <div class="heart" style="position: relative;">
        <div class="left-title-area">
          <div class="article-group">
            <div class="article-item-li" v-for="(item,index) in pList" :key="item._id" @click="detail(item._id)">{{item.title}}</div>
          </div>
        </div>
        <div class="right-detail-area">
         <div class="article-area-group" v-for="(item,index) in pList" :key="item.id" @click="detail(item._id)">
           <div class="right-left-img-area">
             <img :src="item.articleImg" alt="" width="200px;height:140px;">
           </div>
           <div class="right-right-cont">
             <span class="title-area">{{item.title}}</span> &nbsp; &nbsp;
             <span class="dele-area" @click.stop="del(item._id)">删除</span>&nbsp; &nbsp;
             <span class="dele-area" @click.stop="editor(item._id)">修改</span>
             <div class="source-author-area">{{item.author}}|{{item.source}}</div>
             <div class="content-area">
               <p class="content-paragraph">
                 {{item.content}}
              </p>
             </div>
           </div>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"AllArticle",
    data(){
      return{
        titleList:{},
        pList:{},
        username:""
      }
    },
    methods:{
      // 获取数据
      getDate(){
        // 获取数据
        $.ajax({
          url:"http://localhost:3000/getAllArticle",
          type:"GET",
          success:res=>{
            console.log("获取的数据:",res)
            this.pList=res.data
          },
          error:err=>{
            console.log("出现的错误",err)
          }
        })
      },
      // 跳转到添加页面
      goAdd(){
        this.$router.push("/add")
      },
      // 退出
      outin(){
        localStorage.setItem("isLogin",false)
        localStorage.setItem("userInfo","{}")
        this.$router.push({
          path:"/login"
        })
      },
      // 删除
      del(id){
        console.log(id)
        if(confirm("你确定要删除这篇简讯吗?")){
          // 开始执行删除操作
          $.ajax({
            url:"http://localhost:3000/del/"+id,
            type:"GET",
            success:res=>{
              console.log(res)
              if(res.code==200){
                this.getDate()
              }
            },
            error:err=>{
              console.log(err)
            }
          })
        }else{
          console.log("你取消了删除操作")
        }
      },
      // 修改
      editor(id){
        this.$router.push({
          path:"/editor",
          query:{id:id}
        })
      },
      // 详情
      detail(id){
         console.log(id)
         let detail_url="/detail"
         this.$router.push({
           path:detail_url,
           query: { id: id }
         })
      }
    },
    mounted() {
      this.getDate()
      this.username=JSON.parse(localStorage.getItem("userInfo")).username
    }
  }
</script>

<style scoped="scoped">
  .top-area{
    position: fixed;
    top: 0px;
    left: 0px;
    height: 70px;
    width: 100%;
    background-color: #28427D;
    z-index: 1;
  }
  .heart{
    width:1220px;
    /* height: 70px; */
    margin: 0px auto;
  }
  .top-main{
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }
  .left-top-area{
    display: flex;
    height: 70px;
    align-items: center;
  }
  .left-top-area p img{
    width: 50px;
    margin-right: 10px;
  }
  .right-top-area{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .right-top-area p{
    padding: 4px 10px;
    cursor: pointer;
  }

  .left-title-area{
    position: fixed;
    top: 70px;
    background-color: #F5F5F5;
    bottom: 0px;
    text-align: center;
    text-overflow: ellipsis;
    width: 180px;
    z-index: 1;
    /* border: 1px solid #28427D; */
  }
  .article-item-li{
    color: green;
  }
  .article-group div{
    line-height: 30px;
  }
  .right-detail-area{
    position:absolute;
    height: 100%;
    top: 70px;
    margin-right: 100px;
    width: 1010px;
    z-index: 0px;
    left: 200px;
    bottom: 0px;
  }
  .article-area-group{
    display: flex;
    margin-top: 20px;
    padding-bottom: 20px;
    background-color: #f5f5f5;
    padding: 20px 20px;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #28427D;
  }
  .article-area-group:last-child{
    margin-bottom: 20px;
  }
  .right-left-img-area>img{
    width: 200px;
    height: 140px;
  }
  .right-right-cont{
    padding-left: 20px;
  }
  .title-area{
    display: inline-block;
    color: white;
    padding: 4px 10px;
    background-color: #1E88E5;
    border-radius: 4px;
    margin-bottom: 6px;
  }
  .content-paragraph{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient:vertical;
      flex-direction: column;
      line-height: 24px;
  }
  .dele-area{
    padding: 4px 10px;
    cursor: pointer;
  }
</style>
