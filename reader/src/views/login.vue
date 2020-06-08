<template>
  <div class="login-area">
    <Dialog :msg="msg" :tagClass="tagClass" v-show="dialogHidden"></Dialog>
    <table align="center">
      <tr>
        <td>用户名:</td>
        <td colspan="2"><input type="text" id="username" style="width: 100%;"></td>
      </tr>
      <tr>
        <td>密码:</td>
        <td colspan="2"><input type="text" id="password" style="width: 100%;"></td>
      </tr>
      <tr>
        <td>验证码:</td>
        <td><input type="text" id="code"></td>
        <td><span id="code" style="width: 40px; display: block;" @click="reCode">{{code}}</span></td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: center;">
          <button @click="login">登录</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Dialog from "../components/dialog.vue"
  export default{
    name:"Login",
    components:{
      Dialog
    },
    data(){
      return{
        code:"",
        msg:"出现了问题",
        tagClass:"error",
        dialogHidden:false
      }
    },
    methods:{
      // 计时消失
      countTime(){
        setTimeout(()=>{
          this.dialogHidden=false
        },2000)
      },
      // 点击验证码重新获取验证码
      reCode(){
        this.getCode()
      },
      // 登录功能
      login(){
        let username=$.trim($("#username").val())
        let password=$.trim($("#password").val())
        let code=$.trim($("#code").val())

        if(username.length<1){
          this.dialogHidden=true
          this.countTime()
          this.msg="请输入用户名"
          this.tagClass="error"
          this.getCode();
          return;
        }
        if(password.length<1){
          this.dialogHidden=true
          this.countTime()
          this.msg="请输入密码"
          this.tagClass="error"
          this.getCode();
          return;
        }
        if(code.length<1){
          this.dialogHidden=true
          this.countTime()
          this.msg="请输入验证码"
          this.tagClass="error"
          this.getCode();
          return;
        }

        if(code.toLocaleLowerCase() !=this.code.toLocaleLowerCase()){
          this.dialogHidden=true
          this.countTime()
          this.msg="验证码输入不正确"
          this.tagClass="error"
          this.getCode();
          return;
        }
        let regExp=/\w{5,16}/i
        if(! regExp.test(password)){
          this.dialogHidden=true
          this.countTime()
          this.msg="密码格式不正确(数字、字母、下划线组成的5-16为的字符)"
          this.tagClass="error"
          this.getCode();
          return;
        }

        let postData={
          username,
          password
        }

        $.ajax({
          url:"http://localhost:3000/login",
          type:"POST",
          data:postData,
          success:res=>{
            if(res.code==200){
              this.dialogHidden=true
              this.countTime()
              this.msg=res.msg
              this.tagClass="success"
              // 记录登录信息
              window.localStorage.setItem("isLogin",true)
              window.localStorage.setItem("userInfo",JSON.stringify(res.data))

              // 判断用户是否是管理员
              if(res.data.state==2){
                this.$router.push({
                  path:"/allArticle"
                })
              }else{
                this.$router.push({
                  path:"/index"
                })
              }

            }else{
              this.dialogHidden=true
              this.countTime()
              this.msg="登录失败"
              this.tagClass="error"
              this.getCode();
            }
          },
          error:err=>{
            this.dialogHidden=true
            this.countTime()
            this.msg="登录失败"
            this.tagClass="error"
            this.getCode();
          }
        })


      },
      // 设置验证码
      getCode(){
        let strLength=4;
        let strCode=[0,1,2,3,4,5,6,7,8,9,'A',"a","b","c",'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z','d','e','f','g','h','i','j','k','w','y','z'];
        let str=""
        for(var i=0;i<strLength;i++){
          let index =Math.floor(Math.random()*(parseInt(strCode.length)))
          str+=strCode[index]
        }
        this.code=str;
      }
    },
    mounted() {
      this.getCode();
    }
  }
</script>

<style scoped="scoped">
  .login-area{
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    background-color: #f5f5f5;
    box-sizing: border-box;
    width: 100%;
    margin:0px auto;
    padding-top: 10%;


  }
  table{
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 20px;
    font-size: 14px;
  }
  tr{
    height: 40px;
    line-height: 40px;
  }
  input{
    height: 24px;
    border-radius: 10px;
    outline: none;
    padding-left: 4px;
  }
  button{
    width: 80px;
    background-color:#28427d;
    border: 0px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: white;
    border-radius: 10px;
    outline: none;
  }
  #code{
    /* width: 40px; */
    letter-spacing: 2px;
    font-size: 14px;
  }
</style>
