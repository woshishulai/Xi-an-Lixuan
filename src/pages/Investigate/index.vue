<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getZhengJiApi, touPiaoApi, globalApi } from '@/request/api';
import { message } from 'ant-design-vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const fetchData = ref([]);
const userIpAddress = ref('');
const searchValue = ref('');
const topZeroList = ref([
    {
        num: '',
        cate: '已报名'
    },
    {
        num: '',
        cate: '投票人次'
    },
    {
        num: '',
        cate: '訪問量'
    }
]);
onMounted(async () => {
    document.documentElement.style.zoom = 100 + '%';

    try {
        let res = await getZhengJiApi();
        fetchData.value = res.data;
        console.log(res.data);
        topZeroList.value[0].num = res.data.bm;
        topZeroList.value[1].num = res.data.tp;
        topZeroList.value[2].num = res.data.fw;
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
const touPiao = async (item) => {
    console.log(item);
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log(data.ip);
        let query = {
            ip: data.ip,
            id: item.id
        };
        let res = await touPiaoApi(query);
        if (res.code == 0) {
            message.success(res.msg);
            try {
                let res = await getZhengJiApi();
                fetchData.value = res.data;
            } catch (error) {
                console.log(error);
            }
        } else {
            message.error(res.msg);
        }
    } catch (error) {
        console.log(error);
    }
};
const searchList = async () => {
    try {
        let res = await getZhengJiApi(searchValue.value);
        fetchData.value = res.data;
        console.log(res.data);
        topZeroList.value[0].num = res.data.bm;
        topZeroList.value[1].num = res.data.tp;
        topZeroList.value[2].num = res.data.fw;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="wrap">
        <div class="cen-wrap">
            <div class="top-zero-list">
                <div class="item" v-for="(item, index) in topZeroList" :key="index">
                    <p class="num">{{ item.num }}</p>
                    <p class="text">{{ item.cate }}</p>
                </div>
            </div>
            <div class="search-wrap">
                <input type="text" v-model="searchValue" placeholder="搜名字或编号" />
                <button @click="searchList">搜索</button>
            </div>
            <p class="img-info sss">
                <img :src="getImageUrl('investigate/text1.png')" alt="" />
            </p>
            <div class="goods-list">
                <div
                    class="goods-item"
                    :style="{
                        backgroundImage: 'url(' + 'http://47.92.89.106/' + item.file + ')'
                    }"
                    v-for="(item, index) in fetchData.logo"
                    :key="index"
                >
                    <div class="zero"> {{ item.id }} 号 </div>
                    <div class="footer-wrap">
                        <div class="left">
                            <p>{{ item.author }}</p>
                            <p>{{ item.tp_num }} 票</p>
                        </div>
                        <button @click="touPiao(item)">投票</button>
                    </div>
                </div>
            </div>
            <p class="img-info">
                <img :src="getImageUrl('investigate/text2.png')" alt="" />
            </p>
            <div class="tou-piao-list">
                <div class="tou-piao-item" v-for="(item, index) in fetchData.slogan" :key="index">
                    <div class="left">
                        <p v-html="item.content"> </p>
                    </div>
                    <div class="right">
                        <div class="info">
                            <p>{{ item.author }}</p>
                            <p>{{ item.tp_num }} &nbsp; 票</p>
                        </div>
                        <button @click="touPiao(item)">投票</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    width: 1360px;
    min-height: 2500px;
    margin: 0 auto;
    padding: 714px 105px 0;
    background: url('@/assets/img/investigate/bg.jpg');
    background-size: cover;
    @media screen and (max-width: 450px) {
        width: 100%;
        overflow: hidden;
        min-height: auto;
        background-size: 100% 100%;
        padding: 500px 0 100px;
    }
    .cen-wrap {
        padding: 0 125px;
        @media screen and (max-width: 450px) {
            padding: 0;
        }
        .top-zero-list {
            @include flex-row;
            gap: 99px;
            justify-content: space-between;
            padding: 0 30px;
            @media screen and (max-width: 450px) {
                gap: 20px;
                @include flex-col;
                align-items: center;
            }
            .item {
                flex: 1;
                height: 205px;
                width: 205px;
                text-align: center;
                border-radius: 50%;
                background: url('@/assets/img/investigate/zero.png');
                background-size: 100% 100%;
                @media screen and (max-width: 450px) {
                    min-width: 200px;
                    min-height: 200px;
                    padding: 0 0 40px;
                }
                .num {
                    font-size: 42px;
                    font-weight: 500;
                    margin-top: 67px;
                    @media screen and (max-width: 450px) {
                        margin-top: 57px;
                    }
                }
                .text {
                    font-size: 20px;
                    margin-top: 33px;
                    @media screen and (max-width: 450px) {
                        margin-top: 50px;
                    }
                }
            }
        }
        .search-wrap {
            @include flex-row;
            justify-content: center;
            margin-top: 60px;
            padding: 0 30px;
            @media screen and (max-width: 450px) {
                max-width: 80%;
                margin: 40px auto;
            }
            input {
                flex: 1;
                height: 40px;
                border: 4px solid #a38868;
                border-right: none;
                padding: 0 20px 0;
                @media screen and (max-width: 450px) {
                    height: 38px;
                }
                &::placeholder {
                    color: #000;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
            button {
                background-color: #a38868;
                color: #fff;
                border: none;
                height: 46px;
                min-width: 100px;
                letter-spacing: 5px;
                font-size: 20px;
                font-weight: 500;
                cursor: pointer;
            }
        }
    }
    .img-info {
        margin: 60px 0 0;
        text-align: center;
        img {
            width: 400px;
            @media screen and (max-width: 450px) {
                width: 80%;
                margin: 0 auto;
            }
        }
    }
    .goods-list {
        margin: 50px 0 30px;
        @include flex-row;
        flex-wrap: wrap;
        gap: 40px 125px;
        justify-content: space-between;
        @media screen and (max-width: 450px) {
            @include flex-col;
            align-items: center;
        }
        .goods-item {
            position: relative;
            overflow: hidden;
            width: 40%;
            height: 470px;
            border: 4px solid #a38868;
            background-size: 100% 100%;
            @media screen and (max-width: 450px) {
                width: 80%;
                max-width: 375px;
                height: 430px;
                margin: 0 auto;
            }
            .zero {
                @include flex-row;
                align-items: center;
                justify-content: center;
                position: absolute;
                right: 15px;
                top: -30px;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                color: #fff;
                padding-top: 20px;
                background-color: #8f7a60;
            }
            button {
                width: 105px;
                height: 40px;
                margin-top: 5px;
                border-radius: 30px;
                border: none;
                color: #fff;
                font-size: 16px;
                letter-spacing: 5px;
                background-color: #442a0e;
                cursor: pointer;
            }
            .footer-wrap {
                @include flex-row;
                align-items: center;
                justify-content: space-between;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 80px;
                padding: 0 20px 0 30px;
                color: #fff;
                background-color: #8f7a60;
                .left {
                    @include flex-col;
                    gap: 14px;
                    p {
                        font-size: 16px;
                    }
                }
            }
        }
    }
    .tou-piao-list {
        @include flex-col;
        padding: 20px 0;
        margin-top: 60px;
        @media screen and (max-width: 450px) {
            margin: 30px auto 0;
        }
        .tou-piao-item {
            @include flex-row;
            justify-content: space-between;
            align-items: center;
            padding: 25px 0;
            border-bottom: 1px dashed #b0a18f;
            @media screen and (max-width: 450px) {
                width: 80%;
                margin: 0 auto;
            }
            .left {
                font-size: 16px;
                @include flex-col;
                gap: 20px;
                font-size: 16px;
                justify-content: space-between;
                @media screen and (max-width: 450px) {
                    font-size: 12px;
                    width: 60%;
                    overflow: hidden;
                }
            }
            .right {
                @include flex-row;
                gap: 30px;
                @media screen and (max-width: 450px) {
                    gap: 5px;
                }
                .info {
                    @include flex-col;
                    gap: 10px;
                    @media screen and (max-width: 450px) {
                        gap: 5px;
                        font-size: 12px;
                        p {
                            display: -webkit-box;
                            overflow: hidden;
                            -webkit-line-clamp: 1;
                            text-overflow: ellipsis;
                            word-break: break-all;
                            -webkit-box-orient: vertical;
                        }
                    }
                }
                button {
                    width: 105px;
                    height: 40px;
                    margin-top: 5px;
                    border-radius: 30px;
                    border: none;
                    color: #fff;
                    font-size: 16px;
                    letter-spacing: 5px;
                    background-color: #442a0e;
                    cursor: pointer;
                }
            }
        }
    }
    .sss {
        width: 330px;
        margin: 60px auto 0;
        img {
            width: 260px;
        }
    }
}
</style>
