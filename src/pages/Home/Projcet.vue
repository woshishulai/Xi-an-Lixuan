<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    proList: {
        type: Array,
        default: []
    }
});
// onMounted(() => {
//     let kuan = localStorage.getItem('windowWidth');
//     kuan >= 1030 ? (showSwiperLength.value = 3) : (showSwiperLength.value = 2);
// });
const active = ref(0);
const showSwiperLength = ref(3);
const varousel = ref(null);
const selected = ref(0);
const next = () => {
    const entryLength = props.proList[active.value]?.entry.length || 0;
    if (entryLength <= 3) {
        return;
    }
    varousel.value?.next();
};
const prev = () => {
    const entryLength = props.proList[active.value]?.entry.length || 0;
    if (entryLength <= 3) {
        return;
    }
    varousel.value?.prev();
};
const changeActive = (index) => {
    active.value = index;
    varousel.value?.goTo(index);
    const entryLength = props.proList[active.value]?.entry.length || 0;
    showSwiperLength.value = Math.min(entryLength, 3);
    // if (kuan >= 1030) {
    //     const entryLength = props.proList[active.value]?.entry.length || 0;
    //     showSwiperLength.value = Math.min(entryLength, 3);
    // } else if (kuan < 1030 && kuan > 700) {
    //     showSwiperLength.value = 2;
    // } else {
    //     showSwiperLength.value = 1;
    // }
};
const handleAfterChange = (index) => {
    selected.value = index;
};
const getCardBoxClass = (index) => {
    const entry = props.proList[active.value]?.entry;
    const entryLength = entry ? entry.length : 0;

    if (entryLength === 1) {
        return index === 0 ? 'active' : '';
    }

    if (entryLength === 2) {
        return index === 0 ? 'active' : '';
    }

    if (entryLength >= 3) {
        if (selected.value + 1 == entryLength) {
            return index === 0 ? 'active' : '';
        } else {
            return index === selected.value + 1 ? 'active' : '';
        }
    }
    return '';
};
const showProject = (item) => {
    router.push({
        path: '/details',
        query: {
            id: item.id
        }
    });
};
</script>

<template>
    <div class="project">
        <div class="element-wrap">
            <p class="left-wrap"></p>
            <div class="cen-wrap">
                <h5>项目案例</h5>
                <p>PROJECT CASE</p>
            </div>
            <div class="right-list">
                <span
                    v-for="(item, index) in props?.proList"
                    :key="item.brand_name"
                    :class="active == index ? 'active' : ''"
                    @click="changeActive(index)"
                >
                    {{ item.brand_name }}</span
                >
            </div>
        </div>
        <!-- autoplay -->
        <div class="cons-wrap">
            <img @click="prev()" :src="getImageUrl('swiper/right.png')" alt="" />
            <a-carousel
                :slides-to-show="showSwiperLength"
                :slides-to-scroll="1"
                ref="varousel"
                :after-change="handleAfterChange"
            >
                <div
                    class="card-box"
                    v-for="(item, index) in props?.proList[active]?.entry"
                    :key="index"
                    :class="getCardBoxClass(index)"
                >
                    <div class="data" @click="showProject(item)">
                        <img :src="`http://47.92.89.106/` + item.img" alt="" />
                        <p>{{ item.label }}</p></div
                    >
                    <div class="zhezhao"></div>
                </div>
            </a-carousel>
            <img @click="next()" :src="getImageUrl('swiper/left.png')" alt="" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.project {
    @include flex-col;
    align-items: center;
    padding: 90px 0;
    height: 605px;
    background: linear-gradient(rgba(68, 68, 68, 0.87), rgba(68, 68, 68, 0.87)),
        url('@/assets/img/swiper/swiper1.png');
    background-size: 100% 199%;

    .element-wrap {
        @include flex-row;
        align-items: center;
        justify-content: space-between;
        width: 1127px;
        // @media screen and (max-width: 1260px) {
        //     width: 100%;
        //     padding: 0 20px;
        // }
        .left-wrap {
            width: 224px;
        }
        .cen-wrap {
            text-align: center;
            h5 {
                font-weight: 700;
                font-size: 21px;
                color: #fff;
            }
            p {
                margin-top: 10px;
                color: rgba(159, 159, 159, 0.52);
                font-size: 33px;
                font-weight: 200;
            }
        }
        .right-list {
            @include flex-row;
            gap: 32px;
            span {
                font-size: 14px;
                // color: #dbdbdb;
                color: rgba(159, 159, 159, 0.52);
                padding-bottom: 7px;
                border-bottom: 1px solid transparent;
                cursor: pointer;
                &:hover,
                &.active {
                    color: #fff;
                    border-color: #c8b288;
                }
            }
        }
    }
    .cons-wrap {
        width: 1127px;
        @include flex-row;
        justify-content: space-between;
        gap: 25px;
        align-items: center;
        margin-top: 31px;
        // @media screen and (max-width: 1260px) {
        //     justify-content: center;
        // }
        img {
            width: 35px;
            cursor: pointer;
        }
        :deep(.ant-carousel) {
            width: 980px;
            // margin: 0 auto;
            // @media screen and (max-width: 1260px) {
            //     width: 800px;
            // }
            .card-box {
                min-width: 300px !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                position: relative;
                // @media screen and (max-width: 1260px) {
                //     max-width: 260px !important;
                //     min-width: 260px !important;
                // }
                &.active,
                &:hover {
                    .zhezhao {
                        z-index: -3;
                    }
                }
                .data {
                    width: 290px;
                    padding: 10px;
                    cursor: pointer;
                    background-color: #fff;
                    // @media screen and (max-width: 1260px) {
                    //     width: 260px;
                    //     text-align: center;
                    // }
                    // background: rgba(68, 68, 68, 0.87);
                    img {
                        width: 100%;
                        height: 300px;
                    }
                    p {
                        @include ellipsis;
                        text-align: center;
                        font-weight: 600;
                        margin-top: 10px;
                    }
                }
                .zhezhao {
                    background: rgba(68, 68, 68, 0.87);
                    width: 290px;
                    height: 352px;
                    position: absolute;
                    top: 0;
                    // @media screen and (max-width: 1260px) {
                    //     width: 260px;
                    // }
                }
            }
            .slick-dots {
                display: none !important;
            }
        }
    }
}
</style>
