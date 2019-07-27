import request from '@/utils/request'

//1、用户注册协议 regist.php?f=1027&c=oppo
export function regist(data) {
    return request({
        url: '/regist.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//找回密码

export function findpassbyemail(data) {
    return request({
        url: '/findpassbyemail.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//2、手机号登录密码协议 loginbypass.php
export function loginbypass(data) {
    return request({
        url: '/loginbypass.php',
        method: 'post',
        data: {
            ...data
        }
    })
}

//3、验证码登录协议 loginbyvcode.php
export function loginbyvcode(data) {
    return request({
        url: '/loginbyvcode.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
//获取用户中心数据
export function getaccount(data) {
    return request({
        url: '/getaccount.php',
        method: 'post',
        data
    })
}

//31、获取关于接口 getabout.php
export function getabout(data) {
    return request({
        url: '/getabout.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 获取应用审核列表 
export function getapprolist(data) {
    return request({
        url: '/getapprolist.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 获取首页应用列表
export function gethomeapp(data) {
    return request({
        url: '/gethomeapp.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 获取排行榜描述
export function getrankDesc(data) {
    return request({
        url: '/getrank_desc.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 获取排行榜列表
export function getrankList(data) {
    return request({
        url: '/getrank_list.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 统计点击安装协议 clickinstall.php 点击安装的时候发送请求，不管是否成功，同时跳转到外部打开安装连接
export function clickinstall(data) {
    return request({
        url: '/clickinstall.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 获取搜索内容
export function getsearchlist(data) {
    return request({
        url: '/getsearchlist.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 佣金提款submittikuan.php 
export function submittikuan(data) {
    return request({
        url: '/submittikuan.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 获取收入明细列表 
export function getincomelist(data) {
    return request({
        url: '/getincomelist.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 上传图片 
export function uploadimg(data) {
    return request({
        url: '/uploadimg.php',
        method: 'post',
        data
    })
}
// 上传应用内容 
export function uploadapp(data) {
    return request({
        url: '/uploadapp.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 应用好评协议 
export function comments(data) {
    return request({
        url: '/comment.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 应用投诉协议 
export function complaint(data) {
    return request({
        url: '/complaint.php',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 获取应用详情协议 
export function getappdesc(data) {
    return request({
        url: '/getappdesc.php',
        method: 'post',
        data: {
            ...data
        }
    })
}