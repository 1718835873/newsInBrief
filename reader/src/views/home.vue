<template>
  <div class="home">
    <div class="header">
      <div class="left-head-group">
        <span class="iconfont icon-shouye" @click="goIndex"></span>
      </div>
      <div class="center-head-group">
        <div class="head-item"  v-for="(item,index) in navs" :key="item.id">
          <a href="#" :class='[isActive==index?"active":""]' @click="changeActive(item.id)">
            <span :class="item.icon"></span>
            &nbsp;
            <span>{{item.txt}}</span>
          </a>
        </div>
      </div>
      <div class="right-head-group">
        <span class="iconfont icon-shezhi" @click="goGeneral"></span>
      </div>
    </div>

    <div class="main-area">
      <!-- 已读区域 -->
      <div class="module-group" v-if="isActive==0">
        <div class="card-itme" v-for="(item,index) in readed" :key="item._id">
          <div class="top">
            <img :src="item.articleImg" alt="">
          </div>
          <p class="title-name">{{item.title}}</p>
        </div>
      </div>

      <!-- 收藏区域 -->
      <div class="module-group" v-else-if="isActive==1">
        <div class="card-itme" v-for="(item,index) in love" :key="item._id" @click="goDetail(item.articleId)">
          <span class="close-love iconfont icon-shoucang1" @click.stop="delLove(item._id)"></span>
          <div class="top">
            <img :src="item.articleImg" alt="">
          </div>
          <p class="title-name">{{item.articleTitle}}</p>
        </div>
      </div>
      <!-- 评论区域 -->
      <div class="discuss-area" v-else-if="isActive==2">
        <div class="discuss-group" v-for="(item,index) in discuss" :key="item._id" >
          <div class="discuss-left-area">
            <img :src="item.avatar" alt="">
          </div>
          <div class="discuss-right-area" style="margin-left: 10px;">
            <div class="nickname" style="margin-bottom: 4px;">{{item.userName}}</div>
            <div class="discuss-content">
              {{item.content}}
            </div>
            <div class="resultfrom" @click="goDetail(item.articleId)">
              <div class="left-result">
                <img :src="item.articleImg" alt="">
              </div>
              <div class="right-result">
                <div class="article-title">{{item.articleTitle}}</div>
                <div class="article-cont">{{item.articleContent}}</div>
              </div>
            </div>
            <div class="discuss-bottom">
              <div class="discuss-time">3天前</div>
              <div class="discuss-del" @click="delDiscuss(item._id)">删除</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 溯查区域 -->
      <div class="search-wrap" v-else>
        <div class="search-area">
          <input type="text" placeholder="请输入关键词进行搜索" class="search-value" id="searchV"><input type="button" value="搜索" class="btn" @click="search">
        </div>
        <div class="search-cont" v-show="isSearch">
          <div class="img-position" v-for="(item,index) in searchValue" :key="item._id" @click="goDetail(item._id)">
            <img :src="item.articleImg" alt="">
            <span class="search-value-title">{{item.title}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"Home",
    data(){
      return{
        navs:[
          {id:0,icon:"iconfont icon-yidu",txt:"已读",url:""},
          {id:1,icon:"iconfont icon-shoucang1",txt:"收藏",url:""},
          {id:2,icon:"iconfont icon-pinglun",txt:"评论",url:""},
          {id:3,icon:"iconfont icon-sousuo",txt:"溯查",url:""}
        ],
        isActive:0,
        readed:[],//已读数据
        love:[],//收藏数据
        discuss:[],//评论数据
        searchValue:[],//搜查数据
        userInfo:{},
        isSearch:false
      }
    },
    methods:{
      // 切换选中状态 a
      changeActive(id){
        console.log(id)
        this.isActive=id
        this.$router.push({
          path:"/home",
          query:{
            id:id
          }
        })
        if(this.isActive==0){
          // 0 已读
          $.ajax({
            url:"http://localhost:3000/getAllArticle",
            type:"GET",
            success:res=>{
              console.log("已读数据",res)
              if(res.code==200){
                  this.readed=res.data
              }
            },
            error:err=>{
              console.log(err)
            }
          })

        }else if(this.isActive==1){
          //收藏
          $.ajax({
            url:"http://localhost:3000/getLoveById/"+this.userInfo._id,
            type:"GET",
            success:res=>{
              console.log("收藏数据",res)
              if(res.code==200){
                  this.love=res.data
                  console.log(this.love)
              }
            },
            error:err=>{
              console.log(err)
            }
          })
        }else if(this.isActive==2){
          // 评论
          $.ajax({
            url:"http://localhost:3000/getDiscussById/"+this.userInfo._id,
            type:"GET",
            success:res=>{
              console.log("评论数据",res)
              if(res.code==200){
                  this.love=res.data
              }
            },
            error:err=>{
              console.log(err)
            }
          })
        }else{
          // 溯查
        }

        // console.log(this.$route.fullPath)
      },
      // 回到首页
      goIndex(){
        this.$router.push({
          path:"/index"
        })
      },
      // 去向个人中心页面
      goGeneral(){
        this.$router.push({
          path:"/generalCenter"
        })
      },
      goDetail(id){
        console.log("哈哈哈",id)
        this.$router.push({
          path:"/article",
          query:{
            id:id
          }
        })
      },
      // 删除评论
      delDiscuss(id){
        console.log("删除评论的id",id)
        $.ajax({
          url:"http://localhost:3000/delDiscuss/"+id,
          success:res=>{
            console.log(res)
            // 重新获取评论数据
            $.ajax({
              url:"http://localhost:3000/getDiscussById/"+this.userInfo._id,
              type:"GET",
              success:res=>{
                console.log("评论数据",res)
                if(res.code==200){
                    this.discuss=res.data
                    console.log(this.discuss)
                }
              },
              error:err=>{
                console.log(err)
              }
            })
          },
          error:err=>{
            console.log(err)
          }
        })
      },
      // 删除收藏
      delLove(id){
        console.log("删除收藏的id",id)
        $.ajax({
          url:"http://localhost:3000/delLove/"+id,
          success:res=>{
            console.log(res)
            // 重新获取收藏数据
            //收藏
            $.ajax({
              url:"http://localhost:3000/getLoveById/"+this.userInfo._id,
              type:"GET",
              success:res=>{
                console.log("收藏数据",res)
                if(res.code==200){
                    this.love=res.data
                    console.log(this.love)
                }
              },
              error:err=>{
                console.log(err)
              }
            })
          },
          error:err=>{
            console.log(err)
          }
        })
      },

      // 搜索
      search(){
        let searchV=$.trim($("#searchV").val());
        if(searchV.length<1){
          alert("请输入关键字进行搜索");
          return;
        }
        $.ajax({
          url:"http://localhost:3000/search/"+searchV,
          success:res=>{
            console.log("查询的数据",res)
            if(res.data.length>0){
              this.isSearch=true
              this.searchValue=res.data
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
      let current_id=this.$route.query.id
      this.isActive=current_id
      if(this.isActive==0){
        // 0 已读
        $.ajax({
          url:"http://localhost:3000/getAllArticle",
          type:"GET",
          success:res=>{
            console.log("已读数据",res)
            if(res.code==200){
                this.readed=res.data
            }
          },
          error:err=>{
            console.log(err)
          }
        })

      }else if(this.isActive==1){
        //收藏
        $.ajax({
          url:"http://localhost:3000/getLoveById/"+this.userInfo._id,
          type:"GET",
          success:res=>{
            console.log("收藏数据",res)
            if(res.code==200){
                this.love=res.data
                console.log(this.love)
            }
          },
          error:err=>{
            console.log(err)
          }
        })
      }else if(this.isActive==2){
        // 评论
        $.ajax({
          url:"http://localhost:3000/getDiscussById/"+this.userInfo._id,
          type:"GET",
          success:res=>{
            console.log("评论数据",res)
            if(res.code==200){
                this.discuss=res.data
                console.log(this.discuss)
            }
          },
          error:err=>{
            console.log(err)
          }
        })
      }else{
        // 溯查
      }



    }
  }
</script>

<style scoped="scoped">
  .home{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .iconfont{
    font-size: 24px;
    color: #444;
    font-weight: bold;
  }
  .header{
    position: fixed;
    width: 100%;
    /* top: 10px; */
    padding-top: 10px;
    height: 60px;
    line-height: 36px;
    background-color: white;
    z-index: 1;
    display: flex;
    text-align: center;
  }
  .left-head-group{
    flex: 1;
    text-align:left;
    margin-left: 10px;

  }
  .center-head-group{
    flex:4;
    display: flex;
    justify-content: space-between;
  }
  .right-head-group{
    flex:1;
    text-align:right;
    margin-right: 10px;
  }
  .head-item a{
    font-size: 12px;
    color: #666;
    display: flex;
  }
  .active{
    border-bottom: 2px solid #ddd;
  }

  /* 下面的主要区域 */
  .main-area{
    position: absolute;
    width: 90%;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    top: 70px;
    /* overflow: hidden; */

  }
  .module-group{
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;

  }
  .card-itme{
    width: 47%;
    box-sizing: border-box;
    border: 1px solid #C0C0C0;
    border-radius: 20px;
    margin-bottom: 20px;
    box-shadow: 1px 1px 3px #c0c0c0;
  }
  .top img{
    display: block;
    vertical-align: middle;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
  }
  .title-name{
    padding:0px 4px;
    display: -webkit-box;
    /* width: 100px; */
    height: 18px;
    overflow: hidden;
    /* text-overflow: ellipsis; */

  }
  .close-love{
    position: absolute;
    font-size: 18px;
    color: red;
    margin-left: 10px;
    margin-top: 10px;
    z-index: 99;
    padding:6px;
    background-color: rgba(0,0,0,.3);
    border-radius: 50%;
  }
  /* 评论区域样式 */
  .discuss-group{
    display: flex;
    margin-bottom: 20px;
  }
  .discuss-left-area img{
    width: 50px;
    display: block;
    vertical-align: middle;
    border-radius: 50%;
  }
  .nickname{
    color: #1E88E5;
    font-size: 15px;
    font-weight: bold;
  }
  .discuss-content{
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 2px;
  }

  .resultfrom{
    display: flex;
    background-color: #F3F3F3;
    margin: 10px 0px;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
  }
  .left-result img{
    width: 80px;
  }
  .right-result{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
  }
  .article-title{
    font-size: 17px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient:vertical;
    flex-direction: column;
  }
  .article-cont{
    font-size: 16px;
    color: #a0a0a0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient:vertical;
    flex-direction: column;
  }
  .discuss-bottom{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .discuss-time{
    color:a0a0a0 ;
  }
  .discuss-del{
    color: #0077B5;
  }
  /* 溯查区域样式 */
  .search-area{
    display: flex;
    justify-content: center;
  }
  .search-value{
    border: 0px;
    background-color: #F5F5F5;
    height: 40px;
    width: 260px;
    padding-left: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    outline: none;
    box-shadow: 1px 2px 4px #C0C0C0;
  }
  .btn{
    width: 60px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    outline: none;
    font-size: 16px;
    color: #28427D;
    font-weight: bold;
    border: 0px;
    background-color: #DDDDDD;
    box-shadow: 1px 2px 4px #C0C0C0;
  }
  .search-cont{
    margin-top: 20px;
  }
  .img-position{
    position: relative;
    margin-bottom: 20px;
    /* box-shadow: 0px 0px 4px #C0C0C0; */
  }
  .img-position img{
    width: 100%;
    height: 110px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px #C0C0C0;
  }
  .search-value-title{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 6px 14px;
    /* width: 80%; */
    text-align: center;
    color: white;
    font-size: 16px;
    letter-spacing: 2px;
    background-color: rgba(0,12,12,.2);

  }
</style>
