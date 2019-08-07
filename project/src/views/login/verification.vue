<template>
    <div class="container">
        <title-bar title_name="找回密码"/>
        <div class="van_box">
            <van-field label="邮箱" maxlength="20" type="text" clearable v-model="email" placeholder="请输入邮箱" />
        </div>
        <van-button style="background:#3996FF;color:#fff" @click="loginbyvcode">确定</van-button>
    </div>
</template>

<script>
import { findpassbyemail } from '@/api/index'
export default {
    data() {
        return {
            email: ''
        }
    },
    methods: {
        async loginbyvcode () {
            if(this.email != "" && !this.email && /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)){
                this.$toast('请输入正确的邮箱！');
                return false
            }else {
                const { data } = await findpassbyemail({'email':this.email})
                // this.$toast(data.message)
                if(data.errorcode == 0) {
                    setTimeout(() => {
                        this.$router.replace('/home/index')
                    },2000)
                }
            }
        },
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
