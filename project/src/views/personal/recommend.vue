<template>
    <div class="container" v-if="info">
        <div class="recommend_title">
            <van-nav-bar
                title="我的推荐页"
                left-arrow
                @click-left="goBack"
            />
        </div>
        <div class="recommend_content">
            <p class="content_weight">邀请码: {{info.invitecode}}</p>
            <img :src="info.barcode" alt="">
            <div class="content_font fonts">
                {{info.invitedesc}}
            </div>
        </div>
    </div>
</template>

<script>
import { gettuijiancode } from '@/api/home'
export default {
    data() {
        return {
            info: null
        }
    },
    methods: {
        // 返回
        goBack(){
            this.$store.dispatch('set_isback',true)
            setTimeout(() => {
                this.$store.dispatch('set_isback',false)
            }, 500);
            this.$router.go(-1)
        },
        async gettuijiancode() {
            const { data } = await gettuijiancode({})
            if(data.errorcode == 0) {
                this.info = data
            }
        }
    },
    created() {
        this.gettuijiancode()
    }
}
</script>

<style lang="stylus" scoped>
.van-nav-bar
    background transparent
    height 41px
    line-height 41px
.van-nav-bar__title
    color #ffffff
.van-hairline--bottom::after
    border-bottom-width: 0px;
.van-nav-bar .van-icon
    color #fff
.van-nav-bar__arrow
    font-size 20px
.content_font
    color #7D7D7D
    padding 0 .1rem
    padding-top .3rem
    text-align left 
    line-height .6rem
    text-align justify
.fonts
    margin-top 1.6rem
    font-size 0.5rem
.recommend_content
    width 90%
    margin -1.8rem auto 0 auto 
    padding .4rem .2rem 1rem
    box-sizing border-box
    background #ffffff
    box-shadow 0 0 0.2rem #ddd
    border-radius .25rem
    min-height 5rem
    text-align center
    .content_weight
        font-size .55rem
        padding .4rem 0
        color #232323
    img 
        width 5rem
        height 5rem
.recommend_title
    width 100%
    height 5.92rem
    background url('../../assets/recommend_page.png') no-repeat
    background-size cover
.container
    padding-top 0!important
</style>

