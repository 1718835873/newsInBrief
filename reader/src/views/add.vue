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
            <td><input type="text" style="width: 700px;  height: 24px;" id="title" name="title" required="required"></td>
          </tr>
          <tr>
            <td>简讯来源:</td>
            <td><input type="text" style="width: 700px;  height: 24px;" id="source" name="source" required="required"></td>
          </tr>
          <tr>
            <td>简讯作者:</td>
            <td><input type="text" style="width: 700px; height: 24px;" id="author" name="author" required="required"></td>
          </tr>
          <tr>
            <td>简讯内容:</td>
            <td><textarea name="content" id="content" cols="30" rows="10" style="width: 700px;" required="required" ></textarea></td>
          </tr>
          <tr>
            <td>上传图片:</td>
            <td><input type="file"
                      name="file"
                      id="file"
                      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                      required="required"
                      @change="uploading($event)"></td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;"><input type="button" class="like-btn" value="添加文章" @click="addArticle()"/></td>
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
        src:""
      }
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
      uploading(event){
        this.file = event.target.files[0];//获取文件
        var windowURL = window.URL || window.webkitURL;
        this.file = event.target.files[0];
        console.log(this.file)
         //创建图片文件的url
        this.src = windowURL.createObjectURL(event.target.files[0]);
        console.log(this.src)
      },
      addArticle(){
        // var form=new FormData(document.forms.namedItem("fileinfo"))
         event.preventDefault();
        let title=$.trim($("#title").val())
        let source=$.trim($("#source").val())
        let author=$.trim($("#author").val())
        let content=$.trim($("#content").val())
        let file=$.trim($("#file").val())
        console.log(content)
        console.log("文件内容:",file)
        console.log(file=="")
        console.log($("#file").get(0).files[0])
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
        if(file == "" || file.length<1){
          this.dialogHidden=true
          this.countTime()
          this.msg="请选择图片文件"
          this.tagClass="error"
          return;
        }
        // var form = document.forms.namedItem("fileinfo");
        console.log("越过山川")
        var formData = new FormData();
        console.log("formData:",formData)
        console.log(title)
         formData.append('title',title)
         formData.append('source',source)
         formData.append('author',author)
         formData.append('content',content)
         formData.append('file',this.file)
         console.log(formData)
         console.log(formData.get("title"));
         console.log(formData.get("file"));

         // var request = new XMLHttpRequest();
         // request.open("POST", "http://localhost:3000/add");
         // request.send(formData);
         $.ajax({
           url: "http://localhost:3000/add" ,
           data:formData,
           type:"POST",
           contentType:false,
           processData:false,
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
