define([
    'jquery',
    '../server/main'
], function ($, { isLogin }) {

    let $login = $('#deng')
    isLogin().then(function (res) {

    })
    indexLogin()

    function indexLogin() {
        $login.on('click', function () {
            let username = $('#username').val()
            let password = $('#password').val()
            console.log(username , password);
            $.ajax({
                url: '/foodlogin/login.php',
                data: { username, password },
                type: 'POST',
                success(res) {
                    console.log(res)
                    res = JSON.parse(res);
                    if (res.code == 0) {
                        alert('登录成功');
                        window.location = '../views/index.html';
                    }
                }
            })
        })
    }
    // function addLogin(data) {
    //     let result = {
    //         username: $username.val(),
    //         goodsChecked: true
    //     }
    //     // addCartStorage(result,function(){
    //     //     alert('添加成功')
    //     // })
    //     // console.log(result)
    //     addLoginStorage(result, function () {
    //         alert('登录成功')
    //         window.location = '../views/index.html'
    //         $('.head-wrap-user').html(`<li>11</li>`)
    //     })
    // }
});