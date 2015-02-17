/*  
 *  ddr-ECMA5 JavaScript library, version 1.2.2RC
 *  (c) 2010 David de Rosier
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  Revision: 26
 *  Date: 04.08.2011
 */
define(function(require, exports){
	(function(global,undefined){"use strict";var __features={STRING_INDEX_ENUMERABLE:"abc".propertyIsEnumerable("1"),ACCESSORS:Object.prototype.__defineGetter__&&Object.prototype.__defineSetter__,DOM:typeof window==='object'&&typeof document==='object'};var __propertyIsEnumerable=function(obj,property){if(obj.propertyIsEnumerable){return obj.propertyIsEnumerable(property)}for(var key in obj){if(key===property&&(obj.hasOwnProperty?obj.hasOwnProperty(property):true)){return true}}return false};Function.prototype.bind||(Function.prototype.bind=function(ctx){if(typeof this!=='function')throw new TypeError("'this' is not a function");var fn=this,args=$AP.slice.call(arguments,1);return function(){return fn.apply(ctx,args.concat(Array.prototype.slice.call(arguments)))}});String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s\s*/,'').replace(/\s\s*$/,'')});Array.isArray||(Array.isArray=function(obj){return Object.prototype.toString.call(obj)==="[object Array]"||(obj instanceof Array)});var $AP=Array.prototype;$AP.indexOf||($AP.indexOf=function(searchElement){var len=this.length,i=+arguments[1]||0;if(len===0||isNaN(i)||i>=len)return-1;if(i<0){i=len+i;i<0&&(i=0)}for(;i<len;++i){if(this.hasOwnProperty(String(i))&&this[i]===searchElement)return i}return-1});$AP.lastIndexOf||($AP.lastIndexOf=function(searchElement){var len=this.length,i=+arguments[1]||len-1;if(len===0||isNaN(i))return-1;if(i<0){i=len+i}else if(i>=len){i=len-1}for(;i>=0;--i){if(this.hasOwnProperty(String(i))&&this[i]===searchElement)return i}return-1});$AP.every||($AP.every=function(callback){if(!__isCallable(callback))throw new TypeError(callback+" is not a callable object");var thisArg=arguments[1];for(var i=0,len=this.length;i<len;++i){if(this.hasOwnProperty(String(i))){if(!callback.call(thisArg,this[i],i,this))return false}}return true});$AP.some||($AP.some=function(callback){if(!__isCallable(callback))throw new TypeError(callback+" is not a callable object");var thisArg=arguments[1];for(var i=0,len=this.length;i<len;++i){if(this.hasOwnProperty(String(i))){if(callback.call(thisArg,this[i],i,this))return true}}return false});$AP.forEach||($AP.forEach=function(callback){if(!__isCallable(callback))throw new TypeError(callback+" is not a callable object");var thisArg=arguments[1];for(var i=0,len=this.length;i<len;++i){if(this.hasOwnProperty(String(i))){callback.call(thisArg,this[i],i,this)}}});$AP.map||($AP.map=function(callback){if(!__isCallable(callback))throw new TypeError(callback+" is not a callable object");var thisArg=arguments[1],len=this.length,results=new Array(len);for(var i=0;i<len;++i){if(this.hasOwnProperty(String(i))){results[i]=callback.call(thisArg,this[i],i,this)}}return results});$AP.filter||($AP.filter=function(callback){if(!__isCallable(callback))throw new TypeError(callback+" is not a callable object");var thisArg=arguments[1],len=this.length,results=[];for(var i=0;i<len;++i){if(this.hasOwnProperty(String(i))){callback.call(thisArg,this[i],i,this)&&results.push(this[i])}}return results});$AP.reduce||($AP.reduce=function(callback){if(!__isCallable(callback))throw new TypeError(callback+" is not a callable object");var len=this.length;if(len===0&&arguments.length<2)throw new TypeError("reduce of empty array with no initial value");var initIdx=-1;if(arguments.length<2){if((initIdx=__firstIndex(this))===-1)throw new TypeError("reduce of empty array with no initial value");}var val=arguments.length>1?arguments[1]:this[initIdx];for(var i=initIdx+1;i<len;++i){if(this.hasOwnProperty(String(i))){val=callback(val,this[i],i,this)}}return val});$AP.reduceRight||($AP.reduceRight=function(callback){if(!__isCallable(callback))throw new TypeError(callback+" is not a callable object");var len=this.length;if(len===0&&arguments.length<2)throw new TypeError("reduce of empty array with no initial value");var initIdx=len;if(arguments.length<2){for(var k=len-1;k>=0;--k){if(this.hasOwnProperty(String(k))){initIdx=k;break}}if(initIdx===len)throw new TypeError("reduce of empty array with no initial value");}var val=arguments.length>1?arguments[1]:this[initIdx];for(var i=initIdx-1;i>=0;--i){if(this.hasOwnProperty(String(i))){val=callback(val,this[i],i,this)}}return val});Date.now||(Date.now=function(){return+new Date});Date.prototype.toISOString||(Date.prototype.toISOString=(function(){var str=function(n,l){var str=String(n),len=l||2;while(str.length<len)str='0'+str;return str};return function(){return isFinite(this.getTime())?String(this.getUTCFullYear()).concat('-',str(this.getUTCMonth()+1),"-",str(this.getUTCDate()),"T",str(this.getUTCHours()),":",str(this.getUTCMinutes()),":",str(this.getUTCSeconds()),".",str(this.getUTCMilliseconds(),3),"Z"):'Invalid Date'}})());Date.prototype.toJSON||(Date.prototype.toJSON=function(key){if(!isFinite(this))return null;if(!this.toISOString||typeof this.toISOString!=='function')throw new TypeError("Date.prototype.toJSON called on incompatible "+(typeof this));return this.toISOString()});if(!Object.getPrototypeOf){if("".__proto__){Object.getPrototypeOf=function(obj){if(!__isObject(obj))throw new TypeError(obj+" is not an object");return obj.__proto__}}else{Object.getPrototypeOf=function(obj){if(!__isObject(obj))throw new TypeError(obj+" is not an object");return obj.constructor?obj.constructor.prototype:null}}}Object.create||(Object.create=(function(){var __TmpConstructor=function(){};return function(proto,properties){if(!__isObject(proto))throw new TypeError(proto+" is not an object");__TmpConstructor.prototype=proto;var obj=new __TmpConstructor();properties&&Object.defineProperties(obj,properties);return obj}})());Object.isSealed||(Object.isSealed=function(obj){if(!__isObject(obj))throw new TypeError(obj+" is not an object");return false});Object.isFrozen||(Object.isFrozen=function(obj){if(!__isObject(obj))throw new TypeError(obj+" is not an object");return false});Object.isExtensible||(Object.isExtensible=function(obj){if(!__isObject(obj))throw new TypeError(obj+" is not an object");return true});Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=(function(){var __NUMBER_CONSTS=['MAX_VALUE','MIN_VALUE','NaN','POSITIVE_INFINITY','NEGATIVE_INFINITY'],__MATH_CONSTS=['PI','E','LN2','LOG2E','LOG10E','SQRT1_2','SQRT2'];return function(obj,pname){if(!__isObject(obj))throw new TypeError(obj+" is not an object");if(!(pname in obj))return;var editable=true,configurable=true;if((obj===Number&&__NUMBER_CONSTS.indexOf(pname)>=0)||(obj===Math&&__MATH_CONSTS.indexOf(pname)>=0)||(pname=='length'&&(obj===String.prototype||__isString(obj)||obj===Function.prototype||obj instanceof Function))){editable=false;configurable=false}else if(pname=='length'&&(obj===Array.prototype||Array.isArray(obj))){configurable=false}return{writable:editable,enumerable:__propertyIsEnumerable(obj,pname),configurable:configurable,value:obj[pname]}}})());(!Object.defineProperty||!Object.defineProperties)&&(function(){var __applyDefaults=function(desc,defaultValue,value){if(desc.hasOwnProperty("get")||desc.hasOwnProperty("set")){throw new TypeError("Getters and setters are not supported by this ECMAScript engine");}else{desc.writable=desc.hasOwnProperty('writable')?desc.writable:defaultValue;desc.value=desc.hasOwnProperty('value')?desc.value:value}desc.enumerable=desc.hasOwnProperty('enumerable')?desc.enumerable:defaultValue;desc.configurable=desc.hasOwnProperty('configurable')?desc.configurable:defaultValue;var t=null;if((!desc[t="configurable"])||(!desc[t="enumerable"])||(!desc[t="writable"])){throw new TypeError("Property '".concat(t,"' cannot be set to false in this version of ECMAScript engine"));}return desc};if(!Object.defineProperty){Object.defineProperty=function(obj,property,descriptor){if(!__isObject(obj))throw new TypeError(obj+" is not an object");var pname=String(property);var desc=__toPropertyDescriptor(descriptor);desc=__applyDefaults(desc,obj.hasOwnProperty(pname),obj[pname]);obj[pname]=desc.value;return obj};Object.defineProperty.DDRECMA5=true}if(!Object.defineProperties){Object.defineProperties=function(obj,properties){if(!__isObject(obj))throw new TypeError(obj+" is not an object");var properties=Object(properties);var descriptors={};for(var key in properties){if(properties.hasOwnProperty(key)){var desc=__toPropertyDescriptor(properties[key]);descriptors[key]=__applyDefaults(desc,obj.hasOwnProperty(key),obj[key])}}for(key in descriptors){if(properties.hasOwnProperty(key)){obj[key]=descriptors[key].value}}return obj};Object.defineProperties.DDRECMA5=true}})();Object.keys||(Object.keys=function(obj){if(!__isObject(obj))throw new TypeError(obj+" is not an object");var results=[];for(var key in obj){(obj.hasOwnProperty?obj.hasOwnProperty(key):key in obj)&&results.push(key)}if(__isString(obj)&&!__features.STRING_INDEX_ENUMERABLE){for(var i=0,len=obj.length;i<len;++i){results.push(String(i))}}return results});!Object.getOwnPropertyNames&&(function(){var __notEnumerableProperties=(function(){var props=[{object:Object,keys:['getOwnPropertyNames','seal','create','isFrozen','keys','isExtensible','getOwnPropertyDescriptor','preventExtensions','getPrototypeOf','defineProperty','isSealed','defineProperties','freeze']},{object:Object.prototype,keys:['toString','__lookupGetter__','__defineGetter__','toLocaleString','hasOwnProperty','valueOf','__defineSetter__','propertyIsEnumerable','isPrototypeOf','__lookupSetter__']},{object:Function.prototype,keys:['bind','arguments','toString','length','call','name','apply','caller']},{object:Number,keys:['NaN','NEGATIVE_INFINITY','POSITIVE_INFINITY','MAX_VALUE','MIN_VALUE']},{object:Number.prototype,keys:['toExponential','toString','toLocaleString','toPrecision','valueOf','toFixed']},{object:String,keys:['fromCharCode']},{object:String.prototype,keys:['length','concat','localeCompare','substring','italics','charCodeAt','strike','indexOf','toLowerCase','trimRight','toString','toLocaleLowerCase','replace','toUpperCase','fontsize','trim','split','substr','sub','charAt','blink','lastIndexOf','sup','fontcolor','valueOf','link','bold','anchor','trimLeft','small','search','fixed','big','match','toLocaleUpperCase','slice']},{object:Boolean.prototype,keys:['toString','valueOf']},{object:Date,keys:['now','UTC','parse']},{object:Date.prototype,keys:['toUTCString','setMinutes','setUTCMonth','getMilliseconds','getTime','getMinutes','getUTCHours','toString','setUTCFullYear','setMonth','getUTCMinutes','getUTCDate','setSeconds','toLocaleDateString','getMonth','toTimeString','toLocaleTimeString','setUTCMilliseconds','setYear','getUTCFullYear','getFullYear','getTimezoneOffset','setDate','getUTCMonth','getHours','toLocaleString','toISOString','toDateString','getUTCSeconds','valueOf','setUTCMinutes','getUTCDay','toJSON','setUTCDate','setUTCSeconds','getYear','getUTCMilliseconds','getDay','setFullYear','setMilliseconds','setTime','setHours','getSeconds','toGMTString','getDate','setUTCHours']},{object:RegExp,keys:['$*','$`','$input','$+','$&',"$'",'$_']},{object:RegExp.prototype,keys:['toString','exec','compile','test']},{object:Error.prototype,keys:['toString']},{object:Math,keys:['LN10','PI','E','LOG10E','SQRT2','LOG2E','SQRT1_2','LN2','cos','pow','log','tan','sqrt','ceil','asin','abs','max','exp','atan2','random','round','floor','acos','atan','min','sin']},{object:global,keys:['TypeError','decodeURI','parseFloat','Number','URIError','encodeURIComponent','RangeError','ReferenceError','RegExp','Array','isNaN','Date','Infinity','Boolean','Error','NaN','String','Function','Math','undefined','encodeURI','escape','unescape','decodeURIComponent','EvalError','SyntaxError','Object','eval','parseInt','JSON','isFinite']},{test:function(obj){return typeof JSON!=='undefined'&&obj===JSON},keys:['stringify','parse']},{test:function(obj){return Array.isArray(obj)||__isString(obj)},keys:['length']},{test:function(obj){return obj instanceof RegExp},testValue:new RegExp('.+'),keys:['lastIndex','multiline','global','source','ignoreCase']},{test:function(obj){return typeof obj==='function'&&obj.apply&&obj.call},testValue:function(a,b,c){},keys:['arguments','length','name','prototype','caller']}];for(var i=0,ilen=props.length;i<ilen;++i){if(props[i].object){if(typeof props[i].object==='function'){props[i].keys.push('arguments','length','name','prototype','caller')}else if(typeof props[i].object==='object'&&props[i].object!==Math&&props[i].object!==global){props[i].keys.push('constructor')}for(var j=props[i].keys.length-1;j>=0;--j){if(!(props[i].keys[j]in props[i].object)||__propertyIsEnumerable(props[i].object,props[i].keys[j])){props[i].keys.splice(j,1)}}}else if(props[i].test&&props[i].testValue&&props[i].test(props[i].testValue)){for(var j=props[i].keys.length-1;j>=0;--j){if(!(props[i].keys[j]in props[i].testValue)||__propertyIsEnumerable(props[i].testValue,props[i].keys[j])){props[i].keys.splice(j,1)}}delete props[i].testValue}}return props})();var __len=__notEnumerableProperties.length;Object.getOwnPropertyNames=function(obj){var keys=Object.keys(obj);for(var i=0;i<__len;++i){if((__notEnumerableProperties[i].object&&__notEnumerableProperties[i].object===obj)||(__notEnumerableProperties[i].test&&__notEnumerableProperties[i].test(obj))){keys=keys.concat(__notEnumerableProperties[i].keys);break}}return keys}})();var __isObject=function(obj){return obj&&(typeof obj==='object'||typeof obj==='function')};var __isString=function(obj){return typeof obj==='string'||Object.prototype.toString.call(obj)==='[object String]'};var __firstIndex=function(arr){for(var k=0,len=arr.length;k<len;++k){if(arr.hasOwnProperty(String(k))){return k}}return-1};var __toPropertyDescriptor=function(obj){if(!obj||typeof obj!=='object')throw new TypeError(obj+" is not an object");var desc={};obj.hasOwnProperty("enumerable")&&(desc.enumerable=!!obj.enumerable);obj.hasOwnProperty("configurable")&&(desc.configurable=!!obj.configurable);obj.hasOwnProperty("writable")&&(desc.writable=!!obj.writable);obj.hasOwnProperty("value")&&(desc.value=obj.value);if(obj.hasOwnProperty("get")){if(!__isCallable(obj.get)&&typeof obj.get!=='undefined')throw new TypeError("Getter must be a callable object");desc.get=obj.get}if(obj.hasOwnProperty("set")){if(!__isCallable(obj.set)&&typeof obj.set!=='undefined')throw new TypeError("Setter must be a callable object");desc.set=obj.set}if((desc.hasOwnProperty("get")||desc.hasOwnProperty("set"))&&(desc.hasOwnProperty("writable")||desc.hasOwnProperty("value"))){throw new TypeError("Invalid property. A property cannot both have accessors and be writable or have a value");}return desc};var __isCallable=(function(){var __sortCase=(function(){try{[].sort('abc');return false}catch(ex){return true}})();return function(obj){if(typeof obj==='function')return true;if(typeof obj!=='object')return false;if(obj instanceof Function||obj instanceof RegExp)return true;if(__sortCase){try{[].sort(obj);return true}catch(ex){}}return false}})()})(this);
});