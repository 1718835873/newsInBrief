<template>
  <div class="acount-area">
    <top :util="util"></top>
    <div class="phone-area" v-show="isPhone">
      <div class="mask-area" @click="phoneClose"></div>
      <div class="phone-wrap">
        <input type="text" style="width:200px;height: 30px;" id='phone'>
        <br><br>
        <button class="phone-btn" @click="getGhone">修改手机号</button>
      </div>
    </div>
    <!-- 性别 -->
    <div class="phone-area" v-show="isGender">
      <div class="mask-area" @click="genderClose"></div>
      <div class="phone-wrap">
        <p class="font-title">请选择你的性别</p>
        <input type="radio" name="gender" value="男" class="gender">男 &nbsp;&nbsp;&nbsp;
        <input type="radio" name="gender" value="女" class="gender">女
        <br><br>
        <button class="phone-btn" @click="getGender">选择性别</button>
      </div>
    </div>

    <!-- 昵称 -->
    <div class="phone-area" v-show="isUsername">
      <div class="mask-area" @click="usernameClose"></div>
      <div class="phone-wrap">
        <input type="text" style="width:200px;height: 30px;" id='username'>
        <br><br>
        <button class="phone-btn" @click="getUsername">更改昵称</button>
      </div>
    </div>


    <div class="list-area">
      <div class="list-group" @click="handlerShow">
        <div class="left-area">头像</div>
        <div class="right-area">
          <p class="item"><img :src="userInfo.avatar" alt="" class="set-avatar"></p>
          <p class="iconfont icon-youjiantou"></p>
        </div>
      </div>
      <!-- 昵称 -->
      <div class="list-group" @click="handlerNickName">
        <div class="left-area">昵称</div>
        <div class="right-area">
          <p class="item">{{userInfo.username}}</p>
          <p class="iconfont icon-youjiantou"></p>
        </div>
      </div>
      <div class="list-group" @click="handlerGender">
        <div class="left-area">性别</div>
        <div class="right-area">
          <p class="item">{{userInfo.gender}}</p>
          <p class="iconfont icon-youjiantou"></p>
        </div>
      </div>
      <div class="list-group" @click="handlerPhoneShow">
        <div class="left-area">手机</div>
        <div class="right-area">
          <p class="item">{{userInfo.phone}}</p>
          <p class="iconfont icon-youjiantou"></p>
        </div>
      </div>
    </div>
    <div class="footer-account">
      <div class="btn-out" @click="outIn">退出登录</div>
    </div>
  </div>
</template>

<script>
  import Top from "../components/top.vue"
  export default{
    name:"Acount",
    components:{
      Top
    },
    data(){
      return{
        util:"",
        userInfo:{},
        isPhone:false,
        isGender:false,
        isUsername:false
      }
    },
    methods:{
      // 头像
      handlerShow(){
        this.$router.push({
          path:"/upImg"
        })
      },
      // 手机
      handlerPhoneShow(){
        this.isPhone=true
      },
      phoneClose(){
        this.isPhone=false
      },
      getGhone(){
        let phone=$.trim($("#phone").val())
        if(phone.length<1){
          alert("请输入手机号")
          return;
        }
        let checkPhone=/^1[356789]\d{9}$/
        if(!checkPhone.test(phone)){
          alert("请输入正确格式")
          return;
        }
        let postPhone={
          phone:phone,
          _id:this.userInfo._id
        }
        $.ajax({
          url:"http://localhost:3000/updatePhone",
          type:"POST",
          data:postPhone,
          success:res=>{
            console.log(res)
            if(res.code==200){
              this.isPhone=false
              // 重新给内存中保存的用户信息更新
              var oldNews= JSON.parse(localStorage.getItem("userInfo"))
              console.log(oldNews)
              oldNews.phone=phone
              localStorage.setItem("userInfo",JSON.stringify(oldNews))
              this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
            }
          },
          error:err=>{
            console.log(err)
          }
        })
      },
      // 性别
      handlerGender(){
        this.isGender=true
      },
      genderClose(){
        this.isGender=false
      },
      getGender(){
        // let man=$(".gender")[0].value
        // let felman=$(".gender")[1].value
        if( !$(".gender")[0].checked && !$(".gender")[1].checked ){
          alert("请选择你的性别")
          return;
        }
        let gender=$(".gender")[0].checked==true? "男":"女"
        let postGnderData={
          gender:gender,
          _id:this.userInfo._id
        }
        $.ajax({
          url:"http://localhost:3000/updateGender",
          type:"POST",
          data:postGnderData,
          success:res=>{
            console.log(res)
            if(res.code==200){
              this.isGender=false
              // 重新给内存中保存的用户信息更新
              var oldNews= JSON.parse(localStorage.getItem("userInfo"))
              console.log(oldNews)
              oldNews.gender=gender
              localStorage.setItem("userInfo",JSON.stringify(oldNews))
              this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
            }
          }
        })
      },
      // 昵称
      handlerNickName(){
        this.isUsername=true
      },
      usernameClose(){
        this.isUsername=false
      },
      getUsername(){
        let username=$.trim($("#username").val())
        if(username.length<1){
          alert("请输入昵称")
          return;
        }
        let postUsername={
          username,
          _id:this.userInfo._id
        }
        $.ajax({
          url:"http://localhost:3000/updateUsername",
          data:postUsername,
          type:"POST",
          success:res=>{
            console.log(res)
            if(res.code==200){
              this.isUsername=false;
              var newUserInfo=JSON.parse(localStorage.getItem("userInfo"))
              newUserInfo.username=username;
              localStorage.setItem("userInfo",JSON.stringify(newUserInfo))
              this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
            }
          }
        })

      },
      // 退出登录
      outIn(){
        localStorage.setItem("isLogin",false)
        localStorage.setItem("userInfo",'{}')
        this.$router.push({
          path:"/login"
        })
      }
    },
    mounted() {
      this.util=this.$route.query.util
      this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
    },


  }
</script>

<style scoped="scoped">
  .list-area{
    position: absolute;
    top: 70px;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .list-group{
    display: flex;
    justify-content: space-between;
    margin: 0px 20px;
    padding: 0 10px;
    height: 60px;
    align-items: center;
    border: 1px solid #c0c0c0;
    border-bottom: 0px solid #C0C0C0;
  }
  .list-group:last-child{
    border-bottom: 1px solid #C0C0C0;
  }
  .item{
    margin-right: 10px;
  }
  .right-area{
    height: 60px;
    display: flex;
    align-items: center;
  }
  .set-avatar{
    width: 50px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    height: 50px;
  }
  /* 修改手机号 */
  .phone-area{
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    /* background-color: #008000; */
    z-index: 99;
  }
  .mask-area{
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    z-index: 100;
  }
  .phone-wrap{
    position: fixed;
    text-align: center;
    z-index: 9999;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 200px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-100%);
  }
  .phone-btn{
    width: 90px;
    height: 30px;
    background-color: #28427D;
    outline: none;
    border: 0px;
    color: white;
  }
  .font-title{
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 1.9px;
  }
  .footer-account{
    position: fixed;
    bottom: 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
  }
  .btn-out{
    border: 1px solid #C0C0C0;
    margin: 0px 20px;
  }
</style>
