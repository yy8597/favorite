define(function(require, exports){
	function delay(fn, time){
        var t, flag = true, ct = clearTimeout, f = function(){
            ct(t);
            var args = f.arg = arguments;
            flag = true;
            t = setTimeout(function(){
                flag && fn.apply(window, args);
            }, time || 300);
        }
        f.cancel = function(){flag = false;}
        return f;
    }
    return delay
});