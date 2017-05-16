import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import findShip from '@/components/findShip'
import findGoods from '@/components/findGoods'
import discover from '@/components/discover'
import my from '@/components/my'

Vue.use(Router)

export default new Router({
 /*  mode: 'history',*/

  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      redirect: '/findShip',
      children:[
      	{ path:'/findShip',component: findShip,
          /*beforeRouteLeave (to, from, next) {
            debugger
            from.$store.scrollTop=window.pageYOffset;
          }*/
        },
      	{path:'/findGoods',component: findGoods},
      	{path:'/discover',component: discover},
      	{path:'/my',component: my},
      ]
    },
    {
      path:'/findShip/shipDetail/:shipInfo',
      name:'shipDetail',component: resolve => require(['@/components/shipDetail'], resolve),

    },
   {path:'/findGoods/goodsDetail/',name:'goodsDetail',component: resolve => require(['@/components/goodsDetail'], resolve)},
   {path:'/changeLoginStatus',name:'changeLoginStatus',component: resolve => require(['@/components/common/changeLoginStatus'], resolve)},
   {path:'/bandPhoneNumber',name:'bandPhoneNumber',component: resolve => require(['@/components/bandPhoneNumber'], resolve)},
   {path:'/dispatch',name:'dispatch',component: resolve => require(['@/components/dispatch'], resolve)},
  ]
})
