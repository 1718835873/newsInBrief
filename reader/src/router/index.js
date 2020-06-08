import Vue from 'vue'
import Router from 'vue-router'
import Index from "../views/index.vue"
import GeneralCenter from "../views/generalCenter.vue"
import Login from "../views/login.vue"
import Home from "../views/home.vue"
import AllArticle from "../views/allArticle.vue"
import Add from "../views/add.vue"
import Detail from "../views/detail.vue"
import Editor from "../views/editor.vue"
import Acount from "../views/acount.vue"
import UpImg from "../views/upImg.vue"
import Share from "../views/share.vue"
import Article from "../views/article.vue"
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/generalCenter',
      name: 'GeneralCenter',
      component: GeneralCenter
    },
    {
      path: '/home',
      name: 'Home',
      component:Home
    },
    {
      path:'/allArticle',
      name:'AllArticle',
      component:AllArticle
    },
    {
      path:'/add',
      name:'Add',
      component:Add
    },
    {
      path:'/editor',
      name:'Editor',
      component:Editor
    },
    {
      path:'/detail',
      name:'Detail',
      component:Detail
    },
    {
      path:'/acount',
      name:'Acount',
      component:Acount
    },
    {
      path:'/upImg',
      name:'UpImg',
      component:UpImg
    },
    {
      path:'/share',
      name:'Share',
      component:Share
    },
    {
      path:'/article',
      name:'Article',
      component:Article
    }
  ]
})
