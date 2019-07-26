<template>
    <div class="container">
        <title-bar title_name="收入明细" />
        <div class="income_details">
            <div>
                <div>
                    <i class="blue"></i>
                    <div>
                        <p>总收入</p>
                        <p>237元</p>
                    </div>
                </div>
                <div>
                    <i class="orange"></i>
                    <div>
                        <p>提款</p>
                        <p>237元</p>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <i class="red"></i>
                    <div>
                        <p>未提款</p>
                        <p>237元</p>
                    </div>
                </div>
                <div>
                    <i class="green"></i>
                    <div>
                        <p>今日收入</p>
                        <p>237元</p>
                    </div>
                </div>
            </div>
            <van-button type="primary" size="small" @click="show=true">提款</van-button>
        </div>
        <div>
            <van-row class="income_content">
                <van-col span="8">收入类型</van-col>
                <van-col span="8">应用名称</van-col>
                <van-col span="8">收入金额</van-col>
            </van-row>
            <van-row class="income_content income_contents">
                <van-col span="8">应用审核通过</van-col>
                <van-col span="8">彩票预测大师</van-col>
                <van-col span="8">5元</van-col>
            </van-row>
        </div>
        <van-dialog 
            v-model="show"
            title="提款"
            show-cancel-button
            class="dialog_content_input"
            :before-close="beforeClose_tk"
            >
            <van-field
                v-model.trim="alipay"
                clearable
                label="支付宝："
            />
        </van-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            alipay: ''
        }
    },
    methods: {
        beforeClose_tk(action,done){
            if(action == 'confirm'){
                if(!this.alipay){
                    this.$toast('请输入支付宝账号！')
                    done(false)
                    return;
                }
                this.alipay = ''
            }
            done();
        },
    }
}
</script>

<style scoped lang="stylus">
.income_details
    width 100%
    padding .4rem
    box-sizing border-box 
    display flex
    justify-content space-between
    align-items center
    i 
        width 8px
        height 8px
        border-radius 50%
        display inline-block
        margin-top .25rem
        margin-right .5rem
        &.blue
            background #50A4FE
        &.orange
            background #FF9D37
        &.red
            background #FE786D
        &.green
            background #3DCC7A
    >div
        >div
            width 100%
            display flex
            padding .2rem 0
            box-sizing border-box
            p 
                padding .2rem 0
                &:first-child
                    color #999
                &:last-child
                    font-size 16px
/deep/ .van-button--primary
  color #fff
  background-color #3996FF
  border none
</style>
