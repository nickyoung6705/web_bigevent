$(function(){
    $('#login-link').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#reg-link').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value){
            if(value !== $('.reg-box [name=password]').val()){
                return '两次密码不一致！' 
            }
        }
    })

    $('#form_reg').on('submit',function(e){
        e.preventDefault(),
        $.post('/api/reguser',{
            username:$('.reg-box [name=username]').val(),
            password:$('.reg-box [name=password]').val()
        },function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $('#reg-link').click()
        })
    })
    
    // 登录
    $('#form_login').on('submit',function(e){
        e.preventDefault(),
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})