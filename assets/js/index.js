$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {

        layer.confirm('是否确定退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 退出后清空本地token数据
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token")
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    });
}

function renderAvatar(user) {
    // 渲染用户名字
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎您&nbsp;&nbsp;' + name)

    // 渲染用户头像
    if (user.user_pic !== null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').show().attr('src', user.user_pic)
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}