const _import = require(`./_import_${process.env.NODE_ENV}`)
const layout = _import('layout/index')

/**
 *
 * meta 标签字段
 * @param {*} requiredUserInfo: [boolean]  该页面是否需要用户信息，如果需要store里没有用户信息将会去拉取用户信息
 * @param {*} white: [boolean]             白名单页面，路由拦截器不拦截，直接放行
 * @param {*} cache: [boolean]             是否缓存 配合keep-alive
 */

export default [
    {
        path: '/',
        redirect:'/home/index',
    },
    {
        path: '/home',
        component:layout,
        children: [
            {//首页
                path: 'index',
                name:'home',
                component: _import('home/index'),
                meta:{
                    title:'彩票工具市场',
                    cache: true
                }
            },
            {//公告
                path: 'announcement',
                component: layout,
                children: [
                    {
                        path: 'index',
                        name: 'announcementIndex',
                        component: _import('home/announcement/index'),
                        meta: {
                            title: '公告',
                            cache: true
                        }
                    },
                    {//消息详情页
                        path: 'detail',
                        name: 'announcementDetail',
                        component: _import('home/announcement/detail'),
                        meta: {
                            title: '公告详情',
                            cache: false
                        }
                    }
                ]
            },
        ]
    },
    {
        component: _import('404/index'),
        name: '404',
        path: '/404',
        meta: {
            cache: true 
        }
    },
    
    {//个人中心
        path: '/personal',
        component:layout,
        children: [
            {//用户中心
                path: 'index',
                name: 'personalIndex',
                component: _import('personal/index'),
                meta: {
                    title: '用户中心',
                    cache: true
                }
            },
            {//排行榜
                path: 'listUse',
                name: 'listUse',
                component: _import('personal/listUse'),
                meta: {
                    title: '排行榜',
                    cache: true
                }
            },
            {//收入明细
                path: 'incomeDetails',
                name: 'incomeDetails',
                component: _import('personal/incomeDetails'),
                meta: {
                    title: '收入明细',
                    cache: false
                }
            },
            {//搜索
                path: 'search',
                name: 'search',
                component: _import('personal/search'),
                meta: {
                    title: '搜索',
                    cache: false
                }
            },
            {//我的推荐页
                path: 'recommend',
                name:'recommend',
                component: _import('personal/recommend'),
                meta:{
                    title:'我的推荐页',
                    cache: false
                }
            },
            {//应用上传
                path: 'applicationUpload',
                name: 'applicationUpload',
                component: _import('personal/applicationUpload'),
                meta: {
                    title: '应用上传',
                    cache: false
                }
            },
            {//应用审核列表
                path: 'applicationList',
                name: 'applicationList',
                component: _import('personal/applicationList'),
                meta: {
                    title: '应用上传列表',
                    cache: false
                }
            },
            {//彩票预测大师
                path: 'applicationDetail',
                name: 'applicationDetail',
                component: _import('personal/applicationDetail'),
                meta: {
                    title: '彩票预测大师',
                    cache: false
                }
            },
            {
                path: 'about',
                name:'about',
                component: _import('personal/about'),
                meta:{
                    title:'关于彩票工具市场',
                    cache: false
                }
            }
        ]
    },
    {//登录
        path: '/login',
        component: layout,
        children: [
            {
                path: 'index',
                name: 'loginIndex',
                component: _import('login/index'),
                meta: {
                    title: '登录',
                    cache: false
                }
            },
            {
                path: 'verification',
                name: 'verification',
                component: _import('login/verification'),
                meta: {
                    title: '验证码登录',
                    cache: false
                }
            }
        ]
    },
    {//注册
        path: '/register',
        component: layout,
        children: [
            {
                path: 'index',
                name: 'registerIndex',
                component: _import('register/index'),
                meta: {
                    title: '注册',
                    cache: false
                }
            }
        ]
    },
    {
        path: '*', redirect: '/404'

    },
]
