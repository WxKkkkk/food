define([
    'jquery',
    './logout'
], function ($,{logout}) {
    function checklogin() {
        $.ajax({
            url: '/foodlogin/checklogin.php',
            success(res) {
                let tmp=``
                if(res){
                    tmp = `
                    <li>欢迎，${res}</li>
                    <li class="logout"><a>退出</a></li>
                    `
                }else{
                    tmp =`
                    <li><a href="../../views/login.html">登录</a></li>
                    <i></i>
                    <li><a href="../../views/register.html">注册</a></li>
                    `
                }
                $('.head-wrap-user').html(tmp)
                $('.logout').on('click',function(){
                    logout()
                })
            },
        })
    }
    return {
        checklogin
    }


});