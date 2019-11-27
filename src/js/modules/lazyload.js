define(['jquery'], function ($) {

    function lazyload() {
         window.onload=window.onscroll=function(){
            lazy()
        }
        function lazy(){
            $('img').each(function (i, elem) {
                if ($(elem).offset().top - $(document).scrollTop() < $(window).height()) {
                    $(elem).attr('src', $(elem).attr('data-src'))
                }
            })
        }


    }


    return { lazyload }
})