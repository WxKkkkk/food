define(['jquery'], function ($) {
    $banner_imgs = $('#banner').find('.banner_imgs');
    $banner_dots = $('#banner').find('.banner_dots');
    let id
    let bannerIndex = 0
    let datalength = 0
    function bannerInit(data) {
        let banner_list = data.banner_list
        datalength = banner_list.length
        let tmp = `
            ${
            banner_list.map((v, i) => {
                return `<li><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>`
            }).join('')
            }
        `
        let tmp2 = `
        ${
            banner_list.map((v, i) => {
                if (i == 0) {
                    return `<li class="active"></li>`
                } else {
                    return `<li></li>`
                }
            }).join('')
            }
        `
        $banner_imgs.html(tmp)
        $banner_dots.html(tmp2)
        bannerDong()
        dianBanner()
        bannerStop()
    }
    function dianBanner() {
        $banner_dots.on('mouseover', 'li', function () {
            $(this).attr('class', 'active').siblings().attr('class', '');
            $banner_imgs.find('li').eq($(this).index()).fadeIn().siblings().fadeOut();
            bannerIndex = $(this).index()
        });
    }
    function bannerDong() {
        id = setInterval(() => {
            bannerIndex++
            if (bannerIndex < 0) {
                bannerIndex = datalength - 1
            }
            if (bannerIndex >= datalength) {
                bannerIndex = 0
            }
            banner(bannerIndex)
        }, 3000)
    }
    function banner(index) {
        $banner_dots.find('li').eq(index).attr('class', 'active').siblings().attr('class', '');
        $banner_imgs.find('li').eq(index).fadeIn().siblings().fadeOut();
    }
    function bannerStop() {
        $banner_imgs.hover(function () {
            clearInterval(id)
        }, function () {
            bannerDong()
        })
    }
    return {
        bannerInit
    }
}); 