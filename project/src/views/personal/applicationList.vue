<template>
    <div class="container" v-if="info">
        <title-bar title_name="应用上传列表" />
        <p class="one">总共提交应用 : {{info.uploanum}}个</p>
        <p>审核通过 : {{info.passnum}}个</p>
        <p>审核不通过 : {{info.nopassnum}}个</p>
        <div style="margin-top:.4rem">
            <van-row class="income_content">
                <van-col span="8">应用名称</van-col>
                <van-col span="8">提交日期</van-col>
                <van-col span="8">审核状态</van-col>
            </van-row>
            <van-row class="income_content income_contents" v-for="(item,index) in info.list" :key="index">
                <van-col span="8">{{item.appname}}</van-col>
                <van-col span="8">{{item.date}}</van-col>
                <van-col span="8">{{item.status}}</van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import { getapprolist } from '@/api'
export default {
    data() {
        return {
            info: null
        }
    },
    methods: {
        async getapprolist() {
            const { data } = await getapprolist({})
            this.info = data
        }
    },
    mounted() {
        this.getapprolist()
    }
}
</script>

<style scoped lang="stylus">
p 
    font-size 14px
    padding .3rem .1rem
    width 90%
    margin 0 auto
p.one
    margin-top .3rem
</style>
