$("#logo").click(function () {
    $(window).attr('location','/');
})
$("#me").click(function () {
    $(window).attr('location','/me')
})

function f() {
    if ($.cookie('userInfo')){
        var user = $.cookie('userInfo');
        var user = JSON.parse($.cookie('userInfo'))

        $("#send").click(function () {
            var content = $("#content").val()
            var article = new Object()
            article.content = content
            article.number = user.number
            article.url = '../public/head/'+user.number+'.jpg'
            function getNow(s) {
                return s < 10 ? '0' + s: s;
            }
            var myDate = new Date();
            var year=myDate.getFullYear();        //获取当前年
            var month=myDate.getMonth()+1;   //获取当前月
            var date=myDate.getDate();            //获取当前日
            var h=myDate.getHours();              //获取当前小时数(0-23)
            var m=myDate.getMinutes();          //获取当前分钟数(0-59)
            var s=myDate.getSeconds();

            article.time = year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m)+":"+getNow(s);

            $.ajax({
                url: '/send',
                type: 'post',
                data: article,
                dataType: 'json',
                success: function (data) {
                    if (data.code == 10){
                        return alert('更改失败')
                    }
                    $(window).attr('location','/')
                }
            })
        })
    }else {
        alert('请先登录')
        $(window).attr('location','/login');
    }
}
f()


