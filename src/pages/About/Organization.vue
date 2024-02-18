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
    <div class="organization">
        <div v-html="fetchData[0]?.content"></div>
    </div>
</template>

<style scoped lang="scss">
.organization {
    padding-left: 65px;
    margin-bottom: 300px;
    height: 1100px;
    flex: 1;
    border-left: 1px solid rgba(66, 66, 66, 0.3);
}
:deep(img) {
    max-width: 850px;
}
</style>
