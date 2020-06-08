<template>
  <div class="article">
    <div class="article-wrap-area">
      <div class="top">
        <img :src="articleImg" alt="">
      </div>
      <div class="main">
        <div class="title">{{article.title}}</div>
        <div class="from-author">
          <span>{{article.source}}</span> | <span>{{article.author}}</span>
        </div>
        <div class="cont">{{article.content}}</div>
      </div>

      <div class="dicucss-box-wrap" v-if="isDiscuss">
        <div class="discuss-area">
          <div class="close-area">
            <div class="blank"></div>
            <div class="count-discuss">
              {{countDis}}条评论
            </div>
            <div class="close">
              <span class="iconfont icon-close" @click="close"></span>
            </div>
          </div>
          <div class="box-discuss" v-if="isContent">
            <div class="discuss-group-area" v-for="(item,index) in discusses" :key="item._id">
              <div class="left-discuss-area">
                <img :src="item.avatar" alt="">
              </div>
              <div class="right-discuss-area">
                <div class="nickname">{{item.userName}}</div>
                <div class="content-area">
                  {{item.content}}
                </div>
                <div class="discuss-footer">
                  <div class="left-footer">举报</div>
                  <div class="right-footer">
                    <span class="iconfont icon-pinglun"></span>15 &nbsp;&nbsp; <span class="iconfont icon-dianzan"></span>149
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dicuss-txt-area">
            <div class="txt-area">
              <input type="text" placeholder="说点什么吧……" class="txt-value" id="txt"><input type="button" @click="send" value="发送" class="btn">
            </div>
          </div>
        </div>
      </div>


      <div class="footer">
        <div class="left">反馈</div>
        <div class="center">
          <div @click="discuss(article._id)" :class='[activeDiscuss?"active":""]'><span class="iconfont icon-pinglun"></span>&nbsp;{{article.discuss}}</div>
          <div @click="love(article._id)" :class='[isLove ? "active":""]' ><span  class="iconfont icon-shoucang1"></span>&nbsp;{{article.love}}</div>
          <div><span class="iconfont icon-zhuanfa-mian"></span> 142</div>
        </div>
        <div class="right">语音</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"Article",
    data(){
      return{
        article:[],
        userInfo:{},
        postLove:{},
        isLove:false,
        articleImg:"",
        isDiscuss:false,
        articleId:"",
        isContent:false,
        discusses:[],
        countDis:0,
        activeDiscuss:false,
        _postData:""
      }
    },
    methods:{
      love(id){
        console.log("我是Id",id)
        var postLoves={
          userId:this.userInfo._id,
          articleId:id,
          articleImg:this.articleImg,
          articleTitle:this.article.title
        }
        console.log(postLoves)
        if(this.isLove){
          alert("你已经收藏这篇简讯了")
          return
        }else{
          $.ajax({
            url:"http://localhost:3000/love",
            type:"POST",
            data:postLoves,
            success:res=>{
              console.log(res)
              this.isLove=res.data.isLove
              var id=res.data.articleId
              console.log(id)
              $.ajax({
                url:"http://localhost:3000/getArticle/"+id,
                type:"GET",
                success:res1=>{
                  console.log(res1)
                  this.article=res1.data
                  console.log(this.article)
                  this.articleImg=res1.data.articleImg
                },error:err1=>{
                  console.log(err1)
                }
              })
            },
            error:err=>{
              console.log(err)
            }
          })
        }
      },
      // 更具简讯Id获取评论
      getDiscuss(id){
        $.ajax({
          url:"http://localhost:3000/getDiscuss/"+id,
          type:"GET",
          success:res=>{
            console.log(res)
            this.isDiscuss=true
            if(res.code==200){
              this.discusses=res.data
              console.log(this.discusses)
              if(res.data.length>0){
                this.isContent=true
                this.countDis=res.data.length
              }
            }
          }
        })
      },
      discuss(id){
        this.isDiscuss=true
        //
        this.articleId=id;
        this.getDiscuss(id)
      },
      close(){
        this.isDiscuss=false
        // 根据简讯Id重新获取简讯数据
        var id=this.article._id
        $.ajax({
          url:"http://localhost:3000/getArticle/"+id,
          success:res=>{
            console.log(res)
            this.article=res.data
          }
        })
      },
      send(){
        let txt=$.trim($("#txt").val())
        if(txt.length<1){
          alert("说点什么吧……")
          return;
        }
        let sendData={
          userId:this.userInfo._id,
          userName:this.userInfo.username,
          avatar:this.userInfo.avatar,
          articleId:this.article._id,
          articleTitle:this.article.title,
          articleContent:this.article.content,
          articleImg:this.article.articleImg,
          content:txt,
          discuss_time:Date.now(),
          isDiscuss:true,

        }
        $.ajax({
          url:"http://localhost:3000/discuss",
          type:"POST",
          data:sendData,
          success:res=>{
            console.log(res)
            if(res.code==200){
              // 评论成功，就要根据评论的依据去修改简讯表中的评论个数（根据简讯Id） 这个在接口中已完成
              $("#txt").val("")
              // 重新获取
              this.activeDiscuss=true
              this.getDiscuss(this.article._id);
            }
          },
          error:err=>{
            console.log(err)
          }
        })
      }
    },
    mounted() {
      this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
      // console.log()
      console.log(!this.$route.query.id)
      if(!this.$route.query.id){
        // 简讯id不存在
        $.ajax({
          url:"http://localhost:3000/randomOne",
          type:"GET",
          success:res=>{
            console.log(res)
            if(res.code==200){
              this.article=res.data[0]
              this.articleImg=res.data[0].articleImg

              this._postData={
                userId:this.userInfo._id,
                articleId:this.article._id
              }
              console.log(this._postData)

            }
          }
        })
      }else{
        var message_id=this.$route.query.id;
        // 根据简讯id获取数据
        this._postData={
          userId:this.userInfo._id,
          articleId:message_id
        }
        console.log(this._postData)
        $.ajax({
          url:"http://localhost:3000/getArticle/"+message_id,
          success:res=>{
            console.log("获取的数据",res);
            if(res.code==200){
              this.article=res.data
              this.articleImg=res.data.articleImg
            }
          }
        })
      }
      // 根据文章id和用户id看是否有点赞
      $.ajax({
        url:"http://localhost:3000/loveById",
        type:"POST",
        data:this._postData,
        success:res1=>{
          console.log(res1)
          if(res1.data[0]){
            if(res1.code==200){
              console.log(this.isLove)
              this.isLove=res1.data[0].isLove
            }
          }
        },
        error:err1=>{
          console.log(err1)
        }
      })

      // 根据文章id和用户id看是否有评论
      $.ajax({
        url:"http://localhost:3000/isDiscssById",
        data:this._postData,
        type:"POST",
        success:res=>{
          console.log(res)
          if(res.code==200){
            if(res.data.length>0){
              this.activeDiscuss=true
            }
          }
        },
        error:err=>{
          console.log(err)
        }
      })

    }
  }
