<template>
    <div class="container">
        <title-bar title_name="搜索" />
        <van-search
            v-model="value"
            placeholder="请输入应用名称进行搜索"
            show-action
            shape="round"
            @search="onSearch"
            background="#fff"
            clearable
            >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <div class="hot_search">
            <span>热搜应用: </span>
            <span>计划</span>
            <span>分析大师</span>
            <span>快艇</span>
            <span>时时彩</span>
        </div>
        <div class="assistant_list">
            <img src="../../assets/chart.png" alt="">
            <div>
            <p>彩票预测大师</p>
            <div>
                <van-rate :size="14" v-model="values" /> 安装(1111)
            </div>
            <p>杀号胆码助手</p>
            </div>
            <van-button size="small" plain type="primary">安装</van-button>
        </div>
        <div class="assistant_list">
            <img src="../../assets/chart.png" alt="">
            <div>
            <p>彩票预测大师</p>
            <div>
                <van-rate :size="14" v-model="values" /> 安装(1111)
            </div>
            <p>杀号胆码助手</p>
            </div>
            <van-button size="small" plain type="primary">安装</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            values: 5
        }
    },
    methods: {
        onSearch() {

        }
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
