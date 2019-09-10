<template>
    <div class="container">
        <a :href="banner_url" target="_blank" v-show="false" id="banner_listuse">1</a>
        <title-bar title_name="排行榜" />
        <!-- <img class="list_banner" src="../../assets/banner.png" alt=""> -->
        <van-swipe :autoplay="3000" indicator-color="#007BC2">
          <van-swipe-item  v-for="(image, index) in advs" :key="index">
            <div class="swipe_img_box" @click="jumpTo(image.url)">
              <img :src="$https+image.pic" style="border-radius:.2rem;"/>
            </div>
          </van-swipe-item>
        </van-swipe> 
        <div style="height:.2rem;"></div>
        <van-notice-bar style="height:.4rem;overflow:hidden;"
          background="#F5F5F5"
          color="#f5f5f5"
        >
        <div style="width:1000px"></div>
        </van-notice-bar>
        <!-- <div class="xian"></div> -->
        <van-tabs v-model="active" @click="tabList" color="#3996FF" title-active-color="#3996FF">
          <van-tab v-for="(item,i) in titleList" :key="i" :title="item.rankname">
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
    </div>
</template>

<script>
import { getrankDesc, getrankList,clickinstall } from '@/api'
export default {
    data() {
        return {
            isFirstEnter: false,
            active: 0,
            titleList: ["总榜","低彩频助手","高彩频助手","足彩助手"],
            advs: [],
            type: '',
            lottypeList: [],
            banner_url:''
        }
    },
    methods: {
      toappdetail(appid,appname) {
        this.$router.push(`/personal/applicationDetail?appid=${appid}&appname=${appname}`)
      },
      //点击安装
      clickAppurl(url,appid) {
        this.clickAppurl_data(appid)
        // window.location.href = url
        this.banner_url = url;
        this.$nextTick(()=>{
            document.getElementById('banner_listuse').click();
        })
      },
      async clickAppurl_data(appid){
        const { data } = await clickinstall({
          appid
        })
      },
      jumpTo(path) {
        // window.location.href = url
        if(path.indexOf('/')==0){
          this.$router.push(path)
        }else{
          this.banner_url = path;
          this.$nextTick(()=>{
              document.getElementById('banner_listuse').click();
          })
        }
      },
      tabList() {
        this.type = this.titleList[this.active].ranktype
        this.lottypeList = []
        this.getrankLists()
      },
      async getrankDescs() {
        const { data } = await getrankDesc({})
        this.titleList = data.ranktype
        this.type = this.titleList[0].ranktype
        this.advs = data.advs
      },
      //列表
      async getrankLists() {
        let device = 0;
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid)device = 0
        if (isIOS)device = 1
        const { data } = await getrankList({
          ranktype: this.titleList[this.active].ranktype,
          device: device
        })
        this.lottypeList = data.list.map(item => {
          return {
            ...item,
            appstar: parseFloat(item.appstar)
          }
        })
        this.lottypeList.forEach(val=>{
          if(val.img.indexOf('http')!=0){
            val.img = this.$https+val.img;
          }
        })
      }
    },
    created(){
      this.isFirstEnter = true;
    },
    activated(){  
      if(!this.$store.getters.isback || this.isFirstEnter){
        this.active = 0;
        this.getrankDescs().then(() => {
          this.getrankLists()
        })
      }
      this.isFirstEnter=false;
      this.$store.dispatch('set_isback',false)
    },
}
</script>

<style lang="stylus" scoped>
  .swipe_img_box{
    width:100%;
    padding:0 12px;
    box-sizing: border-box;
  }
  .van-swipe-item img{
    width:100%;
  }
.list_banner
    width 96%
    height 5rem
    margin .4rem .2rem
</style>
