function numberJudge(){

    console.log(number.length)
}

$('.buttom').click(function () {
    phone = $('#phone').val()
    number = $("#number").val()
    password = $('#password').val()
    if (number.length!=12){
        return alert('学号长度有误')
    }
    if (phone.length!=11){
        return alert('手机号长度有误')
    }
    if (password.length<6){
        return alert('密码长度有误')
    }

    user  = new Object()
    user.nickname = $('#nickname').val()
    user.number = number
    user.password = password
    user.phone = phone

    $.ajax({
        url: '/register',
        type: 'post',
        data: user,
        dataType: 'json',
        success: function (data) {
            if (data.code ==0) {
                userInfo = data.user
                console.log(userInfo)
                $.cookie('userInfo',JSON.stringify(userInfo));

                $(window).attr('location','/login');
            }
            if (data.code ==1) {
                alert('该手机号已被注册')
            }
            if (data.code ==2) {
                alert('该学号已被注册')
            }
        }
    })
})

