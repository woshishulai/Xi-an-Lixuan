<script setup>
import Header from '@/components/Layout/Header.vue';
import Footer from './components/Layout/Footer.vue';
import { useShowInput } from '@/store/index';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
onMounted(() => {
    cx();
    window.addEventListener('resize', function () {
        cx();
    });
    function cx() {
        var Wth = document.documentElement.clientWidth;
        var app = document.querySelector('#app');
        if (Wth < 1000) {
            if (navigator.userAgent.indexOf('Firefox') != -1) {
                //判断当前浏览器是否是火狐浏览器
                // app.style.width = "1450px";
                // document.documentElement.style.transform =
                //   "scale(" + Wth / 1450 + ")";
                // // document.body.style.overflow = "hidden";
                // document.documentElement.style.transformOrigin = "left top 0px";
            } else {
                document.documentElement.style.zoom = (Wth / 1000) * 100 + '%';
            }
        } else {
            app.style.width = '100%';
            // document.documentElement.style.zoom = "100%";
        }
    }
});
const route = useRoute();
const showInput = useShowInput();
const closeShowInput = () => {
    showInput.changeShowInput(false);
};
</script>

<template>
    <Header v-if="route.path != '/investigate'"></Header>
    <div class="app">
        <a-config-provider
            :theme="{
                token: {
                    colorTextPlaceholder: '#fff'
                }
            }"
        >
            <RouterView></RouterView>
        </a-config-provider>
        <div class="mosk" v-if="showInput.showInput == true" @click="closeShowInput"></div>
    </div>
    <Footer v-if="route.path != '/investigate'"></Footer>
</template>

<style scoped lang="scss">
.app {
    position: relative;
    .mosk {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        z-index: 3;
        content: '';
        width: 100vw;
        height: 100%;
        background: rgba(0, 0, 0, 0.63);
    }
}
</style>
