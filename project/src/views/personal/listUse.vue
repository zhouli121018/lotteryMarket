<template>
    <div class="container">
        <title-bar title_name="排行榜" />
        <!-- <img class="list_banner" src="../../assets/banner.png" alt=""> -->
        <van-swipe :autoplay="3000" indicator-color="#007BC2">
          <van-swipe-item  v-for="(image, index) in advs" :key="index">
            <div class="swipe_img_box" @click="jumpTo(image.url)">
              <img :src="$https+image.pic" />
            </div>
          </van-swipe-item>
        </van-swipe> 
        <div class="xian"></div>
        <van-tabs v-model="active" color="#3996FF" title-active-color="#3996FF">
          <van-tab v-for="(item,i) in titleList" :key="i" :title="item.rankname">
            <div class="assistant_list" v-for="(dom,index) in lottypeList" :key="index">
              <img :src="$https+dom.img" alt="">
              <div>
                <p>{{dom.appname}}</p>
                <div>
                  <van-rate :size="14" v-model="dom.appstar" /> 安装({{dom.appinsnum}})
                </div>
                <p>{{dom.appdese}}</p>
              </div>
              <van-button size="small" plain type="primary" @click="clickAppurl(dom.appurl)">安装</van-button>
            </div>
          </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { getrankDesc, getrankList } from '@/api'
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
      async getrankDescs() {
        const { data } = await getrankDesc({
          uid: localStorage.getItem('cp_uid'),
          sid: localStorage.getItem('cp_sid'),
        })
        this.titleList = data.ranktype
        this.type = this.titleList[0].ranktype
        this.advs = data.advs
      },
      //列表
      async getrankLists() {
        const { data } = await getrankList({
          uid: localStorage.getItem('cp_uid'),
          sid: localStorage.getItem('cp_sid'),
          ranktype: this.type
        })
        this.lottypeList = data.list
      }
    },
    mounted() {
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
