<script setup>
import { getImageUrl } from '@/utils';
import { useShowInput } from '@/store/index';
import { ref, onMounted, watchEffect } from 'vue';
import { getNewsList, globalApi } from '@/request/api';
import { useRoute } from 'vue-router';
import router from '@/router';
const route = useRoute();
const showInput = useShowInput();
const fetchData = ref(null);
onMounted(async () => {
    try {
        let res = await getNewsList();
        fetchData.value = res.data;
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
const changeQuery = (item) => {
    router.push({
        path: '/dynamic',
        query: {
            id: item.id
        }
    });
};
const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
</script>

<template>
    <div class="wrap" :class="showInput.showInput == true ? 'mg' : ''">
        <div class="top-border"></div>
        <p style="text-align: center">
            <img
                style="width: 1090px; height: 300px"
                :src="getImageUrl('about/contact.png')"
                alt=""
        /></p>
        <div class="cen-wrap">
            <div class="data-element">
                <div class="right-news-item">
                    <div class="right-news-list">
                        <div
                            class="item"
                            v-for="(item, index) in fetchData?.slice(0, 6)"
                            :key="item.id"
                            @click="changeQuery(item)"
                        >
                            <span class="biao"></span>
                            <p>
                                {{ item?.title }}
                                <span class="time"> {{ formatDate(item.f_time) }}</span>
                            </p>
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
    padding-bottom: 70px;
    background-color: #f5f5f5;
    min-height: 900px;

    .top-border {
        width: 1091px;
        height: 1px;
        background: rgba(47, 47, 47, 0.6);
        margin: 0 auto;
    }
    .cen-wrap {
        width: 1092px;
        margin: 0 auto;
        padding: 22px 0 0;
        h5 {
            color: #605f5f;
            font-size: 22px;
            font-weight: 700;
        }
        .info {
            @include flex-row;
            gap: 100px;
            align-items: center;
            margin-top: 23px;
            color: #8a8a8a;
            font-size: 14px;
            .fenxiang {
                @include flex-row;
                gap: 20px;
                align-items: center;
                i {
                    cursor: pointer;
                    &:hover {
                        color: #c8b288;
                    }
                }
            }
        }
        .data-element {
            margin-top: 30px;
            @include flex-row;
            gap: 54px;

            .left-text {
                padding: 50px 105px 60px;
                width: 754px;
                background-color: #fff;
                p {
                    color: #747474;
                    font-size: 14px;
                    line-height: 26px;
                    margin-bottom: 20px;
                }
                .img-item {
                    margin-bottom: 10px;
                    text-align: center;
                    img {
                        width: 270px;
                    }
                }
            }
            .right-news-item {
                min-width: 284px;
                background-color: #fff;
                flex: 1;
                padding: 21px 32px;
                .title-wrap {
                    @include flex-row;
                    align-items: center;
                    font-size: 16px;
                    color: #c8b288;
                    gap: 3px;
                    margin-bottom: 30px;
                    span {
                        flex: 1;
                        height: 1px;
                        background-color: #c8b288;
                    }
                }
                .right-news-list {
                    @include flex-col;
                    gap: 30px;

                    .item {
                        @include flex-row;
                        align-items: flex-start;
                        position: relative;
                        gap: 10px;
                        &:hover,
                        &.active {
                            p {
                                color: #c8b288;
                            }
                            .biao {
                                background-color: #c8b288;
                            }
                        }
                        .biao {
                            display: block;
                            width: 5px;
                            height: 5px;
                            margin-top: 12px;
                            border-radius: 50%;
                            background-color: #333;
                        }
                        p {
                            flex: 1;
                            font-size: 14px;
                            line-height: 28px;
                            color: #747474;
                            @include flex-row;
                            justify-content: space-between;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
</style>
