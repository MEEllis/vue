(function ($) {
    $.fn.navtab = function (configs) {
        var settings = $.extend({toggleClass: "current", targetClass: "subnav"}, configs || {});
        return this.each(function () {
            var container = this;
            var $tags = $(container).children();
            var cur = 0;
            var index = 0;
            $tags.each(function (i, item) {
                if ($(item).hasClass(settings.toggleClass)) {
                    if (i !== index) {
                        cur = index = i
                    }
                }
                if ($(this).children("." + settings.targetClass)) {
                    var targetNode = $(this).children("." + settings.targetClass)
                }
                $(item).hover(function () {
                    $tags.eq(cur).removeClass(settings.toggleClass);
                    $(this).addClass(settings.toggleClass);
                    cur = i;
                    if (!!targetNode) {
                        targetNode.slideDown(200)
                    }
                }, function () {
                    if (!!targetNode) {
                        targetNode.hide()
                    }
                })
            });
            $(container).mouseleave(function () {
                if (cur !== index) {
                    $tags.eq(cur).removeClass(settings.toggleClass);
                    $tags.eq(index).addClass(settings.toggleClass);
                    cur = index
                }
            })
        })
    };
    $.fn.picfade = function (configs) {
        var settings = $.extend({tags: "li", toggleClass: "on", auto: true, shownav: true, timerange: 6000}, configs || {});
        return this.each(function () {
            var container = this;
            var $tags = $(container).children();
            var tagslen = $tags.size();
            if (tagslen < 2) {
                return false
            }
            var curid = 0;
            var targetid = 0;
            var timer = null;
            if (settings.shownav) {
                var $nav = $('<div class="circle"></div>').insertAfter(container);
                var navStr = "";
                for (var i = 0; i < tagslen; i++) {
                    navStr += "<span>&nbsp;</span>"
                }
                var $as = $nav.html(navStr).children();
                $as.first().addClass(settings.toggleClass);
                $as.each(function (i, item) {
                    $(item).mouseover(function () {
                        settings.auto = false;
                        targetid = i;
                        fade(curid, targetid);
                        curid = targetid
                    }).mouseout(function () {
                        settings.auto = true
                    })
                })
            }
            $(container).hover(function () {
                settings.auto = false
            }, function () {
                settings.auto = true
            });
            timer = window.setInterval(function () {
                if (!settings.auto) {
                    return false
                }
                if (targetid === tagslen - 1) {
                    targetid = 0
                } else {
                    targetid += 1
                }
                fade(curid, targetid);
                curid = targetid
            }, settings.timerange);
            function fade(cid, nextid) {
                if (cid === nextid) {
                    return false
                }
                $tags.eq(cid).fadeOut(1000);
                $tags.eq(nextid).fadeIn(800);
                if (settings.shownav) {
                    $as.eq(cid).removeClass(settings.toggleClass);
                    $as.eq(nextid).addClass(settings.toggleClass)
                }
            }
        })
    };
})(jQuery);

$(function () {
    $(".lazy").lazyload();
    $.stellar({horizontalScrolling: false, verticalOffset: 30});
    $("#topNav").navtab();
    $("#crossbanenr").picfade({timerange: 3000});
    var mod = $(".figure");
    var $body = $("body");
    var dataArr = [];
    $(mod).each(function (i, item) {
        if (i === 0) {
            dataArr[i] = $(item).offset().top - Math.floor($(item).height() / 2) - 100
        } else {
            dataArr[i] = $(item).offset().top - Math.floor($(item).height() / 2)
        }
    });
    var winHeight = $(window).height();
    var bodyheight = $body.height();
    $(".crossbanenr").animate({height: (winHeight - 150) > 540 ? (winHeight - 150) : 540}, 100, function () {
    });
    $(window).resize(function () {
        winHeight = $(window).height();
        bodyheight = $body.height();
        $(".crossbanenr").animate({height: (winHeight - 150) > 540 ? (winHeight - 150) : 540}, 100, function () {
        })
    });
    var isIE = !!window.ActiveXObject;
    var scrollTop = $(window).scrollTop();
    var clientHeight = $(window).height();
    var contentHeight = 584;
    var barHeight = 600;
    var firstHeight = 778;
    var topHeight = 321;
    var thirdScroll = clientHeight < (topHeight + firstHeight) ? contentHeight : (contentHeight - clientHeight + topHeight + firstHeight);
    var fourthScroll = thirdScroll + contentHeight + barHeight;
    var fifthScroll = fourthScroll + contentHeight + barHeight;
    var sixthScroll = fifthScroll + contentHeight + barHeight;
    var changeH = (firstHeight + topHeight - clientHeight) / 2;
    var st = new Date().getTime();
    $(window).scroll(function (e) {
        scrollTop = $(window).scrollTop();
        if (scrollTop >= firstHeight) {
            $("#topbar").addClass("topicfixed")
        } else {
            if ($("#topbar").hasClass("topicfixed")) {
                $("#topbar").removeClass("topicfixed")
            }
        }
        if (scrollTop < 100) {
            $body.attr("id", "pg0")
        }
        $(dataArr).each(function (i, item) {
            if (Math.floor(winHeight / 2) + scrollTop >= item) {
                $body.attr("id", "pg" + (i + 1))
            }
        });
        if (scrollTop + winHeight >= bodyheight) {
            $body.attr("id", "pg7")
        }
    })
});