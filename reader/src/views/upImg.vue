<template>
  <div class="up-img" v-show="showOrHidden">

      <div class="dialog-area">
        <!-- <form  method="POST" enctype="multipart/form-data" name="fileInfo"> -->
          <span class="iconfont icon-close back-mask" @click="close"></span>
          <input type="file" name="file" @change="uploading($event)" required="required" id="file" accept="image/*">
          <br>
          <br>
          <br>
          <br>
          <input type="button" value="更换头像" @click="upImg()">
        <!-- </form> -->

      </div>

  </div>
</template>

<script>
  export default{
    name:"UpImg",
    data(){
      return{
        showOrHidden:true,
        file:"",
        src:""
      }
    },
    methods:{
      close(showOrHidden){
        this.showOrHidden=false
        this.$router.go(-1)
      },
      uploading(evt){
        let file=evt.target.files[0]
        var windowURL = window.URL || window.webkitURL;
        this.file = evt.target.files[0];
        console.log(this.file)
         //创建图片文件的url
        this.src = windowURL.createObjectURL(evt.target.files[0]);
        console.log(this.src)
      },
      // 上传图片
      upImg(){
        let upImg=$.trim($("#file").val())
        if(upImg.length<1){
            alert("请选择图片文件")
            return
        }else{
          // 传图片文件到后台
          // 获取用户id
          let id=JSON.parse(localStorage.getItem("userInfo"))._id;
          var formData=new FormData();
          formData.append("_id",id)
          formData.append("file",this.file)
          console.log(formData.get("_id"))
          console.log(formData.get("file"))
          $.ajax({
            url:"http://localhost:3000/updateImg",
            type:"POST",
            data:formData,
            contentType:false,
            processData:false,
            success:res=>{
              console.log(res)
              if(res.code==200){
               var oldNews= JSON.parse(localStorage.getItem("userInfo"))
               console.log(oldNews)
               oldNews.avatar=res.src
               localStorage.setItem("userInfo",JSON.stringify(oldNews))
                alert(res.msg)
                this.$router.go(-1)
              }else{
                alert(res.msg)
                this.$router.go(-1)
              }
            },
            error:err=>{
              console.log(err)
            }
          })
        }
      }
    }
  }
</script>

<style scoped="scoped">
.up-img{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    z-index: 99;
    /* background-color: #F5F5F5; */
 }
 .back-mask{
   position: fixed;
   right: 30px;
   top: -40px;
   /* background-color: #28427D;
   border-radius: 50%; */
   color: #28427D;
   padding: 10px;
   /* background-color: rgba(0,0,0,.3); */
   /* width: 100%; */
   /* height: 100%; */
   z-index: 999;
 }
 .dialog-area{
   position: fixed;
   background-color: white;
   text-align: center;
   padding: 20px;
   top:30%;
   left: 55%;
   transform: translate(-50%);
   z-index: 99999;
 }
</style>
