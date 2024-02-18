<script setup>
import { getImageUrl } from '@/utils';
import { useShowInput } from '@/store/index';
import { ref, onMounted, watchEffect } from 'vue';
import { getNewsList, getNewsDetails, globalApi } from '@/request/api';
import { useRoute } from 'vue-router';
import { shareToWeibo, shareToQQ } from '@/utils/share';
const modal1Visible = ref(false);
const route = useRoute();
const showInput = useShowInput();
const fetchData = ref(null);
const details = ref(null);
const query = ref('');
onMounted(async () => {
    query.value = route.query.id;
    if (query.value) {
        try {
            let res = await getNewsDetails(query.value);
            details.value = res.data;
            fetchData.value = res.data.recommend;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            let res = await getNewsList();
            fetchData.value = res.data;
            try {
                query.value = fetchData.value[0].id;
                let res = await getNewsDetails(query.value);
                details.value = res.data;
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
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
    console.log(item);
    query.value = item.id;
};
watchEffect(async () => {
    if (query.value) {
        let res = await getNewsDetails(query.value);
        details.value = res.data;
        fetchData.value = res.data.recommend;
    }
});
const showQRCode = () => {
    modal1Visible.value = true;
};
</script>

<template>
    <div class="wrap" :class="showInput.showInput == true ? 'mg' : ''">
        <div class="top-border"></div>
        <div class="cen-wrap">
            <h5>{{ details?.list.title }}</h5>
            <div class="info">
                <span>文章来源 : {{ details?.list.source }} </span>
                <span>{{ details?.list.up_time }}</span>
                <p class="fenxiang"
                    >分享
                    <i @click="shareToWeibo" class="iconfont icon-weibo"></i>
                    <i @click="showQRCode" class="iconfont icon-weixin"></i>
                    <i @click="shareToQQ" class="iconfont icon-QQ"></i>
                </p>
            </div>
            <div class="data-element">
                <div class="left-text">
                    <div v-html="details?.list.content"></div>
                </div>
                <div class="right-news-item">
                    <div class="title-wrap">
                        相关推荐
                        <span></span>
                    </div>
                    <div class="right-news-list">
                        <div
                            class="item"
                            v-for="(item, index) in fetchData?.slice(0, 6)"
                            :key="item.id"
                            :class="item.id == query ? 'active' : ''"
                            @click="changeQuery(item)"
                        >
                            <span></span>
                            <p>
                                {{ item?.title }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a-modal
        v-model:open="modal1Visible"
        title="扫描二维码即可分享至朋友圈"
        style="top: 30%"
        :footer="null"
        @ok="setModal1Visible(false)"
    >
        <a-qrcode value="http://legion-design.com.cn/" />
    </a-modal>
</template>

<style scoped lang="scss">
:deep(p) {
    color: #747474;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 20px;
}
.wrap {
    margin-top: 150px;
    padding-bottom: 70px;
    background-color: #f5f5f5;

    .top-border {
        width: 1091px;
        height: 1px;
        background: rgba(47, 47, 47, 0.6);
        margin: 0 auto;
    }
    .cen-wrap {
        width: 1092px;
        margin: 0 auto;
        padding: 92px 0 0;
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
                margin-bottom: 0;
                i {
                    cursor: pointer;
                    &:hover {
                        color: #c8b288;
                    }
                }
            }
        }
        .data-element {
            margin-top: 70px;
            @include flex-row;
            gap: 54px;
            // align-items: flex-start;
            .left-text {
                padding: 50px 55px 60px;
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
                        gap: 10px;
                        &:hover,
                        &.active {
                            p {
                                color: #c8b288;
                            }
                            span {
                                background-color: #c8b288;
                            }
                        }
                        span {
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
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
</style>
