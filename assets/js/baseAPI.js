var baseUrl = "http://api-breakingnews-web.itheima.net"

$.ajaxPrefilter(function (options) {

    options.url = baseUrl + options.url

    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }

    // 判断身份信息  拦截没有身份认证的响应
    options.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 & obj.message == "身份认证失败！") {
            localStorage.removeItem('token')

            location.href = '/login.html'
        }
    }
})