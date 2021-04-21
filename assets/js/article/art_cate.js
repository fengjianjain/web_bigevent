$(function() {
    initArtCate()

    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var arthtml = template('tpl-table', res)
                $('tbody').html(arthtml)
            }
        })
    }
    var layer = layui.layer
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        });
    })
    $('body').on('submit', '#dialogForm', function(e) {
        e.preventDefault(),
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('添加文章失败')
                    }
                    layer.msg('添加文章成功！')
                    initArtCate()
                    layer.close(indexAdd);
                }
            })
    })
    var indexEdit = null
    var form = layui.form
    $('tbody').on('click', '#btnEdit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val("dialogEdit", res.data)
            }
        })
    })
    $('body').on('submit', '#dialogEdit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                layer.msg('更新信息成功！')
                initArtCate()
                layer.close(indexEdit);
            }
        })
    })
    $('tbody').on('click', '#btndelete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    initArtCate()
                    layer.close(index);
                }

            })

        });


    })
})