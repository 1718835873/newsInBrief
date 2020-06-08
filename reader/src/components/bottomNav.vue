<template>
  <div class="nav">
    <div class="nav-item" v-for="(item,index) in navs" :key="item.id">
      <div class="item-warp" @click="toHome(index)">
        <div class="icon">
          <span :class="item.icon"></span>
        </div>
        <div class="txt">{{item.txt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"BottomNav",
    data(){
      return{
        navs:[
          {id:0,icon:"iconfont icon-yidu",txt:"已读",url:"/home",urlData:""},
          {id:1,icon:"iconfont icon-shoucang1",txt:"收藏",url:"/home",urlData:""},
          {id:2,icon:"iconfont icon-pinglun",txt:"评论",url:"/home",urlData:""},
          {id:3,icon:"iconfont icon-sousuo",txt:"溯查",url:"/home",urlData:""}
        ]
      }
    },
    methods:{
      toHome(index){
        console.log("点击的下标",index)
        this.$emit("func",index)
      }
    }
  }
</script>

<style scoped="scoped">
  .nav{
    display: flex;
    text-align: center;
  }
  .nav-item{
    /* width: 25%; */
    flex:1;
  }
  .item-warp{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .iconfont{
    font-size: 26px;
    font-weight: bold;
  }
  .txt{
    font-size: 16px;
    padding-top: 6px;
  }
</style>
