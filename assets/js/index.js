$(function () {
    getUserInfo()

    $('#out').on('click',function(){
        layer.confirm('是否选择退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location = 'login.html'
            
            layer.close(index);
          });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(data) {
    let name = data.username || data.nickname
    $('#headPhoto span').html('欢迎&nbsp&nbsp' + name)
    if (data.user_pic !== null) {
        $('#headPhoto img').attr('src',data.user_pic).show()
        $('#headPhoto #headp').hide()
    } else {
        $('#headPhoto #headp').html(name[0]).show()
        $('#headPhoto img').hide()
    }
    
}