<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getNavListApi, globalApi } from '@/request/api';
const menuList = ref([]);
const router = useRouter();
const route = useRoute();
onMounted(async () => {
    try {
        let res = await getNavListApi();
        menuList.value = res.data.list;
    } catch (error) {
        console.log(error);
    }
    try {
        let res = await globalApi();
        const pageInfo = res.data.base;
        document.title = pageInfo.web_beian;
        const descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.setAttribute('content', pageInfo.explain);
        } else {
            const newDescriptionTag = document.createElement('meta');
            newDescriptionTag.setAttribute('name', 'description');
            newDescriptionTag.setAttribute('content', pageInfo.explain);
            document.head.appendChild(newDescriptionTag);
        }
        const keywordsTag = document.querySelector('meta[name="keywords"]');
        if (keywordsTag) {
            keywordsTag.setAttribute('content', pageInfo.web_copyright);
        } else {
            const newKeywordsTag = document.createElement('meta');
            newKeywordsTag.setAttribute('name', 'keywords');
            newKeywordsTag.setAttribute('content', pageInfo.web_copyright);
            document.head.appendChild(newKeywordsTag);
        }
    } catch (error) {
        console.log(error);
    }
});
const changeShowPage = (item) => {
    localStorage.setItem('id', item.id);
    router.push('/about/' + item.brief);
};
</script>

<template>
    <div class="banner"></div>
    <div class="cen-wrap">
        <div class="left-menu">
            <p
                v-for="(item, index) in menuList"
                :key="index"
                :class="route.path == '/about/' + item.brief ? 'active' : ''"
                @click="changeShowPage(item)"
            >
                <span></span>
                {{ item?.name || '关于我们' }}
            </p>
        </div>
        <div class="right-details">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped lang="scss">
.banner {
    height: 452px;
    width: 100%;
    background: url('@/assets/img/about/banner.png'),
        linear-gradient(
            180deg,
            rgba(6, 37, 74, 0.75) 0%,
            rgba(2, 12, 23, 0.23) 34.4%,
            rgba(1, 4, 7, 0.07) 60.9%,
            rgba(0, 0, 0, 0) 100%
        );
    background-size: 100% 100%;
    background-blend-mode: multiply;
}
.cen-wrap {
    @include flex-row;
    align-items: flex-start;
    padding: 70px 0 0;
    width: 1050px;
    margin: 0 auto;
    .left-menu {
        padding-right: 27px;
        min-width: 135px;
        p {
            @include flex-row;
            gap: 10px;
            align-items: center;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 60px;
            &.active,
            &:hover {
                color: #c8b288;
                span {
                    background-color: #c8b288;
                }
            }
            span {
                display: block;
                width: 12px;
                height: 2px;
            }
        }
    }
    .right-details {
        flex: 1;
    }
}
</style>
