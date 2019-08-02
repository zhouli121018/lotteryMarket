<template>
    <div class="container">
        <title-bar title_name="排行榜" />
        <!-- <img class="list_banner" src="../../assets/banner.png" alt=""> -->
        <van-swipe :autoplay="3000" indicator-color="#007BC2">
          <van-swipe-item  v-for="(image, index) in advs" :key="index">
            <div class="swipe_img_box" @click="jumpTo(image.url)">
              <img :src="$https+image.pic" style="border-radius:.2rem;"/>
            </div>
          </van-swipe-item>
        </van-swipe> 
        <div class="xian"></div>
        <van-tabs v-model="active" @click="tabList" color="#3996FF" title-active-color="#3996FF">
          <van-tab v-for="(item,i) in titleList" :key="i" :title="item.rankname">
            <div class="assistant_list" v-for="(dom,index) in lottypeList" :key="index">
              <img :src="dom.img" alt="">
              <div @click="toappdetail(dom.appid,dom.appname)">
                <p>{{dom.appname}}</p>
                <div>
                  <van-rate style="margin-right: .2rem" :size="14" v-model="dom.appstar" /> 安装({{dom.appinsnum}})
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
            active: 0,
            titleList: ["总榜","低彩频助手","高彩频助手","足彩助手"],
            advs: [],
            type: '',
            lottypeList: []
        }
    },
    methods: {
      toappdetail(appid,appname) {
        if(!localStorage.getItem('cp_sid') || !localStorage.getItem('cp_uid')) {
          this.$toast('请先登录!')
          setTimeout(() => {
            this.$router.push('/login/index')
          },1200)
          return
        }
        this.$router.push(`/personal/applicationDetail?appid=${appid}&appname=${appname}`)
    },
      //点击安装
      async clickAppurl(url,appid) {
        const { data } = await clickinstall({
          appid
        })
        window.location.href = url
      },
      jumpTo(url) {
        window.location.href = url
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
        const { data } = await getrankList({
          ranktype: this.titleList[this.active].ranktype
        })
        this.lottypeList = data.list.map(item => {
          return {
            ...item,
            appstar: Math.round(item.appstar)
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
      this.getrankDescs().then(() => {
        this.getrankLists()
      })
    }
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
