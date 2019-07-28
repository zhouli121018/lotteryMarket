<template>
    <div class="container" v-if="info">
        <title-bar title_name="预测彩票大师" />
        <div class="assistant_list">
            <img :src="info.url" alt="">
            <div>
            <p>{{info.name}}</p>
            <div>
                <van-rate :size="14" readonly  v-model="info.score" />
            </div>
            <p>{{info.appdesc}}</p>
            </div>
            <van-button size="small" plain type="primary" @click="clickAppurl(info.appurl,info.appid)">下载</van-button>
            <van-button size="small" plain type="danger" @click="isShow=true">好评</van-button>
        </div>
        <img class="application_img" :src="$https+info.barcode" alt="">
        <!-- <p>{{info.appdesc}}</p> -->
        <p class="last_p" v-html="info.overview"></p>
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
import { comments, getappdesc, complaint, clickinstall } from '@/api'
export default {
    data() {
        return {
            value: 4,
            isShow: false,
            star: 0,
            info: null
        }
    },
    methods: {
        //应用投诉
        async complaints() {
            const { data } = await complaint({
                appid: this.$route.query.appid,
                uid: localStorage.getItem('cp_uid'),
                sid: localStorage.getItem('cp_sid')
            })
            this.$toast(data.message)
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
        beforeClose(action,done){
            if(action == 'confirm'){
                if(!this.star){
                    this.$toast('请评分！')
                    done(false)
                    return;
                }
                this.comment()
            }
            done();
        },
        //获取详情
        async getappdesc() {
            const { data } = await getappdesc({
                appid: this.$route.query.appid,
                uid: localStorage.getItem('cp_uid'),
                sid: localStorage.getItem('cp_sid')
            })
            this.info = data
            this.info.score = Math.round(this.info.score)
        },
        //平星数
        async comment(){
            const { data } = await comments({
                uid: localStorage.getItem('cp_uid'),
                sid: localStorage.getItem('cp_sid'),
                star: this.star,
                appid: this.$route.query.appid
            })
            this.$toast(data.message)
        }
    },
    mounted() {
        this.getappdesc()
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
