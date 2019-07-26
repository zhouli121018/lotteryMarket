<template>
    <div class="container">
        <title-bar title_name="排行榜" />
        <img class="list_banner" src="../../assets/banner.png" alt="">
        <div class="xian"></div>
        <van-tabs v-model="active" color="#3996FF" title-active-color="#3996FF">
          <van-tab v-for="(item,i) in titleList" :key="i" :title="item">
            <div class="assistant_list">
              <img src="../../assets/chart.png" alt="">
              <div>
                <p>彩票预测大师</p>
                <div>
                  <van-rate :size="14" v-model="value" /> 安装(1111)
                </div>
                <p>杀号胆码助手</p>
              </div>
              <van-button size="small" plain type="primary">安装</van-button>
            </div>
            <div class="assistant_list">
              <img src="../../assets/chart.png" alt="">
              <div>
                <p>彩票预测大师</p>
                <div>
                  <van-rate :size="14" v-model="value" /> 安装(1111)
                </div>
                <p>杀号胆码助手</p>
              </div>
              <van-button size="small" plain type="primary">安装</van-button>
            </div>
          </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            titleList: ["总榜","低彩频助手","高彩频助手","足彩助手"],
            value: 4
        }
    }
}
</script>

<style lang="stylus" scoped>
.list_banner
    width 96%
    height 5rem
    margin .4rem .2rem
</style>
