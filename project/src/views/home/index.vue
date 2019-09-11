<template>
  <div >
    <div class="container" id="home_page">
      <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <div class="fixed_title">
          <van-nav-bar
            title="彩票工具大全"
            @click-right="onClickRight"
          >
            <van-icon name="search" slot="right"/>
          </van-nav-bar>
        </div>
        <van-swipe :autoplay="3000" indicator-color="#007BC2">
          <van-swipe-item  v-for="(image, index) in advs" :key="index">
            <div class="swipe_img_box" @click="jumpTo(image.url)">
              <img :src="$https+image.pic" style="border-radius:.2rem;"/>
            </div>
          </van-swipe-item>
        </van-swipe>
        <a :href="banner_url" target="_blank" v-show="false" id="banner_a">1</a>
        <van-notice-bar v-if="notices.length>0" style="padding-left:.2rem;padding-right:.2rem;"
          color="#000"
          background="#F5F5F5"
          left-icon="volume-o"
        >
        <span v-for="n in notices" :key="n.noticeid" @click="goNotice(n.noticeid)" style="margin-right:80px;color:#666;">{{n.title}}</span>
        </van-notice-bar>
        <van-row :gutter="30" class="list_box text_center">
          <van-col span="6" style="width:23%;padding-left:0;padding-right:0" v-for="(l,index) in list" :key="index">
            <div class="item_box"  @click="jumpTo(l.link,l.islink)">
              <img :src="l.src" alt="" class="max_width_100">
              <span>{{l.title}}</span>
            </div>
          </van-col>
        </van-row>
        <div class="xian"></div>

        <a :href="app_click_url" target="_blank" v-show="false" id="app_click">1</a>
        <van-tabs v-model="active" @click="tabList" color="#3996FF" title-active-color="#3996FF">
          <van-tab v-for="(item,i) in titleList" :key="i" :title="item.name">
            <div class="assistant_list" v-for="(dom,index) in lottypeList" :key="index">
              <img :src="dom.img" alt="">
              <div @click="toappdetail(dom.appid,dom.appname)">
                <p>{{dom.appname}}</p>
                <div>
                  <van-rate allow-half style="margin-right: .2rem" :size="14" v-model="dom.appstar" /> 安装({{dom.appinsnum}})
                </div>
                <p>{{dom.appdesc}}</p>
              </div>
              <van-button size="small" plain type="primary" @click="clickAppurl(dom.appurl,dom.appid)">安装</van-button>
            </div>
          </van-tab>
        </van-tabs>
        <div class="text_center" v-if="lastid != 0" style="padding:.3rem 0;">
          <span @click="gethomeapp" style="color:#3996ff;">加载更多</span>
        </div>
      <!-- </van-pull-refresh> -->

    </div>

    <div class="container" v-if="is_ios" style="background:#F5F5F5;padding-top:0.4rem !important;position:absolute;top:0;z-index:1001;padding-bottom:2rem;">
        <!-- <title-bar title_name="添加到主屏幕" /> -->
        <div style="background:#EFEFEF;padding:0.2rem 0.15rem;margin:0 0.3rem 0.2rem;">
            <div style="text-align:center;font-size:0.5rem;color:#DB3030;font-weight:bold;padding:0.2rem 0;">温馨提示</div>
            <div style="line-height:1.6;padding-left:0.2rem;font-size:0.4rem;">
              请务必添加本页面到主屏幕，以便下次访问。
            </div>
            <div style="text-align:center;padding:0.4rem 0;">
              <van-button style="width:3rem;height: 1.2rem;line-height: 1.2rem;background-color:#D4D4D4;color:#1A1A1A;font-size:0.45rem;" @click="addfn">已添加</van-button>
              <van-button style="width:3rem;height: 1.2rem;line-height: 1.2rem;margin-left:1rem;background-color:#3996FF;color:#fff;font-size:0.45rem;" @click="ignore">关闭</van-button>
            </div>
        </div>
        <img src="../../assets/down_iphone.png" alt="" style="width:100%">
    </div>
    
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { gethome } from '@/api/home'
import { gethomeapp, clickinstall } from '@/api'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
  data () {
    return {

      list:[
        {src:require('../../assets/list.png'),title:'排行榜',link:'/personal/listUse',islink: false},
        {src:require('../../assets/upload.png'),title:'上传应用',link:'/personal/applicationUpload',islink: localStorage.getItem('cp_uid')?false:true},
        {src:require('../../assets/myAccount.png'),title:'我的帐号',link:'/personal/index',islink: localStorage.getItem('cp_uid')?false:true},
        {src:require('../../assets/gg.png'),title:'公告',link:'/home/announcement/index',islink: false}
        
      ],
      notice:'',
      advs:[],
      banner_url:'#',
      is_ios:false,
      isFirstEnter:false,
      fangansList:null,
      notices:[],
      isLoading:false,
      active: 0,
      titleList: [],
      lastid: 0,
      lottype: [],
      lottypeList: [],
      type: '',
      regpiddes: '',
      app_click_url:''
    }
  },
  methods: {
    toappdetail(appid,appname) {
      // if(!localStorage.getItem('cp_sid') || !localStorage.getItem('cp_uid')) {
      //   this.$toast('请先登录!')
      //   setTimeout(() => {
      //       this.$router.push('/login/index')
      //     },1200)
      //   return
      // }
      this.$router.push(`/personal/applicationDetail?appid=${appid}&appname=${appname}`)
    },
    goNotice(noticeid){
      this.$router.push({
        path:'/home/announcement/detail',
        query:{
          noticeid:noticeid
        }
      })
    },
    //点击安装
    clickAppurl(url,appid) {
      this.clickAppurl_data(appid);
      // window.location.href = url
      this.app_click_url = url;
      this.$nextTick(()=>{
        document.getElementById('app_click').click();
      })
    },
    async clickAppurl_data(appid){
      const { data } = await clickinstall({
        appid
      })
    },
    //点击选项
    tabList() {
      this.type = this.titleList[this.active].type
      this.lottypeList = []
      this.lastid = 0
      this.gethomeapp()
    },
    //应用列表
    async gethomeapp() {
      let device = 0;
      let u = navigator.userAgent, app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid)device = 0
      if (isIOS)device = 1
      const { data } = await gethomeapp({
        type: this.type,
        lastid: this.lastid,
        device: device
      })
      
      if(this.lastid == 0) {
        this.lottypeList = data.list.map(item => {
          return {
            ...item,
            appstar: parseFloat(item.appstar)
          }
        })
      }else {
          data.list.map(item=>{
            item.appstar = parseFloat(item.appstar)
            this.lottypeList.push(item)
          })
      }  
      this.lottypeList.forEach(val=>{
        if(val.img.indexOf('http')!=0){
          val.img = this.$https+val.img;
        }
      })
      this.lastid = data.lastid;
    },
    goDetail(data){
        this.$router.push({
            path: '/home/announcement/detail', 
            query: {
                // title: data.title, 
                noticeid: data.noticeid
            }
        })
    },
    addfn(){
      this.is_ios = false;
    },
    ignore(){
      this.is_ios = false;
    },
    onClickRight(){
      this.$router.push('/personal/search')
    },
    jumpTo( path, islink ){
      // console.log(path)
      if(path.indexOf('/')==0){
        this.$router.push(path)
      }else{
        this.banner_url = path;
        this.$nextTick(()=>{
          document.getElementById('banner_a').click();
        })
      }
    },
    async gethome() {
      let obj = {};
      const { data } = await gethome(obj)
      this.isLoading = false;
      this.advs = data.advs 
      this.titleList = data.lottype
      this.type = this.titleList[0].type
      this.regpiddes = data.regpiddes
      this.notices = data.notices;
      localStorage.setItem('uploadtips',data.uploadtips)
      this.$store.dispatch('set_homedata',data)
      this.$store.dispatch('set_apkurl',data.apkurl)
    },
  },
  created(){
    this.isFirstEnter=true;
    //判断 浏览器类型
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      // if(!localStorage.getItem('isadd')){
      //   this.is_ios = true;
      // }
      
      if(window.navigator.standalone){
        this.is_ios = false;
      }else{
        this.is_ios = true;
      }
    }
    //判断 浏览器类型
     if ( /(Android)/i.test(navigator.userAgent)) {
      if(!navigator.userAgent.match(/lotapkinstalled/i)){
        Dialog.confirm({
          title: '温馨提示',
          cancelButtonText:'关闭',
          confirmButtonText:'安装/升级',
          message: '请务必安装/升级APP以保持最新版本。'
        }).then(() => {
          // on confirm
          document.getElementById('download_btn').click();
        }).catch(() => {
          
          // on cancel
        });
      }
    }

    if(this.$route.query.cid){
      localStorage['cid'] = this.$route.query.cid;
    }else{
      localStorage['cid'] = ''
    }
    if(this.$route.query.pid){
      localStorage['pid'] = this.$route.query.pid;
    }else{
      localStorage['pid'] = ''
    }
    
    if(localStorage['cp_uid'] && localStorage['cp_uid']!=''){
      this.left_text = '我的帐号';
      this.left_path = '/personal/index'
    }
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          
        } else {
          console.log(this.$route.name)
          if(this.$route.name == 'home'){
            
          }
        }
    })
  },
  activated(){  
    this.show_lt = false;
    if(!this.$store.getters.isback || this.isFirstEnter){
      this.lastid = 0;
      this.show_lt = false;
      this.gethome().then(() => {
        this.gethomeapp()
      })
    }
    this.isFirstEnter=false;
    this.$store.dispatch('set_isback',false)
    
    if(localStorage['cp_uid'] && localStorage['cp_uid']!=''){
      this.left_text = '我的帐号';
      this.left_path = '/personal/index'
    }
  },
  beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      
      next();
  }
}
</script>

