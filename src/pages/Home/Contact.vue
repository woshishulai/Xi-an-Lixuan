<script setup>
import { reactive } from 'vue';
import { callMeApi } from '@/request/api';
import { message } from 'ant-design-vue';
const formState = reactive({
    username: '',
    phoneNumber: '',
    project: '',
    data: ''
});
const onFinish = async (valuesy) => {
    const params = {
        type: 1,
        author: formState.username,
        content: formState.data,
        tel: formState.phoneNumber,
        project: formState.project,
        email: '',
        wx: '',
        file: '',
        pid: '34'
    };
    try {
        let res = await callMeApi(params);
        message['success'](res.msg);
    } catch (error) {
        console.log(error);
    }
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
</script>

<template>
    <div class="contact">
        <div class="cen-wrap">
            <div class="shabi">
                <h5>联系我们</h5>
                <p class="info">CONTACT US</p>
            </div>
            <div class="cons-wrap">
                <div class="left">
                    <div class="item">
                        <h5>地址</h5>
                        <p>LEGION 西安，西安•航天中心广场908</p>
                        <p>LEGION 北京，北京•复兴路甲23号综合楼</p>
                        <p>LEGION 佛山，佛山•保利千灯湖一号公馆C3303</p>
                    </div>
                    <div class="item">
                        <h5>邮箱</h5>
                        <p>xxxxxxxxxxxxx@qq.com</p>
                    </div>
                </div>
                <div class="right-wrap">
                    <a-form
                        :model="formState"
                        name="basic"
                        autocomplete="off"
                        @finish="onFinish"
                        @finishFailed="onFinishFailed"
                    >
                        <a-form-item>
                            <div class="top-userinfo">
                                <a-form-item
                                    name="username"
                                    :rules="[{ required: true, message: '请输入您的姓名' }]"
                                >
                                    <a-input
                                        v-model:value="formState.username"
                                        placeholder="姓名"
                                    />
                                </a-form-item>
                                <a-form-item
                                    name="phoneNumber"
                                    :rules="[
                                        { required: true, message: '请输入您的联系电话' },
                                        {
                                            pattern: /^1[3456789]\d{9}$/,
                                            message: '请输入正确的手机号格式',
                                            trigger: 'change'
                                        }
                                    ]"
                                >
                                    <a-input
                                        v-model:value="formState.phoneNumber"
                                        placeholder="联系电话"
                                    />
                                </a-form-item>
                            </div>
                        </a-form-item>
                        <a-form-item
                            name="project"
                            :rules="[{ required: true, message: '请输入您的项目' }]"
                        >
                            <a-input v-model:value="formState.project" placeholder="项目" />
                        </a-form-item>

                        <a-form-item name="data">
                            <a-textarea
                                placeholder="备注"
                                class="remark"
                                v-model:value="formState.data"
                            />
                        </a-form-item>
                        <a-form-item :wrapper-col="{ offset: 18, span: 0 }">
                            <a-button type="primary" html-type="submit"> 发送</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.contact {
    background: linear-gradient(rgba(128, 129, 131, 0.7), rgba(128, 129, 131, 0.7)),
        url('@/assets/img/home/bg4.png');
    background-size: 100% 100%;
    padding: 113px 0 100px;

    .cen-wrap {
        width: 1000px;
        margin: 0 auto;

        .shabi {
            // @media screen and (max-width: 1260px) {
            //     text-align: center;
            // }
            h5 {
                font-weight: 700;
                font-size: 21px;
                color: #fff;
            }
            .info {
                margin-top: 10px;
                color: rgba(255, 255, 255, 0.52);
                font-size: 33px;
                font-weight: 200;
            }
        }
        .cons-wrap {
            margin-top: 36px;
            @include flex-row;
            gap: 47px;
            // @media screen and (max-width: 1260px) {
            //     @include flex-col;
            //     align-items: center;
            // }
            .left {
                @include flex-col;
                gap: 5px;
                // @media screen and (max-width: 1260px) {
                //     width: 70%;
                // }
                .item {
                    @include flex-col;
                    height: 166px;
                    background-color: #c8b288;
                    padding: 35px 52px 10px 67px;
                    color: #fff;
                    h5 {
                        font-size: 16px;
                        margin-bottom: 18px;
                    }
                    p {
                        flex: 1;
                        font-size: 14px;
                    }
                }
            }
            .right-wrap {
                flex: 1;
                padding: 29px 68px 0;
                background: rgba(255, 255, 255, 0.28);
                flex-shrink: 0;
                // @media screen and (max-width: 1260px) {
                //     width: 70%;
                // }
                .top-userinfo {
                    @include flex-row;
                    gap: 30px;
                    height: 33px;
                    .ant-form-item {
                        // flex: 1;
                        width: 182px;
                    }
                }
                :deep(textarea) {
                    resize: none;
                }
                :deep(.ant-form-item-control) {
                    // min-width: 100%;
                    width: 198px;
                }
                :deep(.ant-btn-primary) {
                    width: 100px;
                    background-color: #c8b288;
                    border-radius: 0;
                }
            }
        }
    }
}
.ant-input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    border-radius: 0;
    ::placeholder {
        // color: #fff;
        font-size: 16px;
    }
}
.ant-input:focus {
    // border-color: #c8b288;
    border-top: none;
    border-left: none;
    border-right: none;
    box-shadow: none;
    border-bottom: 1px solid #c8b288;
}
.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus {
    box-shadow: none;
}
.ant-form {
    @include flex-col;
    justify-content: space-between;
    height: 100%;
}
.remark {
    height: 80px;
}
</style>
