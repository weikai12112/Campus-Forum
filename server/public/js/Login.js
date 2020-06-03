user = new Object()
function login() {
    console.log('123')
    user = new Object()
    user.number = $("#number").val()
    user.password = $("#password").val()
    console.log(user)

    $.ajax({
        url: '/login',
        type: 'post',
        data: user,
        dataType: 'json',
        success: function (data) {
            if (data.code ==2) {
                userInfo = data.user
                console.log(userInfo)
                $.cookie('userInfo',JSON.stringify(userInfo),{ expires: 1 });
                $(window).attr('location','/');
            }
            if (data.code ==1) {
                return alert('密码错误')
            }
            if (data.code ==0) {
                return alert('账号不存在')
            }
            if (data.code ==500) {
                alert('服务器坏了')
            }
        }
    })
}