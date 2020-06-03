$("#logo").click(function () {
    $(window).attr('location','/');
})
$("#send").click(function () {
    $(window).attr('location','/send')
})



function f() {
    if ($.cookie('userInfo')){
        var user = $.cookie('userInfo');
        var user = JSON.parse($.cookie('userInfo'))
        console.log(user)
        $("#name").html(user.nickname)

        $("#number").html("学号："+user.number)
        url = '../public/head/'+user.number+'.jpg'
        $("#head").attr('src',url)
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
$("#edit").click(function () {
    $(window).attr('location','/edit')
})
