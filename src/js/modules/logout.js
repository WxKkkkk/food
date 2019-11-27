define([
    'jquery'
], function($) {
    function logout(){
        $.ajax({
            url:'/foodlogin/login.php',
            success(res){
                window.location = '../views/index.html';
            }
        })
    }
    return {
        logout
    }
});