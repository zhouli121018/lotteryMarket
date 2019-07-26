<template>
    <div class="container">
        <title-bar title_name="找回密码"/>
        <div class="van_box">
            <van-field label="邮箱" maxlength="11" type="number" clearable v-model="mobile" placeholder="请输入邮箱" />
        </div>
        <van-button style="background:#3996FF;color:#fff" @click="loginbyvcode">确定</van-button>
    </div>
</template>

<script>
import { validatePhone } from '@/utils/validate'
import CutDown from '@/components/CutDown'
import { getvcode, loginbyvcode } from '@/api/index'
export default {
    components: {
        CutDown
    },
    data() {
        return {
            mobile: '',
            code: ''
        }
    },
    methods: {
        async getvcode() {
            const { data } = await getvcode({
                noLoading: false,
                phone: this.mobile
            })
            if(data.errorcode == 0){
                this.$refs.codeEl.isStart = true;
                this.$refs.codeEl.start();
            }
            this.$toast(data.message)
        },
        async loginbyvcode () {
            let obj = {
                phone: this.mobile,
                vcode: this.code
            };
            if(localStorage.getItem('cid')){ //渠道号
                obj.cid = localStorage.getItem('cid')
            }
            if(localStorage.getItem('pid')){ //推荐码
                obj.pid = localStorage.getItem('pid')
            }
            const { data }    = await loginbyvcode(obj)
            if(data.errorcode == 0) {
                window.localStorage['uid'] = data.uid
                window.localStorage['sid'] = data.sid
                this.$router.replace('/home/index')
            }
        },
    },
    computed: {
        disabled() {
            return !validatePhone(this.mobile)
        },
        submitValidate() {
            if(!this.mobile || !this.code) {
                return {
                    ok: false,
                    msg: '请填写完整信息'
                }
            }
            if(!validatePhone(this.mobile)) {
                return {
                    ok: false,
                    msg: '请输入正确手机号'
                }
            }
            return {
                ok: true,msg: 'ok'
            }
        }
    },
}
</script>

<style scoped lang="stylus">
/deep/ .van-field .van-cell__title
    max-width 1.6rem
    text-align left
.van_field
    width 76%
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
