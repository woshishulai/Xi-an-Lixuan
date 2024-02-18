<script setup>
import { ref, onMounted } from 'vue';
import Swiper from './Swiper.vue';
import Projcet from './Projcet.vue';
import DongTai from './DongTai.vue';
import Contact from './Contact.vue';
import { globalApi, homeApi } from '@/request/api';
const fetchData = ref(null);
const homeData = ref(null);
onMounted(async () => {
    try {
        let res = await globalApi();
        fetchData.value = res.data.base;
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
    try {
        let res = await homeApi();
        homeData.value = res.data;
        console.log(homeData.value);
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="wrap">
        <Swiper :bannerList="fetchData?.pc_banner"></Swiper>
        <Projcet :proList="homeData?.brand"></Projcet>
        <DongTai :newsList="homeData?.news"></DongTai>
        <Contact></Contact>
    </div>
</template>

<style scoped lang="scss"></style>
