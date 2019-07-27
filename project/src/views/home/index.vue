<template>
  <div >
    <div class="container" id="home_page">
      <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <div class="fixed_title">
          <van-nav-bar
            title="彩票工具市场"
            @click-right="onClickRight"
          >
            <van-icon name="search" slot="right"/>
          </van-nav-bar>
        </div>
        <van-swipe :autoplay="3000" indicator-color="#007BC2">
          <van-swipe-item  v-for="(image, index) in advs" :key="index">
            <div class="swipe_img_box" @click="jumpTo(image.url)">
              <img :src="$https+image.pic" />
            </div>
          </van-swipe-item>
        </van-swipe>
        <a :href="banner_url" v-show="false" id="banner_a">1</a>
        <van-notice-bar
          color="#6A6A6A"
          :text="regpiddes"
          left-icon="volume-o"
        />
        <van-row :gutter="30" class="list_box text_center">
          <van-col span="6" style="width:23%;padding-left:0;padding-right:0" v-for="(l,index) in list" :key="index">
            <div class="item_box"  @click="jumpTo(l.link,l.islink)">
              <img :src="l.src" alt="" class="max_width_100">
              <span>{{l.title}}</span>
            </div>
          </van-col>
        </van-row>
        <div class="xian"></div>
        <van-tabs v-model="active" @click="tabList" color="#3996FF" title-active-color="#3996FF">
          <van-tab v-for="(item,i) in titleList" :key="i" :title="item.name">
            <div class="assistant_list" v-for="(dom,index) in lottypeList" :key="index">
              <img :src="$https+dom.img" alt="">
              <div>
                <p>{{dom.appname}}</p>
                <div>
                  <van-rate :size="14" v-model="dom.appstar" /> 安装({{dom.appinsnum}})
                </div>
                <p>{{dom.appdese}}</p>
              </div>
              <van-button size="small" plain type="primary" @click="clickAppurl(dom.appurl,dom.appid)">安装</van-button>
            </div>
          </van-tab>
        </van-tabs>
      <!-- </van-pull-refresh> -->

    </div>

    <div class="container" v-if="is_ios" style="background:#F5F5F5;padding-top:0.4rem !important;position:absolute;top:0;z-index:1001;padding-bottom:2rem;">
        <!-- <title-bar title_name="添加到主屏幕" /> -->
        <div style="background:#EFEFEF;padding:0.2rem 0.15rem;margin:0 0.3rem 0.2rem;">
            <div style="text-align:center;font-size:0.5rem;color:#DB3030;font-weight:bold;padding:0.2rem 0;">温馨提示</div>
            <div style="line-height:1.6;padding-left:0.2rem;font-size:0.4rem;">
              请务必添加本页面到主屏幕，以便下次访问，点击“已添加”不再提醒
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
        {src:require('../../assets/list.png'),title:'排行榜',link:'/personal/listUse',islink: localStorage.getItem('cp_uid')?false:true},
        {src:require('../../assets/upload.png'),title:'上传应用',link:'/personal/applicationUpload',islink: false},
        {src:require('../../assets/myAccount.png'),title:'我的账号',link:'/personal/index',islink: localStorage.getItem('cp_uid')?false:true},
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
      regpiddes: ''
    }
  },
  methods: {
    //点击安装
    async clickAppurl(url,appid) {
      const { data } = await clickinstall({
        sid: localStorage.getItem('cp_sid'),
        uid: localStorage.getItem('cp_uid'),
        appid
      })
      setTimeout(() => {
        window.location.href = url
      },800)
    },
    //点击选项
    tabList() {
      this.type = this.titleList[this.active].type
      this.gethomeapp()
    },
    //应用列表
    async gethomeapp() {
      const { data } = await gethomeapp({
        sid: localStorage.getItem('cp_sid'),
        uid: localStorage.getItem('cp_uid'),
        type: this.type,
        lastid: this.lastid
      })
      this.lottypeList = data.list
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
      console.log(path)
      this.$router.push(path)
      if(path.indexOf('/')==0){
        if(path == '/home/aPlan' && localStorage.getItem('_lottype')){
          this.$router.push({
            path:path,
            query:{
              lottype:localStorage.getItem('_lottype')
            }
          })
          return;
        }
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
      if(localStorage.getItem('cp_sid')){
        obj.sid = localStorage.getItem('cp_sid')
      }
      if(localStorage.getItem('cp_uid')){
        obj.uid = localStorage.getItem('cp_uid')
      }
      const { data } = await gethome(obj)
      this.isLoading = false;
      this.advs = data.advs 
      this.titleList = data.lottype
      this.type = this.titleList[0].type
      this.regpiddes = data.regpiddes
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
      this.left_text = '我的账号';
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
    this.lastid = 0;
    this.show_lt = false;
    this.gethome().then(() => {
      this.gethomeapp()
    })
    this.isFirstEnter=false;
    this.$store.dispatch('set_isback',false)
    
    if(localStorage['cp_uid'] && localStorage['cp_uid']!=''){
      this.left_text = '我的账号';
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
  .grow_1 .van-notice-bar{
    padding:0;
    background:none !important;
  }
  /deep/ .van-notice-bar
    border-bottom 1px solid #CFCFCF !important
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
