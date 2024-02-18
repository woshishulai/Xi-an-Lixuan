<script setup>
import { onMounted } from 'vue';
import { getImageUrl } from '@/utils';
onMounted(() => {});
const props = defineProps({
    bannerList: {
        type: Array,
        default: []
    }
});

const handleScrollDown = () => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
        top: windowHeight,
        behavior: 'smooth'
    });
};
</script>

<template>
    <div class="swiper">
        <a-carousel autoplay>
            <img
                class="swiper-img"
                v-for="item in props.bannerList"
                :key="item.id"
                :src="`http://47.92.89.106/` + item.url"
                alt="img"
            />
        </a-carousel>
        <i @click="handleScrollDown" class="iconfont icon-down"></i>
    </div>
</template>

<style scoped lang="scss">
.swiper {
    position: relative;
    height: 100vh;
    // min-height: 500px;
    img {
        height: 100vh;
    }
    .icon-down {
        position: absolute;
        bottom: 70px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
        color: #fff;
        font-size: 45px;
    }
}
</style>
