define(['jquery','../server/main','./modules/banner',], function ($,{getBannerData,getBookData},{bannerInit}) {
    // console.log($)
    getBannerData().then(function(res){
        bannerInit(res)
    })
})