<template>
  <div :class='["dialog-area",tagClass]'>
    {{msg}}
  </div>

</template>

<script>
export default {
  name: 'Dialog',
  props:{
    msg:{
      type:String
    },
    tagClass:{
      type:String
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.dialog-area{
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 10px 16px;
  color: white;
  border-top-right-radius: 10px;
  font-size: 14px;
  border-bottom-right-radius: 10px;
  z-index: 99;
}
.error{
  background-color: rgba(255,2,10,.4);
}
.success{
  background-color: rgba(0,255,0,.4);
}
</style>
