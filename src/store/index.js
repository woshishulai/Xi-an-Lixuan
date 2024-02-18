import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useShowInput = defineStore(
    'showInput',
    () => {
        const showInput = ref(false);
        const changeShowInput = (params) => {
            showInput.value = params;
            console.log(showInput.value);
        };
        return {
            showInput,
            changeShowInput
        };
    },
    {
        persist: {
            enabled: true // true 表示开启持久化保存
        }
    }
);