<style scoped lang="stylus">
/deep/ .van-button--plain.van-button--primary
  color #3996FF
  border: 1px solid #3996FF;
/deep/ .van-icon-volume-o:before
  content: ''
  width .5rem
  height .42rem
  background url('../../assets/icn_message.png') no-repeat
  background-size contain
  margin-right:.18rem
#home_page .van-nav-bar
  background-color #EBEBED
#home_page .van-nav-bar .van-icon
  color: #373737
#home_page .van-nav-bar__right
  bottom: 2px
  font-size 20px
.van-cell:not(:last-child)::after{
  content:"";
  border:none;
}
.van-cell__value{
  flex:unset;
  padding-left:0.1rem;
}
.diy_font.van-cell{
  padding-bottom:0.2rem;
}
.diy_font .van-cell__right-icon{
  font-size:0.3rem;
}
.fangan_item_box{
  background:#fff;
  border-radius:0.2rem;
  box-shadow: 0 0 0.2rem #ddd;
  padding:0.4rem .2rem;
  line-height:1.6;
  margin-bottom:0.4rem;
}
.fangan_item_box>span{
  color:#6C6361;
  font-size:0.3rem;
}
.van-cell__value span{
  font-size:0.3rem;
}
.van-cell{
  background:none;
  padding:0;
  padding-bottom:0.1rem;
}
/deep/ .van-dialog__content .van-cell{
  padding: 10px 15px;
}
.left_border_ori{
  display:inline-block;
  background:#3996FF;
  width:0.08rem;
  height:0.4rem;
  position:relative;
  top:0.08rem;
  margin-right:0.1rem;
}
.max_width_100{
  margin-bottom: .15rem;
  width:1.4rem;
  height: 1.4rem;
}
  .btn_group button{
    margin-top:.1rem;
  }
  .btn_group{
    padding-bottom:.1rem;
  }
  select{
    outline: none;
  }
  .red{
    color:red;
  }
  .no_border{
    border:none;
  }
  .text_box{
    padding:20px 4px;
  }
  .text_center{
    text-align:center;
  }
  .swipe_img_box{
    width:100%;
    padding:0 12px;
    box-sizing: border-box;
  }
  #home_page .van-swipe-item img{
    width:100%;
  }
  .gonggao_box{
    background:#F5F5F5;
    padding:4px;
    margin: 4px 0;
    display:flex;
    align-items:center;
    height:30px;
    padding-left:12px;
  }
  .gonggao_box .grow_1{
    flex-grow:1;
  }

  /deep/ .van-notice-bar
    // border-bottom 1px solid #CFCFCF !important
    margin-top .2rem
  .gonggao_img{
    width:20px;
    height:16px;
    vertical-align: middle;
    margin:0 10px;
  }
  .list_box{
    padding:10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .item_box{
    padding:.2rem 0;
    width:100%;
  }
  .item_box span{
    display: block;
    color: #767676;
    font-size:.38rem
  }
  #home_page .tabs_type .van-tab{
    color:#1D1D1D;
    padding:0;
  }
  #home_page .tabs_type .van-tab>span{
    font-weight:bold;
  }
  #home_page .tabs_type .van-tab--active,#home_page .van-tab--active{
    color:#E55546;
  }
  .fixed_title{
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    top: 0;
  }
</style>
