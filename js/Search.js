//搜索框
//监听鼠标或键盘触发激发的事件
var $value = $(".search input").val();
var $page;
var pageIndex;
$(".search input").on("keyup mouseup", function () {
    //获取到value √√√
    $value = $(".search input").val();
    //console.log($value)
    if ($value) {
        //调用函数
        $.ajax({
            type: 'get',
            data: {
                name: $value,
                page: 1,
                pageCount: 5
            },
            url: 'http://10.21.23.158:8888/home/search',
            success: function (data) {
                //返回数据
                let $club = data.object;
                console.log($club)
                //动态添加li
                $(".search-result ul").html("");
                for (var i = 0; i < $club.length; i++) {
                    let $li = document.createElement("li");
                    $($li).text($club[i].name) //获取数据的内容,设置
                    $($li).attr("id", $club[i].communityId);
                    $(".search-result ul").append($li); //添加到ul中
                }
                if ($club.length > 0) {
                    $(".search-result").css("display", "block"); //搜索结果列表display √
                }

            }
        })
    }

});
//失去焦点时隐藏搜索结果
$(".search input").on("blur", function () {
    $(".search-result").css("display", "none");
});

//点击搜索按钮或回车键，会有模态框出现,展示结果
$(".search .btn").on("click", function (e) {
    //alert("helloworld!")
    e.preventDefault();
    var $value = $(".search input").val();
    console.log($value)
    $(".modal-body .pagination").html('');
    //获取到搜索结果的总数，创建分页
    getCardsNum($value);
    //渲染第一页数据
    getCards($value, 1);

});

function getCardsNum(value) {
    $.ajax({
        type: 'get',
        url: 'http://10.21.23.158:8888/home/getSearchNum',
        data: {
            name: value
        },
        success: function (data) {
            //console.log(data.object.num)
            let $num = data.object.num;
            let $page = Math.ceil($num / 4); //向上取整
            //let $page = Math.ceil(18 / 4);
            //console.log($page)
            let isHiddenExist = 1;
            let pageIndex;
            createPaging(0);
            //事件委托,监听页码
            $(".modal-body .pagination").on("click", "li", function (e) {
                e.preventDefault(); //清除默认行为 √

            });
            $(".modal-body .pagination").on("click", ".page", function () {
                pageIndex = parseInt($(this).text()) - 1; //
                $(".modal-body .pagination .active").removeClass("active");
                $($(".modal-body .pagination .page")[pageIndex]).addClass("active");
                createPaging(pageIndex);
                if (pageIndex == 0) {
                    $($(".modal-body .pagination .control")[0]).addClass("disabled");
                } else {
                    $($(".modal-body .pagination .control")[0]).removeClass("disabled");
                }
                if (pageIndex == $page - 1) {
                    $($(".modal-body .pagination .control")[1]).addClass("disabled");
                } else {
                    $($(".modal-body .pagination .control")[1]).removeClass("disabled");
                }
                //调用函数
                let Index = parseInt($(this).text());
                console.log(Index)
                getCards($value, Index);
            })
            $(".modal-body .pagination").on("click", ".control", function () {
                if (!$(this).hasClass("disabled")) {
                    if ($(".modal-body .pagination .control").index($(this)) == 0 && pageIndex != 0) {
                        pageIndex--;
                    }
                    if ($(".modal-body .pagination .control").index($(this)) == 1 && pageIndex != $page - 1) {

                        pageIndex++;
                    }
                    $(".modal-body .pagination .active").removeClass("active");
                    $($(".modal-body .pagination .page")[pageIndex]).addClass("active");
                    createPaging(pageIndex);
                    if (pageIndex == 0) {
                        $($(".modal-body .pagination .control")[0]).addClass("disabled");
                    } else {
                        $($(".modal-body .pagination .control")[0]).removeClass("disabled");
                    }
                    if (pageIndex == $page - 1) {
                        $($(".modal-body .pagination .control")[1]).addClass("disabled");
                    } else {
                        $($(".modal-body .pagination .control")[1]).removeClass("disabled");
                    }
                    let Index;
                    if (!$(this).hasClass("disabled") && $(".modal-body .pagination .control").index($(this)) == 0) {
                        Index = parseInt($(".modal-body .pagination .active").text()) - 1;
                        //console.log(Index)
                        getCards($value, Index);
                    } else if (!$(this).hasClass("disabled") && $("#paging .pagination .control").index($(this)) == 1) {
                        Index = parseInt($(".modal-body .pagination .active").text()) + 1;
                        //console.log(Index)
                        getCards($value, Index);
                    }
                }
            })

            function createPaging(paging) {
                let newPage = '<li class="control disabled"><a href="#">&laquo;</a></li>';
                for (var i = 0; i < $page; i++) {
                    //如果是页首，中间页，页尾，当前页的前后2页则不省略。
                    if (i <= 2 || i < (paging + 2) && i > (paging - 2) || i > ($page - 3)) {
                        if (i == paging) {
                            let j = i + 1;
                            newPage += '<li class = "page active"><a href="#">' +
                                j +
                                '</a></li>';
                            isHiddenExist = 0;
                        } else {
                            let j = i + 1;
                            newPage += '<li class = "page "><a href="#">' +
                                j +
                                '</a></li>';
                            isHiddenExist = 0;
                        }
                    }
                    //否则就构造...
                    else {
                        if (isHiddenExist == 0) {
                            newPage += '<li class="disabled"><a href="#">' +
                                "..." +
                                '</a></li>';
                            isHiddenExist = 1;
                        }
                    }
                }
                newPage += '<li class="control"><a href="#">&raquo;</a></li>';
                $(".modal-body .pagination").html(newPage);
            }

        }
    });
}

