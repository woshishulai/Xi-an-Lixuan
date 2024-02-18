<script setup>
import { getImageUrl } from '@/utils';
import { ref, onMounted } from 'vue';
import { getDetailsApi } from '@/request/api';
const fetchData = ref([]);
onMounted(async () => {
    let id = localStorage.getItem('id');
    try {
        let res = await getDetailsApi(id);
        if (res.data && res.data.list && res.data.list.length > 0) {
            const originalList = res.data.list;
            const chunkSize = 3;

            for (let i = 0; i < originalList.length; i += chunkSize) {
                fetchData.value.push(originalList.slice(i, i + chunkSize));
            }

            const remainingItems = originalList.length % chunkSize;
            if (remainingItems > 0 && i !== originalList.length) {
                fetchData.value.push(originalList.slice(-remainingItems));
            }
        }
        console.log(fetchData.value);
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="unit">
        <div class="list" v-for="(item, index) in fetchData" :key="index">
            <div class="item-imgs">
                <p class="item" v-for="(i, iIndex) in item" :key="iIndex">
                    <img :src="`http://47.92.89.106/` + i.file" alt="" />
                    <span>{{ i.author }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.unit {
    padding-left: 60px;
    border-left: 1px solid rgba(66, 66, 66, 0.3);
    margin-bottom: 300px;
    .list {
        @include flex-col;
        &:nth-child(1) {
            .item {
                padding-top: 0;
            }
        }
        .item-imgs {
            @include flex-row;
            align-items: center;
            // justify-content: space-between;
            gap: 60px;
            border-bottom: 0.5px solid rgba(66, 66, 66, 0.3);
        }
    }
    .item {
        padding: 61px 0;
        @include flex-row;
        gap: 10px;
        align-items: center;
        img {
            width: 85px;
        }
        span {
            width: 150px;
            color: #333;
            font-size: 14px;
            font-weight: 400;
            line-height: 30px;
        }
    }
}
</style>
