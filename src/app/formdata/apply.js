define(function(require, exports, module) {
    var $ = require('jquery');

    function FormData($form, onSubmit, onFail, option){
        this.items = [];
        this.form = $form.on('submit',function(e){
            return false;
        });
        this.onSubmit = onSubmit;
        this.onFail = onFail;
        this.opt = {};
        $.extend(this.opt, option || {});
    }

    FormData.prototype = {
        addItem: function($dom, option){
            var self = this;
            var opt = option || {};
            var item = {
                dom: $dom,
                opt: opt
            }
            this.items.push(item);

            $dom.on('input propertychange', function(){
                checkItem(item, function(err){
                    if(!err){
                        $dom.removeClass(self.opt.errClass)
                    }else{
                        $dom.addClass(self.opt.errClass)
                    }
                })
            })
        },
        check: function(success, fail){
            var len = succ = this.items.length, self = this;
            var i = 0, item;

            while(item = this.items[i++]){
                checkItem(item, function(err, msg){
                    var item = this;
                    len -= 1;
                    if(!err){
                        succ -= 1
                        item.dom.removeClass(self.opt.errClass)
                        if(succ <= 0){
                            success && success();
                        }
                    }else{
                        item.dom.addClass(self.opt.errClass)
                    }

                    if(len <= 0 && succ > 0){
                        fail && fail();
                    }
                })
            }
        },
        submit: function(){
            var self = this;
            this.check(function(){
                var data = self.form.serializeArray();
                self.onSubmit && self.onSubmit(data);
            }, self.onFail);
        }
    }


    function checkItem(item, cb){
        var value = $.trim(item.dom.val());
        if(item.opt.require && value == ''){
            cb.call(item, true, '不能为空');
        }else if(item.opt.regExp && !item.opt.regExp.test(value)){
            cb.call(item, true, '格式不正确');
        }else{
            cb.call(item, false);
        }
    } 

    // var $applyForm = $('#apply-form');
    // var $submit = $applyForm.find('a.submit');
    // $applyForm.on('input propertychange', 'input', function(){
    //     $('p.fail-txt').hide();
    // })

    // var theChecker = new FormData($applyForm, function(data){
    //         console.log(data);
    //     }, function(){
    //         $('p.fail-txt').show();
    // }, {
    //     errClass: 'err-txt'
    // });


    // theChecker.addItem($('#i-name'), {require: true});
    // theChecker.addItem($('#i-company'), {require: true});
    // theChecker.addItem($('#i-phone'), {require: true, regExp: /[\d\s\*-]+/});
    // theChecker.addItem($('#i-email'), {require: true, regExp: /^[^@]+@[^@]+$/});
    // theChecker.addItem($('#i-memo'), {});

    // $submit.on('click',function(e){
    //     theChecker.submit()
    //     e.preventDefault();
    // })

});
