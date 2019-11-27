define(['jquery',
    '../server/main',
    './modules/banner',
    './modules/goods',
    './modules/checklogin',
    './modules/lazyload',
    './modules/celan'
], function ($, { getBannerData, getBookData }, { bannerInit }, { goodsInit }, { checklogin },{lazyload},{hungBarMove}) {
    // console.log($)
    getBannerData().then(function (res) {
        bannerInit(res)
    })
    getBookData('phone').then(function (res) {
        goodsInit('phone', res)
    })
    getBookData('parts').then(function (res) {
        goodsInit('parts', res)
    })
    checklogin()
    lazyload()
    hungBarMove()
}) 