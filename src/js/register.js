define([
    'jquery'
], function ($) {
    let $register = $('#register')
    let $btn=$register.find('.btn')
    function register() {
        $btn.on('click', function () {
            let username = $('#username').val()
            let password = $('#password').val()
            $.ajax({
                url: '/foodlogin/register.php',
                data:{username,password},
                type:'POST',
                success(res){
                    res=JSON.parse(res)
                    if(res.code==0){
                        alert('注册成功')
                        window.location = '../views/index.html';
                    }else if(res.code==-1){
                        alert('注册失败')
                        window.location = '../views/register.html';
                    }else if(res.code==1){
                        alert('已被注册过')
                        window.location = '../views/register.html';
                    }
                }
            })
        })
    }
    register()
    return {
        register
    }
});