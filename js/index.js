$(document).ready(function () {
    //点击图片跳转到新图√√
    //事件委托给动态添加的图片
    $("#myCarousel").on("click", "img", function () {
        var $imgName = $(this).attr("name");
        console.log($imgName);
        //跳转到空html并添加innerHtml
        $.ajax({
            type: 'get',
            communityId: $imgName,
            status: '0',
            //Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJEZXBhcnRtZW50QWRtaW4iXSwiYWRtaW5JZCI6MywiZXhwIjoxNTY1ODczMzE4fQ.hYiptH0rsI7VswsYZLMkNvsf3mGTfu7HYe_fnbOp56c',
            url: 'http://10.21.23.158:8888/communityPage/getHtmlPage',
            success: function (data) {
                //切换到空页面
                window.location.href = 'detail-page.html';
                $("body").html(data.object.html); //更改html
            }
        })
    })
    $("#paging").on("click", "img", function () {
        var $imgName = $(this).attr("name");
        console.log($imgName);
        //跳转到空html并添加innerHtml
        $.ajax({
            type: 'get',
            communityId: $imgName,
            status: '0',
            //Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJEZXBhcnRtZW50QWRtaW4iXSwiYWRtaW5JZCI6MywiZXhwIjoxNTY1ODczMzE4fQ.hYiptH0rsI7VswsYZLMkNvsf3mGTfu7HYe_fnbOp56c',
            url: 'http://10.21.23.158:8888/communityPage/getHtmlPage',
            success: function (data) {
                //切换到空页面
                window.location.href = 'detail-page.html';
                //$("html").html(data.object.html); //更改html
            }
        })
    })
    $(".modal-body").on("click", "li", function () {
        var $imgName = $(this).attr("id");
        $.ajax({
            type: 'get',
            communityId: $imgName,
            status: '0',
            //Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJEZXBhcnRtZW50QWRtaW4iXSwiYWRtaW5JZCI6MywiZXhwIjoxNTY1ODczMzE4fQ.hYiptH0rsI7VswsYZLMkNvsf3mGTfu7HYe_fnbOp56c',
            url: 'http://10.21.23.158:8888/communityPage/getHtmlPage',
            success: function (data) {
                //切换到空页面
                window.location.href = 'detail-page.html';
                //$("html").html(data.object.html); //更改html
            }
        })
    })
    //点击查询状态的按钮，会出现查询入口
    let $inquireEntry = $("#inquireEntry");
    let $registerEntry = $("#registerEntry");
    let $loginEntry = $("#loginEntry");
    let $entryBtn = $(".entryBtn");
    (() => {
        let $outerBox = $("#outerBox");
        $inquireEntry.on("click", () => {
            $outerBox.show();
            $outerBox.siblings(".entryBtn").hide();
        })
    })();
    //点击注册社团的按钮，会出现注册入口
    (() => {
        let $outerBox1 = $("#outerBox1");
        $registerEntry.on("click", () => {
            $outerBox1.show();
            $outerBox1.siblings(".entryBtn").hide();
        })
    })();
    //点击登陆的按钮，会出现登录入口
    (() => {
        let $outerBox2 = $("#outerBox2");
        $loginEntry.on("click", () => {
            $outerBox2.show();
            $outerBox2.css({
                "left": "50%",
                "top": "50%"
            });
            $outerBox2.siblings(".entryBtn").hide();
        })
    })();
});