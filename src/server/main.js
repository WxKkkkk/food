define([
    'jquery'
], function($) {
    function getBannerData(){
        return $.ajax('../mock/banner.json')
    }
    function getBookData(type){
        return $.ajax(`../mock/${type}.json`)
    }
    return{
        getBannerData,
        getBookData
    }
});