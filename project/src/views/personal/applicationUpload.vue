<template>
    <div class="container">
        <title-bar title_name="应用上传" />
        <p class="orange">{{uploadtips}}</p>
        <div class="van_box">
            <van-field label="APP名称 : " type="text" clearable v-model="appname" placeholder="请输入APP名称" />
        </div>
        <div class="van_box">
            <van-field
                v-model="value"
                label="应用类型 : "
                @click="isShow"
                type="text"
                readonly
            />
        </div>
        <div class="van_box">
            <span>图标 : </span>
            <van-uploader v-model="fileList" :after-read="afterRead" :max-count="2"/>
        </div>
        <div class="van_box">
            <van-field label="一句话描述 : " type="text" clearable v-model="appdesc" placeholder="请输入一句话描述" />
        </div>
        <div class="van_box">
            <van-field label="下载链接 : " type="text" clearable v-model="downloadurl" placeholder="请输入下载链接" />
        </div>
        <div class="van_box">
            <van-field label="简介 : " type="textarea" clearable v-model="overview" placeholder="请输入简介" />
        </div>
        <van-button style="background:#3996FF;color:#fff" @click="regist">提交审核</van-button>
        <van-popup v-model="show" position="bottom">
            <van-picker
                show-toolbar
                title="标题"
                :columns="columns"
                @cancel="onCancel"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
import { uploadimg, uploadapp } from '@/api'
import md5 from 'js-md5';
export default {
    data() {
        return {
            columns: ['低频彩助手', '高频彩助手', '足彩助手'],
            show: false,
            fileList: [],
            uploadtips: '',
            type: "",
            appname: "",
            appdesc: "",
            iconurl: "",
            downloadurl: "",
            overview: "",
            value: '请选择应用类型'
        }
    },
    methods: {
        //提交审核
        async regist() {
            console.log(this.type,this.appname,this.appdesc,this.iconurl,this.downloadurl,this.overview)
            if(!this.appname || !this.appdesc || !this.iconurl || !this.downloadurl || !this.overview) {
                this.$toast('请填写完整信息!')
                return 
            }
            const { data } = await uploadapp({
                uid: localStorage.getItem('cp_uid'),
                sid: localStorage.getItem('cp_sid'),
                type: this.type,
                appname: this.appname,
                appdesc: this.appdesc,
                iconurl: this.iconurl,
                downloadurl: this.downloadurl,
                overview: this.overview
            })
        },
        //上传图片
        async afterRead(file) {
            // 此时可以自行将文件上传至服务器
            let now = new Date();
            let md5_data = md5('token=' + now.getTime() + '&key=llduht1ffyifGfl182');
            const formData = new FormData()
            formData.append('image', file.file)
            formData.append('token',now.getTime())
            formData.append('data',md5_data)
            formData.append('sid',localStorage.getItem('cp_sid'))
            formData.append('uid',localStorage.getItem('cp_uid'))
            const { data } = await uploadimg(formData)
            this.iconurl = data.url
        },
        isShow() {
            this.show = true
        },
        onConfirm(value, index) {
            this.type = index
            this.value = value
            this.show = false
        },
        onCancel() {
        //  this.$toast('取消');
         this.show = false
        }
    },
    mounted() {
        this.uploadtips = localStorage.getItem('uploadtips')
    }
}
</script>

<style scoped lang="stylus">
button 
    width 90%
    margin .5rem 0
.container
    text-align center
.van-uploader
    width 2.8rem
    height 2.8rem
    margin-left .2rem
    .van-uploader__upload,.van-uploader__preview-image
        width 2.3rem
        height 2.3rem
.demo-uploader {
  background-color: #fff;
  .van-uploader {
    margin-left: 15px;
  }
}
.orange
    color #FF5806
    font-size 14px
    text-align left
    padding .3rem
    box-sizing border-box
.van_box
    width 94%
    margin .1rem auto
    display flex
    align-items center
    span 
        display inline-block
        width 80px
        text-align right
        height 2rem
/deep/ .van-cell__value
    border 1px solid #cccccc
    width: 76%
    padding .2rem
    box-sizing border-box
    margin-left .2rem
    border-radius .1rem
/deep/ .van-field__label
    max-width: 80px;
    text-align right
/deep/ .van-cell
    padding 10px 0
    display flex
    align-items center
</style>
