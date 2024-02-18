<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useShowInput } from '@/store/index';
import { getProjectDetailsApi, globalApi } from '@/request/api';
const showInput = useShowInput();
const route = useRoute();
const router = useRouter();
const id = route.query.id;
const fetchData = ref(null);
const active = ref(0);
const dataList = ref([
    {
        title: '用地性质',
        label: ''
    },
    {
        title: '设计结束时间',
        label: ''
    },
    {
        title: '竣工时间',
        label: ''
    },
    {
        title: '建筑功能（地上、地下）',
        label: ''
    },
    {
        title: '设计使用年限',
        label: ''
    },
    {
        title: '建设用地面积',
        label: ''
    },
    {
        title: '总建筑面积',
        label: ''
    },
    {
        title: '地上面积',
        label: ''
    },
    {
        title: '地下面积',
        label: ''
    }
]);
onMounted(async () => {
    try {
        let res = await getProjectDetailsApi(route.query.id);
        fetchData.value = res.data;
        const contentArray = fetchData.value?.detail?.content.split(',');
        dataList.value.forEach((item, index) => {
            item.label = contentArray[index] || '';
        });
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
const list = [
    {
        title: '项目概括'
    },
    {
        title: '设计特点'
    }
];

const listSwiper = [
    {
        title: '酒店',
        img: 'swiper/swiper1.png',
        label: '陕西千山航空电子有限公'
    },
    {
        title: '办公',
        img: 'swiper/swiper1.png',
        label: '西安艾索信息股份有限公司'
    },
    {
        title: '展厅',
        img: 'swiper/swiper1.png',
        label: '西安航天城中心广场办公室'
    },
    {
        title: '住宅',
        img: 'swiper/swiper1.png',
        label: '江苏铁锚玻璃股份有限公司'
    }
];

const varousel = ref(null);
const next = () => {
    varousel.value?.next();
};
const prev = () => {
    varousel.value?.prev();
};
const changeActive = (index) => {
    active.value = index;
};
const showDetails = (item) => {
    console.log(item);
    router.push({
        path: '/details',
        query: {
            id: item.id
        }
    });
};
watchEffect(async () => {
    try {
        let res = await getProjectDetailsApi(route.query.id);
        fetchData.value = res.data;
        const contentArray = fetchData.value?.detail?.content.split(',');
        dataList.value.forEach((item, index) => {
            item.label = contentArray[index] || '';
        });
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="wrap" :class="showInput.showInput == true ? 'mg' : ''">
        <div class="top-border"> </div>
        <div class="con-main-wrap">
            <div class="swiper-wrap">
                <img @click="prev()" :src="getImageUrl('swiper/right.png')" alt="" />
                <a-carousel autoplay ref="varousel">
                    <div
                        class="card-box"
                        v-for="(item, index) in fetchData?.detail.mp3_url"
                        :key="index"
                    >
                        <img :src="`http://47.92.89.106/` + item.url" alt="" />
                        {{ item }}
                    </div>
                </a-carousel>
                <img @click="next()" :src="getImageUrl('swiper/left.png')" alt="" />
            </div>
            <div class="show-company">
                <h5>{{ fetchData?.detail.name }}</h5>
                <div class="top-border"> </div>
                <div class="data">
                    <div class="left-wrap">
                        <p
                            v-for="(item, index) in list"
                            :key="index"
                            :class="[
                                { active: index === active && !showInput.showInput },
                                { 'active-custom': index === active && showInput.showInput }
                            ]"
                            @click="changeActive(index)"
                        >
                            <span></span>
                            {{ item.title }}
                        </p>
                    </div>
                    <div class="right-wrap">
                        <div
                            class="item-data"
                            v-if="!active"
                            v-for="(item, index) in dataList"
                            :key="index"
                        >
                            <p class="title">{{ item.title }}</p>
                            <p class="label">{{ item.label }}</p>
                        </div>
                        <div class="info" v-else>
                            {{ fetchData?.detail.translate }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="project-wrap">
            <div class="cen">
                <p class="titel">设计项目 </p>
                <div class="img-list">
                    <div class="img-list">
                        <div
                            class="img-item"
                            v-for="item in fetchData?.list"
                            :key="item.id"
                            @click="showDetails(item)"
                        >
                            <img :src="`http://47.92.89.106/` + item.img" alt="" />
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    margin-top: 150px;
    .top-border {
        width: 1127px;
        height: 1px;
        background: rgba(47, 47, 47, 0.6);
        margin: 0 auto;
    }
    .con-main-wrap {
        width: 1127px;
        margin: 0 auto;
        .swiper-wrap {
            @include flex-row;
            gap: 25px;
            align-items: center;
            img {
                width: 35px;
                cursor: pointer;
            }
            :deep(.ant-carousel) {
                width: 980px;
                height: 486px;
                .slick-dots {
                    display: none !important;
                }
                width: 980px;
                margin: 0 auto;
                .card-box {
                    width: 100%;
                    height: 486px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .show-company {
            h5 {
                margin: 50px 0 40px;
                font-size: 18px;
                color: #616161;
                font-weight: 900;
            }
            .data {
                padding: 60px 0 125px;
                @include flex-row;
                .left-wrap {
                    min-width: 132px;
                    height: 158px;
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

                        &.active-custom {
                            color: #9a0000;
                            span {
                                background-color: #9a0000;
                            }
                        }
                    }

                    span {
                        display: block;
                        width: 12px;
                        height: 2px;
                        // background-color: #c8b288;

                        &.span-custom {
                            background-color: #9a0000;
                        }
                    }
                }
            }
            .right-wrap {
                flex: 1;
                padding-left: 77px;
                @include flex-row;
                flex-wrap: wrap;
                gap: 60px 50px;
                .item-data {
                    min-width: 130px;
                    .title {
                        color: #888;
                        margin-bottom: 10px;
                    }
                    .label {
                        color: #605f5f;
                    }
                    &:hover {
                        p {
                            color: #c8b288;
                        }
                    }
                }
                .info {
                    color: #605f5f;
                }
            }
        }
    }
}
.project-wrap {
    background-color: #efefef;
    padding: 60px 90px;
    .cen {
        width: 1127px;
        margin: 0 auto;
        .titel {
            color: #424242;
        }
        .img-list {
            margin-top: 22px;
            @include flex-row;
            gap: 36px;
            .img-item {
                width: 20%;
                cursor: pointer;
                flex: 1;
                img {
                    width: 254px;
                    height: 126px;
                }
                p {
                    margin-top: 10px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
