define([
    'jquery'
], function ($) {
    function goodsInit(type, data) {
        var $parent = $(`#${type}`)
        var tmp =`
            <h2>${data.title}</h2>
            <ul class="${type}_list">
                ${data.goods_list.map((v,i)=>{
                    return `
                        <li>
                            <a href="./detail.html?type=${type}&id=${v.goodsId}">
                                <img src="${v.goodsImg}"
                                    alt="">
                                <h3>${v.goodsName}</h3>
                                <p>￥ ${v.goodsPrice}.00</p>
                            </a>
                        </li>
                    `
                }).join('').repeat(2)}
            </ul> 
        `
        $parent.html(tmp)
    }
    return {
        goodsInit
    }
});