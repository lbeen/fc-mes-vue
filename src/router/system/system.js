const routes = [ {
    name: 'login',
    title: '登录',
    path: '/login',
    component: () => import('@/views/system/Login.vue')
},{
    path: '/',
    redirect: '/menu/introduce'
}, {
    path: '/menu/introduce',
    name: 'introduce',
    title: '系统简介',
    component: () => import('@/views/Introduce.vue')
}, {
    path: '/menu/dashboard',
    name: 'dashboard',
    title: '首页',
    component: () => import('@/views/Index.vue')
}, {
    path: '/menu/add',
    name: 'add',
    title: '添加商品',
    component: () => import('@/views/AddGood.vue')
}]
export default routes