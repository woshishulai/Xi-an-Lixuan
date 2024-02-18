const currentURL = window.location.href;
export const shareToWeibo = () => {
    const baseUrl = 'http://service.weibo.com/share/share.php';
    const params = {
        url: encodeURIComponent(currentURL),
        title: encodeURIComponent('西安骊轩实业发展有限公司'),
        pic: encodeURIComponent('图片链接'), // 如果有图片可以添加此参数
        appkey: '', // 您的应用key，如果有的话
        ralateUid: '' // 相关微博用户UID
    };

    const queryString = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');
    const shareUrl = `${baseUrl}?${queryString}`;

    window.open(shareUrl, '_blank');
};

export const shareToQQ = () => {
    const qqZoneShareUrl =
        'https://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(currentURL);
    window.open(qqZoneShareUrl, '_blank');
};
