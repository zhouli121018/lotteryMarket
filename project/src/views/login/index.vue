<template>
    <div class="container">
        <title-bar title_name="密码登录"/>
        <div class="van_box">
            <van-field label="帐号" maxlength="20" type="text" clearable v-model="account" placeholder="请输入帐号" />
        </div>
        <div class="van_box">
            <van-field label="密码" maxlength="20" type="text" class="van_field" clearable v-model="code" placeholder="请输入密码" />
            <!-- <CutDown @click="codeVerify" :disabled="disabled" :moble="mobile"></CutDown> -->
        </div>
        <router-link tag="div" to="/login/verification" class="van_box_right">忘记密码</router-link>
        <van-button  style="background:#3996FF;color:#fff"  @click="loginbypass">登录</van-button>
        <router-link tag="div" to="/register/index" class="van_box_right">注册</router-link>
    </div>
</template>

<script>
import { loginbypass } from '@/api/index'
export default {
    data() {
        return {
            account: '',
            code: ''
        }
    },
    methods: {
        async loginbypass () {
            if(!this.account || !this.code) {
                this.$toast('请填写帐号或密码!')
                return 
            }
            const { data }    = await loginbypass({
                account: this.account,
                pass: this.code
            });
            if(data.errorcode == 0) {
                window.localStorage['cp_uid'] = data.uid
                window.localStorage['cp_sid'] = data.sid
                let url = '/home/index';
                if(sessionStorage.getItem('last_login_url')){
                    url = sessionStorage.getItem('last_login_url');
                    sessionStorage.removeItem('last_login_url');
                }
                this.$router.replace(url)
            }
            
        },
    },
}
</script>

<style scoped lang="stylus">
/deep/ .van-field .van-cell__title
    max-width 1.6rem
    text-align left
button 
    width 90%
    margin-top .5rem
.van_box
    border 1px solid #cccccc
    width 94%
    margin .3rem auto
    display flex
    align-items center
.container
    text-align center
.van_box_right
    text-align right
    float right
    padding .3rem
    box-sizing border-box
    color #14ADFF
    padding-right .8rem
</style>