</script>

<style scoped="scoped">
  .article{
    width: 100%;
    height: 100%;
  }
  .article-wrap-area{
    width: 100%;
    height: 100%;
    /* float: left; */
  }
  .top img{
    width: 100%;
  }
  .main{
    margin: 10px;
    margin-bottom: 100px;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
  }
  .from-author{
    font-size: 14px;
    color: #A0A0A0;
    margin-top: 10px;
  }
  .cont{
    margin-top: 20px;
    font-size: 16px;
    color: #666666;
    line-height: 24px;
    letter-spacing: 1px;
  }
  .footer{
    position: fixed;
    bottom: 0px;
    left: 0px;
    height: 50px;
    border-top: 1px solid #C0C0C0;
    width: 100%;
    display: flex;
    padding: 0px 10px;
    text-align: center;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    z-index: 9;
    font-size: 14px;
    background-color: #FFFFFF;
  }
  .left{
    flex:1;
    text-align: left;
    /* margin-left: -10px; */
  }
  .footer .iconfont{
    font-size: 18px;
    font-weight: bold;
  }
  .active{
    color: indianred;
  }
  .center{
    flex:2;
    display: flex;
    justify-content: space-between;
  }
  .right{
    flex:1;
    text-align:right;
    /* margin-right: -10px; */
  }


  /* 评论区域 */
  .dicucss-box-wrap{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
    z-index: 19;
  }
  .discuss-area{
    position: fixed;
    z-index: 99;
    bottom: 0px;
    left: 0px;
    background-color: #fff;
    width: 100%;
    height: 80%;
  }
  .close-area{
    display: flex;
    /* justify-content: center; */
    position: fixed;
    background-color: #fff;
    width: 100%;
    height: 50px;
    line-height: 50px;
    /* padding: 0px 10px; */
    border-bottom: 1px solid #c0c0c0;

  }
  .blank{
    flex:1;
  }
  .count-discuss{
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .close{
    /* display: flex; */
    float: right;
    text-align: right;
    flex:1;
  }
  .icon-close{
    padding: 8px;
  }
  .discuss-group-area{
    display: flex;
    /* margin-top: 10px; */
    padding: 10px;
  }
  .discuss-group-area:last-child{
    margin-bottom: 120px;
  }
  .left-discuss-area{
    margin-right: 10px;
  }
  .left-discuss-area img{
    width: 50px;
    border-radius: 50%;
  }
  .right-discuss-area{
    width: 100%;
  }
  .nickname{
    font-size: 14px;
    color: #0077B5;
  }
  .content-area{
    padding: 10px;
    background-color: #F5F5F5;
    /* width: 100%; */
    border-radius: 10px;
    margin: 10px 0px;
  }
  .discuss-footer{
    display: flex;
    justify-content: space-between;
  }
  .right-footer{
    font-size: 12px;
  }
  .right-footer .iconfont{
    font-weight: bold;
  }
  /* 底部评论录入 */
  .dicuss-txt-area{
    margin-top: 100px;
    width: 100%;
    height: 50px;
  }
  .txt-area{
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #fff;
    width: 100%;
    z-index: 999;
    padding: 10px 0px;
    border-top: 1px solid #c0c0c0;
    margin-top: 10px;
  }
  .txt-value{
    border: 0px;
    background-color: #f5f5f5;
    height: 40px;
    width: 260px;
    padding-left: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    outline: none;
  }
  .btn{
    width: 60px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    outline: none;
    font-size: 16px;
    /* color: #28427D; */
    font-weight: bold;
  }
  .search-cont{
    margin-top: 20px;
  }
  .box-discuss{
    overflow-y: scroll;
    height: 100%;
    margin-top: 50px;
    /* margin-bottom: 170px; */
  }
</style>
