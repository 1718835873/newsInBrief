<template>
  <div class="top-area">
    <p class="iconfont icon-zuojiantou" @click="goBack"></p>
    <p class="until-name">{{util}}</p>
  </div>
</template>

<script>
  export default{
    name:"Top",
    props:{
      util:String
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped="scoped">
  .top-area{
    position: fixed;
    top: 0px;
    left: 0px;
    height: 50px;
    line-height: 50px;
    background-color: #28427D;
    text-align: center;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0px 20px;
    color: white;
  }
  .iconfont{
    font-size: 24px;
  }
  .until-name{
    width: 100%;
    text-align: center;
    margin-right: 20px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1.2px;
  }
</style>
