<template>
    <div class="container">
        <title-bar title_name="应用上传列表" />
        <p class="one">总共提交应用 : 193个</p>
        <p>审核通过 : 193个</p>
        <p>审核不通过 : 193个</p>
        <div style="margin-top:.4rem">
            <van-row class="income_content">
                <van-col span="8">应用名称</van-col>
                <van-col span="8">提交日期</van-col>
                <van-col span="8">审核状态</van-col>
            </van-row>
            <van-row class="income_content income_contents">
                <van-col span="8">彩票分析大师</van-col>
                <van-col span="8">2019-07-26</van-col>
                <van-col span="8">审核通过</van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {

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
