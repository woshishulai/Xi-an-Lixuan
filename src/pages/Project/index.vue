<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useShowInput } from '@/store/index';
import { getProjectApi, globalApi } from '@/request/api';
import { getImageUrl } from '@/utils';
const showInput = useShowInput();
const fetchData = ref(null);
const active = ref(0);
const router = useRouter();
const route = useRoute();
onMounted(async () => {
    try {
        let res = await getProjectApi();
        fetchData.value = res.data.brand;
        if (route.query.id != '' && route.query.id != undefined) {
            console.log(route.query.id);
            active.value = fetchData.value.findIndex((item) => item.id == route.query.id);
            console.log(fetchData.value, active.value);
        }
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
const showDetails = (item) => {
    console.log(item);
    // router.push('/details');
    router.push({
        path: '/details',
        query: {
            id: item.id
        }
    });
};
const changeActive = (index) => {
    active.value = index;
};
watchEffect(() => {
    if (route.query.id !== '' && route.query.id !== undefined) {
        console.log(route.query.id);
        active.value = fetchData.value.findIndex((item) => item.id == route.query.id);
        console.log(fetchData.value, active.value);
    }
});
</script>

<template>
    <div class="wrap" :class="showInput.showInput == true ? 'mg' : ''">
        <div class="top-border"> </div>
        <div class="con-main-wrap">
            <div class="left-wrap">
                <p
                    v-for="(item, index) in fetchData"
                    :key="index"
                    :class="index == active ? 'active' : ''"
                    @click="changeActive(index)"
                >
                    <span></span>
                    {{ item.brand_name }}
                </p>
            </div>
            <div class="show-project">
                <div
                    class="show-project-item"
                    v-for="(item, index) in fetchData?.[active]?.entry"
                    :key="index"
                    @click="showDetails(item)"
                >
                    <img :src="'http://47.92.89.106/' + item.img" alt="" />
                    <p>西安航天城中心广场办公室{{ item.name }}</p>
                </div>
                <div class="xian"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    margin-top: 150px;
    @media screen and (max-width: 1260px) {
        margin-top: 110px;
    }
    .top-border {
        width: 1108px;
        height: 1px;
        background: rgba(47, 47, 47, 0.6);
        margin: 0 auto;
    }
    .con-main-wrap {
        position: relative;
        @include flex-row;
        align-items: flex-start;
        justify-content: center;
        margin-top: 81px;
        width: 1211px;
        margin: 81px auto 0;
        // padding: 20px 0;
        @media screen and (max-width: 1260px) {
            padding: 0px 20px;
            width: 100%;
        }
        .left-wrap {
            width: 112px;
            height: 330px;
            border-right: 1px solid rgba(66, 66, 66, 0.6);
            @include flex-col;
            gap: 62px;
            p {
                @include flex-row;
                gap: 10px;
                align-items: center;
                cursor: pointer;
                font-size: 16px;
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
        .show-project {
            width: 1100px;
            padding: 0 70px 0;
            margin-bottom: 170px;
            overflow-y: scroll;
            height: 100vh;
            @include flex-row;
            justify-content: flex-start;
            flex-wrap: wrap;
            gap: 80px 69px;
            @media screen and (max-width: 1260px) {
                width: 100%;
            }
            .xian {
                width: 2px;
                height: 100vh;
                position: absolute;
                top: 0;
                right: 2px;
                z-index: -1;
                background-color: rgba(66, 66, 66, 0.3);
                @media screen and (max-width: 1260px) {
                    right: 22px;
                }
            }
            .show-project-item {
                min-width: 25%;
                max-width: 272px;
                flex: 1;
                min-height: 338px;
                background: #fcfcfc;
                overflow: hidden;
                cursor: pointer;
                @media screen and (max-width: 1260px) {
                    min-width: 45%;
                    margin: 0 auto;
                    max-width: 450px;
                }
                &:hover {
                    img {
                        transform: scale(1.1);
                        transition: 1.3s;
                    }
                    p {
                        color: #c8b288;
                    }
                }
                img {
                    width: 100%;
                    height: 280px;
                    @media screen and (max-width: 1260px) {
                        height: auto;
                    }
                }
                p {
                    @include ellipsis;
                    text-align: center;
                    font-weight: 600;
                    color: #424242;
                    margin: 22px 0;
                    padding: 0 45px;
                    font-size: 14px;
                }
            }
        }
    }
}
.show-project::-webkit-scrollbar {
    width: 5px;
    height: 10px;

    cursor: pointer;
}

.show-project::-webkit-scrollbar-thumb {
    width: 5px;
    height: 70px;
    background-color: #c8b288;
    border-radius: 10px;
}
</style>
