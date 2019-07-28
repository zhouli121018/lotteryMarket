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
        <div class="assistant_list" v-for="(dom,index) in lottypeList" :key="index" v-if="lottypeList.length > 0">
            <img :src="$https+dom.img" alt="">
            <router-link tag="div" :to="{name: 'applicationDetail',query: {appid: dom.appid}}">
                <p>{{dom.appname}}</p>
                <div>
                    <van-rate :size="14" readonly v-model="dom.appstar" /> 安装({{dom.appinsnum}})
                </div>
                <p>{{dom.appdesc}}</p>
            </router-link>
            <van-button size="small" plain type="primary" @click="clickAppurl(dom.appurl,dom.appid)">安装</van-button>
        </div>
        <div v-else class="no_data">暂无数据</div>
    </div>
</template>

<script>
import { clickinstall, getsearchlist } from '@/api'
export default {
    data() {
        return {
            lottypeList: [],
            keyword: '',
            hotlist: []
        }
    },
    methods: {
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
                sid: localStorage.getItem('cp_sid'),
                uid: localStorage.getItem('cp_uid'),
                appid
            })
            setTimeout(() => {
                window.location.href = url
            },800)
        },
        async getsearchlist() {
            const { data } = await getsearchlist({
                uid: localStorage.getItem('cp_uid'),
                sid: localStorage.getItem('cp_sid'),
                keyword: this.keyword
            })
            this.lottypeList = data.list.map(item => {
                return {
                    ...item,
                    appstar: Math.round(item.appstar)
                }
            })
            this.hotlist = data.hotlist
        }
    },
    mounted() {
        this.getsearchlist()
    }
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
