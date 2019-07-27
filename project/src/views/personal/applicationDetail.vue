<template>
    <div class="container">
        <title-bar title_name="预测彩票大师" />
        <div class="assistant_list">
            <img src="../../assets/chart.png" alt="">
            <div>
            <p>彩票预测大师</p>
            <div>
                <van-rate :size="14" readonly  v-model="value" />
            </div>
            <p>杀号胆码助手</p>
            </div>
            <van-button size="small" plain type="primary">下载</van-button>
            <van-button size="small" plain type="danger" @click="isShow=true">好评</van-button>
        </div>
        <img class="application_img" src="../../assets/banner.png" alt="">
        <p>全国公认研发的彩票预测交流平台</p>
        <p class="last_p">预测大师就能打开手机的数据库的开始放款时间预测大师就能打开手机的数据库的开始放款时间的开始发生的机会预测大师就能打开手机的数据库的开始放款时间的开始发生的机会
            预测大师就能打开手机的数据库的开始放款时间的开始发生的机会
            预测大师就能打开手机的数据库的开始放款时间的开始发生的机会预测大师就能打开手机的数据库的开始放款时间的开始发生的机会
            预测大师就能打开手机的数据库的开始放款时间的开始发生的机会
            预测大师就能打开手机的数据库的开始放款时间的开始发生的机会预测大师就能打开手机的数据库的开始放款时间的开始发生的机会
            预测大师就能打开手机的数据库的开始放款时间的开始发生的机会
            预测大师就能打开手机的数据库的开始放款时间的开始发生的机会的开始发生的机会</p>
        <div class="fixed_btn">
            <van-button style="background:#3996FF;color:#fff" size="large" @click="complaints">违法投诉</van-button>
        </div>
        <van-dialog 
            v-model="isShow"
            title="评价"
            show-cancel-button
            class="dialog_content_input"
            :before-close="beforeClose"
            >
            <van-rate :size="20" v-model="star" />
        </van-dialog>
    </div>
</template>

<script>
import { comments } from '@/api'
export default {
    data() {
        return {
            value: 4,
            isShow: false,
            star: 0
        }
    },
    methods: {
        complaints() {

        },
        beforeClose(action,done){
            if(action == 'confirm'){
                if(!this.alipay){
                    this.$toast('请评分！')
                    done(false)
                    return;
                }
                this.comment()
            }
            done();
        },
        async comment(){
            const { data } = await comments({
                uid: localStorage.getItem('cp_uid'),
                sid: localStorage.getItem('cp_sid'),
                star: this.star,
                appid: this.appid
            })
            this.$toast(data.message)
        }
    }
}
</script>

<style lang="stylus" scoped> 
.dialog_content_input
    text-align center
.dialog_content_input .van-rate
    padding 1rem 0
.last_p
    padding-bottom 2.8rem
.fixed_btn
    width 100%
    position fixed
    bottom 0
    left 0
    background  #ffffff
    height 2rem
    display flex
    justify-content center
    align-items center
    box-shadow 5px 5px 5px #e8e8e8 
    border-top 1px solid #eee
p
    font-size 14px
    color #666
    line-height .6rem
    width 96%
    margin 0 auto
    letter-spacing .04rem
.assistant_list
    border-bottom none
.assistant_list .van-button--plain.van-button--danger
    color: #FEB800;
    border: 1px solid #FEB800;
    background #ffffff
    margin-left .2rem
img.application_img
    width 5rem
    height 5rem
    margin-top .3rem
    margin-left 50%
    transform translateX(-50%)
    margin-bottom .8rem
</style>
