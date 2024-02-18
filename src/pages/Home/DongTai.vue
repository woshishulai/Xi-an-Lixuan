<script setup>
import { onMounted } from 'vue';
import { getImageUrl } from '@/utils';
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(() => {});
const props = defineProps({
    newsList: {
        type: Array,
        default: []
    }
});
const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
const showNews = (item) => {
    console.log(item);
    router.push({
        path: '/dynamic',
        query: {
            id: item.id
        }
    });
};
</script>

<template>
    <div class="dongtai">
        <div class="top-title">
            <h5>动态</h5>
            <p>DYNAMIC STATE</p>
        </div>
        <div class="cen-wrap">
            <div class="left-wrap" @click="showNews(props?.newsList[0])">
                <img :src="`http://47.92.89.106/` + props?.newsList[0]?.img" alt="" />
                <div class="footer-info">
                    <p>{{ props?.newsList[0]?.title }}</p>
                    <span></span>
                </div>
            </div>
            <div class="right-list">
                <div
                    class="news-item"
                    v-for="(item, index) in props?.newsList"
                    :key="index"
                    @click="showNews(item)"
                >
                    <p>{{ item.title }}</p>
                    <span>{{ formatDate(item.f_time) }}</span>
                </div>
                <div @click="router.push('/dynamic-list')" class="more">更多</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dongtai {
    padding: 125px 0;
    .top-title {
        text-align: center;
        h5 {
            width: 90px;
            text-align-last: justify;
            margin: 0 auto;
            font-weight: 700;
            font-size: 21px;
        }
        p {
            margin-top: 10px;
            color: rgba(159, 159, 159, 0.52);
            font-size: 33px;
            font-weight: 200;
        }
    }
    .cen-wrap {
        @include flex-row;
        justify-content: center;
        gap: 46px;
        width: 1050px;
        margin: 56px auto 0;
        // @media screen and (max-width: 1260px) {
        //     @include flex-col;
        //     align-items: center;
        // }
        .left-wrap {
            img {
                width: 500px;
            }
            .footer-info {
                margin-top: 20px;
                @include flex-row;
                justify-content: space-between;
                align-items: flex-start;
                p {
                    color: #616161;
                    font-size: 14px;
                    font-weight: 200;
                }
                span {
                    display: block;
                    width: 29px;
                    height: 29px;
                    border-radius: 50%;
                    border: 1px solid #c8b288;
                }
            }
        }
        .right-list {
            flex: 1;
            @include flex-col;
            gap: 5px;
            // @media screen and (max-width: 1260px) {
            //     width: 80%;
            // }
            .news-item {
                flex: 1;
                color: #605f5f;
                @include flex-row;
                justify-content: space-between;
                padding: 0 0 15px 0;
                margin-bottom: 20px;
                border-bottom: 1px solid #c4c4c4;
                cursor: pointer;
                &:hover {
                    p,
                    span {
                        color: #c8b288;
                    }
                }
                p {
                    color: #605f5f;
                    width: 335px;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 1;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    -webkit-box-orient: vertical;
                }
                span {
                    width: 103px;
                    color: #605f5f;
                    text-align-last: justify;
                }
            }
            .more {
                color: #c8b288;
                @include flex-row;
                justify-content: flex-end;
                margin-top: 4px;
                cursor: pointer;
            }
        }
    }
}
</style>
