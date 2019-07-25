<template>
  <div class="fixed_title left_width_box">
      <van-nav-bar
          :title="title_name"
          left-text=""
          :right-text="right_text"
          left-arrow
          class="title_box"
          @click-left="goBack"
          @click-right="onClickRight"
          />
  </div>
      
</template>

<script>
  export default {
    name:'title-bar',
    props: {
      title_name: {
        type: String,
        default: ''
      },
      right_text:{
        type: String,
        default: ''
      },
      right_url:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        
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
      onClickRight(){
        if(this.right_url){
          this.$router.push(this.right_url);
        }
      }
    },
  }
</script>

<style lang='stylus'>
  .title_box{
    background:#EBEBED;
  }
  .title_box .van-ellipsis.van-nav-bar__title{
    font-size:18px;
    color:#373737;
  }
  .title_box.van-nav-bar .van-icon, .title_box .van-nav-bar__text{
    color:#555555;
  }
  .van-nav-bar__arrow{
    font-size: 22px
  }
  .fixed_title{
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    top: 0;
  }
</style>
