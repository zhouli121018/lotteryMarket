<template>
    <div class="container" v-if="info">
        <title-bar :title_name="info.name" />
        <div class="assistant_list">
            <img :src="info.icon" alt="">
            <div>
            <p>{{info.name}}</p>
            <div>
                <van-rate allow-half style="margin-right: .2rem" :size="14" readonly  v-model="info.score" />
            </div>
            <p>{{score}}分   {{info.appinsnum}}次下载</p>
            </div>
            <van-button size="small" plain type="primary" @click="clickAppurl(info.url,info.appid)">下载</van-button>
            <van-button size="small" plain type="danger" @click="commentss">好评</van-button>
        </div>
        <img class="application_img" :src="$https+info.barcode" alt="">
        <!-- <p>{{info.appdesc}}</p> -->
        <p class="last_p" v-html="info.overview"></p>
        <div class="fixed_btn">
            <van-button style="background:#3996FF;color:#fff" size="large" @click="complaints">违规投诉</van-button>
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
            info: null,
            score: 0,
            isFirstEnter:false
        }
    },
    methods: {
        //点击好评
        commentss() {
            if(!localStorage.getItem('cp_sid') || !localStorage.getItem('cp_uid')) {
                sessionStorage.setItem('last_login_url',this.$route.fullPath)
                this.$router.push('/login/index')
                return
            }
            this.isShow=true
        },
        //应用投诉
        async complaints() {
            if(!localStorage.getItem('cp_sid') || !localStorage.getItem('cp_uid')) {
                sessionStorage.setItem('last_login_url',this.$route.fullPath)
                this.$router.push('/login/index')
                return 
            }
            const { data } = await complaint({
                appid: this.$route.query.appid
            })
            this.$toast(data.message)
        },
        //点击安装
        async clickAppurl(url,appid) {
            const { data } = await clickinstall({
                appid
            })
            window.location.href = url
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
                appid: this.$route.query.appid
            })
            this.info = data
            if(this.info.icon.indexOf('http')!=0){
                this.info.icon = this.$https+this.info.icon;
            }
            this.score = this.info.score
            this.info.score = parseFloat(this.info.score)
        },
        //平星数
        async comment(){
            const { data } = await comments({
                star: this.star,
                appid: this.$route.query.appid
            })
            this.$toast(data.message)
        }
    },
    created(){
      this.isFirstEnter = true;
    },
    activated(){  
      if(!this.$store.getters.isback || this.isFirstEnter){
        this.getappdesc()
      }
      this.isFirstEnter=false;
      this.$store.dispatch('set_isback',false)
    },
}
</script>

<style lang="stylus" scoped> 
.assistant_list >div >div{
    padding:0;
}
.assistant_list img{
    width:1.8rem;
    max-height:1.8rem;
}

.dialog_content_input
    text-align center
.dialog_content_input .van-rate
    padding 1rem 0
.last_p
    width 100%
    padding .2rem .4rem
    box-sizing border-box
    padding-bottom 2.8rem    
    text-align: justify
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
