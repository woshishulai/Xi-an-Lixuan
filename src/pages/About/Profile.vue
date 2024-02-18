<script setup>
import { ref, onMounted } from 'vue';
import { getImageUrl } from '@/utils';
import { getDetailsApi } from '@/request/api';
const widthImg = ref(0);
const fetchData = ref([]);
onMounted(async () => {
    widthImg.value = calculateWidthImg();
    window.addEventListener('resize', () => {
        widthImg.value = calculateWidthImg();
    });
    let id = localStorage.getItem('id');
    try {
        let res = await getDetailsApi(id);
        console.log(res);
        fetchData.value = res.data.list;
    } catch (error) {
        console.log(error);
    }
});
const calculateWidthImg = () => {
    const windowWidth = document.documentElement.clientWidth;
    const remainingWidth = (windowWidth - 1050) / 2 + 1050 - 137;
    return remainingWidth;
};
const list = [
    {
        img: 'about/icon1.png',
        text: '诚信',
        label: 'THE GOOD FAITH'
    },
    {
        img: 'about/icon2.png',
        text: '高效',
        label: 'EFFICIENT'
    },
    {
        img: 'about/icon3.png',
        text: '优质',
        label: 'HIGH QUALITY'
    }
];
const detailsList = [
    {
        text: 'LEGION 西安，西安•航天中心广场908'
    },
    {
        text: 'LEGION 北京，北京•复兴路甲23号综合楼'
    },
    {
        text: 'LEGION 佛山，佛山•保利千灯湖一号公馆C3303'
    }
];
</script>

<template>
    <div class="profile">
        <!-- <p class="details">
            LEGION设计，将高品质设计服务与专业型工程项目管理体系以及优质配套产品供应渠道紧密结合的建筑工程设计、施工一体化的专业型机构。根据项目地域、文化、环境的特定性质、针对用户的特定需求，引入优秀设计资源和产品供应链，结合丰富的项目管理实践经验，为用户提供精准的项目设计及落地的整体解决方案
            。
        </p>
        <p class="details">
            公司共有设计人员及项目管理人员50余人，专业涵盖建筑方案设计、结构方案设计、机电方案设计、室内方案设计、景观建筑与小品设计、泛光照明设计、软装配饰及家具订制化搭配设计。全体人员专注、竭诚的为用户提供建筑设计和工程项目管理的全过程服务。
        </p>
        <p class="details">
            服务项目类别：居住、办公、文化、医疗、教育、体育、酒店、场馆、综合体建筑设计及室内设计；
        </p>
        <h5> 业务领域：设计+施工+家具家居产品订制化配置 </h5>
        <div class="icons-list">
            <div class="icons-item" v-for="item in list" :key="item.text">
                <img :src="getImageUrl(item.img)" alt="" />
                <p class="text">{{ item.text }}</p>
                <p class="label">{{ item.label }}</p>
            </div>
        </div>
        <div class="ditu">
            <img :src="getImageUrl('about/ditu.png')" alt="" />
        </div>
        <div class="details-list">
            <div class="details-item" v-for="item in detailsList" :key="item.text"
                ><span></span>
                <p>{{ item.text }}</p>
            </div>
        </div>
        <img
            class="footer-img"
            :style="{ maxWidth: widthImg + 'px' }"
            :src="getImageUrl('about/img1.png')"
            alt=""
        /> -->

        <div v-html="fetchData[0]?.content"></div>
        <!-- <img :src="`http://47.92.89.106/` + fetchData[0]?.file" alt="" /> -->
        <img
            class="footer-img"
            :style="{ maxWidth: widthImg + 'px' }"
            :src="getImageUrl('about/img1.png')"
            alt=""
        />
    </div>
</template>

<style scoped lang="scss">
:deep(p) {
    @include flex-col;
    justify-content: center;
    color: #747474;
    line-height: 30px;
    padding-left: 65px;
}
.profile {
    width: 915px;
    min-height: 1000px;
    border-left: 1px solid rgba(66, 66, 66, 0.3);

    .details {
        font-size: 12px;
        color: #747474;
        line-height: 30px;
        padding-left: 65px;
    }
    h5 {
        margin-top: 30px;
        font-size: 16px;
        font-weight: 700;
        color: #747474;
        padding-left: 65px;
    }
    .icons-list {
        @include flex-row;
        justify-content: space-between;
        width: 610px;
        margin: 60px auto 0;
        .icons-item {
            flex: 1;
            @include flex-col;
            align-items: center;
            border-right: 1px solid #c8b288;
            &:last-child {
                border: none;
            }
            p {
                color: #c8b288;
                &.text {
                    margin-top: 20px;
                    font-size: 20px;
                    font-weight: 700;
                }
                &.label {
                    font-size: 16px;
                    margin-top: 10px;
                }
            }
            img {
                width: 90px;
            }
        }
    }
    .ditu {
        margin-top: 80px;
        text-align: center;
    }
    .details-list {
        @include flex-col;
        gap: 30px;
        padding-left: 65px;
        .details-item {
            @include flex-row;
            align-items: center;
            gap: 10px;
            &:hover,
            &.active {
                p {
                    color: #c8b288;
                }
                span {
                    background-color: #c8b288;
                }
            }
            span {
                display: block;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: #333;
            }
            p {
                flex: 1;
                font-size: 14px;
                color: #747474;
                font-weight: 700;
                cursor: pointer;
            }
        }
    }
    .footer-img {
        margin-top: 70px;
        margin-bottom: -2px;
    }
}
</style>
