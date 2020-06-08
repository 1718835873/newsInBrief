<template>
  <div class="detail">
    <div class="top-area">
      <span class="iconfont icon-close" @click="close"></span>
    </div>
    <div class="detail-area">
      <div class="title">{{detail.title}}</div>
      <div class="author-source-area">
        <span>{{detail.source}}</span> | <span>{{detail.author}}</span> | <span>{{detail.create_time | formatDate}}</span>
      </div>
      <img :src="detail.articleImg" alt="" width="400px">
      <div class="content">
        {{detail.content}}
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"Detail",
    data(){
      return{
        detail:{}
      }
    },
    filters:{
      formatDate(value){
        let date=new Date(value)
        return date.toLocaleDateString().split("/").join("-")
      }
    },
    methods:{
      close(){
        this.$router.push({
          path:"/allArticle"
        })
      }
    },
    mounted() {
      let detail_id=this.$route.query.id
      $.ajax({
        url:"http://localhost:3000/getArticle/"+detail_id,
        type:"GET",
        success:res=>{
          console.log(res)
          this.detail=res.data
        },
        error:err=>{
          console.log(err)
        }
      })
    }
  }
</script>

<style scoped="scoped">
  .top-area{
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
    height: 40px;
    line-height: 40px;
    background-color: #28427D;
  }
  .top-area span{
    padding:0px 10px;
    color: white;
  }
  .detail-area{
    width: 1000px;
    margin: 50px auto;
    text-align: center;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #28427D;
  }
  img{
    text-align: center;
    /* display: block; */
    margin: 10px auto;
    vertical-align: middle;
  }
  .title{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .content{
    text-align: left;
    text-indent: 2em;
    line-height: 24px;
  }
</style>
