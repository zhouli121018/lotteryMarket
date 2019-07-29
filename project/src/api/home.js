/* 
  首页模块
*/
import request from '@/utils/request'

//获取公告列表协议 getnotices.php
export function getnotices (data) {
  return request({
    url: '/getnotices.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取公告内容协议 notice.php?noticeid=100
export function notice (data) {
  return request({
    url: '/notice.php',
    method: 'post',
    data:{
      ...data
    }
  })
}

//获取首页内容
export function gethome (data) {
  return request({
    url: '/gethome.php',
    method: 'post',
    data:{
      ...data
    }
  })
}
//获取推荐页数据
export function gettuijiancode (data) {
  return request({
    url: '/gettuijiancode.php',
    method: 'post',
    data:{
      ...data
    }
  })
}



