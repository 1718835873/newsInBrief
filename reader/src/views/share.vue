<template>
  <div class="share">
    <img src="../assets/logo.png" alt="">
    <share :config="config"></share>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        config:{
          sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
          disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
          wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
          wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
        }
      }
    }
  }
</script>

<style>
</style>
