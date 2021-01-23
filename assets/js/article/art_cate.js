$(function () {
    initArtCateList()
    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method:"GET",
            url: "/my/article/cates",
            success: function (res) {
                console.log(res);
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        });
    }

    // 使用layer.open实现弹出层效果
    var layer = layui.layer;
    var indexAdd = null;
    $("#btnAddCate").on('click',function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '240px'],
            title: '添加文章分类',
            content: $("#dialog-add").html(),
          });  
    })

    // 通过代理的形式 为form-add表单绑定submit事件
    $("body").on("submit","#form-add",function (e) {
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg("新增分类成功！")
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        });
    })

    // 通过事件委派的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null;
    var form = layui.form;
    $("tbody").on('click',".btn-edit",function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '240px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html(),
        });  
        // 在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据，并填充到表单中
        var id = $(this).attr('data-id');
        $.ajax({
            method:"GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val('form-edit',res.data)
            }
        });
    })
    
    // 修改提交事件
    $('body').on('submit','#form-edit',function (e) {
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        });
    })

    // 删除事件
    $('tbody').on('click','.btn-delete',function () {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:"GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index);
                    initArtCateList()
                }
            });
          });
    })
})