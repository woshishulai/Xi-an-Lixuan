<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { globalApi } from '@/request/api';
const fetchData = ref(null);
onMounted(async () => {
    try {
        let res = await globalApi();
        fetchData.value = res.data.base;
    } catch (error) {
        console.log(error);
    }
});
const router = useRouter();
</script>

<template>
    <div class="footer">
        <div class="cen">
            <div class="item">
                <div class="title" style="cursor: pointer" @click="showAboutPage">关于我们</div>
            </div>
            <div class="item">
                <div class="title">关注我们</div>
                <div class="cen-wrap">
                    <div class="img-item">
                        <div class="imgs"
                            ><img :src="`http://47.92.89.106/` + fetchData?.wap_logo_path" alt="" />
                        </div>
                        <p><span></span> 微博 <span></span></p>
                    </div>
                    <div class="img-item">
                        <div class="imgs"
                            ><img :src="`http://47.92.89.106/` + fetchData?.wap_banner" alt="" />
                        </div>
                        <p><span></span> 微信 <span></span></p>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="title">联系我们</div>
                <div class="call-list">
                    <div class="call-item">
                        <p>公司邮箱：{{ fetchData?.company_email }}</p>
                    </div>
                    <div class="call-item">
                        <p>公司电话：{{ fetchData?.company_phone }}</p>
                    </div>
                    <div class="call-item">
                        <p>公司网址：{{ fetchData?.stock_code }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="address">
        <span></span>
        <div>
            <p
                >总部地址:
                {{ fetchData?.company_address }}
            </p>
            <p
                >版权所有:
                {{ fetchData?.hot_phone }}
                &nbsp;
                {{ fetchData?.company_name }}
            </p>
        </div>
        <span style="cursor: pointer" @click="router.push('/investigate')">征集令</span>
    </div>
</template>

<style scoped lang="scss">
.footer {
    background: #333;
    color: #fff;
    .cen {
        // width: 1400px;
        margin: 0 auto;
        @include flex-row;
        justify-content: center;
        border-bottom: 1px solid #666;
        padding: 40px 0 40px;
        .item {
            box-sizing: border-box;
            width: 350px;
            height: 200px;
            border-right: 1px solid #666;
            &:last-child {
                border: none;
            }
            .title {
                @include flex-row;
                align-items: center;
                gap: 10px;
                padding: 20px 0 0 46px;
                &::before {
                    content: '';
                    display: block;
                    width: 20px;
                    height: 6px;
                    background-color: #c8b288;
                }
            }
            .cen-wrap {
                @include flex-row;
                justify-content: center;
                align-items: center;
                gap: 15px;
                height: 174px;
                .img-item {
                    position: relative;
                    width: 90px;
                    height: 90px;
                    border: 1px solid #fff;
                    padding: 10px 10px 20px 10px;
                    cursor: pointer;
                    .imgs {
                        background-color: #000;
                        height: 100%;
                        width: 100%;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    p {
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        width: 70px;
                        padding: 6px;
                        transform: translate(-50%, 50%);
                        @include flex-row;
                        align-items: center;
                        justify-content: space-around;
                        background-color: #000;
                        color: #fff;
                        font-size: 14px;

                        span {
                            content: '';
                            display: block;
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background-color: #fff;
                        }
                    }
                }
            }
            .icons-list {
                padding: 0 0 0 70px;
                .icons-item {
                    margin-top: 37px;
                    @include flex-row;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    font-size: 14px;

                    i {
                        font-size: 40px;
                        color: #c8b288;
                    }
                }
            }
            .call-list {
                padding: 20px 0 0 76px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 174px;
                .call-item {
                    cursor: pointer;
                    p {
                        white-space: nowrap;
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
.address {
    @include flex-row;
    justify-content: space-around;
    background-color: #333;
    text-align: center;
    color: #666;
    padding: 30px 0 40px;
    p {
        margin-bottom: 20px;
    }
}
</style>
