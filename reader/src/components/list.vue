<template>
  <div class="list-area">
    <div class="list-group" v-for="(item,index) in lists" :key="item.id">
      <div class="left-area">{{item.utilname}}</div>
      <div class="right-area">
        <p class="item" v-if="item.isImg">{{item.sub}}</p>
        <p v-else  class="item"><img :src="item.sub" alt="" class="set-avatar"></p>
        <p class="iconfont icon-youjiantou"></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"List",
    props:{
      lists:Array
    },
    methods:{

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
  }
</style>
