//获取所有标签、动态生成标签
$.ajax({
    type: 'get',
    url: 'http://10.21.23.158:8888/home/getLabel',
    data: {
        labelId: 0
    },
    success: function (data) {
        console.log(data)
        let $nav = '';
        let $arr = data.object;
        for (var i = 0; i < $arr.length; i++) {
            if (i == 0) {
                $nav += '<li id= "' +
                    $arr[i].labelId +
                    '" class="active"><a href="#">' +
                    $arr[i].name +
                    '</a></li>'
            } else {
                $nav += '<li id= "' +
                    $arr[i].labelId +
                    '"><a href="#">' +
                    $arr[i].name +
                    '</a></li>';
            }
        }
        $("#classify .nav").html($nav);
    }
});
//获取卡片总数,生成页数
getCardsNum(0); //默认传0接收
//标签切换改变class并且传值、再获取分页数据. √
//事件委托，监听动态生成的li点击事件
$(".nav-pills").on("click", "li", function (e) {
    //添加active类
    $(".nav-pills .active").removeClass("active");
    $(this).addClass("active");
    //获取到该类的页数，创建分页
    let $id = $(this).attr("id");
    //console.log($id)
    console.log($id);
    getCardsNum($id);
    //获取到该类第一页数据
    getCards($id, 1);
    function getCardsNum(labelId) {
        $.ajax({
            type: 'get',
            url: 'http://10.21.23.158:8888/home/getCardsNum',
            data: {
                labelId: labelId //默认为0，获取全部
            },
            success: function (data) {
                console.log(data);
                
                //console.log(data.object.num)
                let $num = data.object.num;
                let $page = Math.ceil($num / 4); //向上取整
                //let $page = Math.ceil(18 / 4);
                //console.log($page)
                let isHiddenExist = 1;
                let pageIndex;
                createPaging(0);
                //事件委托,监听页码
                $("#paging .pagination").on("click", ".page", function () {
                    pageIndex = parseInt($(this).text()) - 1; //
                    $("#paging .pagination .active").removeClass("active");
                    $($("#paging .pagination .page")[pageIndex]).addClass("active");
                    createPaging(pageIndex);
                    if (pageIndex == 0) {
                        $($("#paging .pagination .control")[0]).addClass("disabled");
                    } else {
                        $($("#paging .pagination .control")[0]).removeClass("disabled");
                    }
                    if (pageIndex == $page - 1) {
                        $($("#paging .pagination .control")[1]).addClass("disabled");
                    } else {
                        $($("#paging .pagination .control")[1]).removeClass("disabled");
                    }
                })
                $("#paging .pagination").on("click", ".control", function () {
                    if ($("#paging .pagination .control").index($(this)) == 0 && pageIndex != 0) {
                        pageIndex--;
                    }
                    if ($("#paging .pagination .control").index($(this)) == 1 && pageIndex != $page - 1) {
    
                        pageIndex++;
                    }
                    $("#paging .pagination .active").removeClass("active");
                    $($("#paging .pagination .page")[pageIndex]).addClass("active");
                    createPaging(pageIndex);
                    if (pageIndex == 0) {
                        $($("#paging .pagination .control")[0]).addClass("disabled");
                    } else {
                        $($("#paging .pagination .control")[0]).removeClass("disabled");
                    }
                    if (pageIndex == $page - 1) {
                        $($("#paging .pagination .control")[1]).addClass("disabled");
                    } else {
                        $($("#paging .pagination .control")[1]).removeClass("disabled");
                    }
                });
    
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
                    $("#paging .pagination").html(newPage);
                }
       
    
            }
        });
    }
   
    e.preventDefault(); //取消默认行为
});
function getCardsNum(labelId) {
        $.ajax({
            type: 'get',
            url: 'http://10.21.23.158:8888/home/getCardsNum',
            data: {
                labelId: labelId //默认为0，获取全部
            },
            success: function (data) {
                console.log(data);
                
                //console.log(data.object.num)
                let $num = data.object.num;
                let $page = Math.ceil($num / 4); //向上取整
                //let $page = Math.ceil(18 / 4);
                //console.log($page)
                let isHiddenExist = 1;
                let pageIndex;
                createPaging(0);
                //事件委托,监听页码
                $("#paging .pagination").on("click", ".page", function () {
                    pageIndex = parseInt($(this).text()) - 1; //
                    $("#paging .pagination .active").removeClass("active");
                    $($("#paging .pagination .page")[pageIndex]).addClass("active");
                    createPaging(pageIndex);
                    if (pageIndex == 0) {
                        $($("#paging .pagination .control")[0]).addClass("disabled");
                    } else {
                        $($("#paging .pagination .control")[0]).removeClass("disabled");
                    }
                    if (pageIndex == $page - 1) {
                        $($("#paging .pagination .control")[1]).addClass("disabled");
                    } else {
                        $($("#paging .pagination .control")[1]).removeClass("disabled");
                    }
                })
                $("#paging .pagination").on("click", ".control", function () {
                    if ($("#paging .pagination .control").index($(this)) == 0 && pageIndex != 0) {
                        pageIndex--;
                    }
                    if ($("#paging .pagination .control").index($(this)) == 1 && pageIndex != $page - 1) {
    
                        pageIndex++;
                    }
                    $("#paging .pagination .active").removeClass("active");
                    $($("#paging .pagination .page")[pageIndex]).addClass("active");
                    createPaging(pageIndex);
                    if (pageIndex == 0) {
                        $($("#paging .pagination .control")[0]).addClass("disabled");
                    } else {
                        $($("#paging .pagination .control")[0]).removeClass("disabled");
                    }
                    if (pageIndex == $page - 1) {
                        $($("#paging .pagination .control")[1]).addClass("disabled");
                    } else {
                        $($("#paging .pagination .control")[1]).removeClass("disabled");
                    }
                });
    
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
                    $("#paging .pagination").html(newPage);
                }
       
    
            }
        });
    }

//监听分页被点击，获取对应数据
$("#paging .pagination").on("click", "li", function (e) {
    e.preventDefault(); //清除默认行为 √

});
$("#paging .pagination").on("click", ".page", function () {
    let $activeId = $(".nav-pills li").index($(".nav-pills .active"));
    //调用函数
    let Index = parseInt($(this).text()) - 1;
    //console.log(Index)
    getCards($activeId, Index);
})
$("#paging .pagination").on("click", ".control", function () {
    let $activeId = $(".nav-pills li").index($(".nav-pills .active"));
    let Index;
    if (!$(this).hasClass("disabled") && $("#paging .pagination .control").index($(this)) == 0) {
        Index = parseInt($("#paging .pagination .active").text()) - 2;
        //console.log(Index)
        getCards($activeId, Index);
    } else if (!$(this).hasClass("disabled") && $("#paging .pagination .control").index($(this)) == 1) {
        Index = parseInt($("#paging .pagination .active").text());
        //console.log(Index)
        getCards($activeId, Index);
    }


})
//获取到初始图片数据
getCards(0, 1);

function getCards(labelId, page) {
    $.ajax({
        type: 'get',
        url: 'http://10.21.23.158:8888/home/getCards',
        data: {
            labelId: labelId,
            page: page
        },
        success: function (data) {
            //console.log(data);
            let $src = data.object;
            let $cards = '';
            for (var i = 0; i < $src.length; i++) {
                $cards += `<div class="img">
                <img src = "${$src[i].src}" name=" ${$src[i].communityId}"> 
                <span>${$src[i].name}
                </span>
            </div>`
            }
            //加上分页
            $("#paging .img").html($cards);
        }
    });
}