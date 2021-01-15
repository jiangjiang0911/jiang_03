var baseUrl = "http://api-breakingnews-web.itheima.net"

$.ajaxPrefilter(function (options) {
    options.url = baseUrl + options.url

})
