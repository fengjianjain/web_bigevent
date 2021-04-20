$(function() {
    getUserInfo();
    layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAventer(res.data)
        }
    })
}

function renderAventer(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-info').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-info').html(first).show()
    }
}