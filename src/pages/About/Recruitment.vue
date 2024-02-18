<script setup>
import { ref, onMounted } from 'vue';
import { getDetailsApi } from '@/request/api';
const fetchData = ref([]);
onMounted(async () => {
    let id = localStorage.getItem('id');
    try {
        let res = await getDetailsApi(id);
        console.log(res);
        fetchData.value = res.data.list;
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="recruitment">
        <h1>JOIN US</h1>
        <div class="item" v-for="(item, index) in fetchData" :key="index">
            <p class="yanse"></p>
            <div v-html="item.content"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(p) {
    line-height: 35px;
    color: #747474;
    font-size: 14px;
}
.yanse {
    width: 50px;
    height: 3px;
    margin-bottom: 10px;
    background-color: #c8b288;
}
.recruitment {
    padding-left: 65px;
    border-left: 1px solid rgba(66, 66, 66, 0.3);
    margin-bottom: 150px;
    h1 {
        text-align: center;
        font-size: 70px;
        font-weight: 700;
    }
    .item {
        margin-bottom: 60px;
        .yanse {
            width: 50px;
            height: 3px;
            background-color: #c8b288;
        }

        .title {
            margin: 20px 0 10px;
            font-size: 16px;
            color: #747474;
            font-weight: 500;
        }
        .yaoqiu {
            margin-top: 10px;
            font-weight: 700;
        }
    }
}
</style>
