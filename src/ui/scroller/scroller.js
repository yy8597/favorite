/**
 * @info:自定义滚动轴
 * @auth:yanyang
 * @email:yyfireman@163.com
 * @exmaple:
 *      $('#selecter').ppScroll().scroll();
 **/
define(function (require, exports) {
    var _ = require('underscore');
    var $ = require('jquery');
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent);
    require('util/event/event-mouse-wheel');


    //自定义滚动轴
    $.fn.ppScroller = function(option) {
        var opt = $.extend({
            maxHeight: 200,
            maxWidth: 200,
            horizontal: false
        },option)
        var max = opt.maxHeight;

        var Handler = {};
        var _this = $(this);

        return _this.each(function(){
            _this.addClass('pp-scroller-container');
            if(opt.horizontal){
                _this.addClass('pp-scroller-container-h');
            }
            
            var scroller
            var inner = _this.children().eq(0).css({
                position:'relative'
            });

            /* 计算宽度 */
            if(opt.horizontal){
                var width = 0;
                inner.children().each(function(i, n){
                    width += $(n).outerWidth();
                });
                inner.width(width);
            }
            if(isMobile){
                _this.height(max).css(
                    !opt.horizontal ? 
                        {
                            overflowY:'scroll',
                            overflowX:'hidden'
                        } : {
                            overflowX:'scroll',
                            overflowY:'hidden'
                        }
                    );
                return
            }
            var 
                offsetXY,
                mouseXY,
                mkey = false,
                skey = false,
                scale,
                total,
                btn,
                btnOffset
            ;

            Handler.container_mousewheel = !opt.horizontal ? 
                function(e, y){
                    if(skey){
                        var top = btn.position().top + (-4 * y)
                        if(top <= 0){
                            top = 0
                        }else if(top + btn.outerHeight() >= scroller.outerHeight()){
                            top = max - btn.outerHeight();
                        }
                        btn.css('top', top)
                        inner.css('top', -top/scale);
                    }
                    return false;
                } : function(e, y){
                    if(skey){
                        var left = btn.position().left + (-4 * y)
                        if(left <= 0){
                            left = 0
                        }else if(left + btn.outerWidth() >= scroller.outerWidth()){
                            left = max - btn.outerWidth();
                        }
                        btn.css('left', left)
                        inner.css('left', -left/scale);
                    }
                    return false;
                }
            _this.on('mousewheel', Handler.container_mousewheel);

            scroller = $('<div class="pp-scroller">'+
                '<div style=""></div></div>');

            Handler.btn_mousedown = !opt.horizontal ? 
                function(e){
                    mkey = true;
                    mouseXY = parseInt(e.clientY);
                    offsetXY = parseInt($(this).position().top);
                    return false;
                } : function(e){
                    mkey = true;
                    mouseXY = parseInt(e.clientX);
                    offsetXY = parseInt($(this).position().left);
                    return false;
                }
            btn = scroller.find('div').on('mousedown', Handler.btn_mousedown);

            var btnWH;
            Handler.scroller_mousedown = !opt.horizontal ? 
                function(e){
                    mkey = true;
                    mouseXY = parseInt(e.clientY);
                    offsetXY = parseInt(mouseXY - scroller.offset().top - btnWH / 2);
                    $(document).trigger('mousemove', [e.clientY]);
                } : function(e){
                    mkey = true;
                    mouseXY = parseInt(e.clientX);
                    offsetXY = parseInt(mouseXY - scroller.offset().left - btnWH / 2);
                    $(document).trigger('mousemove', [e.clientX]);
                }
            scroller.appendTo(_this).on('mousedown', Handler.scroller_mousedown)
           

            Handler.document_mousemove = function(e, clientXY){
                if(mkey){
                    ss(parseInt(!opt.horizontal ? e.clientY : e.clientX || clientXY));
                }
            }
            Handler.pause = function(e){
                mkey = false;
            }
            Handler.document_selectstart = function(e){
                if(mkey){
                    e.preventDefault();
                }
            }
            $(document)
                .on('mousemove', Handler.document_mousemove)
                .on('mouseup', Handler.pause)
                .on('selectstart', Handler.document_selectstart);

            var ss = !opt.horizontal ? function(clientY){
                    btnOffset = offsetXY + clientY - mouseXY;
                    if(btnOffset <= 0){
                        btnOffset = 0;
                    }else if(btnOffset + parseInt(btn.outerHeight()) >= max){
                        btnOffset = max - btn.outerHeight();
                    }
                    btn.css('top', btnOffset);
                    inner.css('top', - btnOffset / scale);
                } : function(clientX){
                    btnOffset = offsetXY + clientX - mouseXY;
                    if(btnOffset <= 0){
                        btnOffset = 0;
                    }else if(btnOffset + parseInt(btn.outerWidth()) >= max){
                        btnOffset = max - btn.outerWidth();
                    }
                    btn.css('left', btnOffset);
                    inner.css('left', - btnOffset / scale);
                }
            
            _this.scroll = (function(){
                return function(){
                    // _this.height('auto');
                    total = !opt.horizontal ? inner.height() : inner.width();

                    btn.css(!opt.horizontal ? 'top' : 'left', 0);
                    inner.css(!opt.horizontal ? 'top' : 'left', 0);
                    if(total <= max){
                        skey = false;
                        scroller.hide();
                    }else{
                        skey = true;
                        scale = max / total;
                        if(!opt.horizontal){
                            _this.height(max).css('overflow','hidden');
                            scroller.show().height(max).find('div').height(max * scale);
                            inner.css('top',0);
                        }else{
                            _this.width(max).css('overflow','hidden');
                            scroller.show().width(max).find('div').width(max * scale);
                            inner.css('left',0);
                        }
                    }
                    btnWH = !opt.horizontal ? btn.height() : btn.width();
                    return _this;
                }
            })();

            _this.scrollTo = function(xy){
                var xy = parseInt(xy);
                if(xy <= 0 || total < max){
                    xy = 0;
                }else if(xy >= total - max){
                    xy = total - max
                }
                
                btn.css(!opt.horizontal ? 'top' : 'left', xy * scale);
                inner.css(!opt.horizontal ? 'top' : 'left', - xy);

                return _this;
            };
            _this.pause = Handler.pause
            _this.destory = function(){
                // 增加事件销毁
            };

        });
    }
});