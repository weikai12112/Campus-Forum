var url = ''

function f() {
    if ($.cookie('userInfo')){
        var user = JSON.parse($.cookie('userInfo'))
        console.log(user.nickname)
        $("#name").val(user.nickname)
        $("#number").html(user.number)
        $("#phone").val(user.phone)
        $("#password").val(user.password)
        url = '../public/head/'+user.number+'.jpg'
        $("#img").attr('src',url)
    }else {
        alert('请先登录')
        $(window).attr('location','/login');
    }
}
f()
$("#quiet").click(function () {
    $.removeCookie('userInfo');
    $(window).attr('location','/');
})

$("#change").click(function () {
    var phone = $("#phone").val()
    var password = $("#password").val()
    var phoneLength = phone.length
    var passwordLength = password.length
    if(phoneLength != 11){
        return alert('手机号有误')
    }
    if (passwordLength<6){
        return alert('密码不可以少于六位')
    }
    var userChange = new Object()
     userChange.nickname = $("#name").val()
     userChange.phone = $("#phone").val()
     userChange.password = $("#password").val()
     userChange.number = $("#number").text()
     userChange.head = url
    console.log(userChange.head)
    $.ajax({
        url: '/edit',
        type: 'post',
        data: userChange,
        dataType: 'json',
        success: function (data) {
            if (data.code == 10){
                return alert('更改失败')
            }
            $.removeCookie('userInfo');
            $(window).attr('location','/login')
            }
    })


})
$("#cancel").click(function () {
    $(window).attr('location','/me')
})


$("#updataImg").change(function() {
    var upload_file = this.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(upload_file)
    reader.onload = function (e) {
        url = this.result
        $("#img").attr("src", url);
    }
});