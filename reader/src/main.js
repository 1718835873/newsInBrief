// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'
import "./assets/css/base.css"
// 引入字体文件
import './assets/css/font.css'

import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css'; 
import '../node_modules/social-share.js/dist/js/social-share.min.js'

Vue.use(Share)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
