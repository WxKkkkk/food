define([
    'jquery',
    '../server/main',
    './modules/cartStorage',
    './modules/checklogin',
    './modules/celan'
], function($,{getDetailData},{addCartStorage},{checklogin},{hungBarMove}
    ) {
    checklogin()
    hungBarMove()
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
                    <span></span>
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
                <div class="detail_message_computed l"><a href="cart.html">立即下单</a></div>
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
        detailMagnifier()
        addCart(data)
    }
    //选择数量
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
    //选择颜色
    function chooseColor(){
        var detail_message_box=$detail.find('.detail_message_box')
        detail_message_box.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
        })
    }
    //放大镜
    function detailMagnifier(){
        let $detail_gallery_normal=$detail.find('.detail_gallery_normal')
        let $detail_gallery_larger=$detail.find('.detail_gallery_larger')
        let $span=$detail_gallery_normal.find('span')
        let $largeImg=$detail_gallery_larger.find('img')
        $detail_gallery_normal.hover(function(ev){
            let pageX=ev.pageX-$(this).offset().left-$span.width()/2
            let pageY=ev.pageY-$(this).offset().top-$span.height()/2
            $span.css({
                left:pageX,
                top:pageY
            })
            $span.show()
            $detail_gallery_larger.show()
        },function(){
            $span.hide()
            $detail_gallery_larger.hide()
        }).mousemove(function(ev){
            let pageX=ev.pageX-$(this).offset().left-$span.width()/2
            let pageY=ev.pageY-$(this).offset().top-$span.height()/2
            if(pageX<0){
                pageX=0
            }else if(pageX>$(this).width()-$span.width()){
                pageX=$(this).width()-$span.width()
            }
            if(pageY<0){
                pageY=0
            }else if(pageY>$(this).height()-$span.height()){
                pageY=$(this).height()-$span.height()
            }
            $span.css({
                left:pageX,
                top:pageY   
            })
            let scaleX = pageX / ($(this).width() - $span.width());  //0~1
            let scaleY = pageY / ($(this).height() - $span.height());  //0~1           
            $largeImg.css({
                left : - scaleX * ( $largeImg.width() - $detail_gallery_larger.width() ),
                top : - scaleY * ( $largeImg.height() - $detail_gallery_larger.height() )
            });
        })
    }
    function addCart(data){
        let $detail_message_cart=$detail.find('.detail_message_cart')
        $detail_message_cart.on('click',function(){
            let result={
                goodsId:data.goodsId,
                goodsName:data.goodsName,
                goodsPrice:data.goodsPrice,
                goodsImg:data.goodsImg,
                goodsColor:$detail.find('.detail_message_box').filter('.active').html(),
                goodsNum:Number($detail.find('.detail_message_num input').val()),
                goodsChecked : true
            }
            addCartStorage(result,function(){
                alert('添加成功')
            })
        })
    }
});