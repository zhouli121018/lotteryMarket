<template>
    <div class="container">
        <title-bar title_name="搜索" />
        <van-search
            v-model="keyword"
            placeholder="请输入应用名称进行搜索"
            show-action
            shape="round"
            background="#fff"
            clearable
            >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <div class="hot_search">
            <span>热搜应用: </span>
            <span @click="onSearchs(item)" v-for="(item,index) in hotlist" :key="index">{{item}}</span>
        </div>
        <div class="assistant_list" v-for="(dom,index) in lottypeList" :key="index" >
            <img :src="dom.img" alt="">
            <div @click="toappdetail(dom.appid,dom.appname)">
                <p>{{dom.appname}}</p>
                <div>
                    <van-rate allow-half style="margin-right: .2rem" :size="14" readonly v-model="dom.appstar" /> 安装({{dom.appinsnum}})
                </div>
                <p>{{dom.appdesc}}</p>
            </div>
            <van-button size="small" plain type="primary" @click="clickAppurl(dom.appurl,dom.appid)">安装</van-button>
        </div>
        <div v-if="lottypeList.length == 0" class="no_data">暂无数据</div>
    </div>
</template>

<script>
import { clickinstall, getsearchlist } from '@/api'
export default {
    data() {
        return {
            lottypeList: [],
            keyword: '',
            hotlist: [],
            isFirstEnter:false,
        }
    },
    methods: {
        toappdetail(appid,appname) {
            this.$router.push(`/personal/applicationDetail?appid=${appid}&appname=${appname}`)
        },
        onSearch() {
            this.getsearchlist()
        },
        onSearchs(word) {
            this.keyword = word
            this.getsearchlist()
        },
        //点击安装
        async clickAppurl(url,appid) {
            const { data } = await clickinstall({
                appid
            })
            window.location.href = url
        },
        async getsearchlist() {
            const { data } = await getsearchlist({
                keyword: this.keyword
            })
            this.lottypeList = data.list.map(item => {
                return {
                    ...item,
                    appstar: parseFloat(item.appstar)
                }
            })
            this.hotlist = data.hotlist
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
        this.keyword = '';
        this.getsearchlist()
      }
      this.isFirstEnter=false;
      this.$store.dispatch('set_isback',false)
    },
}
</script>

<style lang="stylus" scoped>
.hot_search
    width 100%
    padding .4rem .2rem
    box-sizing border-box 
    display flex
    align-items center
    flex-wrap wrap
    border-bottom 1px solid #d8d8d8
    span 
        padding .2rem .15rem 
/deep/ .van-search
    background #f6f6f6!important
/deep/ .van-search .van-cell
    background #fff
    padding .2rem
    box-sizing border-box
/deep/ .van-search__action
    color #3996FF
.container
    padding-top:46px!important
</style>