/* $(".modal-body .pagination").on("click", "li", function (e) {
    e.preventDefault(); //清除默认行为 √
});
$(".modal-body .pagination").on("click", "li", function () {
    alert("s")
    $value = $(".search input").val();
    //调用函数
    pageIndex = parseInt($(this).text()) - 1; //
    $(".modal-body .pagination .active").removeClass("active");
    $($(".modal-body .pagination .page")[pageIndex]).addClass("active");
    createPaging(pageIndex, $page);
    if (pageIndex == 0) {
        $($(".modal-body .pagination .control")[0]).addClass("disabled");
    } else {
        $($(".modal-body .pagination .control")[0]).removeClass("disabled");
    }
    if (pageIndex == $page - 1) {
        $($(".modal-body .pagination .control")[1]).addClass("disabled");
    } else {
        $($(".modal-body .pagination .control")[1]).removeClass("disabled");
    }
    let Index = parseInt($(this).text());
    //console.log(Index)
    getCards($value, Index);
})
$(".modal-body .pagination").on("click", ".control", function () {
    $value = $(".search input").val();
    if ($(".modal-body .pagination .control").index($(this)) == 0 && pageIndex != 0) {
        pageIndex--;
    }
    if ($(".modal-body .pagination .control").index($(this)) == 1 && pageIndex != $page - 1) {

        pageIndex++;
    }
    $(".modal-body .pagination .active").removeClass("active");
    $($(".modal-body .pagination .page")[pageIndex]).addClass("active");
    createPaging(pageIndex, $page);
    if (pageIndex == 0) {
        $($(".modal-body .pagination .control")[0]).addClass("disabled");
    } else {
        $($(".modal-body .pagination .control")[0]).removeClass("disabled");
    }
    if (pageIndex == $page - 1) {
        $($(".modal-body .pagination .control")[1]).addClass("disabled");
    } else {
        $($(".modal-body .pagination .control")[1]).removeClass("disabled");
    }
    let Index;
    if (!$(this).hasClass("disabled") && $(".modal-body .pagination .control").index($(this)) == 0) {
        Index = parseInt($(".modal-body .pagination .active").text()) - 1;
        //console.log(Index)
        getCards($value, Index);
    } else if (!$(this).hasClass("disabled") && $(".modal-body .pagination .control").index($(this)) == 1) {
        Index = parseInt($(".modal-body .pagination .active").text()) + 1;
        //console.log(Index)
        getCards($value, Index);
    }


})

function createPaging(paging, $page) {
    let newPage = '<li class="control disabled"><a href="#">&laquo;</a></li>';
    for (var i = 0; i < $page; i++) {
        //如果是页首，中间页，页尾，当前页的前后2页则不省略。
        if (i <= 2 || i < (paging + 2) && i > (paging - 2) || i > ($page - 3)) {
            if (i == paging) {
                let j = i + 1;
                newPage += '<li class = "page active"><a href="#">' +
                    j +
                    '</a></li>';
                isHiddenExist = 0;
            } else {
                let j = i + 1;
                newPage += '<li class = "page "><a href="#">' +
                    j +
                    '</a></li>';
                isHiddenExist = 0;
            }
        }
        //否则就构造...
        else {
            if (isHiddenExist == 0) {
                newPage += '<li class="disabled"><a href="#">' +
                    "..." +
                    '</a></li>';
                isHiddenExist = 1;
            }
        }
    }
    newPage += '<li class="control"><a href="#">&raquo;</a></li>';
    $(".modal-body .pagination").html(newPage);
}
 */
function getCards($value, index) {
    $.ajax({
        type: 'get',
        data: {
            name: $value,
            page: index,
            pageCount: 4
        },
        url: 'http://10.21.23.158:8888/home/search',
        success: function (data) {
            //返回数据
            let $src = data.object;
            console.log($src.length)
            let $cards = '';
            for (var i = 0; i < $src.length; i++) {
                $cards +=
                    `<div class="img">
                    <img src = "${$src[i].src}" name=" ${$src[i].communityId}"> 
                    <span>${$src[i].name}
                    </span>
                </div>`
            }

            $(".modal-body .img").html($cards);

        }
    })
}
//监听分页被点击，获取对应数据