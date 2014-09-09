/**
 * 通用模块
 **/
define(function (require, exports) {
    var $ = require('jquery');
    function ajax(option) {
        var opt = $.extend({
            type : 'GET',
            dataType : 'jsonp',
            cache: true,
            jsonp: 'cb',
            success: function(){},
            error: function(){}
        }, option);
        var success = opt.success;
        opt.success = function(data){
            if(!data.err){
                success(data);
            }else{
               //console.log('getJSONP error: ' + (option.errorCode || {})[data.err] + '|' + data.msg, option)
            }
        }
        return $.ajax(opt);
    }

    return ajax;
});