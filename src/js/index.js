define(['jquery','../server/main','./modules/banner','./modules/goods'], function ($,{getBannerData,getBookData},{bannerInit},{goodsInit}) {
    // console.log($)
    getBannerData().then(function(res){
        bannerInit(res)
    })
    getBookData('phone').then(function(res){
        goodsInit('phone',res)
    })
    getBookData('parts').then(function(res){
        goodsInit('parts',res)
    })
}) 