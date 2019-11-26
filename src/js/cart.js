define([
    'jquery',
    './modules/cartStorage'
], function ($, { setCartStorage, getCartStorage }) {
    let $cart = $('#cart')
    let $cart_list = $cart.find('.cart_list')
    let $cart_title_selectAll = $cart.find('.cart_title_selectAll')
    let cartList
    cartInit()
    cartBind()
    function cartInit() {
        cartList = getCartStorage() || []
        let tmp = `
            ${
            cartList.map((v, i) => {
                return `
                        <li>
                            <div>
                                ${v.goodsChecked ? `<input type="checkbox" checked>`:`<input type="checkbox"></input>`}
                            </div>
                            <div>
                                <img src="${v.goodsImg}"
                                    alt="">
                                <p>${v.goodsName}（${v.goodsColor}）</p>
                            </div>
                            <div>¥ ${v.goodsPrice}.00</div>
                            <div>
                                <span>-</span>
                                <input class="cart_list_text" type="text" value="${v.goodsNum}">
                                <span>+</span>
                            </div>
                            <div>¥ ${v.goodsPrice * v.goodsNum}.00</div>
                            <div>删除</div>
                        </li>
                    `
            }).join('')
            }
        `
        $cart_list.html(tmp)
        var $checkbox = $cart_list.find('input[type="checkbox"]')
        var allFrag = true
        var allNum = 0
        var allPrice = 0
        $checkbox.each(function (i, elem) {
            if ($(elem).prop('checked') == false) {
                allFrag = false
            } else {
                allNum += cartList[i].goodsNum
                allPrice += cartList[i].goodsNum * cartList[i].goodsPrice
            }
        })
        if (!cartList.length) {
            allFrag = false
        }
        setAllSelect(allFrag)
        setAllPrice(allNum, allPrice)
    }
    function setAllSelect(frag) {
        $cart_title_selectAll.prop('checked', frag)
    }
    function setAllPrice(allNum, allPrice) {
        let $cart_computed_price = $cart.find('.cart_computed_price p')
        $cart_computed_price.eq(0).html(`总计：<span>¥ ${allPrice}.00</span>`)
        $cart_computed_price.eq(1).html(`已选择 ${allNum}件商品，`)
    }
    function cartBind() {
        $cart_list.on('click', 'input[type="checkbox"]', function () {
            var index = $(this).closest('li').index();
            console.log(index)
            cartList[index].goodsChecked = $(this).prop('checked');
            
            setCartStorage(cartList);
            cartInit();
        });
        $cart_title_selectAll.on('click', function () {
            if ($(this).prop('checked')) {
                for (var i = 0; i < cartList.length; i++) {
                    cartList[i].goodsChecked = true;
                }
            }
            else {
                for (var i = 0; i < cartList.length; i++) {
                    cartList[i].goodsChecked = false;
                }
            }
            setCartStorage(cartList);
            cartInit();
        });
        $cart_list.on('click','span:first-of-type',function(){
            var index = $(this).closest('li').index()
            if(cartList[index].goodsNum==1){
                return
            }
            cartList[index].goodsNum--
            setCartStorage(cartList);
            cartInit();
        })
        $cart_list.on('click','span:last-of-type',function(){
            var index = $(this).closest('li').index()
            cartList[index].goodsNum++
            setCartStorage(cartList);
            cartInit();
        })
        $cart_list.on('click','div:last-of-type',function(){
            // console.log($(this).html()) 
            var index = $(this).closest('li').index()
            cartList.splice(index,1)
            setCartStorage(cartList);
            cartInit();
        })
    }
});