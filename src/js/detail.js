define([
    'jquery',
    '../server/main'
], function($,{getDetailData}) {
    let type=window.location.search.match(/type=([^&]+)/)[1]
    let id=window.location.search.match(/id=([^&]+)/)[1]
    let $detail=$('#detail')
    let $detailGoods=$('#detailGoods')
    getDetailData(type,id).then(function(res){
        detailInit(res)
    })
    function detailInit(data){
        let tmp=`
            <div class="detail_gallery l">
                <div class="detail_gallery_normal">
                    <img src="${data.photoNormal}" alt="">
                </div>
                <div class="detail_gallery_larger">
                    <img src="${data.photoLarge}"
                        alt="">
                </div>
            </div>
            <div class="detail_message l">
                <h1>${data.goodsName}</h1>
                <p class="detail_message_price">￥${data.goodsPrice}</p>
                <p class="detail_message_color">颜色
                    ${
                        data.chooseColor.map((v,i)=>{
                            if(i==0){
                                return `<span class="detail_message_box active">${v}</span>`
                            }else{
                                return `<span class="detail_message_box">${v}</span>`
                            }
                        }).join('')
                    }
                </p>
                <div class="detail_message_num">
                    <span>+</span>
                    <input type="text" value="1">
                    <span>-</span>
                </div>
                <div class="detail_message_cart l"><a href="#">加入购物车</a></div>
                <div class="detail_message_computed l"><a href="#">立即下单</a></div>
            </div>
        `
        var tmp2=`
            <h3>-- 商品详情 --</h3>
            ${
                data.goodsInfo.map((v,i)=>{
                    return `<img src="${v}" alt="">`
                }).join('')
            }
        `
        $detail.html(tmp)
        $detailGoods.html(tmp2)
        chooseNumber()
        chooseColor()
    }
    function chooseNumber(){
        let detail_message_num=$detail.find('.detail_message_num')
        let $input=detail_message_num.find('input')
        let span=detail_message_num.find('span')
        span.eq(0).on('click',function(){
            var value=$input.val()    
            $input.val(++value)
        })
        span.eq(1).on('click',function(){
            var value=$input.val()   
            if(value==1){
                return
            } 
            $input.val(--value)
        })
    }
    function chooseColor(){
        var detail_message_box=$detail.find('.detail_message_box')
        detail_message_box.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
        })
    }
});