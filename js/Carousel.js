//获取到轮播图数据 √
$.ajax({
    type: 'get',
    data: {
        status: 3,
        pageCode: 1
    },
    url: 'http://10.21.23.158:8888/home/getAllDisplayBanner',
    success: function (data) {
        //data对象组
        var newItems = ''; //不初始化会导致第一个值为undefined
        let pic = data.object;
        console.log(data);
        for (var i = 0; i < pic.length; i++) {
            //添加控件
            let $li = document.createElement("li");
            //给控件添加属性
            $($li).attr("data-target", "#myCarousel"); //$()才能使用
            $($li).attr("data-slide-to", i);
            //第一个为添加类active
            if (i == 0) {
                $($li).addClass("active");
                newItems += '<div class="item active"><img src="' +
                    pic[i].fileName +
                    '" name = "' +
                    pic[i].communityId +
                    '"' +
                    'class = "center-block"></div>';
            } else { //添加图片
                newItems += '<div class="item"><img src="' +
                    pic[i].fileName +
                    '" name = "' +
                    pic[i].communityId +
                    '"' +
                    'class = "center-block"></div>';
            }
            
            $(".carousel-indicators").append($li);
        }
        $(".carousel-inner").html(newItems);

    }
});