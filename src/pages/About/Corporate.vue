<script setup>
import { ref, onMounted } from 'vue';
import { getImageUrl } from '@/utils';
import { getDetailsApi } from '@/request/api';
const fetchData = ref([]);
onMounted(async () => {
    let id = localStorage.getItem('id');
    try {
        let res = await getDetailsApi(id);
        fetchData.value = res.data.list;
        console.log(fetchData.value);
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="qiye">
        <div v-for="(item, index) in fetchData" :key="index">
            <div v-if="item.file.length >= 2">
                <div class="title mgs">{{ item.author }}</div>
                <div class="img-list">
                    <a-image
                        v-for="(i, imgIndex) in item.file.slice(0, 2)"
                        :key="imgIndex"
                        :width="317"
                        :src="`http://47.92.89.106/` + i?.url"
                    />
                </div>
                <div
                    class="img-list"
                    v-for="(group, groupIndex) in Math.ceil((item.file.length - 2) / 2)"
                    :key="groupIndex"
                >
                    <a-image
                        v-for="(i, imgIndex) in item.file.slice(
                            groupIndex * 2 + 2,
                            groupIndex * 2 + 4
                        )"
                        :key="imgIndex"
                        :width="317"
                        :src="`http://47.92.89.106/` + i?.url"
                    />
                </div>
            </div>
            <div v-if="item.file.length < 2">
                <div class="title mgs">{{ item.author }}</div>
                <div class="img-list">
                    <a-image :width="317" :src="`http://47.92.89.106/` + item.file[0]?.url" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.qiye {
    padding-left: 117px;
    border-left: 1px solid rgba(66, 66, 66, 0.3);
    margin-bottom: 300px;
    .title {
        color: #06254a;
        font-size: 16px;
        font-weight: 500;
        line-height: 38px;
    }
    .img-list {
        @include flex-row;
        gap: 65px;
        justify-content: center;
        padding: 57px 0;
        border-bottom: 1px solid rgba(66, 66, 66, 0.6);
    }
    .mgs {
        margin-top: 50px;
    }
    p {
        text-align: center;
        img {
            margin-top: 22px;
        }
    }
}
</style>
