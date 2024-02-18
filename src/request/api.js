import instance from './index';

export const globalApi = () => instance.post('public');

export const homeApi = () => instance.post('home');

export const callMeApi = (params) =>
    instance.post(
        `submit?type=${params.type}&author=${params.author}&content=${params.content}&tel=${params.tel}&project=${params.project}&email=${params.email}&wx=${params.wx}&file=${params.file}&pid=${params.pid}`
    );

export const getProjectApi = () => instance.post('entry_list');

export const getNewsList = () => instance.post(`news_list`);

export const getNewsDetails = (query) => instance.post(`news_detail?id=${query}`);

export const getProjectDetailsApi = (query) => instance.post(`entry_detail?id=${query}`);

export const getNavListApi = () => instance.post('column_top');

export const getDetailsApi = (id) => instance.post(`Special?pid=${id}`);

export const topBarSearchApi = (text) => instance.post(`top_search?search=${text}`);

export const getZhengJiApi = (query) => instance.post(`zjl_home?search=${query || ''}`);

export const touPiaoApi = (query) => instance.post(`zjl_tp?ip=${query.ip}&id=${query.id}`);
