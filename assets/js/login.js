$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return '两次密码不相同'
            }
        }
    })

    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            },
            success: function (res) {
                if (res.status !== 0) {

                    return layer.msg(res.message)

                }
                layer.msg('注册成功，请登陆')
                $("#form_reg .layui-input").val('')
                 $('#link_login').click()
            }

        })
    })

    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg('登陆失败!')
                }
                layer.msg('登陆成功!')
                localStorage.setItem('token', res.token)
                location.href='/index.html'
            }
        })
    })
})