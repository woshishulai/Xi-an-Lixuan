<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useShowInput } from '@/store/index';
import { globalApi, getNavListApi, topBarSearchApi } from '@/request/api';
const fetchData = ref(null);
const showInput = useShowInput();
const showMenu = ref(false);
const router = useRouter();
const route = useRoute();
const heightScorll = ref(0);
const searchValue = ref('');
const menuList = ref([]);
const bg = computed(() => {
    return route.path == '/'
        ? 'rgba(0, 0, 0, 0.41)'
        : route.path == '/dynamic'
        ? '#f5f5f5'
        : 'transparent';
});
onMounted(async () => {
    const windowWidth =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    localStorage.setItem('windowWidth', windowWidth);
    try {
        let res = await globalApi();
        fetchData.value = res.data.base;
    } catch (error) {
        console.log(error);
    }
    try {
        let res = await getNavListApi();
        menuList.value = res.data.list;
    } catch (error) {
        console.log(error);
    }
    window.addEventListener('scroll', windowScroll);
});
const windowScroll = () => {
    let scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    heightScorll.value = scrollTop;
};
onBeforeUnmount(() => {
    window.removeEventListener('scroll', windowScroll);
});
const list = [
    {
        path: '/',
        name: '首页'
    },
    {
        path: '/project',
        beiyong: '/details',
        name: '项目'
    },
    {
        path: '/dynamic-list',
        beiyong: '/dynamic',
        name: '动态'
    },
    {
        path: '/about',
        name: '关于我们',
        children: []
    }
];
const changeShowPage = (item) => {
    localStorage.setItem('id', item.id);
    router.push('/about/' + item.brief);
};
const changeShowMenu = () => {
    showMenu.value = true;
};
const removeShowMenu = () => {
    showMenu.value = false;
};
const searchData = async () => {
    console.log(searchValue.value);
    try {
        let res = await topBarSearchApi(searchValue.value);
        console.log(res.data.list);
        if (res.data.type == 1) {
            router.push({
                path: '/details',
                query: {
                    id: res.data.list.id
                }
            });
        } else if (res.data.type == 2) {
            router.push({
                path: '/project',
                query: {
                    id: res.data.list.id
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};
const url = computed(() => {
    return route.path == '/' ? fetchData.value?.sina_path : fetchData.value?.web_logo_path;
});
</script>

<template>
    <div
        class="header-wrap"
        v-if="!showInput.showInput"
        :class="heightScorll > 180 ? 'fiexd' : ''"
        :style="{ background: bg }"
    >
        <img class="top-img" :src="`http://47.92.89.106/` + url" alt="" @click="router.push('/')" />
        <img
            class="fiexd-img"
            :src="`http://47.92.89.106/` + fetchData?.sina_path"
            alt=""
            @click="router.push('/')"
        />
        <div
            class="list"
            :style="{
                color:
                    route.path == '/'
                        ? '#fff'
                        : route.matched[0]?.path == '/about'
                        ? '#fff'
                        : '#747474'
            }"
        >
            <div
                class="item"
                v-for="item in list"
                :key="item.path"
                :class="{
                    active:
                        route.path === item.path ||
                        item.beiyong === route.path ||
                        route.matched[0]?.path == item?.path
                }"
            >
                <span v-if="!item.children" @click="router.push(item.path)">{{ item.name }}</span>
                <div v-else class="menu-wrap">
                    <div class="title">
                        <span @click="changeShowMenu">{{ item.name }}</span>
                        <i v-if="showMenu" class="iconfont icon-up"></i>
                        <i v-else class="iconfont icon-down"></i>
                    </div>
                    <div class="menu" v-if="showMenu" @mouseleave="removeShowMenu">
                        <div
                            class="menu-item"
                            v-for="i in menuList"
                            :key="i.id"
                            :class="route.path == item.path + '/' + i.brief ? 'active' : ''"
                            @click="changeShowPage(i)"
                        >
                            {{ i.name }}
                        </div>
                    </div>
                </div>
            </div>
            <i class="iconfont icon-search" @click="showInput.changeShowInput(true)"></i>
        </div>
    </div>
    <div class="input-component" v-else>
        <div class="input-wrap">
            <i class="iconfont icon-search"></i>
            <input v-model="searchValue" type="text" @change="searchData" />
            <span @click="searchData">搜索</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    @include flex-row;
    align-items: center;
    justify-content: center;
    gap: 260px;
    padding: 30px 0;
    .fiexd-img {
        display: none;
    }
    @media screen and (max-width: 1260px) {
        justify-content: space-around;
        gap: 0;
        padding: 20px 0;
    }
    img {
        height: 70px;
        cursor: pointer;
    }
    .icon-search {
        font-size: 20px;
    }
    .list {
        @include flex-row;
        gap: 60px;
        font-size: 16px;
        margin-top: 14px;

        .item {
            position: relative;
            cursor: pointer;
            padding-bottom: 8px;
            border-bottom: 1.5px solid transparent;

            &:hover,
            &.active {
                border-bottom: 1.5px solid #c8b288;
            }
            .menu-wrap {
                .title {
                    i {
                        margin-left: 5px;
                    }
                }
                .menu {
                    position: absolute;
                    left: 0;
                    top: 28px;
                    color: #333;
                    width: 100%;
                    padding: 0 10px 10px;
                    text-align: center;
                    font-size: 14px;
                    background-color: #fff;
                    .menu-item {
                        padding: 10px 0;
                        font-size: 14px;
                        border-bottom: 1px solid transparent;
                        &.active,
                        &:hover {
                            color: #c8b288;
                            border-color: #c8b288;
                        }
                    }
                }
            }
        }
    }
    .icon-search {
        cursor: pointer;
    }
}
.fiexd {
    background-color: rgba(0, 0, 0, 0.41) !important;
    .top-img {
        display: none;
    }
    .fiexd-img {
        display: block;
    }
    .list {
        .item span {
            color: #fff;
            &:hover,
            &.active {
                color: #c8b288;
            }
        }
    }
}
.input-component {
    @include flex-row;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    background-color: #fff;
    width: 100%;
    height: 180px;
    .input-wrap {
        @include flex-row;
        align-items: center;
        gap: 6px;
        justify-content: space-between;
        padding: 0 20px;
        width: 580px;
        height: 44px;
        border-bottom: 1px solid #c4c4c4;
        i {
            color: #747474;
        }
        input {
            flex: 1%;
            height: 38px;
            border: none;

            &:focus-visible {
                outline: none;
            }
        }
        span {
            font-size: 13px;
            color: #c4c4c4;
            cursor: pointer;
            &:hover {
                color: #c8b288;
            }
        }
    }
}
</style>
