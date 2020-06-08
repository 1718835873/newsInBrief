<template>
  <div class="index">
    <div class="top-header" @click="toCenter">
      <span class="iconfont icon-shezhi"></span>
    </div>
    <div class="random-ten">
      <span class="like-btn" @click="goArticle">随机10篇</span>
    </div>
    <div class="bottom-nav">
      <BottomNav @func="selIndex"></BottomNav>
    </div>
  </div>
</template>
<script>
  import BottomNav from '@/components/bottomNav.vue'
  export default{
    name:"Index",
    components:{
      BottomNav
    },
    data(){
      return{
        userInfo:{}
      }
    },
    methods:{
      toCenter(){
        this.$router.push({
          path:"/generalCenter"
        })
      },
      selIndex(index){
        this.$router.push({
          path:"/home",
          query:{id:index}
        })
      },
      // 随机10篇文章
      goArticle(){
        this.$router.push({
          path:"/article"
        })
      }
    },
    mounted() {
      // 判断用户是否登录
      let userInfo=JSON.parse(localStorage.getItem("userInfo")|| '{}')
      this.userInfo=userInfo
    }
  }
</script>

<style scoped="scoped">
  .index{
    width: 100%;
    height: 100%;
    background: url(../assets/imgs/back1.jpg);
    background-size: cover;
  }
  /* 底部导航栏的样式 */
  .bottom-nav{
    position: fixed;
    width: 100%;
    bottom: 20px;
  }
  .top-header{
    position: fixed;
    top: 20px;
    right: 20px;
  }

  .iconfont{
    font-size: 26px;
    font-weight: bold;
  }
  .random-ten{
    position: fixed;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
  }

  .like-btn{
    display: block;
    width: 240px;
    height: 50px;
    border: 0px;
    border-radius:40px;
    background: linear-gradient( #28427d 0%, #455c90 33%, #6a7ba6 100%);
    animation: bigOrSmall 7.5s ease-in-out infinite;
    text-align: center;
    line-height: 50px;
    color: white;
    font-size: 16px;
  }
  @keyframes bigOrSmall{
    0%{
      transform: scale(1);
    }
    25%{
      transform: scale(1.1);
    }
    50%{
      transform: scale(1);
    }
    75%{
      transform: scale(1.1);
    }
  }

</style>
