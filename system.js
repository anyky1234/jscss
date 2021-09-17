/*
** ZanPianCms V9
** domain:kankongjian.com kuaijuqing.com
*/ 
var zanpiancms = {
    //右侧滑块
    'tool': function () {
            var a = $(window);
            $scrollTopLink = $(".back-top");
            $scrollTopHead = $(".header-top");
            $scrollTopNav = $("#top-nav");
            if ($scrollTopHead.offset().top > 500) {
                $scrollTopHead.addClass("header-top-down");
            }
            a.scroll(function () {
                500 < $(this).scrollTop() ? $scrollTopLink.css("display", "block") : $scrollTopLink.css("display", "none");
                400 > $(this).scrollTop() ? $scrollTopHead.removeClass("header-top-down") : $scrollTopHead.addClass("header-top-down");
                if ($(".header-top.home").length > 0) {
                    0 < $(this).scrollTop() ? $scrollTopHead.removeClass("color") : $scrollTopHead.addClass("color");
                }

            });
            $scrollTopLink.on("click", function () {
                $("html, body").animate({
                    scrollTop: 0
                }, 400);
                return !1
            })
        },
	'ajax': function(url, type, datatype, data, sfun, efun, cfun) {
		type = type || 'get';
		dataType = datatype || 'json';
		data = data || '';
		zanpiancms.tip.open({
			css: "loadings",
			msg: "数据提交中..."
		}, function(e) {
			$.ajax({
				type: type,
				data: data,
				dataType: datatype,
				cache: false,
				url: url,
				timeout: 3000,
				beforeSend: function(XHR) {},
				error: function(XHR, textStatus, errorThrown) {
					if (efun) efun(XHR, textStatus, errorThrown);
				},
				success: function(data) {
					sfun(data);
				},
				complete: function(XHR, TS) {
					if (cfun) cfun(XHR, TS);
				}
			});
		});
	},		
        'tip': {
            'auto': function (ox, callback) {
                    var tipbox = $("#zanpian-tips-box");
                    var w = $(window).width();
                    var h = $(window).height();
                    var t = (h - tipbox.height()) / 2;
                    var l = (w - tipbox.width()) / 2;
                    tipbox.css("top", t);
                    tipbox.css("left", l);
                },
                'close': function (e) {
                    $("#zanpian-tips-bg").remove();
                    $("#zanpian-tips-box").remove();
                    $("#zanpian-tips-content").remove();
                },
                'hide': function (e) {
                    var oxdefaults = {
                        intvaltime: 1000
                    };
                    e = e || {};
                    if (e.msg != null && e.msg != undefined) {
                        $("#zanpian-tips-tip").html(e.msg);
                    }
                    if (parseInt(e.rcode) == 1 || parseInt(e.code) == 1 || parseInt(e.code) > 0) {
                        $("#zanpian-tips-tip").removeClass('loadings error alert').addClass('succ');
                    } else if (parseInt(e.rcode) < 1 || parseInt(e.code) < 1) {
                        $("#zanpian-tips-tip").removeClass('loadings alert succ').addClass('error');
                    }
                    setTimeout(function () {
                        zanpiancms.tip.close();
                    }, oxdefaults.intvaltime);
                },
                'open': function (ox, callback) {
                    $(window).resize(function () {
                        zanpiancms.tip.auto();
                    });
                    var type = typeof callback === 'function';
                    var oxdefaults = {
                        msg: '数据加载中,请稍后...',
                        wantclose: 1,
                        autoclose: 1,
                        css: 'loadings',
                        html: '',
                        title: '',
                        intvaltime: 1000,
                    };
                    ox = ox || {};
                    $.extend(oxdefaults, ox);
                    $("#zanpian-tips-bg").remove();
                    $("#zanpian-tips-box").remove();
                    if (oxdefaults.wantclose == 1) {
                        var floatdiv = $('<div id="zanpian-tips-bg"></div><div id="zanpian-tips-box" class="png-img"><table class="zanpian-tips-box"><tr><td><div class="zanpian-tips"><div class="zanpian-tips-cnt" id="zanpian-tips-cnt"><div class="zanpian-tips-tip alert" id="zanpian-tips-tip"><span id="xtip">' + oxdefaults.msg + '</span></div></div><div class="zanpian-tips-close"><span class="close">关闭</span></div></div></td></tr></table></div>');
                        $("body").append(floatdiv);
                        zanpiancms.tip.auto();
                        $("#zanpian-tips-bg").fadeIn(500);
                        $("#zanpian-tips-box").fadeIn(500);
                        $("#zanpian-tips-tip").removeClass('succ error alert loadings').addClass(oxdefaults.css);
                        $(".zanpian-tips-close").click(function () {
                            zanpiancms.tip.close();
                        });
                        if (type) {
                            return callback();
                        }
                    } else if (oxdefaults.wantclose == 2) {
                        var floatdiv = $('<div id="zanpian-tips-bg"></div><div id="zanpian-tips-box" class="png-img"><table class="zanpian-tips-box"><tr><td><div class="zanpian-tips"><div class="zanpian-tips-cnt" id="zanpian-tips-cnt"><div class="zanpian-tips-tip alert" id="zanpian-tips-tip"><span id="xtip">' + oxdefaults.msg + '</span></div></div><div class="zanpian-tips-todo"><a class="tips-link tips-link-small" href="javascript:void(0);" id="confirm">确定</a><a class="tips-link tips-link-small"  id="cancel">取消</a><input type="hidden" id="hideval" value=""/></div><div class="zanpian-tips-close"><span class="close">关闭</span></div></div></td></tr></table></div>');
                        $("body").append(floatdiv);
                        zanpiancms.tip.auto();
                        $("#zanpian-tips-bg").fadeIn(500);
                        $("#zanpian-tips-box").fadeIn(500);
                        $(".zanpian-tips-close").click(function () {
                            zanpiancms.tip.close();
                        });
                        $("#cancel").click(function () {
                            zanpiancms.tip.close();
                        });
                        $("#confirm").click(function (e) {
                            if (type) {
                                return callback();
                            }
                        })
                    } else if (oxdefaults.wantclose == 3) {
                        var floatdiv = $('<div id="zanpian-pop-bg"></div><div id="zanpian-tips-box"><div id="zanpian-tips-content"><div id="zanpian-tips-con">' + oxdefaults.html + '</div></div><div id="zanpian-tips-close">close</div></div>');
                        $("body").append(floatdiv);
                        zanpiancms.tip.auto();
                        $("#zanpian-tips-bg").fadeIn(500);
                        $("#zanpian-tips-box").fadeIn(500);
                        $("#zanpian-tips-close").click(function () {
                            zanpiancms.tip.close();
                        });
                        $("#cancel").click(function () {
                            zanpiancms.tip.close();
                        });
                        $("#confirm").click(function (e) {
                            if (type) {
                                return callback();
                            }
                        })
                    } else {
                        var floatdiv = $('<div id="zanpian-tips-bg"></div><div id="zanpian-tips-box" class="png-img"><table class="zanpian-tips-box"><tr><td><div class="zanpian-tips"><div class="zanpian-tips-cnt" id="zanpian-tips-cnt"><div class="zanpian-tips-tip alert" id="zanpian-tips-tip"><span id="xtip">' + oxdefaults.msg + '</span></div></div><div class="zanpian-tips-close"><span class="close">关闭</span></div></div></td></tr></table></div>');
                        $("body").append(floatdiv);
                        zanpiancms.tip.auto();
                        $("#zanpian-tips-bg").fadeIn(500);
                        $("#zanpian-tips-box").fadeIn(500);
                        $("#zanpian-tips-cnt").fadeIn(500);
                        $("#zanpian-tips-tip").removeClass('succ error alert loadings').addClass(oxdefaults.css);
                        $(".zanpian-tips-close").click(function () {
                            zanpiancms.tip.close();
                        });
                        setTimeout(function () {
                            zanpiancms.tip.close();
                        }, oxdefaults.intvaltime);
                    }
                    $('#zanpian-tips-bg').bind('click', function (e) {
                        pp = setTimeout("zanpiancms.tip.close()", oxdefaults.intvaltime);
                        zanpiancms.tip.close(e);
                        if (pp != null) {
                            clearTimeout(pp);
                        }
                    });
                },
        },
        'pop': {
            'auto': function (ox, callback) {
                    var tipbox = $("#zanpian-pop-box");
                    var w = $(window).width();
                    var h = $(window).height();
                    var t = (h - tipbox.height()) / 2;
                    var l = (w - tipbox.width()) / 2;
                    tipbox.css("top", t);
                    tipbox.css("left", l);
                },
                'close': function (e) {
                    $("#zanpian-pop-bg").remove();
                    $("#zanpian-pop-box").remove();
                    $("#zanpian-pop-content").remove();
                },
                'url': function (ox, callback) {
                    $(window).resize(function () {
                        zanpiancms.pop.auto();
                    });
                    var type = typeof callback === 'function';
                    var oxdefaults = {
                        url: '',
                        data: '',
                        type: 'get',
                        dataType: 'json',
                        timeout: 5000,
                    };
                    ox = ox || {};
                    $.extend(oxdefaults, ox);
                    $("#zanpian-pop-bg").remove();
                    $("#zanpian-pop-box").remove();
                    $("#zanpian-pop-content").remove();
                    var floatdiv = $('<div id="zanpian-pop-bg"></div><div id="zanpian-pop-box"><div id="zanpian-pop-content"><div id="zanpian-pop-con"></div></div><div id="zanpian-pop-close">close</div></div>');
                    $("body").append(floatdiv);
                    $("#zanpian-pop-close").click(function () {
                        zanpiancms.pop.close();
                    });
                    $.ajax({
                        url: oxdefaults.url,
                        type: oxdefaults.type,
                        dataType: oxdefaults.dataType,
                        data: oxdefaults.data,
                        timeout: oxdefaults.timeout,
                        beforeSend: function (XHR) {},
                            error: function (XHR, textStatus, errorThrown) {},
                            success: function (json) {
                                $("#zanpian-pop-con").html(json);
                                zanpiancms.pop.auto();
                                $(".zanpian-modal").show();
                                $("#zanpian-pop-bg").fadeIn(500);
                                $("#zanpian-pop-box").fadeIn(500);
                                $("#zanpian-pop-content").fadeIn(500);
                            },
                            complete: function (XMLHttpRequest, status) {
                                if (status == 'timeout') { //超时,status还有success,error等值的情况
                                    　　　　　
                                    ajaxTimeOut.abort(); //取消请求
                                    　　　　
                                }
                            }
                    })
                    $('#zanpian-pop-bg').bind('click', function (e) {
                        pp = setTimeout("zanpiancms.tip.close()", oxdefaults.intvaltime);
                        zanpiancms.pop.close(e);
                        if (pp != null) {
                            clearTimeout(pp);
                        }
                    });
                }
        },
	'list': {
		'init': function() {
			zanpiancms.list.ajax();
			zanpiancms.list.more();
		},
		'ajax': function() {
			//AJAX列表相关
			try {
				if (type_ajax_url != undefined && type_ajax_url != null) {
					$('body').on("click", ".type-select ul li a", function(e) {
						msg_list_loading = false;
						if (type_parms != undefined && type_parms != null) {
							var curdata = $(this).attr('data').split('-');
							if (curdata[0] == 'id' || curdata[0] == 'sid') {
								type_parms = {"id": curdata[1],"mcid": "0","area": "0","year": "0","letter": "0","sid": "0","wd": "0","sex": "0","zy": "0","order": "0","picm": 1,"p": 1
								};
								zanpiancms.list.deltype();
							}
							type_parms[curdata[0]] = curdata[1];
							type_parms['p'] = 1;
							url = zanpiancms.list.parseurl(type_parms);
							$(this).parent().addClass('active');
							$(this).parent().siblings().removeClass('active');
							$(this).addClass('active');
							$(this).siblings().removeClass('active');
							zanpiancms.list.url(url);
							zanpiancms.list.deltitle()
						}
						return false;
					});
					$('body').on("click", ".type-select-t ul li a", function(e) {
						msg_list_loading = false;
						if (type_parms != undefined && type_parms != null) {
							curdata = $(this).attr('data').split('-');
							if (curdata[0] == 'id' || curdata[0] == 'sid') {
								type_parms = {
									"id": curdata[1],"mcid": "0","area": "0","year": "0","letter": "0","sid": "0","wd": "0","sex": "0","zy": "0","order": "0","picm": 1,"p": 1
								};
								zanpiancms.list.deltype();
							}
							type_parms[curdata[0]] = curdata[1];
							type_parms['p'] = 1;
							url = zanpiancms.list.parseurl(type_parms);
							$(this).parent().addClass('active');
							$(this).parent().siblings().removeClass('active');
							$(this).addClass('active');
							$(this).siblings().removeClass('active');
							zanpiancms.list.deloption(curdata[0]);
							zanpiancms.list.url(url);
							$(this).remove();
							return false;
						}

					});
					$('body').on("click", ".ajax-page ul li a,.week-list a", function(e) {		  
						e.preventDefault();
						$(this).parent().addClass('active');
						$(this).parent().siblings().removeClass('active');
						$(this).addClass('active');
						$(this).siblings().removeClass('active');
						var curdata = $(this).attr('data').split('-');
						type_parms[curdata[0]] = curdata[1];
						var url = zanpiancms.list.parseurl(type_parms);
						zanpiancms.list.url(url);
					});
					$('body').on("click", ".ajax-nav-tabs a", function(e) {
						e.preventDefault();
						var curdata = $(this).attr('data').split('-');
						type_parms[curdata[0]] = curdata[1];
						type_parms['p'] = 1;
						var url = zanpiancms.list.parseurl(type_parms);
						$(this).parent().siblings().removeClass('active');
						$(this).parent().addClass('active');
						$(this).siblings().removeClass('active');
						$(this).addClass('active');
						zanpiancms.list.url(url);
					});
					$('body').on("click", ".seach-nav-tabs li a", function(e) {
						e.preventDefault();
						var curdata = $(this).attr('data').split('-');
						type_parms[curdata[0]] = curdata[1];
						type_parms['p'] = 1;
						var url = zanpiancms.list.parseurl(type_parms);
						$('.seach-nav-tabs li a').each(function(e) {
							$(this).removeClass('active');
						});
						$(this).addClass('active');
						zanpiancms.list.url(url);
					});
					$('body').on("click", "#conreset a", function(e) {
						msg_list_loading = false;
						var curdata = $(this).attr('data').split('-');
						type_parms = {
							"id": curdata[1],"mcid": "0","area": "0","year": "0","letter": "0","sid": "0","wd": "0","sex": "0","zy": "0","order": "0","picm": 1,"p": 1
						};
						url = zanpiancms.list.parseurl(type_parms);
						zanpiancms.list.url(url);
						zanpiancms.list.deltype();
						zanpiancms.list.deltitle();
						return false;
					});

				}
			} catch (e) {};

		},
		'deltitle': function() {
			var constr = '';
			$('.type-select ul li a').each(function(e) {
				if ($(this).parent().hasClass('active')) {
					var data = $(this).attr('data').split('-');
					if ($(this).html() == '全部') constr += ' ';
					else constr += '<li class="opt"><a data="' + data[0] + '-0">' + $(this).html() + '<span></span></a></li>';
				}
			});
			var txt = '<li><a class="text-muted">已选</a></li>';
			if (constr != '') $('.conbread').html(txt + constr);
		},
		'deltype': function() {
			$('.type-select ul li a').each(function(e) {
				$(this).parent().removeClass('active');
				if ($(this).html() == '全部') {
					$(this).parent().addClass('active');
				}
			});
			return false;
		},
		'deloption': function(data) {
			$("#" + data).children().removeClass('active');
			$("#" + data + " a").each(function(e) {
				if ($(this).html() == '全部') {
					$(this).parent().addClass('active');
				}
			});

		},
		'parseurl': function(rr) {
			var url = cms.root + type_ajax_url;
			for (var c in rr) {
				if (rr[c] != '0') {
					url = url + "-" + c + "-" + rr[c];
				}
			}
			return url;
		},
		'url': function(url) {
			$("#content").html('<div class="loading"></div>');
			msg_list_loading = false;
			$.ajax({
				url: url,
				timeout: 5000,
				error: function(XHR, textStatus, errorThrown) {},
				success: function(data) {
					var value = jQuery('#content', data).html();
					if (value == null || value == '') {
						value = '<div class="kong">抱歉，没有找到相关内容！</div>';
					}
					$("#content").html(value);
					$("#short-page").html(jQuery('#short-page', data).html())
					$("#page").html(jQuery('#page', data).html())
					$("#total-page").html(jQuery('#total-page', data).html())
					$("#current-page").html(jQuery('#current-page', data).html())
					$("#count").html(jQuery('#count', data).html());
					zanpian.lazyload.tab("#content");
					if ($(".main-left").height() > $(".main-right").height()) {
						zanpian.fixbar(".main-left", ".main-right");
					}
				},
				complete: function(XMLHttpRequest, status) {
					XMLHttpRequest = null
				}
			})
		},
		//列表AJAX响应
		'more': function() {
			if ($('#content-more').length > 0) {
				var msg_list_loading = false;
				var p = 2;
				$(window).scroll(function() {
					if (!msg_list_loading) {
						load_more_msg(type_ajax_url);
					}
				})
				function load_more_msg(url) {
					var winH = $(window).height();
					var pageH = $(document.body).height();
					var scrollT = $(window).scrollTop(); //滚动条top
					var aa = (pageH - winH - scrollT) / winH;
					if (aa < 0.02) {
						msg_list_loading = true;
						type_parms['p'] = p;
						var url = zanpiancms.list.parseurl(type_parms);
						$("#content-more").append('<div class="loading"></div>');
						$.ajax({
							url: url,
							timeout: 5000,
							error: function(XHR, textStatus, errorThrown) {},
							success: function(data) {
								var value = jQuery('#content', data).html();
								var kong = jQuery('.kong', data).html();
								$("#content-more").find(".loading").remove();
								if (kong) {
									$(".kong").remove();
									value = '<div class="kong">我是有底线的！</div>';
									msg_list_loading = true;
									$("#content-more").append(value);
									$('body').on("click", ".type-select ul li a,#conreset a", function(e) {
										msg_list_loading = false;
									})
									return false;
								}
								$("#content-more").removeClass("content-more").append(value);
								$("#page-count").html(jQuery('#page-count', data).html());
								$("#page").html(jQuery('#page', data).html())
								msg_list_loading = false;
								zanpian.lazyload.tab("#content-more");
								p++;
								$('body').on("click", ".type-select ul li a,#conreset a", function(e) {
									p = 2;
									msg_list_loading = false;
								})
							},
							complete: function(XMLHttpRequest, status) {
								XMLHttpRequest = null
							}
						})
					}
				}
			}
			if ($('#content-more-loading').length > 0) {
				var msg_list_loading = false;
				var p = 2;
				$('body').on("click", "#content-more-loading", function() {
					if (!msg_list_loading) {
						loading_more_msg(type_ajax_url);
					}
				});
				function loading_more_msg(url) {
					msg_list_loading = true;
					type_parms['p'] = p;
					var url = zanpiancms.list.parseurl(type_parms);
					$("#content-more-loading").append('<div class="loading"></div>');
					$.ajax({
						url: url,
						timeout: 5000,
						error: function(XHR, textStatus, errorThrown) {},
						success: function(data) {
							var value = jQuery('#content', data).html();
							var kong = jQuery('.kong', data).html();
							$("#content-more-loading").find(".loading").remove();
							$("#content-more-loading").find(".more-loading").remove();
							if (kong) {
								$(".kong").remove();
								value = '<div class="kong">我是有底线的！</div>';
								msg_list_loading = true;
								$("#content-more-loading").append(value);
								$('body').on("click", ".type-select ul li a,#conreset a", function(e) {
									msg_list_loading = false;
								})
								return false;
							}
							$("#content-more-loading").removeClass(".more-loading").append(value);
							$("#page-count").html(jQuery('#page-count', data).html());
							$("#page").html(jQuery('#page', data).html())
							msg_list_loading = false;
							zanpian.lazyload.tab("#content-more-loading");
							p++;
							$('body').on("click", ".type-select ul li a,#conreset a", function(e) {
								p = 2;
								msg_list_loading = false;
							})
						},
						complete: function(XMLHttpRequest, status) {
							XMLHttpRequest = null
						}
					})
				}
			}
		}
	},		
        'fixbar': function (a, b) {
            var c = $(a),
                d = $(b),
                e = c.offset().top,
                f = d.offset().top,
                w = d.width() + 20;
            $(window).resize(g).scroll(g).trigger("resize");

            function g() {
                var g = $(window).scrollLeft(),
                    h = $(window).scrollTop(),
                    i = $(document).height(),
                    j = $(window).height(),
                    k = c.height(),
                    l = d.height(),
                    m = k > l ? f : e,
                    n = k > l ? d : c,
                    o = k > l ? c.offset().left + c.outerWidth(!0) - g : d.offset().left - c.outerWidth(!0) - g,
                    p = k > l ? l : k,
                    q = k > l ? k : l,
                    r = parseInt(q - j) - parseInt(p - j);
                $(a + "," + b).removeAttr("style"), j > i || p > q || m > h || p - j + m >= h ? n.removeAttr("style") : j > p && h - m >= r || p > j && h - m >= q - j ? n.attr("style", "margin-top:" + r + "px;") : n.attr("style", "_margin-top:" + (h - m) + "px;position:fixed;width:" + w + "px;left:" + o + "px;" + (j > p ? "top" : "bottom") + ":0;")
            }
        },
        'slider': {
            'index': function () {
                    //首页幻灯片开始
                    if ($('.index-slide').length > 0 && $('.index-slide-txt').length > 0) {
                        var thumbsSwiper = new Swiper('.index-slide-txt', {
                            slidesPerView: 1,
                            allowSlideNext: false,
                            allowSlidePrev: false,
                            watchSlidesVisibility: true,
                            //防止不可点击
                        })
                        var swiper = new Swiper('.index-slide', {
                            lazy: {
                                loadPrevNext: true,
                            },
                            loop: true,
                            autoplay: true,
                            effect: 'fade',
                            pagination: {el: '.index-slide .swiper-pagination',clickable: true,},
                            thumbs: {swiper: thumbsSwiper,},
                        });
                        var slidetxt = $(".index-slide-txt .swiper-slide");
                        for (i = 0; i < slidetxt.length; i++) {
                            slidetxt[i].index = i + 1;
                            slidetxt[i].onmouseover = function () {
                                swiper.slideTo(this.index);
                            };
                        }
                        for (i = 0; i < swiper.pagination.bullets.length; i++) {
                            swiper.pagination.bullets[i].onmouseover = function () {
                                this.click();
                            };
                        }
                    }
                    var articleswiper = new Swiper('#article-slide', {
                        lazy: {loadPrevNext: true,},
                        loop: true,
                        autoHeight: true,
                        navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
                        pagination: {el: ' .swiper-pagination',clickable: true,},
                        fadeEffect: {crossFade: true,}
                    });
                },
                'nav': function (a) {
                    if ($(a).length > 0) {
                        try {
                            var menuSwiper = new Swiper(a, {
                                freeMode: true,
                                slidesPerView: "auto",
                                observer: true,
                                observeParents: true,
                            })
                            var currentSlide = $(a + " .swiper-wrapper").find("li.active"),
                                slideWidth = currentSlide.outerWidth(),
                                slideLeft = currentSlide.offset().left,
                                maxTranslate = menuSwiper.maxTranslate(),
                                windowWidth = $(window).outerWidth();
                            if (slideLeft < windowWidth / 2) {
                                menuSwiper.setTransition(0)
                            } else {
                                if (slideLeft > -maxTranslate + (windowWidth / 2) - slideWidth) {
                                    menuSwiper.setTransition(1000)
                                    menuSwiper.setTranslate(maxTranslate)
                                } else {
                                    menuSwiper.setTransition(1000)
                                    menuSwiper.setTranslate((windowWidth / 2) - slideLeft - (slideWidth / 2))
                                }
                            }
                        } catch (e) {};
                    }
                },
                'one': function (a) {
                    $('body').find(a).each(function () {
                        var onslide = new Swiper(this, {
                            autoplay: true,
                            lazy:{loadPrevNext: true,},
                            loop: true,
                            effect: 'fade',
                            navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
                            pagination: {el: '.swiper-pagination',clickable: true,},
                            fadeEffect: {crossFade: true,}
                        });
                    })
                },
                'three': function (a) {
                    $('body').find(a).each(function () {
                        zanpiancms.slider.d3(a);
                    })
                },
                'd3': function (a) {
                    if ($(a).eq(0).find('img').width() > 0) {
                        $(a).find(".swiper-slide").width($(a).eq(0).find('img').width());
                        var onslide = new Swiper(a, {
                            effect: 'coverflow',
                            slidesPerView: 'auto',
                            centeredSlides: true,
                            lazy: {
                                loadPrevNext: true,
                            },
                            loop: true,
                            coverflowEffect: {rotate: 0,stretch: 0,depth: 200,modifier: 1,slideShadows: true},
							navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
                        });
                    } else {
                        setTimeout(zanpiancms.slider.d3(a), 100);
                    }
                },
                'auto': function (a) {
                    var autoslide = new Swiper(a, {
                        lazy: {loadPrevNext: true,loadPrevNextAmount: 1,},
                        loop: true,
                        slidesPerView: 'auto',
                        navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
						pagination: {el: '.swiper-pagination',clickable: true,},
                    });
                }

        },
        'photoswipe': function () {
            if ($('.show-pic').length > 0) {
                var imgss = $(".show-pic");
                $(".show-pic").each(function () {
                    var imgs = new Image();
                    imgs.src = $(this).attr("src");
                    var w = imgs.width,
                        h = imgs.height;
                    $(this).attr("data-size", "").attr("data-size", w + "x" + h);
                })
                var picNum = $(".show-pic").length / 3;
                $.each($(".show-pic"), function (i, v) {
                    if (i < picNum) {
                        $(this).addClass('real-show-pic')
                    }
                });
                $(".show-pic").click(function () {
                    var pswpElement = document.querySelectorAll('.pswp')[0];
                    var items = new Array();
                    $.each($(".real-show-pic"), function (i, v) {
                        $(v).attr("rel", i);
                        items.push({
                            src: $(v).attr("data-src"),
                            w: $(v).attr('data-size').split('x')[0],
                            h: $(v).attr('data-size').split('x')[1]
                        });
                    });
                    var options = {
                        index: parseInt($(this).attr("rel")) // start at first slide
                    };
                    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                    gallery.init();
                });
            }
        },
};

