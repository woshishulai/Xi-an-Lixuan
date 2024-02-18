//哈希路由
import { createRouter, createWebHistory } from 'vue-router';
//在这里没有备初始化 userinfo是异步的
// const user = useUserInfo()
const routes = [
    {
        path: '/',
        meta: {
            name: '首页'
        },
        component: () => import('@/pages/Home/index.vue')
    },
    {
        path: '/project',
        meta: {
            name: '项目'
        },
        component: () => import('@/pages/Project/index.vue')
    },
    {
        path: '/details',
        meta: {
            name: '项目详情'
        },
        component: () => import('@/pages/Project/Details.vue')
    },
    {
        path: '/dynamic',
        meta: {
            name: '动态'
        },
        component: () => import('@/pages/Dynamic/index.vue')
    },
    {
        path: '/dynamic-list',
        meta: {
            name: '动态列表'
        },
        component: () => import('@/pages/Dynamic/List.vue')
    },
    {
        path: '/investigate',
        meta: {
            name: '调查'
        },
        component: () => import('@/pages/Investigate/index.vue')
    },
    {
        path: '/about',
        meta: {
            name: '关于我们'
        },
        component: () => import('@/pages/About/index.vue'),
        children: [
            {
                path: '',
                meta: {
                    name: '公司介绍'
                },
                component: () => import('@/pages/About/Profile.vue')
            },
            {
                path: 'organization',
                meta: {
                    name: '组织架构'
                },
                component: () => import('@/pages/About/Organization.vue')
            },
            {
                path: 'corporate',
                meta: {
                    name: '企业荣誉'
                },
                component: () => import('@/pages/About/Corporate.vue')
            },
            {
                path: 'unit',
                meta: {
                    name: '合作单位'
                },
                component: () => import('@/pages/About/Unit.vue')
            },
            {
                path: 'recruitment',
                meta: {
                    name: '人才招聘'
                },
                component: () => import('@/pages/About/Recruitment.vue')
            },
            {
                path: 'contact',
                meta: {
                    name: '联系我们'
                },
                component: () => import('@/pages/About/ContactUs.vue')
            }
        ]
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
    // 路由滚动行为定制
    scrollBehavior() {
        return {
            top: 0
        };
    }
});
export default router;
