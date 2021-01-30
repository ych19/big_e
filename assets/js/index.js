$(function () {

    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出', { icon: 3, title: '提示' }, function (index) {

            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);

        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {


            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')

            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
       
    })
}
//渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first)
            .show()
    }
}
