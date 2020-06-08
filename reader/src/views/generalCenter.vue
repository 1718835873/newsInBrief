<template>
  <div class="center">
    <div class="top">
      <span class="iconfont icon-close" @click="goIndex"></span>
    </div>
    <div class="login-area" v-if="!isLogin">
      <div class="left-area-img" @click="login">
        <img src="../assets/imgs/user-unlogin.png" alt="">
      </div>
      <div class="right-area-no-login">
        <h3>未登录简讯</h3>
        <p>点头像立即登录</p>
      </div>
    </div>
    <div class="login-area" v-else>
      <div class="left-area-img">
        <img :src="userInfo.avatar" alt="" class="set-avatar">
      </div>
      <div class="right-area-no-login">
        <h3>{{userInfo.username}}</h3>
        <span>用户ID:762985</span>
        <p>尚未开通简讯VIP会员</p>
      </div>
    </div>
    <div class="list-area">
      <div class="group" @click="acount">
        <div class="list-area-left">
          <span class="iconfont icon-mima"></span>
          <span>账户管理</span>
        </div>
        <div class="list-area-right">
          <span class="iconfont icon-youjiantou"></span>
        </div>
      </div>
      <div class="group">
        <div class="list-area-left">
          <span class="iconfont icon-dingdan"></span>
          <span>订单管理</span>
        </div>
        <div class="list-area-right">
          <span class="iconfont icon-youjiantou"></span>
        </div>
      </div>
      <div class="group">
        <div class="list-area-left">
          <span class="iconfont icon-xitong-"></span>
          <span>系统设置</span>
        </div>
        <div class="list-area-right">
          <span class="iconfont icon-youjiantou"></span>
        </div>
      </div>
      <div class="group">
        <div class="list-area-left">
          <span class="iconfont icon-kefu"></span>
          <span>在线客服</span>
        </div>
        <div class="list-area-right">
          <span class="iconfont icon-youjiantou"></span>
        </div>
      </div>
      <div class="group" @click="goShare">
        <div class="list-area-left">
          <span class="iconfont icon-zhuanfa-mian"></span>
          <span>推荐好友</span>
        </div>
        <div class="list-area-right">
          <span class="iconfont icon-youjiantou"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    name:'GeneralCenter',
    components:{

    },
    data(){
      return{
        isLogin:false,
        userInfo:{},
        avatar:"../assets/imgs/user-unlogin.png",
      }
    },
    methods:{
      // 点击返回首页
      goIndex(){
        this.$router.push({
          path:"/index"
        })
      },
      // 点击头像登录
      login(){
        this.$router.push({
          path:"/login"
        })
      },
      // 账户管理
      acount(){
        this.$router.push({
          path:"/acount",
          query:{util:"账户管理"}
        })
      },
      // 分享
      goShare(){
        this.$router.push({
          path:"/share"
        })
      }
    },
    mounted() {
      let isLogin=localStorage.getItem("isLogin");
      this.isLogin=isLogin
      this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
      // if(this.userInfo.avatar.len)
    }
  }
</script>

<style scoped="scoped">
  .center{
    position: fixed;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
  .top{
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }
  .icon-close{
    float: right;
    font-size: 24px;
    padding: 0px 0px 0px 10px;
  }
  .login-area{
    display: flex;
    margin-bottom: 20px;
    align-items: center;
  }

  h3{
    font-size: 20px;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }
  .list-area{
    border: 1px solid #e0e0e0;
  }
  .group{
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .group:last-child{
    border-bottom: 0px solid #e0e0e0;
  }
  .list-area-left{
    padding-left: 20px;
    font-size: 16px;
    display: flex;
  }
  .list-area-left span{
    display: block;
  }
  .list-area-left .iconfont{
    padding-right: 14px;
    font-size: 24px;
    color: #c0c0c0;
  }
  .list-area-right{
    padding-right: 12px;
  }
  .list-area-right>.iconfont{
    font-size: 24px;
    color: #C0C0C0;
    padding: 4px;
  }
  .right-area-no-login{
    margin-left: 10px;
  }
  .right-area-no-login p{
    font-size: 14px;
    letter-spacing: 1.2px;
    margin-top: 8px;
  }
  .left-area-img img{
    width: 110px;
  }
  .set-avatar{
    width: 110px;
    height: 110px;
    border-radius: 50%;
  }
</style>
