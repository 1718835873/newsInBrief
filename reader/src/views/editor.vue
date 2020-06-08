<template>
  <div class="add-area">
    <Dialog :msg="msg" :tagClass="tagClass" v-show="dialogHidden"></Dialog>
    <div class="top-area">
      <span class="iconfont icon-close" @click="close"></span>
    </div>
    <div class="main-area">
      <!-- <form method="post" name="fileinfo" enctype="multipart/form-data" action="http://localhost:3000/add"> -->
        <table align="center">
          <tr>
            <td>简讯标题:</td>
            <td><input type="text"
                        style="width: 700px;  height: 24px;"
                        id="title"
                        name="title"
                        required="required"
                        :value="editorData.title"></td>
          </tr>
          <tr>
            <td>简讯来源:</td>
            <td><input type="text"
                        style="width: 700px;  height: 24px;"
                        id="source"
                        name="source"
                        required="required"
                        :value="editorData.source"></td>
          </tr>
          <tr>
            <td>简讯作者:</td>
            <td><input
                        type="text"
                        style="width: 700px; height: 24px;"
                        id="author"
                        name="author"
                        required="required"
                        :value="editorData.author"></td>
          </tr>
          <tr>
            <td>简讯内容:</td>
            <td><textarea name="content"
                          id="content"
                          cols="30"
                          rows="10"
                          style="width: 700px;"
                          required="required"
                          :value="editorData.content"></textarea></td>

          </tr>
         <!-- <tr>
            <td>上传图片:</td>
            <td><input type="file"
                      name="file"
                      id="file"
                      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                      required="required"
                      @change="uploading($event)"></td>
          </tr> -->
          <tr>
            <td colspan="2" style="text-align: center;"><input type="button" class="like-btn" value="修改简讯" @click="editorArticle()"/></td>
          </tr>
        </table>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
  import Dialog from "../components/dialog.vue"
  export default{
    name:"Add",
    components:{
      Dialog
    },
    data(){
      return{
        msg:"出错了",
        tagClass:"error",
        dialogHidden:false,
        // 表单中的数据定义
        file:"",
        src:"",
        editorData:{},
        imgSrc:"",
        updateId:""

      }
    },
    mounted() {
      let id=this.$route.query.id;
      $.ajax({
        url:"http://localhost:3000/getArticle/"+id,
        type:"GET",
        success:res=>{
          console.log(res)
          this.editorData=res.data
          this.imgSrc=res.data.articleImg;
          this.updateId=res.data._id
        },
        error:err=>{
          console.log(err)
        }
      })
    },
    methods:{
      countTime(){
        setTimeout(()=>{
          this.dialogHidden=false
        },2000)
      },
      close(){
        this.$router.go(-1)
      },
      editorArticle(){
        console.log(this.updateId)
         event.preventDefault();
        let title=$.trim($("#title").val())
        let source=$.trim($("#source").val())
        let author=$.trim($("#author").val())
        let content=$.trim($("#content").val())

        if(title.length<1){
          this.dialogHidden=true
          this.countTime()
          this.msg="请输入简讯标题"
          this.tagClass="error"
          return false;
        }
        if(source.length<1){
          this.dialogHidden=true
          this.countTime()
          this.msg="请输入简讯来源"
          this.tagClass="error"
          return false;
        }
        if(author.length<1){
          this.dialogHidden=true
          this.countTime()
          this.msg="请输入作者名称"
          this.tagClass="error"
          return;
        }
        if(content.length<1){
          this.dialogHidden=true
          this.countTime()
          this.msg="请输入简讯内容"
          this.tagClass="error"
          return;
        }

         let updateData={
           title,
           source,
           author,
           content
         }
         var id=this.updateId
         $.ajax({
           url: "http://localhost:3000/updateArticle/"+id,
           data:updateData,
           type:"POST",
           success:res=>{
             console.log(res)
             if(res.code==200){
               this.dialogHidden=true
               this.countTime()
               this.msg="添加简讯成功"
               this.tagClass="success"
               this.$router.push({
                 path:"/allArticle"
               })
               return;
             }
           },
           error:err=>{
             console.log(err)
           }
         })


      }
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
  .main-area{
    display: block;
    width: 1220px;
    margin: 50px auto;
  }
  tr{
    line-height: 50px;
  }
  textarea{
    resize: none;
  }
  .like-btn{

  }
</style>
