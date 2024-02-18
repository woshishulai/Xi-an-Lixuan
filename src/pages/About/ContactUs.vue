<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getDetailsApi, callMeApi } from '@/request/api';
import { getImageUrl } from '@/utils/index';
import { message } from 'ant-design-vue';
import { globalApi } from '@/request/api';
import { shareToWeibo, shareToQQ } from '@/utils/share';
import axios from 'axios';
const fetchData = ref([]);
const widthImg = ref(0);
const inputFile = ref(null);
const modal1Visible = ref(false);
onMounted(async () => {
    widthImg.value = calculateWidthImg();
    window.addEventListener('resize', () => {
        widthImg.value = calculateWidthImg();
    });
    try {
        let res = await globalApi();
        console.log(res);
        fetchData.value = res.data;
    } catch (error) {
        console.log(error);
    }
});
const calculateWidthImg = () => {
    const windowWidth = document.documentElement.clientWidth;
    const remainingWidth = (windowWidth - 1050) / 2 + 1050 - 185;
    return remainingWidth;
};
const formState = reactive({
    author: '',
    tel: '',
    email: '',
    wx: '',
    content: '',
    file: '',
    project: '',
    type: '2',
    pid: '34'
});
const handleInput = (fieldName) => {
    formState[fieldName] = formState[fieldName].replace(/\s/g, ''); // Remove spaces
};
const upload = () => {
    inputFile.value.click();
};
const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image_file', file);
        axios
            .post('api/public_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                message.success('上传成功', response.msg);
                console.log('上传成功:', response.data);
                formState.file = response.data.path;
            })
            .catch((error) => {
                console.error('上传失败:', error);
            });
    }
};
const submit = async () => {
    const telRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.author) {
        message.error('请输入姓名');
        return;
    } else if (!telRegex.test(formState.tel)) {
        message.error('请输入正确的联系电话');
        return;
    } else if (!emailRegex.test(formState.email)) {
        message.error('请输入正确的邮箱');
        return;
    } else if (!formState.wx) {
        message.error('请输入您的微信号');
        return;
    }
    try {
        let res = await callMeApi(formState);
        Object.keys(formState).forEach((key) => {
            formState[key] = '';
        });
        message.success({
            content: '提交成功',
            duration: 1.5
        });
    } catch (error) {
        console.log(error);
    }
};
const showQRCode = () => {
    modal1Visible.value = true;
};
</script>

<template>
    <div class="contact-us">
        <div
            class="contact"
            :style="{
                width: widthImg + 'px'
            }"
        >
            <div class="title"> Contact Us </div>
            <div class="form">
                <div class="titles"> 填写您的需求我们将稍后联系您 </div>
                <div class="item">
                    <span>姓名</span>
                    <input type="text" @input="handleInput('author')" v-model="formState.author" />
                </div>
                <div class="item">
                    <span>联系电话</span>
                    <input type="text" @input="handleInput('tel')" v-model="formState.tel" />
                </div>
                <div class="item">
                    <span>E-mail</span>
                    <input type="text" @input="handleInput('email')" v-model="formState.email" />
                </div>
                <div class="item">
                    <span>您的微信</span>
                    <input type="text" v-model="formState.wx" @input="handleInput('wx')" />
                </div>
                <div class="item items">
                    <input ref="inputFile" class="upload" type="file" @change="handleFileChange" />
                    <img :src="getImageUrl('about/upload.png')" alt="" />
                    <a-textarea
                        style="height: 100%"
                        v-model:value="formState.content"
                        allow-clear
                    />
                </div>
                <div class="btn" @click="submit"> 提交表格 </div>
            </div>
        </div>
        <div class="card-list">
            <div class="card-item">
                <p class="yanse"></p>
                <h5>{{ fetchData?.dz1?.[0] }} </h5>
                <p class="label">
                    {{ fetchData?.dz1?.[1] }}
                </p>
            </div>
            <div class="card-item">
                <p class="yanse"></p>
                <h5>{{ fetchData?.dz2?.[0] }} </h5>
                <p class="label">
                    {{ fetchData?.dz2?.[1] }}
                </p>
            </div>
            <div class="card-item">
                <p class="yanse"></p>
                <h5>{{ fetchData?.dz3?.[0] }} </h5>
                <p class="label">
                    {{ fetchData?.dz3?.[1] }}
                </p>
            </div>
        </div>
        <p class="fenxiang">
            <i @click="shareToWeibo" class="iconfont icon-weibo"></i>
            <i @click="showQRCode" class="iconfont icon-weixin"></i>
            <i @click="shareToQQ" class="iconfont icon-QQ"></i>
        </p>
    </div>
    <a-modal
        v-model:open="modal1Visible"
        title="扫描二维码即可分享至朋友圈"
        style="top: 30%"
        :footer="null"
        @ok="setModal1Visible(false)"
    >
        <a-qrcode value="http://legion-design.com.cn/" />
    </a-modal>
