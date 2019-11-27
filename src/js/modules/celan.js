//固定侧栏
define(['jquery'], function ($) {
    function hungBarMove() {
        $(window).ready(function () {
            $(this).scroll(function () {
                if ($(document).scrollTop() > 300) {
                    $('#goTop').css("display", "block")
                    $('.hungBar_support_top').click(function () {
                        $(document).scrollTop(0);
                    })
                }
                else {
                    $('#goTop').css("display", "none")
                }
            })
        })
        showList()
    }
    function showList(){
        let $hungBar_listL=$('.hungBar_list2 li')
        let $hungBarLi=$('.hungBar_list li')
        $hungBarLi.hover(function(){
            let index=$(this).index()
            // console.log(index)
            $hungBar_listL.eq(index).show().css({
                'top':index*50
            })
        },function(){
            let index=$(this).index()
            // console.log(index)
            $hungBar_listL.eq(index).hide()
        })
    }
    return {
        hungBarMove
    }
});