var zanpian = {
	//浏览器信息
	'url': document.URL,
	'domain': document.domain,
	'title': document.title,
	'languages': function() {
		try {
			var ua = (navigator.browserLanguage || navigator.language).toLowerCase(); //zh-tw|zh-hk|zh-cn
			return ua;
		} catch (e) {}
	}(),
	'canvas': function() {
		return !!document.createElement('canvas').getContext;
	}(),
	'useragent': function() {
		var ua = navigator.userAgent; //navigator.appVersion
		return {
			'mobile': !! ua.match(/AppleWebKit.*Mobile.*/),
			//是否为移动终端 
			'ios': !! ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			//ios终端
			'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
			//android终端或者uc浏览器 
			'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1,
			//是否为iPhone或者QQHD浏览器 
			'iPad': ua.indexOf('iPad') > -1,
			//是否iPad
			'trident': ua.indexOf('Trident') > -1,
			//IE内核
			'presto': ua.indexOf('Presto') > -1,
			//opera内核
			'webKit': ua.indexOf('AppleWebKit') > -1,
			//苹果、谷歌内核
			'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1,
			//火狐内核 
			'weixin': ua.indexOf('MicroMessenger') > -1 //是否微信 ua.match(/MicroMessenger/i) == "micromessenger",			
		};
	}(),
	'js': function(file) {
		$("<scri" + "pt>" + "</scr" + "ipt>").attr({
			src: file,
			type: 'text/javascript'
		}).appendTo("head");
	},
	'css': function(file) {
		$("<link>").attr({
			rel: "stylesheet",
			type: "text/css",
			href: file
		}).appendTo("head");
	},	
	'jump': function() {
		if(cms.wap_status=='1' && (zanpian.url != cms.wap_url) && zanpian.useragent.mobile){
			location.replace(cms.wap_url);
		}			
	},	
	'verify': {
		'init': function() {
			zanpian.verify.focus();
			zanpian.verify.click();
		},
		'focus': function() { //验证码框焦点
			$('body').on("focus", ".zanpian-validate", function() {
				$(this).removeClass('zanpian-validate').after(zanpian.verify.show());
				$(this).unbind();
			});
		},
		'click': function() { //点击刷新
			$('body').on('click', 'img.validate-img', function() {
				 var url=$(this).attr('src');
				$(this).attr('src', url +'&'+ Math.random());
			});
		},
		'refresh': function(a){
			if(a){
		        var url=$(a+' .validate-img').attr('src');
			    $(a+' .validate-img').attr('src', url +'&'+ Math.random());
			}else{
				var url=$('.validate-img').attr('src');
				$('.validate-img').attr('src', url +'&'+ Math.random());
			}
		},
		'show': function() {
			return '<img class="validate-img" src="' + cms.root + 'index.php?s=/cms/verify/index/' + Math.random() + '"  title="看不清楚? 换一张！">';
		}
	},	
	'lazyload': {
		'show': function() {
			try {
				$(".lazy,.lazyload").lazyload({
					effect: "fadeIn",
					failurelimit: 20
				});
			} catch (e) {};
		},
		'tab': function($id) {
			//$($id).trigger("sporty");
			//$(".lazyload").lazyload({container:$($id)});

			$($id).find(".lazy,.lazyload").each(function() {
				if (typeof($(this).hasClass("lazyload"))) {
					     $(this).attr("src", $(this).attr("data-original"));
					     $(this).removeAttr("data-original");
					     $(this).removeClass("lazyload");
						 $(this).removeClass("lazy");
					     $(this).addClass("fade-in");
				}
			})
		},
		'box': function($id) {
			$(".lazyload").lazyload({
				container: $($id)
			});
		}
	},
	'hits': function() {
		if ($('.detail-hits').length == 0) {
			return false;
		}
		$(".detail-hits").each(function(i) {
			var $this = $(".detail-hits").eq(i);
			$.ajax({
				type: 'get',
				url: cms.root + 'index.php?s=/cms/hits/index/id/' + $('#zanpian-cms').data('id') + '/sid/' + $('#zanpian-cms').data('sid') + '/type/' + $this.attr("data-type"),
				timeout: 5000,
				dataType: 'json',
				success: function(data) {
					$type = $this.attr('data-type');
					if ($type != 'insert') {
						$this.html(eval('(data.' + $type + ')'));
					}
					if ($('.detail-hitss').length > 0) {
						$(".detail-hitss").each(function(i) {
							var $thiss = $(this).eq(i);							 
						    $thiss.html(eval('(data.' + $thiss.attr('data-field') + ')'));
						})
					}
				}
			});
		});
	},
	'digg': function() {
		$('body').on("click", ".digg-link,#flower", function() {
			var data = {
				'id': $("#zanpian-cms").data("id"),
				'sid': $("#zanpian-cms").data("sid"),
				'type': $(this).data("type"),
				'name': $(this).data("name")
			}
			var obj = $(this);
			zanpiancms.ajax(cms.root + "index.php?s=/cms/digg/index", 'post', 'json', data, function(r) {
				zanpiancms.tip.hide(r);
				if (parseInt(r.code) > 0) {
					count = obj.find('#count').text() * 1 + 1;
					obj.find('#count').text(count);
					obj.find('#count').attr('data-count', count)
				}
			});
			return false;
		});
		$("#flower").hover(function() {
			$(this).find("#count").text("送花");
		}, function() {
			var count = $(this).find("#count").attr("data-count")
			$(this).find("#count").text(count);
		});
	},
	//评分
	'score': {
		'init': function() {
			if ($('#zanpian-score').length > 0 && $('#zanpian-cm').length == 0) {
				zanpian.score.ajax(cms.root + "index.php?s=/cms/ajax/gold/id/" + $('#zanpian-cms').data('id') + "/sid/" + $('#zanpian-cms').data('sid'))
			}
		},
		'loading': function() {
			if ($('#zanpian-score').length > 0) {
				zanpian.score.ajax(cms.root + "index.php?s=/cms/ajax/gold/id/" + $('#zanpian-cms').data('id') + "/sid/" + $('#zanpian-cms').data('sid'))
			}
		},
		//加载评分与订阅收藏
		'ajax': function(url) {
			$.ajax({
				url: url,
				cache: false,
				timeout: 3000,
				success: function(data) {
					if (data.gold != undefined && data.gold != null) {
						zanpian.score.stars(data.gold);

					};
				}
			});
			return false;
		},
		'stars': function(r) {
			if ($("#rating")) {
				$("ul.rating li").each(function() {
					var b = $(this).attr("title"),
						c = $("ul.rating li"),
						d = $(this).index(),
						e = d + 1;
					$(this).click(function() {
						hadpingfen > 0 ? (zanpiancms.tip.open({
							msg: "已经评分,请务重复评分",
							css: "alert"
						}), zanpiancms.tip.hide({})) : (zanpiancms.tip.open({
							msg: "数据提交中...",
							css: "loadings"
						}), c.removeClass("active"), $("ul.rating li:lt(" + e + ")").addClass("active"), $("#ratewords").html(b), $.post(cms.root + "index.php?s=/cms/ajax/addgold", {
							val: $(this).attr("val"),
							id: $('#zanpian-cms').data('id'),
							sid: $('#zanpian-cms').data('sid')
						}, function(a) {
							if (parseInt(a.code) == 1) {
								$.ajax({
									type: 'get',
									cache: false,
									timeout: 3000,
									url: cms.root + "index.php?s=/cms/ajax/gold/id/" + $('#zanpian-cms').data('id') + "/sid/" + $('#zanpian-cms').data('sid'),
									success: function(data) {
										zanpian.score.stars(data.gold);
									}
								});
							}
							parseInt(a.code) > 0 ? (zanpiancms.tip.hide(a), loadstat(), hadpingfen = 1) : -2 == parseInt(a.code) ? (hadpingfen = 1, zanpiancms.tip.open({
								msg: "已经评分,请务重复评分",
								css: "alert"
							}), zanpiancms.tip.hide({})) : (zanpiancms.tip.close(), $("#innermsg").trigger("click"));

						}, "json"))
					}).hover(function() {
						this.myTitle = this.title, this.title = "", $(this).nextAll().removeClass("active"), $(this).prevAll().addClass("active"), $(this).addClass("active"), $("#ratewords").html(b)
					}, function() {
						this.title = this.myTitle, $("ul.rating li:lt(" + e + ")").removeClass("hover")

					})
				}), $(".rating-panle").hover(function() {
					$(this).find(".rating-show").show()
				}, function() {
					$(this).find(".rating-show").hide()
				})
			}
			var hadpingfen = 0;
			var curstars = parseInt(r.mygold);
			$("#pa").html(r['curpingfen'].a + "人");
			$("#pb").html(r['curpingfen'].b + "人");
			$("#pc").html(r['curpingfen'].c + "人");
			$("#pd").html(r['curpingfen'].d + "人");
			$("#pe").html(r['curpingfen'].e + "人");
			$("#vod_gold").html(r['curpingfen'].pinfen);
			var totalnum = parseInt(r['curpingfen'].a) + parseInt(r['curpingfen'].b) + parseInt(r['curpingfen'].c) + parseInt(r['curpingfen'].d) + parseInt(r['curpingfen'].e);
			if (totalnum > 0) {
				$("#pam").css("width", ((parseInt(r['curpingfen'].a) / totalnum) * 100) + "%");
				$("#pbm").css("width", ((parseInt(r['curpingfen'].b) / totalnum) * 100) + "%");
				$("#pcm").css("width", ((parseInt(r['curpingfen'].c) / totalnum) * 100) + "%");
				$("#pdm").css("width", ((parseInt(r['curpingfen'].d) / totalnum) * 100) + "%");
				$("#pem").css("width", ((parseInt(r['curpingfen'].e) / totalnum) * 100) + "%")
			};
			if (r['hadpingfen'] != undefined && r['hadpingfen'] != null) {
				hadpingfen = 1;
			}
			var PFbai = r['curpingfen'].pinfen * 10;
			if (PFbai > 0) {
				$("#rating-main").show();
				$("#rating-kong").hide();
				$("#fenshu").animate({
					'width': parseInt(PFbai) + "%"
				});
				$("#total").animate({
					'width': parseInt(PFbai) + "%"
				});
				$("#pingfen").html(r['curpingfen'].pinfen);
				$("#pingfen2").html(r['curpingfen'].pinfen);

			} else {
				$("#rating-main").hide();
				$("#rating-kong").show();
				$(".loadingg").addClass('nopingfen').html('暂时没有人评分，赶快从左边打分吧！');
			};
			if (r['loveid'] != null) {
				$("#love").hide();
				$("#yeslove").show();
			} else {
				$("#love").show();
				$("#yeslove").hide();
			}
			if (r['remindid'] != null) {
				$("#remind").hide();
				$("#yesremind").show();
			} else {
				$("#remind").show();
				$("#yesremind").hide();
			}
			if (curstars > 0) {
				var curnum = curstars - 1;
				$("ul.rating li:lt(" + curnum + ")").addClass("current");
				$("ul.rating li:eq(" + curnum + ")").addClass("current");
				$("ul.rating li:gt(" + curnum + ")").removeClass("current");
				var arr = new Array('很差', '较差', '还行', '推荐', '力荐');
				$("#ratewords").html(arr[curnum]);
			}
		},
	},
	'gbook': function() {
		//留言
		$('body').on("click", "#gb_types li", function(e) {
			$("#gb_types li").each(function() {
				$(this).removeClass('active');
			});
			$(this).addClass('active');
			$("#gb_type").val($(this).attr('val'));
		});
		$('body').on("click", "#gb-submit", function() {
			var url=$("#gbook-form").data('url');										 
			if ($("#gb_nickname").val() == '') zanpiancms.tip.open({
				css: "alert",
				msg: "请输入您的昵称"
			}), $("#gb_nickname").focus(), zanpiancms.tip.hide({});
			else {
				if ("" != $("#gb_content").val()) return zanpiancms.ajax(url, 'post', 'json', $("#gbook-form").serializeArray(), function(r) {
					if (zanpiancms.tip.hide(r), parseInt(r["code"]) > 0) {
						if (parseInt(r["code"]) == 1) {
							zanpiancms.list.url(cms.root + "index.php?s=/cms/gb/show");
						}
					} else {
						zanpian.verify.refresh("#gbook-form");
					}
					return false;
				});
				zanpiancms.tip.open({
					css: "alert",
					msg: "输入留言内容"
				}), $("#gb_content").focus(), zanpiancms.tip.hide({})
			}
		})
	},	
	//联想搜索
	'autocomplete': function() {
		if ($('.zanpian-search').length == 0) {
			return false;
		}
		var $limit = $('.zanpian-search').eq(0).data('limit');
		$.ajaxSetup({
			cache: true
		});
		$.getScript(cms.public + "tpl/" + cms.theme.name + "/js/jquery.autocomplete.min.js", function(response, status) {
			$ajax_url = cms.root + 'index.php?s=/cms/search/vod';
			$('.zanpian-wd').autocomplete({
				serviceUrl: $ajax_url,
				params: {
					'limit': $limit
				},
				paramName: 'q',
				maxHeight: 400,
				transformResult: function(response) {
					var obj = $.parseJSON(response);
					return {
						suggestions: $.map(obj.data, function(dataItem) {
							return {
								value: dataItem.vod_name,
								data: dataItem.vod_url
							};
						})
					};
				},
				onSelect: function(suggestion) {
					location.href = suggestion.data;
					//alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
				}
			});
		});
	},
	//二维码生成
	'qrcode': function() {
		if ($('.qrcode-box').length > 0) {
			wapurl = '';
			if (wapurl == '' || wapurl == 'undefined' || wapurl == undefined) {
				wapurl = zanpian.url;
			}
			jQuery('.qrcode-box').qrcode({width:120,height:120,text:wapurl});
			//$(".qrcode-box img").attr("src", "//api.97bike.com/qrcode/?url=" + encodeURIComponent(wapurl));
			//$(".qrcode-box").append('<img src="//api.97bike.com/qrcode/?url=' + encodeURIComponent(wapurl) + '"/>');
		}
	},
	//选项卡切换
	'mytab': {
		'init': function() {
			//zanpian.mytab.hover(".tab_hover", ".tab_hover_list", "active", "show");
			
			$('body').on("click", "#myTab li", function(e) {
				var id = $(this).attr('id');
				$(this).addClass("active").siblings().removeClass("active");
				$(id).siblings().addClass("hide");
				$(id).removeClass("hide").addClass("show").siblings().removeClass("show");
				zanpian.lazyload.tab(id);
				//$(id).find('a').lazyload({effect: "fadeIn"});
			});
			$('body').on("click", "#Tab li", function(e) {
				if (!$(this).children('a').hasClass('moreTab')) {
					var id = $(this).children('a').attr('id');
					$(this).addClass("active").siblings().removeClass("active");
					$(id).siblings().addClass("hide");
					$(id).removeClass("hide").addClass("show").siblings().removeClass("show");
				}
				//$(id).find('a').lazyload({effect: "fadeIn"});
			});
			if ($('.hot-show').length > 0) {
				$('.hot-show').children().hover(function(t) {
					$(this).siblings().removeClass('active');									 
					$(this).addClass('active');
				})
			}
			if ($('.tab_hover').length > 0) {
				$('.tab_hover').children().hover(function() {
					var id = $(this).attr('id');	
					$(this).addClass("active").siblings().removeClass("active");
					$(id).siblings().addClass('hide');
					$(id).removeClass("hide").addClass("show").siblings().removeClass("show");
                    zanpian.lazyload.tab(id);
				})
			}
					
		},
		'click': function(nid, cid, sel, show) {
			if ($(nid).length > 0) {
				$(nid).children().click(function() {
					$(this).addClass(sel).siblings().removeClass(sel);
					$(cid).children().eq($(this).index()).addClass(show).siblings().removeClass(show)
				})
			}
		},
		'hover': function(nid, cid, sel, show) {
			if ($(nid).length > 0) {
				$(nid).children().hover(function() {
					$(this).addClass(sel).siblings().removeClass(sel);
					$(cid).children().addClass('hide');
					$(cid).children().eq($(this).index()).removeClass('hide').addClass(show).siblings().removeClass(show);
                    zanpian.lazyload.tab($(cid).children().eq($(this).index()));
					
				})
			}
		}
	},
	'site': function () {
	    //滑动导航与幻灯片
	    zanpiancms.slider.index();
	    zanpiancms.slider.nav('.top-nav-list');
	    zanpiancms.slider.nav('.show-top-nav');
	    zanpiancms.slider.nav('.letter-list');
	    zanpiancms.slider.auto('.auto-slide');
	    zanpiancms.slider.auto('.auto-slides');
		zanpiancms.slider.auto('.four-slide');
		zanpiancms.slider.one('.box-slide');
	    //左侧滑块工具初始化
	    zanpiancms.tool();
	    //搜索相关
	    $(".zanpian-wd").focus(function () {
	        $('.header-search .dropdown').show();
	    });
	    $(".link-code").hover(function () {
	        var url = $(this).attr('data-url');
	        $(this).append('<div id="link-code"><div class="code"></div><p>扫二维码安装</p></div>');
			var cor=$(this).find('.code');
			jQuery(cor).qrcode({width:100,height:100,text:url});	
	    }, function () {
	        $("#link-code").remove();
	    });
	    $(".hover_img").hover(function () {
	        var url = $(this).find('.list-soft-infos .img-pic').attr('data-url');
	        var logo = $(this).find('img').data('original');
			var cor=$(this).find('.list-soft-infos .img-pic');
	        //$(this).find('.list-soft-infos img').attr("src", "https://api.97bike.com/qrcode/?url=" + encodeURIComponent('//' + window.location.host + url));
			jQuery(cor).qrcode({width:100,height:100,text:url,});	
	    }, function () {
			var cor=$(this).find('.list-soft-infos .img-pic canvas');
           $(cor).remove();
	    });
	    $(".soft-info-down a .icon-erweima").hover(function () {
	        var url = $(this).parent().data('url');
	        if (!url) {
	            var url = $(this).parent().attr('href');
	        }
	        var logo = $(".soft-info .img-pic img").attr('src');
	        $(this).append('<div class="soft-code"><div class="code"></div><p>使用手机扫码下载</p></div>');
			jQuery('.code').qrcode({width:120,height:120,text:url});	
	    }, function () {
	        $(".soft-code").remove();
	    });
        var contentHeight = $('.info-content').height();
		var moreHeight = $('.info-content').next('.load-more-content').data('content');
        if (contentHeight > moreHeight) {
            $('.info-content').css('height', moreHeight);
            $('.info-content').next('.load-more-content').css('display', 'block');
        }
        var contentversion = $('#down-game-version').height();
        if (contentversion > 200) {
            $('#down-game-version').css('height', '200px');
            $('#load-more-version').css('display', 'block');
        }		
        $('.load-more-content').on('click', function () {
            if (!$(this).hasClass('checked')) {
                $(this).addClass('checked').html('收起<span class="iconfont icon-up"></span>');
                $(this).prev().css('height', 'auto');
            } else {
                $(this).removeClass('checked').html('展开<span class="iconfont icon-down"></span>');
                $(this).prev().css('height', $(this).data('content')+'px');
            }
        });	
	    document.onclick = function (e) {
	        if (!$(e.target).is(".zanpian-wd")) {
	            $('.header-search .dropdown').hide();
	        }
	    }
	    $('body').on("click", ".tool-weixin", function (e) {
	        zanpiancms.tip.open({
	            wantclose: 3,
	            title: "关注微信公众号",
	            html: $("#weixin-qrcode").html(),
	        })

	    })
	    $('body').on("click", "#theme", function (e) {
	        zanpiancms.tip.open({
	            wantclose: 3,
	            title: "选择皮肤",
	            html: $("#theme-body").html(),
	        })

	    })
	    $('#goback').click(function () {
	        javascript: history.back(-1);
	    })
		if ($(".main-left").height() > $(".main-right").height()) {
			  zanpiancms.fixbar(".main-left", ".main-right");
		}
		$('body').on("click", "#feedback", function(event) {
			var urls=$(this).data('url');
			zanpiancms.pop.url({
				url: urls
			})
		});	
		
		$('body').on("click", "#submit", function() {
			 var url=$("#form").data('url');								  
              zanpiancms.ajax(url, 'post', 'json', $("#form").serializeArray(), function(r) {
					if (zanpiancms.tip.hide(r), parseInt(r["code"]) > 0) {
						if (parseInt(r["code"]) == 1) {
							setTimeout(function() {
							     zanpiancms.pop.close();
						}, 500);
						}
					} else {
						zanpian.verify.refresh();
					}
					return false;
			  });
		});
		$('body').on("click", "#sousuo", function(event) {
			$(".navbar-search").show();
		});
		$('body').on("click", ".cancel-input", function(event) {
			$(".navbar-search").hide();
		});	
		$('body').on("click", "#fenlei", function(event) {
			$(".mobile-nav-fl").toggle();
		});	
		$('body').on("click", ".soft-info-nav ul li", function(event) {												   
			temp = $('.'+$(this).data("id")).offset().top;
            $('body,html').animate({ scrollTop: temp },500);
		});			
		
	}

};

$(document).ready(function() {
	//手机端跳转
	//zanpian.jump();
	//验证码初始化
	zanpian.verify.init();
	//图片延迟加载初始化
	zanpian.lazyload.show();
	//人气初始化
	zanpian.hits();
	//顶踩初始化
	zanpian.digg();
	zanpian.mytab.init();
	//评分初始化
	zanpian.score.init();
	//评论初始化
	//zanpian.cm.init();
	//联想搜索初始化
	zanpian.autocomplete();
	//二维码生成初始化
	zanpian.qrcode();
	//网站相关
	zanpian.site();
	//留言板初始化
	zanpian.gbook();
	//加载AJAX列表
	zanpiancms.list.init();	
});
window.onload = function(){ 
    setTimeout(zanpiancms.slider.three('.auto-three'),100);
	zanpiancms.photoswipe();
}