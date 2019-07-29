<template>
    <div class="container">
        <title-bar title_name="我的账号" />
        <div class="myAccount_title" v-if="info">
            <div>
                <div>
                    <p>账号: {{info.uname}}</p>
                    <p>金额: {{info.income_cur}}元</p>
                </div>
                <van-button type="primary" style="" size="small" @click="show=true">提款</van-button>
            </div>
            <p>{{info.tips}}</p>
        </div>
        <div class="xian"></div>
        <div>
            <van-cell title="应用审核列表" is-link icon="yysh" @click="jumpTo('/personal/applicationList')"/>
            <van-cell title="上传应用" is-link icon="scyy"  @click="jumpTo('/personal/applicationUpload')"/>
            <van-cell title="收入明细" is-link icon="srmx"  @click="jumpTo('/personal/incomeDetails')"/>
            <van-cell title="推荐有奖" is-link icon="tjyj"  @click="jumpTo('/personal/recommend')"/>
            <van-cell title="关于" is-link icon="gy"  @click="jumpTo('/personal/about')"/>
        </div>

        <div class="text_center">
            <van-button style="background:#3996FF;color:#fff" size="large" @click="logout">退出</van-button>
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
import { getaccount, submittikuan } from '@/api'
import { Dialog } from 'vant'
export default {
    data() {
        return {
            info: null,
            isFirstEnter:false,
            show:false,
            alipay:'',
            isShow: false,
            ticketnum: '',
            vipticket: ''
        }
    },
    methods:{
        logout(){
            Dialog.confirm({
                className:'small_padding',
                message: '退出当前帐号？'
            }).then(() => {
                // on confirm
                localStorage.clear();
                this.$router.push('/home/index')
            }).catch(() => {
                // on cancel
            });
            
        },
        beforeClose_tk(action,done){
            if(action == 'confirm'){
                if(!this.alipay){
                    this.$toast('请输入支付宝账号！')
                    done(false)
                    return;
                }
                this.submittikuan()
                this.alipay = ''
            }
            done();
        },
        //提款
        async submittikuan() {
            const { data } = await submittikuan({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                alipay:this.alipay
            })
            this.info.income_cur = data.yongjin
        },
        jumpTo(path){
            this.$router.push(path);
        },
        async getaccount() {
            const { data } = await getaccount({
                sid: localStorage.getItem('cp_sid'),
                uid: localStorage.getItem('cp_uid')
            })
            this.info = data
        },
        goAbout(){
            this.$router.push('/personal/about');
        },
    },
    created() {
        this.isFirstEnter=true;
    },
    beforeRouteEnter(to, from, next) {
      if (from.name == 'openingMember' || from.name == 'recommend' || from.name == 'earnMoney' || from.name == 'openRemind' || from.name == 'freeUse' || from.name == 'about') { // 这个name是下一级页面的路由name
        to.meta.isBack = true; 
      }
      next()
    },
    activated(){
        if(this.$route.meta.isBack){
            this.$store.dispatch('set_isback',true)
        }
        this.$route.meta.isBack=false;
        this.getaccount();
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
}
</script>

<style scoped lang="stylus">
/deep/ .van-button--primary
  color #fff
  background-color #3996FF
  border none
.myAccount_title
    width 94%
    margin 0 auto 
    padding .2rem 
    box-sizing border-box
    >div
        width 100%
        display flex
        justify-content space-between
        align-items center
        p 
            padding .18rem 0
    >p 
        color #666
        font-size 12px
        margin-top .2rem
        line-height .5rem
.text_center
    width 90%
    box-sizing border-box
    text-align center
    margin-top .3rem
    margin .5rem auto 0 auto
.container
    background #fff
.my_centers
    width 60%!important
    p 
        line-height .6rem
        &:last-child
            color #666
            font-size .35rem
/deep/ .van-cell
    padding 12px 15px
    line-height .8rem
/deep/ .van-icon-yysh::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/yysh.png') no-repeat
    background-size contain
/deep/ .van-icon-scyy::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/scyy.png') no-repeat
    background-size contain
/deep/ .van-icon-srmx::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/srmx.png') no-repeat
    background-size contain
/deep/ .van-icon-tjyj::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/tjyj.png') no-repeat
    background-size contain
/deep/ .van-icon-gy::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/gy.png') no-repeat
    background-size contain
/deep/ .van-cell:not(:last-child)::after
    border-bottom 1px solid #CECECE;
</style>
