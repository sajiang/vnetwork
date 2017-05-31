import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import findShip from '@/components/findShip'
import findGoods from '@/components/findGoods'
import discover from '@/components/discover'
import my from '@/components/my'

import commonData from '@/components/common/commonData'

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
          /*beforeEnter (to, from, next) {
            debugger
            from.$store.state.scrollTop=window.pageYOffset;
          }*/
        },
      	{path:'/findGoods',component: findGoods},
      	{path:'/discover',component: discover},
      	{path:'/my',component: my,
          beforeEnter: (to, from, next) => {
            window.localStorage.pageType='choose';
            if (window.localStorage.curType) {
              window.localStorage.type=window.localStorage.curType;
            }
            window.localStorage.wantToGo=window.location.origin+window.location.pathname+"#/my";
            if(commonData.checkLoginStatus()){
              next();
            }
          }
        },
      ]
    },
    {path:'/findShip/shipDetail/:shipInfo',name:'shipDetail',component: resolve => require(['@/components/shipDetail'], resolve),},
    {path:'/findShip/fullMap/:shipInfo',name:'fullMap',component: resolve => require(['@/components/fullMap'], resolve),},
    {path:'/findGoods/goodsDetail/:goodsInfo',name:'goodsDetail',component: resolve => require(['@/components/goodsDetail'], resolve)},
    {path:'/discover/loadPrice',name:'loadPrice',component: resolve => require(['@/components/loadPrice'], resolve)},
    {path:'/discover/shipFixPosition',name:'shipFixPosition',component: resolve => require(['@/components/shipFixPosition'], resolve)},
    {path:'/changeLoginStatus',name:'changeLoginStatus',component: resolve => require(['@/components/common/changeLoginStatus'], resolve)},
    {path:'/bandPhoneNumber',name:'bandPhoneNumber',component: resolve => require(['@/components/bandPhoneNumber'], resolve)},
    {path:'/dispatch',name:'dispatch',component: resolve => require(['@/components/dispatch'], resolve)},
    {path:'/my/message',name:'message',component: resolve => require(['@/components/message'], resolve)},
    {path:'/my/myFollowShip',name:'myFollowShip',component: resolve => require(['@/components/myFollowShip'], resolve)},
    {path:'/my/myFollowGoods',name:'myFollowGoods',component: resolve => require(['@/components/myFollowGoods'], resolve)},
  ]
})