</template>

<style scoped lang="scss">
.contact-us {
    width: 915px;
    padding-left: 42px;
    border-left: 1px solid rgba(66, 66, 66, 0.3);
    margin-bottom: 300px;
    position: relative;
    .contact {
        position: absolute;
        top: 0;
        background: url('@/assets/img/about/contact.png');
        background-size: 100% 100%;
        padding: 38px 48px;
        height: 530px;
        .title {
            color: #fff;
            font-size: 30px;
            font-weight: 400;
        }
        .form {
            @include flex-col;
            justify-content: space-between;
            background-color: #fff;
            position: absolute;
            z-index: 2;
            left: 50%;
            bottom: -160px;
            transform: translateX(-50%);
            width: 382px;
            height: 519px;
            padding: 25px 30px;
            box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.06);
            .titles {
                color: #424242;
                font-weight: 500;
            }
            .item {
                @include flex-col;
                align-items: flex-start;
                gap: 8px;
                span {
                    font-size: 12px;
                    color: #747474;
                }
                input {
                    width: 323px;
                    box-sizing: border-box;
                    border-radius: 3px;
                    background: #f4f4f4;
                    border: none;
                    height: 24px;
                    padding: 0 12px;
                    color: #747474;
                    font-size: 12px;
                    &:focus-visible {
                        border: none;
                        outline: none;
                    }
                }
            }

            .items {
                position: relative;
                @include flex-row;
                width: 328px;
                height: 122px;
                background-color: #f4f4f4;
                padding: 17px 0 0 7.5px;
                img {
                    width: 47px;
                    height: 47px;
                    cursor: pointer;
                }
                .upload {
                    position: absolute;
                    z-index: 3;
                    left: 3;
                    cursor: pointer;
                    width: 47px;
                    height: 47px;
                    opacity: 0;
                }
                :deep(textarea) {
                    border: none;
                    background-color: #f4f4f4;
                    resize: none;
                    color: #747474;
                    font-size: 12px;
                }
                :deep(.ant-input:focus) {
                    box-shadow: none;
                }
            }
            .btn {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                padding: 5px 0;
                width: 68px;
                color: #fff;
                font-size: 12px;
                border-radius: 3px;
                background-color: #747474;
            }
        }
    }
    .card-list {
        // margin-top: 230px;
        padding-top: 760px;
        @include flex-row;
        justify-content: space-between;
        .card-item {
            @include flex-col;
            gap: 15px;
            max-width: 230px;
            h5 {
                font-weight: 600;
                font-size: 16px;
            }
            .label {
                font-size: 14px;
                color: #747474;
                line-height: 20px;
            }
            .yanse {
                width: 50px;
                height: 3px;
                background-color: #c8b288;
            }
        }
    }
    .fenxiang {
        @include flex-row;
        gap: 40px;
        align-items: center;
        margin-top: 30px;
        justify-content: flex-end;
        i {
            cursor: pointer;
            font-size: 24px;
            &:hover {
                color: #c8b288;
            }
        }
    }
}
</style>
