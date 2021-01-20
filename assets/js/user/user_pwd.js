$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6-12位，且不能出现空格'
        ],
        newPwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '原密码和新密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }


    })

    // 修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(111);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        });
    })







})