$(function () {

    // 1.登陆注册切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()

    })

    // 2.添加表单验证
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须为6-16位，且不能包含空格'
        ],
        repwd: function (value) {
            if (value !== $('.reg-box [name=password]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 3.注册
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);

                $('#link_login').click()

                $('#form_reg')[0].reset()
            }
        });
    })

    // 4.登陆
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);

                localStorage.setItem('token', res.token)

                location.href = '/index.html'
            }
        });
    })
})