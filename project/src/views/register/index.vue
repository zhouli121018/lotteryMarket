<template>
    <div class="container">
        <title-bar title_name="新用户注册" />
        <div class="van_box">
            <van-field label="帐号" maxlength="20" type="text" clearable v-model="account" placeholder="请输入您的帐号" />
        </div>
        <div class="van_box">
            <van-field label="密码" type="number" maxlength="20" clearable v-model="password" placeholder="请输入您的密码" />
        </div>
        <div class="van_box">
            <van-field label="邮箱" type="text" class="van_field" clearable v-model="email" placeholder="找回密码用" />
        </div>
        <div class="van_box">
            <van-field label="邀请码" type="number" :disabled="has_pid" class="van_field_code" clearable v-model="pid" :placeholder="regpiddes" />
        </div>
        <van-button style="background:#3996FF;color:#fff" @click="regist">注册</van-button>
    </div>
</template>

<script>
import { validatePhone } from '@/utils/validate'
import CutDown from '@/components/CutDown'
import { regist } from '@/api'
import { gethome } from '@/api/home'
import { Toast } from 'vant';
export default {
    components: {
        CutDown
    },
    data() {
        return {
            account: '',
            pid: '', //邀请码
            password: '',
            vcode: '', //验证码
            device: 0  ,//手机类型,
            email: '',//邮箱
            has_pid:false,
            regpiddes:''
        }
    },
    methods: {
        async gethome() {
            let obj = {};
            if(localStorage.getItem('cp_sid')){
                obj.sid = localStorage.getItem('cp_sid')
            }
            if(localStorage.getItem('cp_uid')){
                obj.uid = localStorage.getItem('cp_uid')
            }
            const { data } = await gethome(obj)
            this.$store.dispatch('set_homedata',data)
            this.$store.dispatch('set_apkurl',data.apkurl)
            this.regpiddes = data.regpiddes
        },
        async regist() {
            if(!this.account){
                Toast('请输入帐号！');
                return;
            }
            if(!this.password){
                Toast('请输入密码！');
                return;
            }
            if(!this.email && /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)){
                Toast('请输入正确的邮箱！');
                return;
            }
            let obj = {
                account: this.account,
                pass: this.password,
                email: this.email,
                device: this.device,
                pid: this.pid
            };
            if(localStorage.getItem('cid')){ //渠道号
                obj.cid = localStorage.getItem('cid')
            }
            const { data } = await regist(obj)
            if(data.errorcode == 0) {
                window.localStorage['cp_uid'] = data.uid
                window.localStorage['cp_sid'] = data.sid
                this.$router.replace('/home/index')
            }
        }
    },
    created(){
        this.pid = localStorage.getItem('pid');
        if(localStorage.getItem('pid')){
            this.has_pid = true;
        }
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            this.device = 0
        }
        if (isIOS) {
            this.device = 1
        }
        if(this.$store.getters.homeData == null){
            this.gethome()
        }else{
            this.regpiddes = this.$store.getters.homeData.regpiddes
        }
    }
}
</script>

<style scoped lang="stylus">
/deep/ .van-field .van-cell__title
    max-width 1.6rem
    text-align left
.van_field
    width 76%
.van_field
    width 76%
.van_field_code
    /deep/ .van-field__control::-webkit-input-placeholder {
        color: #3996FF
    }
button 
    width 90%
    margin-top 1rem
.van_box
    border 1px solid #cccccc
    width 94%
    margin .3rem auto
    display flex
    align-items center
.container
    text-align center
</style>
