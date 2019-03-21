$(function(){

    // modal
    $(document).on('click', '[data-href^="#modal"]', function() {
        var target = $(this).data('href');
        var t = $(window).scrollTop();
        var h = $(window).height();
        
        $(target).addClass('on');
        if (h < 800) $(target).find('.modal_body').css({'position': 'absolute', 'top': t + 50 + 'px', 'bottom': 'auto'});
        else 
        $(target).find('.modal_body').css({'position': 'fixed', 'top': 0, 'bottom': 0});
        return false;
    });

    // modal close
    $(document).on('click', '.modal .close, .mask', function() {
        if($(this).parent().parent().hasClass("mopdal_letter")){  
            $(this).parent().parent().removeClass('on');
        } else {
            $('.modal').removeClass('on');
        }
    });
    // esc key modal close
    $(document).keyup(function(e) {
        if (e.keyCode === 27 && $('.modal').is(':visible')) {
            $('.modal').removeClass('on');
        };
    });

    $(".controls .next").on("click", function(e){
        setWeek(week + 1);
    });
    $(".controls .prev").on("click", function(e){
        setWeek(week - 1);
    });

    $("[data-nav]").on("click", function(){
        var page = $(this).attr("data-nav");
        setPageScroll(page);
    });    

    // x3 지정
    $('[data-list="1"] [data-card="2"]').addClass("x3");
    $('[data-list="3"] [data-card="2"]').addClass("x3");

});

var page = 0;

function checkScroll(){
    var scroll = $(window).scrollTop();
    for(var i=0; i < pageOfs.length; i++){
        if(pageOfs[i] < scroll){
            continue;
        } else {
            setPageScroll(pageOfs[i]);
        }
    }
}

function setPageScroll(_page){
    $("html").animate({
        "scrollTop" : pageOfs[_page]
    }, 500);
}

function setNavi(_page){
    $('[data-nav=' + page +']').removeClass("on");
    $('[data-nav=' + _page +']').addClass("on");
    page = _page;
}

var pageOfs = [
    0, 600, 1700, 2200, 2700, 4150, 4750, 5500,
]

$(window).scroll(function(){
    // $("#test").html($(window).scrollTop());
    var scroll = $(window).scrollTop();
    if(scroll <= 500){
        setNavi(0);
    } else if(scroll <= 600){
        setNavi(1);
    } else if(scroll <= 1700){
        setNavi(2);
    } else if(scroll <= 2200){
        setNavi(3);
    } else if(scroll <= 2700){
        setNavi(4);
    } else if(scroll <= 4150){
        setNavi(5);
    } else if(scroll <= 4750){
        setNavi(6);
    }  else if(scroll <= 5500){
        setNavi(7);
    }
});


var week = 0;
function setWeek(_week){
    $(".week_reward li").eq(week).hide();
    if(_week < 0){
        week = 5;
    } else if(_week > 5){
        week = 0;
    } else {
        week = _week;
    }
    $(".week_reward li").eq(week).show();
}

function setGauge(_comment){
    if(_comment <= 0){
        $(".line_a").css("width", "0%");
    } else if(_comment < 1200){
        $(".line_a").css("width", "5%");
    } else if(_comment < 2400){
        $(".line_a").css("width", "15%");
    } else if(_comment < 3600){
        $(".line_a").css("width", "40%");
    } else if(_comment < 4800){
        $(".line_a").css("width", "60%");
    } else if(_comment < 6000){
        $(".line_a").css("width", "85%");
    } else if(_comment == 6000){
        $(".line_a").css("width", "100%");
    } else if(_comment < 7200){
        $(".line_b").css("width", "5%");
    } else if(_comment < 8400){
        $(".line_b").css("width", "15%");
    } else if(_comment < 9600){
        $(".line_b").css("width", "40%");
    } else if(_comment < 10800){
        $(".line_b").css("width", "60%");
    } else if(_comment < 12000){
        $(".line_b").css("width", "85%");
    } else if(_comment >= 12000){
        $(".line_b").css("width", "100%");
    }
    if (_comment > 6000) {
        $(".line_a").css("width", "100%");
    }

    var count = 0;
    if(_comment >= 1200){ count = 1; }
    if(_comment >= 2400){ count = 2; }
    if(_comment >= 3600){ count = 3; }
    if(_comment >= 4800){ count = 4; }
    if(_comment >= 6000){ count = 5; }
    if(_comment >= 7200){ count = 6; }
    if(_comment >= 8400){ count = 7; }
    if(_comment >= 9600){ count = 8; }
    if(_comment >= 10800){ count = 9; }
    if(_comment >= 12000){ count = 10; }

    $('[data-comment]').removeClass("on");
    for(var i=0; i<count; i++){
        $('[data-comment="' + i +'"]').addClass("on");
    }
}
