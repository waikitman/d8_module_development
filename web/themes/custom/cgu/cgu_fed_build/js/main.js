$ = jQuery.noConflict();
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function f(){e.trigger("closed.bs.alert").remove()}var c=a(this),d=c.attr("data-target");d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));var e=a(d);b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(b=a.Event("close.bs.alert"));if(b.isDefaultPrevented())return;e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.one(a.support.transition.end,f).emulateTransitionEnd(150):f()};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){b=="loadingText"?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");c.prop("type")=="radio"&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f=typeof c=="object"&&c;e||d.data("bs.button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();if(b>this.$items.length-1||b<0)return;return this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){if(this.sliding)return;return this.slide("next")},b.prototype.prev=function(){if(this.sliding)return;return this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});this.$element.trigger(j);if(j.isDefaultPrevented())return;return this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(d.css("transition-duration").slice(0,-1)*1e3)):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),typeof c=="object"&&c),g=typeof c=="string"?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),typeof c=="number"?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),c.data()),g=c.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=c.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){function e(d){a(b).remove(),a(c).each(function(){var b=f(a(this)),c={relatedTarget:this};if(!b.hasClass("open"))return;b.trigger(d=a.Event("hide.bs.dropdown",c));if(d.isDefaultPrevented())return;b.removeClass("open").trigger("hidden.bs.dropdown",c)})}function f(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}"use strict";var b=".dropdown-backdrop",c="[data-toggle=dropdown]",d=function(b){a(b).on("click.bs.dropdown",this.toggle)};d.prototype.toggle=function(b){var c=a(this);if(c.is(".disabled, :disabled"))return;var d=f(c),g=d.hasClass("open");e();if(!g){"ontouchstart"in document.documentElement&&!d.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",e);var h={relatedTarget:this};d.trigger(b=a.Event("show.bs.dropdown",h));if(b.isDefaultPrevented())return;d.toggleClass("open").trigger("shown.bs.dropdown",h),c.focus()}return!1},d.prototype.keydown=function(b){if(!/(38|40|27)/.test(b.keyCode))return;var d=a(this);b.preventDefault(),b.stopPropagation();if(d.is(".disabled, :disabled"))return;var e=f(d),g=e.hasClass("open");if(!g||g&&b.keyCode==27)return b.which==27&&e.find(c).focus(),d.click();var h=" li:not(.divider):visible a",i=e.find("[role=menu]"+h+", [role=listbox]"+h);if(!i.length)return;var j=i.index(i.filter(":focus"));b.keyCode==38&&j>0&&j--,b.keyCode==40&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),e=c.data("bs.dropdown");e||c.data("bs.dropdown",e=new d(this)),typeof b=="string"&&e[b].call(c)})},a.fn.dropdown.Constructor=d,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",c,d.prototype.toggle).on("keydown.bs.dropdown.data-api",c+", [role=menu], [role=listbox]",d.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d);if(this.isShown||d.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)})},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b);if(!this.isShown||b.isDefaultPrevented())return;this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]!==a.target&&!this.$element.has(a.target).length&&this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){a.which==27&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){if(a.target!==a.currentTarget)return;this.options.backdrop=="static"?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");if(!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),typeof c=="object"&&c);f||e.data("bs.modal",f=new b(this,g)),typeof c=="string"?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);var e=this.options.trigger.split(" ");for(var f=e.length;f--;){var g=e[f];if(g=="click")this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if(g!="manual"){var h=g=="hover"?"mouseenter":"focusin",i=g=="hover"?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(c.timeout),c.hoverState="in";if(!c.options.delay||!c.options.delay.show)return c.show();c.timeout=setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show)},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(c.timeout),c.hoverState="out";if(!c.options.delay||!c.options.delay.hide)return c.hide();c.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e=typeof this.options.placement=="function"?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n=this.options.container=="body"?window.innerWidth:k.outerWidth(),o=this.options.container=="body"?window.innerHeight:k.outerHeight(),p=this.options.container=="body"?0:k.offset().left;e=e=="bottom"&&h.top+h.height+j-m>o?"top":e=="top"&&h.top-m-j<0?"bottom":e=="right"&&h.right+i>n?"left":e=="left"&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;c=="top"&&k!=g&&(d=!0,b.top=b.top+g-k);if(/bottom|top/.test(c)){var l=0;b.left<0&&(l=b.left*-2,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function e(){b.hoverState!="in"&&c.detach(),b.$element.trigger("hidden.bs."+b.type)}var b=this,c=this.tip(),d=a.Event("hide.bs."+this.type);this.$element.trigger(d);if(d.isDefaultPrevented())return;return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?c.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),this.hoverState=null,this},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},typeof b.getBoundingClientRect=="function"?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return a=="bottom"?{top:b.top+b.height,left:b.left+b.width/2-c/2}:a=="top"?{top:b.top-d,left:b.left+b.width/2-c/2}:a=="left"?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f=typeof c=="object"&&c;if(!e&&c=="destroy")return;e||d.data("bs.tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?typeof c=="string"?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||(typeof b.content=="function"?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f=typeof c=="object"&&c;if(!e&&c=="destroy")return;e||d.data("bs.popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});b.trigger(f);if(f.isDefaultPrevented())return;var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})},b.prototype.activate=function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g).emulateTransitionEnd(150):g(),e.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;this.affixed=="top"&&(e.top+=d),typeof f!="object"&&(h=g=f),typeof g=="function"&&(g=f.top(this.$element)),typeof h=="function"&&(h=f.bottom(this.$element));var i=this.unpin!=null&&d+this.unpin<=e.top?!1:h!=null&&e.top+this.$element.height()>=c-h?"bottom":g!=null&&d<=g?"top":!1;if(this.affixed===i)return;this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k);if(k.isDefaultPrevented())return;this.affixed=i,this.unpin=i=="bottom"?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),i=="bottom"&&this.$element.offset({top:c-h-this.$element.height()})};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f=typeof c=="object"&&c;e||d.data("bs.affix",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(this.transitioning||this.$element.hasClass("in"))return;var b=a.Event("show.bs.collapse");this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])},b.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass("in"))return;var b=a.Event("hide.bs.collapse");this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};if(!a.support.transition)return d.call(this);this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350)},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),typeof c=="object"&&c);!e&&f.toggle&&c=="show"&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":c.data(),i=c.attr("data-parent"),j=i&&a(i);if(!g||!g.transitioning)j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(c).addClass("collapsed"),c[f.hasClass("in")?"addClass":"removeClass"]("collapsed");f.collapse(h)})}(jQuery),+function(a){function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}"use strict",b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);var c=this,d=this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},b.prototype.process=function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,c=b-this.$scrollElement.height(),d=this.offsets,e=this.targets,f=this.activeTarget,g;if(a>=c)return f!=(g=e.last()[0])&&this.activate(g);if(f&&a<=d[0])return f!=(g=e[0])&&this.activate(g);for(g=d.length;g--;)f!=e[g]&&a>=d[g]&&(!d[g+1]||a<=d[g+1])&&this.activate(e[g])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f=typeof c=="object"&&c;e||d.data("bs.scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(a.style[c]!==undefined)return{end:b[c]};return!1}"use strict",a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery)
/* RENAME BOOTSTRAP CAROUSEL */
//var bootstrapCarousel = $.fn.carousel.noConflict();
//$.fn.bootstrapCarousel = bootstrapCarousel;
$.fn.bootstrapCarousel = $.fn.carousel;
//delete $.fn.carousel;
/* Chosen v1.1.0 | (c) 2011-2013 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
!function(){var a,AbstractChosen,Chosen,SelectParser,b,c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};SelectParser=function(){function SelectParser(){this.options_index=0,this.parsed=[]}return SelectParser.prototype.add_node=function(a){return"OPTGROUP"===a.nodeName.toUpperCase()?this.add_group(a):this.add_option(a)},SelectParser.prototype.add_group=function(a){var b,c,d,e,f,g;for(b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:this.escapeExpression(a.label),children:0,disabled:a.disabled}),f=a.childNodes,g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(this.add_option(c,b,a.disabled));return g},SelectParser.prototype.add_option=function(a,b,c){return"OPTION"===a.nodeName.toUpperCase()?(""!==a.text?(null!=b&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b,classes:a.className,style:a.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},SelectParser.prototype.escapeExpression=function(a){var b,c;return null==a||a===!1?"":/[\&\<\>\"\'\`]/.test(a)?(b={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/&(?!\w+;)|[\<\>\"\'\`]/g,a.replace(c,function(a){return b[a]||"&amp;"})):a},SelectParser}(),SelectParser.select_to_array=function(a){var b,c,d,e,f;for(c=new SelectParser,f=a.childNodes,d=0,e=f.length;e>d;d++)b=f[d],c.add_node(b);return c.parsed},AbstractChosen=function(){function AbstractChosen(a,b){this.form_field=a,this.options=null!=b?b:{},AbstractChosen.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers())}return AbstractChosen.prototype.set_default_values=function(){var a=this;return this.click_test_action=function(b){return a.test_active_click(b)},this.activate_action=function(b){return a.activate_field(b)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.group_search=null!=this.options.group_search?this.options.group_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null!=this.options.single_backstroke_delete?this.options.single_backstroke_delete:!0,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null!=this.options.display_selected_options?this.options.display_selected_options:!0,this.display_disabled_options=null!=this.options.display_disabled_options?this.options.display_disabled_options:!0},AbstractChosen.prototype.set_default_text=function(){return this.default_text=this.form_field.getAttribute("data-placeholder")?this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.options.placeholder_text_multiple||this.options.placeholder_text||AbstractChosen.default_multiple_text:this.options.placeholder_text_single||this.options.placeholder_text||AbstractChosen.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||AbstractChosen.default_no_result_text},AbstractChosen.prototype.mouse_enter=function(){return this.mouse_on_container=!0},AbstractChosen.prototype.mouse_leave=function(){return this.mouse_on_container=!1},AbstractChosen.prototype.input_focus=function(){var a=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return a.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},AbstractChosen.prototype.input_blur=function(){var a=this;return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(){return a.blur_test()},100))},AbstractChosen.prototype.results_option_build=function(a){var b,c,d,e,f;for(b="",f=this.results_data,d=0,e=f.length;e>d;d++)c=f[d],b+=c.group?this.result_add_group(c):this.result_add_option(c),(null!=a?a.first:void 0)&&(c.selected&&this.is_multiple?this.choice_build(c):c.selected&&!this.is_multiple&&this.single_set_selected_text(c.text));return b},AbstractChosen.prototype.result_add_option=function(a){var b,c;return a.search_match?this.include_option_in_results(a)?(b=[],a.disabled||a.selected&&this.is_multiple||b.push("active-result"),!a.disabled||a.selected&&this.is_multiple||b.push("disabled-result"),a.selected&&b.push("result-selected"),null!=a.group_array_index&&b.push("group-option"),""!==a.classes&&b.push(a.classes),c=document.createElement("li"),c.className=b.join(" "),c.style.cssText=a.style,c.setAttribute("data-option-array-index",a.array_index),c.innerHTML=a.search_text,this.outerHTML(c)):"":""},AbstractChosen.prototype.result_add_group=function(a){var b;return a.search_match||a.group_match?a.active_options>0?(b=document.createElement("li"),b.className="group-result",b.innerHTML=a.search_text,this.outerHTML(b)):"":""},AbstractChosen.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.results_build(),this.results_showing?this.winnow_results():void 0},AbstractChosen.prototype.reset_single_select_options=function(){var a,b,c,d,e;for(d=this.results_data,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.selected?e.push(a.selected=!1):e.push(void 0);return e},AbstractChosen.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},AbstractChosen.prototype.results_search=function(){return this.results_showing?this.winnow_results():this.results_show()},AbstractChosen.prototype.winnow_results=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;for(this.no_results_clear(),e=0,g=this.get_search_text(),a=g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),d=this.search_contains?"":"^",c=new RegExp(d+a,"i"),j=new RegExp(a,"i"),m=this.results_data,k=0,l=m.length;l>k;k++)b=m[k],b.search_match=!1,f=null,this.include_option_in_results(b)&&(b.group&&(b.group_match=!1,b.active_options=0),null!=b.group_array_index&&this.results_data[b.group_array_index]&&(f=this.results_data[b.group_array_index],0===f.active_options&&f.search_match&&(e+=1),f.active_options+=1),(!b.group||this.group_search)&&(b.search_text=b.group?b.label:b.html,b.search_match=this.search_string_match(b.search_text,c),b.search_match&&!b.group&&(e+=1),b.search_match?(g.length&&(h=b.search_text.search(j),i=b.search_text.substr(0,h+g.length)+"</em>"+b.search_text.substr(h+g.length),b.search_text=i.substr(0,h)+"<em>"+i.substr(h)),null!=f&&(f.group_match=!0)):null!=b.group_array_index&&this.results_data[b.group_array_index].search_match&&(b.search_match=!0)));return this.result_clear_highlight(),1>e&&g.length?(this.update_results_content(""),this.no_results(g)):(this.update_results_content(this.results_option_build()),this.winnow_results_set_highlight())},AbstractChosen.prototype.search_string_match=function(a,b){var c,d,e,f;if(b.test(a))return!0;if(this.enable_split_word_search&&(a.indexOf(" ")>=0||0===a.indexOf("["))&&(d=a.replace(/\[|\]/g,"").split(" "),d.length))for(e=0,f=d.length;f>e;e++)if(c=d[e],b.test(c))return!0},AbstractChosen.prototype.choices_count=function(){var a,b,c,d;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,d=this.form_field.options,b=0,c=d.length;c>b;b++)a=d[b],a.selected&&(this.selected_option_count+=1);return this.selected_option_count},AbstractChosen.prototype.choices_click=function(a){return a.preventDefault(),this.results_showing||this.is_disabled?void 0:this.results_show()},AbstractChosen.prototype.keyup_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),b){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(a.preventDefault(),this.results_showing)return this.result_select(a);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}},AbstractChosen.prototype.clipboard_event_checker=function(){var a=this;return setTimeout(function(){return a.results_search()},50)},AbstractChosen.prototype.container_width=function(){return null!=this.options.width?this.options.width:""+this.form_field.offsetWidth+"px"},AbstractChosen.prototype.include_option_in_results=function(a){return this.is_multiple&&!this.display_selected_options&&a.selected?!1:!this.display_disabled_options&&a.disabled?!1:a.empty?!1:!0},AbstractChosen.prototype.search_results_touchstart=function(a){return this.touch_started=!0,this.search_results_mouseover(a)},AbstractChosen.prototype.search_results_touchmove=function(a){return this.touch_started=!1,this.search_results_mouseout(a)},AbstractChosen.prototype.search_results_touchend=function(a){return this.touch_started?this.search_results_mouseup(a):void 0},AbstractChosen.prototype.outerHTML=function(a){var b;return a.outerHTML?a.outerHTML:(b=document.createElement("div"),b.appendChild(a),b.innerHTML)},AbstractChosen.browser_is_supported=function(){return"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:/iP(od|hone)/i.test(window.navigator.userAgent)?!1:/Android/i.test(window.navigator.userAgent)&&/Mobile/i.test(window.navigator.userAgent)?!1:!0},AbstractChosen.default_multiple_text="Select Some Options",AbstractChosen.default_single_text="Select an Option",AbstractChosen.default_no_result_text="No results match",AbstractChosen}(),a=jQuery,a.fn.extend({chosen:function(b){return AbstractChosen.browser_is_supported()?this.each(function(){var c,d;c=a(this),d=c.data("chosen"),"destroy"===b&&d?d.destroy():d||c.data("chosen",new Chosen(this,b))}):this}}),Chosen=function(c){function Chosen(){return b=Chosen.__super__.constructor.apply(this,arguments)}return d(Chosen,c),Chosen.prototype.setup=function(){return this.form_field_jq=a(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")},Chosen.prototype.set_up_html=function(){var b,c;return b=["chosen-container"],b.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&b.push(this.form_field.className),this.is_rtl&&b.push("chosen-rtl"),c={"class":b.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(c.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=a("<div />",c),this.is_multiple?this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'):this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior(),this.form_field_jq.trigger("chosen:ready",{chosen:this})},Chosen.prototype.register_observers=function(){var a=this;return this.container.bind("mousedown.chosen",function(b){a.container_mousedown(b)}),this.container.bind("mouseup.chosen",function(b){a.container_mouseup(b)}),this.container.bind("mouseenter.chosen",function(b){a.mouse_enter(b)}),this.container.bind("mouseleave.chosen",function(b){a.mouse_leave(b)}),this.search_results.bind("mouseup.chosen",function(b){a.search_results_mouseup(b)}),this.search_results.bind("mouseover.chosen",function(b){a.search_results_mouseover(b)}),this.search_results.bind("mouseout.chosen",function(b){a.search_results_mouseout(b)}),this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(b){a.search_results_mousewheel(b)}),this.search_results.bind("touchstart.chosen",function(b){a.search_results_touchstart(b)}),this.search_results.bind("touchmove.chosen",function(b){a.search_results_touchmove(b)}),this.search_results.bind("touchend.chosen",function(b){a.search_results_touchend(b)}),this.form_field_jq.bind("chosen:updated.chosen",function(b){a.results_update_field(b)}),this.form_field_jq.bind("chosen:activate.chosen",function(b){a.activate_field(b)}),this.form_field_jq.bind("chosen:open.chosen",function(b){a.container_mousedown(b)}),this.form_field_jq.bind("chosen:close.chosen",function(b){a.input_blur(b)}),this.search_field.bind("blur.chosen",function(b){a.input_blur(b)}),this.search_field.bind("keyup.chosen",function(b){a.keyup_checker(b)}),this.search_field.bind("keydown.chosen",function(b){a.keydown_checker(b)}),this.search_field.bind("focus.chosen",function(b){a.input_focus(b)}),this.search_field.bind("cut.chosen",function(b){a.clipboard_event_checker(b)}),this.search_field.bind("paste.chosen",function(b){a.clipboard_event_checker(b)}),this.is_multiple?this.search_choices.bind("click.chosen",function(b){a.choices_click(b)}):this.container.bind("click.chosen",function(a){a.preventDefault()})},Chosen.prototype.destroy=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},Chosen.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chosen-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus.chosen",this.activate_action),this.close_field()):(this.container.removeClass("chosen-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus.chosen",this.activate_action))},Chosen.prototype.container_mousedown=function(b){return this.is_disabled||(b&&"mousedown"===b.type&&!this.results_showing&&b.preventDefault(),null!=b&&a(b.target).hasClass("search-choice-close"))?void 0:(this.active_field?this.is_multiple||!b||a(b.target)[0]!==this.selected_item[0]&&!a(b.target).parents("a.chosen-single").length||(b.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),a(this.container[0].ownerDocument).bind("click.chosen",this.click_test_action),this.results_show()),this.activate_field())},Chosen.prototype.container_mouseup=function(a){return"ABBR"!==a.target.nodeName||this.is_disabled?void 0:this.results_reset(a)},Chosen.prototype.search_results_mousewheel=function(a){var b;return a.originalEvent&&(b=-a.originalEvent.wheelDelta||a.originalEvent.detail),null!=b?(a.preventDefault(),"DOMMouseScroll"===a.type&&(b=40*b),this.search_results.scrollTop(b+this.search_results.scrollTop())):void 0},Chosen.prototype.blur_test=function(){return!this.active_field&&this.container.hasClass("chosen-container-active")?this.close_field():void 0},Chosen.prototype.close_field=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},Chosen.prototype.activate_field=function(){return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},Chosen.prototype.test_active_click=function(b){var c;return c=a(b.target).closest(".chosen-container"),c.length&&this.container[0]===c[0]?this.active_field=!0:this.close_field()},Chosen.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=SelectParser.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},Chosen.prototype.result_do_highlight=function(a){var b,c,d,e,f;if(a.length){if(this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClass("highlighted"),d=parseInt(this.search_results.css("maxHeight"),10),f=this.search_results.scrollTop(),e=d+f,c=this.result_highlight.position().top+this.search_results.scrollTop(),b=c+this.result_highlight.outerHeight(),b>=e)return this.search_results.scrollTop(b-d>0?b-d:0);if(f>c)return this.search_results.scrollTop(c)}},Chosen.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},Chosen.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.container.addClass("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results(),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this}))},Chosen.prototype.update_results_content=function(a){return this.search_results.html(a)},Chosen.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},Chosen.prototype.set_tab_index=function(){var a;return this.form_field.tabIndex?(a=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=a):void 0},Chosen.prototype.set_label_behavior=function(){var b=this;return this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=a("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0?this.form_field_label.bind("click.chosen",function(a){return b.is_multiple?b.container_mousedown(a):b.activate_field()}):void 0},Chosen.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},Chosen.prototype.search_results_mouseup=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c.length?(this.result_highlight=c,this.result_select(b),this.search_field.focus()):void 0},Chosen.prototype.search_results_mouseover=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c?this.result_do_highlight(c):void 0},Chosen.prototype.search_results_mouseout=function(b){return a(b.target).hasClass("active-result")?this.result_clear_highlight():void 0},Chosen.prototype.choice_build=function(b){var c,d,e=this;return c=a("<li />",{"class":"search-choice"}).html("<span>"+b.html+"</span>"),b.disabled?c.addClass("search-choice-disabled"):(d=a("<a />",{"class":"search-choice-close","data-option-array-index":b.array_index}),d.bind("click.chosen",function(a){return e.choice_destroy_link_click(a)}),c.append(d)),this.search_container.before(c)},Chosen.prototype.choice_destroy_link_click=function(b){return b.preventDefault(),b.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(a(b.target))},Chosen.prototype.choice_destroy=function(a){return this.result_deselect(a[0].getAttribute("data-option-array-index"))?(this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),a.parents("li").first().remove(),this.search_field_scale()):void 0},Chosen.prototype.results_reset=function(){return this.reset_single_select_options(),this.form_field.options[0].selected=!0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field?this.results_hide():void 0},Chosen.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},Chosen.prototype.result_select=function(a){var b,c;return this.result_highlight?(b=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?b.removeClass("active-result"):this.reset_single_select_options(),c=this.results_data[b[0].getAttribute("data-option-array-index")],c.selected=!0,this.form_field.options[c.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(c):this.single_set_selected_text(c.text),(a.metaKey||a.ctrlKey)&&this.is_multiple||this.results_hide(),this.search_field.val(""),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[c.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,this.search_field_scale())):void 0},Chosen.prototype.single_set_selected_text=function(a){return null==a&&(a=this.default_text),a===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").text(a)},Chosen.prototype.result_deselect=function(a){var b;return b=this.results_data[a],this.form_field.options[b.options_index].disabled?!1:(b.selected=!1,this.form_field.options[b.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[b.options_index].value}),this.search_field_scale(),!0)},Chosen.prototype.single_deselect_control_build=function(){return this.allow_single_deselect?(this.selected_item.find("abbr").length||this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),this.selected_item.addClass("chosen-single-with-deselect")):void 0},Chosen.prototype.get_search_text=function(){return this.search_field.val()===this.default_text?"":a("<div/>").text(a.trim(this.search_field.val())).html()},Chosen.prototype.winnow_results_set_highlight=function(){var a,b;return b=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),a=b.length?b.first():this.search_results.find(".active-result").first(),null!=a?this.result_do_highlight(a):void 0},Chosen.prototype.no_results=function(b){var c;return c=a('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>'),c.find("span").first().html(b),this.search_results.append(c),this.form_field_jq.trigger("chosen:no_results",{chosen:this})},Chosen.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},Chosen.prototype.keydown_arrow=function(){var a;return this.results_showing&&this.result_highlight?(a=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(a):void 0:this.results_show()},Chosen.prototype.keyup_arrow=function(){var a;return this.results_showing||this.is_multiple?this.result_highlight?(a=this.result_highlight.prevAll("li.active-result"),a.length?this.result_do_highlight(a.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},Chosen.prototype.keydown_backstroke=function(){var a;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(a=this.search_container.siblings("li.search-choice").last(),a.length&&!a.hasClass("search-choice-disabled")?(this.pending_backstroke=a,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0)},Chosen.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},Chosen.prototype.keydown_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),8!==b&&this.pending_backstroke&&this.clear_backstroke(),b){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(a),this.mouse_on_container=!1;break;case 13:a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:a.preventDefault(),this.keydown_arrow()}},Chosen.prototype.search_field_scale=function(){var b,c,d,e,f,g,h,i,j;if(this.is_multiple){for(d=0,h=0,f="position:absolute; left: -1000px; top: -1000px; display:none;",g=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],i=0,j=g.length;j>i;i++)e=g[i],f+=e+":"+this.search_field.css(e)+";";return b=a("<div />",{style:f}),b.text(this.search_field.val()),a("body").append(b),h=b.width()+25,b.remove(),c=this.container.outerWidth(),h>c-10&&(h=c-10),this.search_field.css({width:h+"px"})}},Chosen}(AbstractChosen)}.call(this);
/*! flipclock 2015-01-19 */
var Base=function(){};Base.extend=function(a,b){"use strict";var c=Base.prototype.extend;Base._prototyping=!0;var d=new this;c.call(d,a),d.base=function(){},delete Base._prototyping;var e=d.constructor,f=d.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==f)this._constructing=!0,e.apply(this,arguments),delete this._constructing;else if(null!==arguments[0])return(arguments[0].extend||c).call(arguments[0],d)};return f.ancestor=this,f.extend=this.extend,f.forEach=this.forEach,f.implement=this.implement,f.prototype=d,f.toString=this.toString,f.valueOf=function(a){return"object"==a?f:e.valueOf()},c.call(f,b),"function"==typeof f.init&&f.init(),f},Base.prototype={extend:function(a,b){if(arguments.length>1){var c=this[a];if(c&&"function"==typeof b&&(!c.valueOf||c.valueOf()!=b.valueOf())&&/\bbase\b/.test(b)){var d=b.valueOf();b=function(){var a=this.base||Base.prototype.base;this.base=c;var b=d.apply(this,arguments);return this.base=a,b},b.valueOf=function(a){return"object"==a?b:d},b.toString=Base.toString}this[a]=b}else if(a){var e=Base.prototype.extend;Base._prototyping||"function"==typeof this||(e=this.extend||e);for(var f={toSource:null},g=["constructor","toString","valueOf"],h=Base._prototyping?0:1;i=g[h++];)a[i]!=f[i]&&e.call(this,i,a[i]);for(var i in a)f[i]||e.call(this,i,a[i])}return this}},Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,b,c){for(var d in a)void 0===this.prototype[d]&&b.call(c,a[d],d,a)},implement:function(){for(var a=0;a<arguments.length;a++)"function"==typeof arguments[a]?arguments[a](this.prototype):this.prototype.extend(arguments[a]);return this},toString:function(){return String(this.valueOf())}});var FlipClock;!function(a){"use strict";FlipClock=function(a,b,c){return b instanceof Object&&b instanceof Date==!1&&(c=b,b=0),new FlipClock.Factory(a,b,c)},FlipClock.Lang={},FlipClock.Base=Base.extend({buildDate:"2014-12-12",version:"0.7.7",constructor:function(b,c){"object"!=typeof b&&(b={}),"object"!=typeof c&&(c={}),this.setOptions(a.extend(!0,{},b,c))},callback:function(a){if("function"==typeof a){for(var b=[],c=1;c<=arguments.length;c++)arguments[c]&&b.push(arguments[c]);a.apply(this,b)}},log:function(a){window.console&&console.log&&console.log(a)},getOption:function(a){return this[a]?this[a]:!1},getOptions:function(){return this},setOption:function(a,b){this[a]=b},setOptions:function(a){for(var b in a)"undefined"!=typeof a[b]&&this.setOption(b,a[b])}})}(jQuery),function(a){"use strict";FlipClock.Face=FlipClock.Base.extend({autoStart:!0,dividers:[],factory:!1,lists:[],constructor:function(a,b){this.dividers=[],this.lists=[],this.base(b),this.factory=a},build:function(){this.autoStart&&this.start()},createDivider:function(b,c,d){"boolean"!=typeof c&&c||(d=c,c=b);var e=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join("");d&&(e=""),b=this.factory.localize(b);var f=['<span class="'+this.factory.classes.divider+" "+(c?c:"").toLowerCase()+'">','<span class="'+this.factory.classes.label+'">'+(b?b:"")+"</span>",e,"</span>"],g=a(f.join(""));return this.dividers.push(g),g},createList:function(a,b){"object"==typeof a&&(b=a,a=0);var c=new FlipClock.List(this.factory,a,b);return this.lists.push(c),c},reset:function(){this.factory.time=new FlipClock.Time(this.factory,this.factory.original?Math.round(this.factory.original):0,{minimumDigits:this.factory.minimumDigits}),this.flip(this.factory.original,!1)},appendDigitToClock:function(a){a.$el.append(!1)},addDigit:function(a){var b=this.createList(a,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}});this.appendDigitToClock(b)},start:function(){},stop:function(){},autoIncrement:function(){this.factory.countdown?this.decrement():this.increment()},increment:function(){this.factory.time.addSecond()},decrement:function(){0==this.factory.time.getTimeSeconds()?this.factory.stop():this.factory.time.subSecond()},flip:function(b,c){var d=this;a.each(b,function(a,b){var e=d.lists[a];e?(c||b==e.digit||e.play(),e.select(b)):d.addDigit(b)})}})}(jQuery),function(a){"use strict";FlipClock.Factory=FlipClock.Base.extend({animationRate:1e3,autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:"flip-clock-active",before:"flip-clock-before",divider:"flip-clock-divider",dot:"flip-clock-dot",label:"flip-clock-label",flip:"flip",play:"play",wrapper:"flip-clock-wrapper"},clockFace:"HourlyCounter",countdown:!1,defaultClockFace:"HourlyCounter",defaultLanguage:"english",$el:!1,face:!0,lang:!1,language:"english",minimumDigits:0,original:!1,running:!1,time:!1,timer:!1,$wrapper:!1,constructor:function(b,c,d){d||(d={}),this.lists=[],this.running=!1,this.base(d),this.$el=a(b).addClass(this.classes.wrapper),this.$wrapper=this.$el,this.original=c instanceof Date?c:c?Math.round(c):0,this.time=new FlipClock.Time(this,this.original,{minimumDigits:this.minimumDigits,animationRate:this.animationRate}),this.timer=new FlipClock.Timer(this,d),this.loadLanguage(this.language),this.loadClockFace(this.clockFace,d),this.autoStart&&this.start()},loadClockFace:function(a,b){var c,d="Face",e=!1;return a=a.ucfirst()+d,this.face.stop&&(this.stop(),e=!0),this.$el.html(""),this.time.minimumDigits=this.minimumDigits,c=FlipClock[a]?new FlipClock[a](this,b):new FlipClock[this.defaultClockFace+d](this,b),c.build(),this.face=c,e&&this.start(),this.face},loadLanguage:function(a){var b;return b=FlipClock.Lang[a.ucfirst()]?FlipClock.Lang[a.ucfirst()]:FlipClock.Lang[a]?FlipClock.Lang[a]:FlipClock.Lang[this.defaultLanguage],this.lang=b},localize:function(a,b){var c=this.lang;if(!a)return null;var d=a.toLowerCase();return"object"==typeof b&&(c=b),c&&c[d]?c[d]:a},start:function(a){var b=this;b.running||b.countdown&&!(b.countdown&&b.time.time>0)?b.log("Trying to start timer when countdown already at 0"):(b.face.start(b.time),b.timer.start(function(){b.flip(),"function"==typeof a&&a()}))},stop:function(a){this.face.stop(),this.timer.stop(a);for(var b in this.lists)this.lists.hasOwnProperty(b)&&this.lists[b].stop()},reset:function(a){this.timer.reset(a),this.face.reset()},setTime:function(a){this.time.time=a,this.flip(!0)},getTime:function(){return this.time},setCountdown:function(a){var b=this.running;this.countdown=a?!0:!1,b&&(this.stop(),this.start())},flip:function(a){this.face.flip(!1,a)}})}(jQuery),function(a){"use strict";FlipClock.List=FlipClock.Base.extend({digit:0,classes:{active:"flip-clock-active",before:"flip-clock-before",flip:"flip"},factory:!1,$el:!1,$obj:!1,items:[],lastDigit:0,constructor:function(a,b){this.factory=a,this.digit=b,this.lastDigit=b,this.$el=this.createList(),this.$obj=this.$el,b>0&&this.select(b),this.factory.$el.append(this.$el)},select:function(a){if("undefined"==typeof a?a=this.digit:this.digit=a,this.digit!=this.lastDigit){var b=this.$el.find("."+this.classes.before).removeClass(this.classes.before);this.$el.find("."+this.classes.active).removeClass(this.classes.active).addClass(this.classes.before),this.appendListItem(this.classes.active,this.digit),b.remove(),this.lastDigit=this.digit}},play:function(){this.$el.addClass(this.factory.classes.play)},stop:function(){var a=this;setTimeout(function(){a.$el.removeClass(a.factory.classes.play)},this.factory.timer.interval)},createListItem:function(a,b){return['<li class="'+(a?a:"")+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>",'<div class="down">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>","</a>","</li>"].join("")},appendListItem:function(a,b){var c=this.createListItem(a,b);this.$el.append(c)},createList:function(){var b=this.getPrevDigit()?this.getPrevDigit():this.digit,c=a(['<ul class="'+this.classes.flip+" "+(this.factory.running?this.factory.classes.play:"")+'">',this.createListItem(this.classes.before,b),this.createListItem(this.classes.active,this.digit),"</ul>"].join(""));return c},getNextDigit:function(){return 9==this.digit?0:this.digit+1},getPrevDigit:function(){return 0==this.digit?9:this.digit-1}})}(jQuery),function(a){"use strict";String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)},a.fn.FlipClock=function(b,c){return new FlipClock(a(this),b,c)},a.fn.flipClock=function(b,c){return a.fn.FlipClock(b,c)}}(jQuery),function(a){"use strict";FlipClock.Time=FlipClock.Base.extend({time:0,factory:!1,minimumDigits:0,constructor:function(a,b,c){"object"!=typeof c&&(c={}),c.minimumDigits||(c.minimumDigits=a.minimumDigits),this.base(c),this.factory=a,b&&(this.time=b)},convertDigitsToArray:function(a){var b=[];a=a.toString();for(var c=0;c<a.length;c++)a[c].match(/^\d*$/g)&&b.push(a[c]);return b},digit:function(a){var b=this.toString(),c=b.length;return b[c-a]?b[c-a]:!1},digitize:function(b){var c=[];if(a.each(b,function(a,b){b=b.toString(),1==b.length&&(b="0"+b);for(var d=0;d<b.length;d++)c.push(b.charAt(d))}),c.length>this.minimumDigits&&(this.minimumDigits=c.length),this.minimumDigits>c.length)for(var d=c.length;d<this.minimumDigits;d++)c.unshift("0");return c},getDateObject:function(){return this.time instanceof Date?this.time:new Date((new Date).getTime()+1e3*this.getTimeSeconds())},getDayCounter:function(a){var b=[this.getDays(),this.getHours(!0),this.getMinutes(!0)];return a&&b.push(this.getSeconds(!0)),this.digitize(b)},getDays:function(a){var b=this.getTimeSeconds()/60/60/24;return a&&(b%=7),Math.floor(b)},getHourCounter:function(){var a=this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)]);return a},getHourly:function(){return this.getHourCounter()},getHours:function(a){var b=this.getTimeSeconds()/60/60;return a&&(b%=24),Math.floor(b)},getMilitaryTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject());var c=[a.getHours(),a.getMinutes()];return b===!0&&c.push(a.getSeconds()),this.digitize(c)},getMinutes:function(a){var b=this.getTimeSeconds()/60;return a&&(b%=60),Math.floor(b)},getMinuteCounter:function(){var a=this.digitize([this.getMinutes(),this.getSeconds(!0)]);return a},getTimeSeconds:function(a){return a||(a=new Date),this.time instanceof Date?this.factory.countdown?Math.max(this.time.getTime()/1e3-a.getTime()/1e3,0):a.getTime()/1e3-this.time.getTime()/1e3:this.time},getTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject()),console.log(a);var c=a.getHours(),d=[c>12?c-12:0===c?12:c,a.getMinutes()];return b===!0&&d.push(a.getSeconds()),this.digitize(d)},getSeconds:function(a){var b=this.getTimeSeconds();return a&&(60==b?b=0:b%=60),Math.ceil(b)},getWeeks:function(a){var b=this.getTimeSeconds()/60/60/24/7;return a&&(b%=52),Math.floor(b)},removeLeadingZeros:function(b,c){var d=0,e=[];return a.each(c,function(a){b>a?d+=parseInt(c[a],10):e.push(c[a])}),0===d?e:c},addSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()+a):this.time+=a},addSecond:function(){this.addSeconds(1)},subSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()-a):this.time-=a},subSecond:function(){this.subSeconds(1)},toString:function(){return this.getTimeSeconds().toString()}})}(jQuery),function(){"use strict";FlipClock.Timer=FlipClock.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1e3,animationRate:1e3,constructor:function(a,b){this.base(b),this.factory=a,this.callback(this.callbacks.init),this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(a){clearInterval(this.timer),this.count=0,this._setInterval(a),this.callback(this.callbacks.reset)},start:function(a){this.factory.running=!0,this._createTimer(a),this.callback(this.callbacks.start)},stop:function(a){this.factory.running=!1,this._clearInterval(a),this.callback(this.callbacks.stop),this.callback(a)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(a){this._setInterval(a)},_destroyTimer:function(a){this._clearInterval(),this.timer=!1,this.callback(a),this.callback(this.callbacks.destroy)},_interval:function(a){this.callback(this.callbacks.interval),this.callback(a),this.count++},_setInterval:function(a){var b=this;b._interval(a),b.timer=setInterval(function(){b._interval(a)},this.interval)}})}(jQuery),function(a){FlipClock.TwentyFourHourClockFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul");this.factory.time.time||(this.factory.original=new Date,this.factory.time=new FlipClock.Time(this.factory,this.factory.original));var b=b?b:this.factory.time.getMilitaryTime(!1,this.showSeconds);b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.createDivider(),this.createDivider(),a(this.dividers[0]).insertBefore(this.lists[this.lists.length-2].$el),a(this.dividers[1]).insertBefore(this.lists[this.lists.length-4].$el),this.base()},flip:function(a,b){this.autoIncrement(),a=a?a:this.factory.time.getMilitaryTime(!1,this.showSeconds),this.base(a,b)}})}(jQuery),function(a){FlipClock.CounterFace=FlipClock.Face.extend({shouldAutoIncrement:!1,constructor:function(a,b){"object"!=typeof b&&(b={}),a.autoStart=b.autoStart?!0:!1,b.autoStart&&(this.shouldAutoIncrement=!0),a.increment=function(){a.countdown=!1,a.setTime(a.getTime().getTimeSeconds()+1)},a.decrement=function(){a.countdown=!0;var b=a.getTime().getTimeSeconds();b>0&&a.setTime(b-1)},a.setValue=function(b){a.setTime(b)},a.setCounter=function(b){a.setTime(b)},this.base(a,b)},build:function(){var b=this,c=this.factory.$el.find("ul"),d=this.factory.getTime().digitize([this.factory.getTime().time]);d.length>c.length&&a.each(d,function(a,c){var d=b.createList(c);d.select(c)}),a.each(this.lists,function(a,b){b.play()}),this.base()},flip:function(a,b){this.shouldAutoIncrement&&this.autoIncrement(),a||(a=this.factory.getTime().digitize([this.factory.getTime().time])),this.base(a,b)},reset:function(){this.factory.time=new FlipClock.Time(this.factory,this.factory.original?Math.round(this.factory.original):0),this.flip()}})}(jQuery),function(a){FlipClock.DailyCounterFace=FlipClock.Face.extend({showSeconds:!0,constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul"),e=0;b=b?b:this.factory.time.getDayCounter(this.showSeconds),b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.showSeconds?a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el):e=2,a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4+e].$el),a(this.createDivider("Hours")).insertBefore(this.lists[this.lists.length-6+e].$el),a(this.createDivider("Days",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getDayCounter(this.showSeconds)),this.autoIncrement(),this.base(a,b)}})}(jQuery),function(a){FlipClock.HourlyCounterFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b,c){var d=this,e=this.factory.$el.find("ul");c=c?c:this.factory.time.getHourCounter(),c.length>e.length&&a.each(c,function(a,b){d.createList(b)}),a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el),a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4].$el),b||a(this.createDivider("Hours",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getHourCounter()),this.autoIncrement(),this.base(a,b)},appendDigitToClock:function(a){this.base(a),this.dividers[0].insertAfter(this.dividers[0].next())}})}(jQuery),function(){FlipClock.MinuteCounterFace=FlipClock.HourlyCounterFace.extend({clearExcessDigits:!1,constructor:function(a,b){this.base(a,b)},build:function(){this.base(!0,this.factory.time.getMinuteCounter())},flip:function(a,b){a||(a=this.factory.time.getMinuteCounter()),this.base(a,b)}})}(jQuery),function(a){FlipClock.TwelveHourClockFace=FlipClock.TwentyFourHourClockFace.extend({meridium:!1,meridiumText:"AM",build:function(){var b=this.factory.time.getTime(!1,this.showSeconds);this.base(b),this.meridiumText=this.getMeridium(),this.meridium=a(['<ul class="flip-clock-meridium">',"<li>",'<a href="#">'+this.meridiumText+"</a>","</li>","</ul>"].join("")),this.meridium.insertAfter(this.lists[this.lists.length-1].$el)},flip:function(a,b){this.meridiumText!=this.getMeridium()&&(this.meridiumText=this.getMeridium(),this.meridium.find("a").html(this.meridiumText)),this.base(this.factory.time.getTime(!1,this.showSeconds),b)},getMeridium:function(){return(new Date).getHours()>=12?"PM":"AM"},isPM:function(){return"PM"==this.getMeridium()?!0:!1},isAM:function(){return"AM"==this.getMeridium()?!0:!1}})}(jQuery),function(){FlipClock.Lang.Arabic={years:"سنوات",months:"شهور",days:"أيام",hours:"ساعات",minutes:"دقائق",seconds:"ثواني"},FlipClock.Lang.ar=FlipClock.Lang.Arabic,FlipClock.Lang["ar-ar"]=FlipClock.Lang.Arabic,FlipClock.Lang.arabic=FlipClock.Lang.Arabic}(jQuery),function(){FlipClock.Lang.Danish={years:"År",months:"Måneder",days:"Dage",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.da=FlipClock.Lang.Danish,FlipClock.Lang["da-dk"]=FlipClock.Lang.Danish,FlipClock.Lang.danish=FlipClock.Lang.Danish}(jQuery),function(){FlipClock.Lang.German={years:"Jahre",months:"Monate",days:"Tage",hours:"Stunden",minutes:"Minuten",seconds:"Sekunden"},FlipClock.Lang.de=FlipClock.Lang.German,FlipClock.Lang["de-de"]=FlipClock.Lang.German,FlipClock.Lang.german=FlipClock.Lang.German}(jQuery),function(){FlipClock.Lang.English={years:"Years",months:"Months",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"},FlipClock.Lang.en=FlipClock.Lang.English,FlipClock.Lang["en-us"]=FlipClock.Lang.English,FlipClock.Lang.english=FlipClock.Lang.English}(jQuery),function(){FlipClock.Lang.Spanish={years:"A&#241;os",months:"Meses",days:"D&#205;as",hours:"Horas",minutes:"Minutos",seconds:"Segundo"},FlipClock.Lang.es=FlipClock.Lang.Spanish,FlipClock.Lang["es-es"]=FlipClock.Lang.Spanish,FlipClock.Lang.spanish=FlipClock.Lang.Spanish}(jQuery),function(){FlipClock.Lang.Finnish={years:"Vuotta",months:"Kuukautta",days:"Päivää",hours:"Tuntia",minutes:"Minuuttia",seconds:"Sekuntia"},FlipClock.Lang.fi=FlipClock.Lang.Finnish,FlipClock.Lang["fi-fi"]=FlipClock.Lang.Finnish,FlipClock.Lang.finnish=FlipClock.Lang.Finnish}(jQuery),function(){FlipClock.Lang.French={years:"Ans",months:"Mois",days:"Jours",hours:"Heures",minutes:"Minutes",seconds:"Secondes"},FlipClock.Lang.fr=FlipClock.Lang.French,FlipClock.Lang["fr-ca"]=FlipClock.Lang.French,FlipClock.Lang.french=FlipClock.Lang.French}(jQuery),function(){FlipClock.Lang.Italian={years:"Anni",months:"Mesi",days:"Giorni",hours:"Ore",minutes:"Minuti",seconds:"Secondi"},FlipClock.Lang.it=FlipClock.Lang.Italian,FlipClock.Lang["it-it"]=FlipClock.Lang.Italian,FlipClock.Lang.italian=FlipClock.Lang.Italian}(jQuery),function(){FlipClock.Lang.Latvian={years:"Gadi",months:"Mēneši",days:"Dienas",hours:"Stundas",minutes:"Minūtes",seconds:"Sekundes"},FlipClock.Lang.lv=FlipClock.Lang.Latvian,FlipClock.Lang["lv-lv"]=FlipClock.Lang.Latvian,FlipClock.Lang.latvian=FlipClock.Lang.Latvian}(jQuery),function(){FlipClock.Lang.Dutch={years:"Jaren",months:"Maanden",days:"Dagen",hours:"Uren",minutes:"Minuten",seconds:"Seconden"},FlipClock.Lang.nl=FlipClock.Lang.Dutch,FlipClock.Lang["nl-be"]=FlipClock.Lang.Dutch,FlipClock.Lang.dutch=FlipClock.Lang.Dutch}(jQuery),function(){FlipClock.Lang.Norwegian={years:"År",months:"Måneder",days:"Dager",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.no=FlipClock.Lang.Norwegian,FlipClock.Lang.nb=FlipClock.Lang.Norwegian,FlipClock.Lang["no-nb"]=FlipClock.Lang.Norwegian,FlipClock.Lang.norwegian=FlipClock.Lang.Norwegian}(jQuery),function(){FlipClock.Lang.Portuguese={years:"Anos",months:"Meses",days:"Dias",hours:"Horas",minutes:"Minutos",seconds:"Segundos"},FlipClock.Lang.pt=FlipClock.Lang.Portuguese,FlipClock.Lang["pt-br"]=FlipClock.Lang.Portuguese,FlipClock.Lang.portuguese=FlipClock.Lang.Portuguese}(jQuery),function(){FlipClock.Lang.Russian={years:"лет",months:"месяцев",days:"дней",hours:"часов",minutes:"минут",seconds:"секунд"},FlipClock.Lang.ru=FlipClock.Lang.Russian,FlipClock.Lang["ru-ru"]=FlipClock.Lang.Russian,FlipClock.Lang.russian=FlipClock.Lang.Russian}(jQuery),function(){FlipClock.Lang.Swedish={years:"År",months:"Månader",days:"Dagar",hours:"Timmar",minutes:"Minuter",seconds:"Sekunder"},FlipClock.Lang.sv=FlipClock.Lang.Swedish,FlipClock.Lang["sv-se"]=FlipClock.Lang.Swedish,FlipClock.Lang.swedish=FlipClock.Lang.Swedish}(jQuery),function(){FlipClock.Lang.Chinese={years:"年",months:"月",days:"日",hours:"时",minutes:"分",seconds:"秒"},FlipClock.Lang.zh=FlipClock.Lang.Chinese,FlipClock.Lang["zh-cn"]=FlipClock.Lang.Chinese,FlipClock.Lang.chinese=FlipClock.Lang.Chinese}(jQuery);
/*! iCheck v2.0.0 - http://git.io/arlzeA, (c) Damir Sultanov - http://fronteed.com */
(function(q,C,m){q.ichecked||(q.ichecked=function(){m=q.jQuery||q.Zepto;var w={autoInit:!0,autoAjax:!0,tap:!0,checkboxClass:"icheckbox",radioClass:"iradio",checkedClass:"checked",disabledClass:"disabled",indeterminateClass:"indeterminate",hoverClass:"hover",callbacks:{ifCreated:!1},classes:{base:"icheck",div:"#-item",area:"#-area-",input:"#-input",label:"#-label"}};q.icheck=m.extend(w,q.icheck);var l=q.navigator.userAgent,Z=/MSIE [5-8]/.test(l)||9>C.documentMode,s=/Opera Mini/.test(l),D=w.classes.base,
M=w.classes.div.replace("#",D),$=w.classes.area.replace("#",D),N=w.classes.input.replace("#",D),O=w.classes.label.replace("#",D);delete q.icheck.classes;var aa={},p={},ia=RegExp(D+"\\[(.*?)\\]"),G=function(a,d,c){a&&(d=ia.exec(a))&&p[d[1]]&&(c=d[1]);return c},ba=q.getComputedStyle,V=q.PointerEvent||q.MSPointerEvent,z="ontouchend"in q,E=/mobile|tablet|phone|ip(ad|od)|android|silk|webos/i.test(l),l=["mouse","down","up","over","out"],u=q.PointerEvent?["pointer",l[1],l[2],l[3],l[4]]:["MSPointer","Down",
"Up","Over","Out"],P=["touch","start","end"],Q=z&&E||V,R=Q?z?P[0]+P[1]:u[0]+u[3]:l[0]+l[3],W=Q?z?P[0]+P[2]:u[0]+u[4]:l[0]+l[4],K=Q?z?!1:u[0]+u[1]:l[0]+l[1],X=Q?z?!1:u[0]+u[2]:l[0]+l[2],l=s?"":R+".i "+W+".i ",u=!s&&K?K+".i "+X+".i":"",H,S,ca=!1!==w.areaStyle?'position:absolute;display:block;content:"";top:#;bottom:#;left:#;right:#;':0,T=function(a,d,c){H||(H=C.createElement("style"),(C.head||C.getElementsByTagName("head")[0]).appendChild(H),q.createPopup||H.appendChild(C.createTextNode("")),S=H.sheet||
H.styleSheet);d||(d="div."+(c?$+c+":after":M+" input."+N));a=a.replace(/!/g," !important");S.addRule?S.addRule(d,a,0):S.insertRule(d+"{"+a+"}",0)};T("position:absolute!;display:block!;outline:none!;"+(w.debug?"":"opacity:0!;z-index:-99!;clip:rect(0 0 0 0)!;"));(z&&E||s)&&T("cursor:pointer!;","label."+O+",div."+M);T("display:none!","iframe.icheck-frame");var F=function(a,d,c,b,f,e,k){if(b=a.className)return f=" "+b+" ",1===c?e=d:0===c?k=d:(e=d[0],k=d[1]),e&&0>f.indexOf(" "+e+" ")&&(f+=e+" "),k&&~f.indexOf(" "+
k+" ")&&(f=f.replace(" "+k+" "," ")),f=f.replace(/^\s+|\s+$/g,""),f!==b&&(a.className=f),f},da=function(a,d,c,b,f,e){p[d]&&(b=p[d],f=b.className,e=m(I(a,"div",f)),e.length&&(m(a).removeClass(N+" "+f).attr("style",b.style),m("label."+b.esc).removeClass(O+" "+f),m(e).replaceWith(m(a)),c&&L(a,d,c)),p[d]=!1)},ea=function(a,d,c,b,f){c=[];for(b=a.length;b--;)if(d=a[b],d.type)~"input[type=checkbox],input[type=radio]".indexOf(d.type)&&c.push(d);else for(d=m(d).find("input[type=checkbox],input[type=radio]"),
f=d.length;f--;)c.push(d[f]);return c},I=function(a,d,c,b){for(;9!==a.nodeType;)if(a=a.parentNode,a.tagName==d.toUpperCase()&&~a.className.indexOf(c)){b=a;break}return b},L=function(a,d,c){c="if"+c;if(!1!==p[d].callbacks){if("function"==typeof p[d].callbacks[c])p[d].callbacks[c](a,p[d]);!1!==p[d].callbacks[c]&&m(a).trigger(c)}},fa=function(a,d,c,b){a=ea(a);for(var f=a.length;f--;){var e=a[f],k=e.attributes,l={},g=k.length,h,n,u={},w={},t,r=e.id,x=e.className,y,z=e.type,Y=m.cache[e[m.expando]],A=G(x),
J,v,B="",s=!1;v=[];for(var E=q.FastClick?" needsclick":"";g--;)h=k[g].name,n=k[g].value,~h.indexOf("data-")&&(u[h.substr(5)]=n),"style"==h&&(y=n),l[h]=n;Y&&Y.data&&(u=m.extend(u,Y.data));for(t in u){n=u[t];if("true"==n||"false"==n)n="true"==n;w[t.replace(/checkbox|radio|class|id|label/g,function(a,b){return 0===b?a:a.charAt(0).toUpperCase()+a.slice(1)})]=n}k=m.extend({},q.icheck,w,d);g=k.handle;"checkbox"!==g&&"radio"!==g&&(g="input[type=checkbox],input[type=radio]");if(!1!==k.init&&~g.indexOf(z)){for(A&&
da(e,A);!p[A];)if(A=Math.random().toString(36).substr(2,5),!p[A]){J=D+"["+A+"]";break}delete k.autoInit;delete k.autoAjax;k.style=y||"";k.className=J;k.esc=J.replace(/(\[|\])/g,"\\$1");p[A]=k;if(g=I(e,"label",""))!g.htmlFor&&r&&(g.htmlFor=r),v.push(g);if(r)for(h=m('label[for="'+r+'"]');h.length--;)r=h[h.length],r!==g&&v.push(r);for(n=v.length;n--;)r=v[n],h=r.className,h=(g=G(h))?F(r,D+"["+g+"]",0):(h?h+" ":"")+O,r.className=h+" "+J+E;v=C.createElement("div");if(k.inherit)for(r=k.inherit.split(/\s*,\s*/),
h=r.length;h--;)g=r[h],void 0!==l[g]&&("class"==g?B+=l[g]+" ":v.setAttribute(g,"id"==g?D+"-"+l[g]:l[g]));B+=k[z+"Class"];B+=" "+M+" "+J;k.area&&ca&&(s=(""+k.area).replace(/%|px|em|\+|-/g,"")|0)&&(aa[s]||(T(ca.replace(/#/g,"-"+s+"%"),!1,s),aa[s]=!0),B+=" "+$+s);v.className=B+E;e.className=(x?x+" ":"")+N+" "+J;e.parentNode.replaceChild(v,e);v.appendChild(e);k.insert&&m(v).append(k.insert);s&&(l=ba?ba(v,null).getPropertyValue("position"):v.currentStyle.position,"static"==l&&(v.style.position="relative"));
U(e,v,A,"updated",!0,!1,c);p[A].done=!0;b||L(e,A,"Created")}}},U=function(a,d,c,b,f,e,k){var m=p[c],g={},h={};g.checked=[a.checked,"Checked","Unchecked"];e&&!k||"click"===b||(g.disabled=[a.disabled,"Disabled","Enabled"],g.indeterminate=["true"==a.getAttribute("indeterminate")||!!a.indeterminate,"Indeterminate","Determinate"]);"updated"==b||"click"==b?(h.checked=e?!g.checked[0]:g.checked[0],e&&!k||"click"===b||(h.disabled=g.disabled[0],h.indeterminate=g.indeterminate[0])):"checked"==b||"unchecked"==
b?h.checked="checked"==b:"disabled"==b||"enabled"==b?h.disabled="disabled"==b:"indeterminate"==b||"determinate"==b?h.indeterminate="determinate"!==b:h.checked=!g.checked[0];ga(a,d,g,h,c,m,b,f,e,k)},ga=function(a,d,c,b,f,e,k,l,g,h,n){var q=a.type,u="radio"==q?"Radio":"Checkbox",t,r,x,y,s,w,A,z,v,B;d||(d=I(a,"div",e.className));if(d){for(t in b)if(r=b[t],c[t][0]!==r&&"updated"!==k&&"click"!==k&&(a[t]=r),h&&(r?a.setAttribute(t,t):a.removeAttribute(t)),e[t]!==r){e[t]=r;v=!0;if("checked"==t&&(B=!0,!n&&
r&&(p[f].done||h)&&"radio"==q&&a.name))for(y=I(a,"form",""),x='input[name="'+a.name+'"]',x=y&&!h?m(y).find(x):m(x),y=x.length;y--;)s=x[y],w=G(s.className),a!==s&&p[w]&&p[w].checked&&(A={checked:[!0,"Checked","Unchecked"]},z={checked:!1},ga(s,!1,A,z,w,p[w],"updated",l,g,h,!0));x=[e[t+"Class"],e[t+u+"Class"],e[c[t][1]+"Class"],e[c[t][1]+u+"Class"],e[t+"LabelClass"]];y=[x[3]||x[2],x[1]||x[0]];r&&y.reverse();F(d,y);if(e.mirror&&x[4])for(y=m("label."+e.esc);y.length--;)F(y[y.length],x[4],r?1:0);l&&!n||
L(a,f,c[t][r?1:2])}if(!l||n)v&&L(a,f,"Changed"),B&&L(a,f,"Toggled");e.cursor&&!E&&(e.disabled||e.pointer?e.disabled&&e.pointer&&(d.style.cursor="default",e.pointer=!1):(d.style.cursor="pointer",e.pointer=!0));p[f]=e}};m.fn.icheck=function(a,d){if(/^(checked|unchecked|indeterminate|determinate|disabled|enabled|updated|toggle|destroy|data|styler)$/.test(a))for(var c=ea(this),b=c.length;b--;){var f=c[b],e=G(f.className);if(e){if("data"==a)return p[e];if("styler"==a)return I(f,"div",p[e].className);"destroy"==
a?da(f,e,"Destroyed"):U(f,!1,e,a);"function"==typeof d&&d(f)}}else"object"!=typeof a&&a||fa(this,a||{});return this};var ha;m(C).on("click.i "+l+u,"label."+O+",div."+M,function(a){var d=this,c=G(d.className);if(c){var b=a.type,c=p[c],f=c.esc,e="DIV"==d.tagName,k,l,g,h,n=[["label",c.activeLabelClass,c.hoverLabelClass],["div",c.activeClass,c.hoverClass]];e&&n.reverse();if(b==K||b==X){n[0][1]&&F(d,n[0][1],b==K?1:0);if(c.mirror&&n[1][1])for(g=m(n[1][0]+"."+f);g.length--;)F(g[g.length],n[1][1],b==K?1:
0);e&&b==X&&c.tap&&E&&V&&!s&&(h=!0)}else if(b==R||b==W){n[0][2]&&F(d,n[0][2],b==R?1:0);if(c.mirror&&n[1][2])for(g=m(n[1][0]+"."+f);g.length--;)F(g[g.length],n[1][2],b==R?1:0);e&&b==W&&c.tap&&E&&z&&!s&&(h=!0)}else e&&(E&&(z||V)&&c.tap&&!s||(h=!0));h&&setTimeout(function(){l=a.currentTarget||{};"LABEL"!==l.tagName&&(k=m(d).find("input."+f).click(),(Z||s)&&k.change())},2)}}).on("click.i change.i focusin.i focusout.i keyup.i keydown.i","input."+N,function(a){var d=G(this.className);if(d){var c=a.type,
b=p[d],f=b.esc,e="click"==c?!1:I(this,"div",b.className);if("click"==c)a.stopPropagation();else if("change"==c)e&&!this.disabled&&U(this,e,d,"click");else if(~c.indexOf("focus")){if(a=[b.focusClass,b.focusLabelClass],a[0]&&e&&F(e,a[0],"focusin"==c?1:0),b.mirror&&a[1])for(b=m("label."+f);b.length--;)F(b[b.length],a[1],"focusin"==c?1:0)}else e&&!this.disabled&&("keyup"==c?(("checkbox"==this.type&&32==a.keyCode&&b.keydown||"radio"==this.type&&!this.checked)&&U(this,e,d,"click",!1,!0),p[d].keydown=p[ha].keydown=
!1):(ha=d,p[d].keydown=!0))}}).ready(function(){q.icheck.autoInit&&m("."+D).icheck();if(q.jQuery){var a=C.body||C.getElementsByTagName("body")[0];m.ajaxSetup({converters:{"text html":function(d){if(q.icheck.autoAjax&&a){var c=C.createElement("iframe"),b;Z||(c.style="display:none");c.className="iframe.icheck-frame";c.src="about:blank";a.appendChild(c);b=c.contentDocument?c.contentDocument:c.contentWindow.document;b.open();b.write(d);b.close();a.removeChild(c);b=m(b);fa(b.find("."+D),{},!0);b=b[0];
d=(b.body||b.getElementsByTagName("body")[0]).innerHTML}return d}}})}})},"function"==typeof define&&define.amd?define("icheck",[q.jQuery?"jquery":"zepto"],q.ichecked):q.ichecked())})(window,document);

/*! jQuery UI - v1.10.4 - 2014-02-04
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.datepicker.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-fade.js, jquery.ui.effect-highlight.js, jquery.ui.effect-scale.js, jquery.ui.effect-slide.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e,t){function i(t,i){var s,a,o,r=t.nodeName.toLowerCase();return"area"===r?(s=t.parentNode,a=s.name,t.href&&a&&"map"===s.nodeName.toLowerCase()?(o=e("img[usemap=#"+a+"]")[0],!!o&&n(o)):!1):(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||i:i)&&n(t)}function n(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var s=0,a=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,n){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),n&&n.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var n,s,a=e(this[0]);a.length&&a[0]!==document;){if(n=a.css("position"),("absolute"===n||"relative"===n||"fixed"===n)&&(s=parseInt(a.css("zIndex"),10),!isNaN(s)&&0!==s))return s;a=a.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++s)})},removeUniqueId:function(){return this.each(function(){a.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,n){return!!e.data(t,n[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),s=isNaN(n);return(s||n>=0)&&i(t,!s)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,n){function s(t,i,n,s){return e.each(a,function(){i-=parseFloat(e.css(t,"padding"+this))||0,n&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var a="Width"===n?["Left","Right"]:["Top","Bottom"],o=n.toLowerCase(),r={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+n]=function(i){return i===t?r["inner"+n].call(this):this.each(function(){e(this).css(o,s(this,i)+"px")})},e.fn["outer"+n]=function(t,i){return"number"!=typeof t?r["outer"+n].call(this,t):this.each(function(){e(this).css(o,s(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,n){var s,a=e.ui[t].prototype;for(s in n)a.plugins[s]=a.plugins[s]||[],a.plugins[s].push([i,n[s]])},call:function(e,t,i){var n,s=e.plugins[t];if(s&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(n=0;s.length>n;n++)e.options[s[n][0]]&&s[n][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var n=i&&"left"===i?"scrollLeft":"scrollTop",s=!1;return t[n]>0?!0:(t[n]=1,s=t[n]>0,t[n]=0,s)}})})(jQuery);(function(t,e){var i=0,s=Array.prototype.slice,n=t.cleanData;t.cleanData=function(e){for(var i,s=0;null!=(i=e[s]);s++)try{t(i).triggerHandler("remove")}catch(o){}n(e)},t.widget=function(i,s,n){var o,a,r,h,l={},c=i.split(".")[0];i=i.split(".")[1],o=c+"-"+i,n||(n=s,s=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){return!!t.data(e,o)},t[c]=t[c]||{},a=t[c][i],r=t[c][i]=function(t,i){return this._createWidget?(arguments.length&&this._createWidget(t,i),e):new r(t,i)},t.extend(r,a,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),h=new s,h.options=t.widget.extend({},h.options),t.each(n,function(i,n){return t.isFunction(n)?(l[i]=function(){var t=function(){return s.prototype[i].apply(this,arguments)},e=function(t){return s.prototype[i].apply(this,t)};return function(){var i,s=this._super,o=this._superApply;return this._super=t,this._superApply=e,i=n.apply(this,arguments),this._super=s,this._superApply=o,i}}(),e):(l[i]=n,e)}),r.prototype=t.widget.extend(h,{widgetEventPrefix:a?h.widgetEventPrefix||i:i},l,{constructor:r,namespace:c,widgetName:i,widgetFullName:o}),a?(t.each(a._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,r,i._proto)}),delete a._childConstructors):s._childConstructors.push(r),t.widget.bridge(i,r)},t.widget.extend=function(i){for(var n,o,a=s.call(arguments,1),r=0,h=a.length;h>r;r++)for(n in a[r])o=a[r][n],a[r].hasOwnProperty(n)&&o!==e&&(i[n]=t.isPlainObject(o)?t.isPlainObject(i[n])?t.widget.extend({},i[n],o):t.widget.extend({},o):o);return i},t.widget.bridge=function(i,n){var o=n.prototype.widgetFullName||i;t.fn[i]=function(a){var r="string"==typeof a,h=s.call(arguments,1),l=this;return a=!r&&h.length?t.widget.extend.apply(null,[a].concat(h)):a,r?this.each(function(){var s,n=t.data(this,o);return n?t.isFunction(n[a])&&"_"!==a.charAt(0)?(s=n[a].apply(n,h),s!==n&&s!==e?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):e):t.error("no such method '"+a+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+a+"'")}):this.each(function(){var e=t.data(this,o);e?e.option(a||{})._init():t.data(this,o,new n(a,this))}),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,s){var n,o,a,r=i;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof i)if(r={},n=i.split("."),i=n.shift(),n.length){for(o=r[i]=t.widget.extend({},this.options[i]),a=0;n.length-1>a;a++)o[n[a]]=o[n[a]]||{},o=o[n[a]];if(i=n.pop(),1===arguments.length)return o[i]===e?null:o[i];o[i]=s}else{if(1===arguments.length)return this.options[i]===e?null:this.options[i];r[i]=s}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var o,a=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=o=t(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,o=this.widget()),t.each(n,function(n,r){function h(){return i||a.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?a[r]:r).apply(a,arguments):e}"string"!=typeof r&&(h.guid=r.guid=r.guid||h.guid||t.guid++);var l=n.match(/^(\w+)\s*(.*)$/),c=l[1]+a.eventNamespace,u=l[2];u?o.delegate(u,c,h):s.bind(c,h)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}})})(jQuery);(function(t){var e=!1;t(document).mouseup(function(){e=!1}),t.widget("ui.mouse",{version:"1.10.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!e){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?t(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return s._mouseMove(t)},this._mouseUpDelegate=function(t){return s._mouseUp(t)},t(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),e=!0,!0)):!0}},_mouseMove:function(e){return t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button?this._mouseUp(e):this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){return t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,l=Math.round,h=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,g,m,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),k=t.position.getScrollInfo(y),w=(e.collision||"flip").split(" "),D={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,g=_.height,m=_.offset,v=t.extend({},m),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=h.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=h.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),D[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=g:"center"===e.at[1]&&(v.top+=g/2),a=i(D.at,p,g),v.left+=a[0],v.top+=a[1],this.each(function(){var n,h,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),x=u+f+s(this,"marginRight")+k.width,C=d+_+s(this,"marginBottom")+k.height,M=t.extend({},v),T=i(D.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?M.left-=u:"center"===e.my[0]&&(M.left-=u/2),"bottom"===e.my[1]?M.top-=d:"center"===e.my[1]&&(M.top-=d/2),M.left+=T[0],M.top+=T[1],t.support.offsetFractions||(M.left=l(M.left),M.top=l(M.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[w[i]]&&t.ui.position[w[i]][s](M,{targetWidth:p,targetHeight:g,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:x,collisionHeight:C,offset:[a[0]+T[0],a[1]+T[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(h=function(t){var i=m.left-M.left,s=i+p-u,n=m.top-M.top,a=n+g-d,l={target:{element:b,left:m.left,top:m.top,width:p,height:g},element:{element:c,left:M.left,top:M.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(l.horizontal="center"),d>g&&g>r(n+a)&&(l.vertical="middle"),l.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,l)}),c.offset(t.extend(M,{using:h}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,l=n-r,h=r+e.collisionWidth-a-n;e.collisionWidth>a?l>0&&0>=h?(i=t.left+l+e.collisionWidth-a-n,t.left+=l-i):t.left=h>0&&0>=l?n:l>h?n+a-e.collisionWidth:n:l>0?t.left+=l:h>0?t.left-=h:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,l=n-r,h=r+e.collisionHeight-a-n;e.collisionHeight>a?l>0&&0>=h?(i=t.top+l+e.collisionHeight-a-n,t.top+=l-i):t.top=h>0&&0>=l?n:l>h?n+a-e.collisionHeight:n:l>0?t.top+=l:h>0?t.top-=h:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-e.collisionPosition.marginLeft,c=h-l,u=h+e.collisionWidth-o-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-l,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,l=n.isWindow?n.scrollTop:n.offset.top,h=t.top-e.collisionPosition.marginTop,c=h-l,u=h+e.collisionHeight-o-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-o-a,t.top+p+f+g>c&&(0>s||r(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-l,t.top+p+f+g>u&&(i>0||u>r(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);(function(e,t){function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.dpDiv=a(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",function(){e.datepicker._isDisabledDatepicker(n.inline?t.parent()[0]:n.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))})}function s(t,i){e.extend(t,i);for(var a in i)null==i[a]&&(t[a]=i[a]);return t}e.extend(e.ui,{datepicker:{version:"1.10.4"}});var n,r="datepicker";e.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return s(this._defaults,e||{}),this},_attachDatepicker:function(t,i){var a,s,n;a=t.nodeName.toLowerCase(),s="div"===a||"span"===a,t.id||(this.uuid+=1,t.id="dp"+this.uuid),n=this._newInst(e(t),s),n.settings=e.extend({},i||{}),"input"===a?this._connectDatepicker(t,n):s&&this._inlineDatepicker(t,n)},_newInst:function(t,i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?a(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,i){var a=e(t);i.append=e([]),i.trigger=e([]),a.hasClass(this.markerClassName)||(this._attachments(a,i),a.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),e.data(t,r,i),i.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,i){var a,s,n,r=this._get(i,"appendText"),o=this._get(i,"isRTL");i.append&&i.append.remove(),r&&(i.append=e("<span class='"+this._appendClass+"'>"+r+"</span>"),t[o?"before":"after"](i.append)),t.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),a=this._get(i,"showOn"),("focus"===a||"both"===a)&&t.focus(this._showDatepicker),("button"===a||"both"===a)&&(s=this._get(i,"buttonText"),n=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:n,alt:s,title:s}):e("<button type='button'></button>").addClass(this._triggerClass).html(n?e("<img/>").attr({src:n,alt:s,title:s}):s)),t[o?"before":"after"](i.trigger),i.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,a,s,n=new Date(2009,11,20),r=this._get(e,"dateFormat");r.match(/[DM]/)&&(t=function(e){for(i=0,a=0,s=0;e.length>s;s++)e[s].length>i&&(i=e[s].length,a=s);return a},n.setMonth(t(this._get(e,r.match(/MM/)?"monthNames":"monthNamesShort"))),n.setDate(t(this._get(e,r.match(/DD/)?"dayNames":"dayNamesShort"))+20-n.getDay())),e.input.attr("size",this._formatDate(e,n).length)}},_inlineDatepicker:function(t,i){var a=e(t);a.hasClass(this.markerClassName)||(a.addClass(this.markerClassName).append(i.dpDiv),e.data(t,r,i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"))},_dialogDatepicker:function(t,i,a,n,o){var u,c,h,l,d,p=this._dialogInst;return p||(this.uuid+=1,u="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+u+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),p=this._dialogInst=this._newInst(this._dialogInput,!1),p.settings={},e.data(this._dialogInput[0],r,p)),s(p.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(p,i):i,this._dialogInput.val(i),this._pos=o?o.length?o:[o.pageX,o.pageY]:null,this._pos||(c=document.documentElement.clientWidth,h=document.documentElement.clientHeight,l=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[c/2-100+l,h/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),p.settings.onSelect=a,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],r,p),this},_destroyDatepicker:function(t){var i,a=e(t),s=e.data(t,r);a.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,r),"input"===i?(s.append.remove(),s.trigger.remove(),a.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&a.removeClass(this.markerClassName).empty())},_enableDatepicker:function(t){var i,a,s=e(t),n=e.data(t,r);s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(a=s.children("."+this._inlineClass),a.children().removeClass("ui-state-disabled"),a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var i,a,s=e(t),n=e.data(t,r);s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(a=s.children("."+this._inlineClass),a.children().addClass("ui-state-disabled"),a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,r)}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(i,a,n){var r,o,u,c,h=this._getInst(i);return 2===arguments.length&&"string"==typeof a?"defaults"===a?e.extend({},e.datepicker._defaults):h?"all"===a?e.extend({},h.settings):this._get(h,a):null:(r=a||{},"string"==typeof a&&(r={},r[a]=n),h&&(this._curInst===h&&this._hideDatepicker(),o=this._getDateDatepicker(i,!0),u=this._getMinMaxDate(h,"min"),c=this._getMinMaxDate(h,"max"),s(h.settings,r),null!==u&&r.dateFormat!==t&&r.minDate===t&&(h.settings.minDate=this._formatDate(h,u)),null!==c&&r.dateFormat!==t&&r.maxDate===t&&(h.settings.maxDate=this._formatDate(h,c)),"disabled"in r&&(r.disabled?this._disableDatepicker(i):this._enableDatepicker(i)),this._attachments(e(i),h),this._autoSize(h),this._setDate(h,o),this._updateAlternate(h),this._updateDatepicker(h)),t)},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(t){var i,a,s,n=e.datepicker._getInst(t.target),r=!0,o=n.dpDiv.is(".ui-datepicker-rtl");if(n._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),r=!1;break;case 13:return s=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",n.dpDiv),s[0]&&e.datepicker._selectDay(t.target,n.selectedMonth,n.selectedYear,s[0]),i=e.datepicker._get(n,"onSelect"),i?(a=e.datepicker._formatDate(n),i.apply(n.input?n.input[0]:null,[a,n])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(n,"stepBigMonths"):-e.datepicker._get(n,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(n,"stepBigMonths"):+e.datepicker._get(n,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),r=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),r=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,o?1:-1,"D"),r=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(n,"stepBigMonths"):-e.datepicker._get(n,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),r=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,o?-1:1,"D"),r=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(n,"stepBigMonths"):+e.datepicker._get(n,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),r=t.ctrlKey||t.metaKey;break;default:r=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):r=!1;r&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(i){var a,s,n=e.datepicker._getInst(i.target);return e.datepicker._get(n,"constrainInput")?(a=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==i.charCode?i.keyCode:i.charCode),i.ctrlKey||i.metaKey||" ">s||!a||a.indexOf(s)>-1):t},_doKeyUp:function(t){var i,a=e.datepicker._getInst(t.target);if(a.input.val()!==a.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,e.datepicker._getFormatConfig(a)),i&&(e.datepicker._setDateFromField(a),e.datepicker._updateAlternate(a),e.datepicker._updateDatepicker(a))}catch(s){}return!0},_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var i,a,n,r,o,u,c;i=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==i&&(e.datepicker._curInst.dpDiv.stop(!0,!0),i&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),a=e.datepicker._get(i,"beforeShow"),n=a?a.apply(t,[t,i]):{},n!==!1&&(s(i.settings,n),i.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(i),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),r=!1,e(t).parents().each(function(){return r|="fixed"===e(this).css("position"),!r}),o={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(i),o=e.datepicker._checkOffset(i,o,r),i.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":r?"fixed":"absolute",display:"none",left:o.left+"px",top:o.top+"px"}),i.inline||(u=e.datepicker._get(i,"showAnim"),c=e.datepicker._get(i,"duration"),i.dpDiv.zIndex(e(t).zIndex()+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[u]?i.dpDiv.show(u,e.datepicker._get(i,"showOptions"),c):i.dpDiv[u||"show"](u?c:null),e.datepicker._shouldFocusInput(i)&&i.input.focus(),e.datepicker._curInst=i))}},_updateDatepicker:function(t){this.maxRows=4,n=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t),t.dpDiv.find("."+this._dayOverClass+" a").mouseover();var i,a=this._getNumberOfMonths(t),s=a[1],r=17;t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),s>1&&t.dpDiv.addClass("ui-datepicker-multi-"+s).css("width",r*s+"em"),t.dpDiv[(1!==a[0]||1!==a[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,i,a){var s=t.dpDiv.outerWidth(),n=t.dpDiv.outerHeight(),r=t.input?t.input.outerWidth():0,o=t.input?t.input.outerHeight():0,u=document.documentElement.clientWidth+(a?0:e(document).scrollLeft()),c=document.documentElement.clientHeight+(a?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?s-r:0,i.left-=a&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=a&&i.top===t.input.offset().top+o?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+s>u&&u>s?Math.abs(i.left+s-u):0),i.top-=Math.min(i.top,i.top+n>c&&c>n?Math.abs(n+o):0),i},_findPos:function(t){for(var i,a=this._getInst(t),s=this._get(a,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[s?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},_hideDatepicker:function(t){var i,a,s,n,o=this._curInst;!o||t&&o!==e.data(t,r)||this._datepickerShowing&&(i=this._get(o,"showAnim"),a=this._get(o,"duration"),s=function(){e.datepicker._tidyDialog(o)},e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),a,s):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?a:null,s),i||s(),this._datepickerShowing=!1,n=this._get(o,"onClose"),n&&n.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),a=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==a)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,i,a){var s=e(t),n=this._getInst(s[0]);this._isDisabledDatepicker(s[0])||(this._adjustInstDate(n,i+("M"===a?this._get(n,"showCurrentAtPos"):0),a),this._updateDatepicker(n))},_gotoToday:function(t){var i,a=e(t),s=this._getInst(a[0]);this._get(s,"gotoCurrent")&&s.currentDay?(s.selectedDay=s.currentDay,s.drawMonth=s.selectedMonth=s.currentMonth,s.drawYear=s.selectedYear=s.currentYear):(i=new Date,s.selectedDay=i.getDate(),s.drawMonth=s.selectedMonth=i.getMonth(),s.drawYear=s.selectedYear=i.getFullYear()),this._notifyChange(s),this._adjustDate(a)},_selectMonthYear:function(t,i,a){var s=e(t),n=this._getInst(s[0]);n["selected"+("M"===a?"Month":"Year")]=n["draw"+("M"===a?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(n),this._adjustDate(s)},_selectDay:function(t,i,a,s){var n,r=e(t);e(s).hasClass(this._unselectableClass)||this._isDisabledDatepicker(r[0])||(n=this._getInst(r[0]),n.selectedDay=n.currentDay=e("a",s).html(),n.selectedMonth=n.currentMonth=i,n.selectedYear=n.currentYear=a,this._selectDate(t,this._formatDate(n,n.currentDay,n.currentMonth,n.currentYear)))},_clearDate:function(t){var i=e(t);this._selectDate(i,"")},_selectDate:function(t,i){var a,s=e(t),n=this._getInst(s[0]);i=null!=i?i:this._formatDate(n),n.input&&n.input.val(i),this._updateAlternate(n),a=this._get(n,"onSelect"),a?a.apply(n.input?n.input[0]:null,[i,n]):n.input&&n.input.trigger("change"),n.inline?this._updateDatepicker(n):(this._hideDatepicker(),this._lastInput=n.input[0],"object"!=typeof n.input[0]&&n.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var i,a,s,n=this._get(t,"altField");n&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),a=this._getDate(t),s=this.formatDate(i,a,this._getFormatConfig(t)),e(n).each(function(){e(this).val(s)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},parseDate:function(i,a,s){if(null==i||null==a)throw"Invalid arguments";if(a="object"==typeof a?""+a:a+"",""===a)return null;var n,r,o,u,c=0,h=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,l="string"!=typeof h?h:(new Date).getFullYear()%100+parseInt(h,10),d=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,p=(s?s.dayNames:null)||this._defaults.dayNames,g=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,m=(s?s.monthNames:null)||this._defaults.monthNames,f=-1,_=-1,v=-1,k=-1,y=!1,b=function(e){var t=i.length>n+1&&i.charAt(n+1)===e;return t&&n++,t},D=function(e){var t=b(e),i="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,s=RegExp("^\\d{1,"+i+"}"),n=a.substring(c).match(s);if(!n)throw"Missing number at position "+c;return c+=n[0].length,parseInt(n[0],10)},w=function(i,s,n){var r=-1,o=e.map(b(i)?n:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(o,function(e,i){var s=i[1];return a.substr(c,s.length).toLowerCase()===s.toLowerCase()?(r=i[0],c+=s.length,!1):t}),-1!==r)return r+1;throw"Unknown name at position "+c},M=function(){if(a.charAt(c)!==i.charAt(n))throw"Unexpected literal at position "+c;c++};for(n=0;i.length>n;n++)if(y)"'"!==i.charAt(n)||b("'")?M():y=!1;else switch(i.charAt(n)){case"d":v=D("d");break;case"D":w("D",d,p);break;case"o":k=D("o");break;case"m":_=D("m");break;case"M":_=w("M",g,m);break;case"y":f=D("y");break;case"@":u=new Date(D("@")),f=u.getFullYear(),_=u.getMonth()+1,v=u.getDate();break;case"!":u=new Date((D("!")-this._ticksTo1970)/1e4),f=u.getFullYear(),_=u.getMonth()+1,v=u.getDate();break;case"'":b("'")?M():y=!0;break;default:M()}if(a.length>c&&(o=a.substr(c),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===f?f=(new Date).getFullYear():100>f&&(f+=(new Date).getFullYear()-(new Date).getFullYear()%100+(l>=f?0:-100)),k>-1)for(_=1,v=k;;){if(r=this._getDaysInMonth(f,_-1),r>=v)break;_++,v-=r}if(u=this._daylightSavingAdjust(new Date(f,_-1,v)),u.getFullYear()!==f||u.getMonth()+1!==_||u.getDate()!==v)throw"Invalid date";return u},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,i){if(!t)return"";var a,s=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,n=(i?i.dayNames:null)||this._defaults.dayNames,r=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,o=(i?i.monthNames:null)||this._defaults.monthNames,u=function(t){var i=e.length>a+1&&e.charAt(a+1)===t;return i&&a++,i},c=function(e,t,i){var a=""+t;if(u(e))for(;i>a.length;)a="0"+a;return a},h=function(e,t,i,a){return u(e)?a[t]:i[t]},l="",d=!1;if(t)for(a=0;e.length>a;a++)if(d)"'"!==e.charAt(a)||u("'")?l+=e.charAt(a):d=!1;else switch(e.charAt(a)){case"d":l+=c("d",t.getDate(),2);break;case"D":l+=h("D",t.getDay(),s,n);break;case"o":l+=c("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":l+=c("m",t.getMonth()+1,2);break;case"M":l+=h("M",t.getMonth(),r,o);break;case"y":l+=u("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case"@":l+=t.getTime();break;case"!":l+=1e4*t.getTime()+this._ticksTo1970;break;case"'":u("'")?l+="'":d=!0;break;default:l+=e.charAt(a)}return l},_possibleChars:function(e){var t,i="",a=!1,s=function(i){var a=e.length>t+1&&e.charAt(t+1)===i;return a&&t++,a};for(t=0;e.length>t;t++)if(a)"'"!==e.charAt(t)||s("'")?i+=e.charAt(t):a=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":s("'")?i+="'":a=!0;break;default:i+=e.charAt(t)}return i},_get:function(e,i){return e.settings[i]!==t?e.settings[i]:this._defaults[i]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),a=e.lastVal=e.input?e.input.val():null,s=this._getDefaultDate(e),n=s,r=this._getFormatConfig(e);try{n=this.parseDate(i,a,r)||s}catch(o){a=t?"":a}e.selectedDay=n.getDate(),e.drawMonth=e.selectedMonth=n.getMonth(),e.drawYear=e.selectedYear=n.getFullYear(),e.currentDay=a?n.getDate():0,e.currentMonth=a?n.getMonth():0,e.currentYear=a?n.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,i,a){var s=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},n=function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(a){}for(var s=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,n=s.getFullYear(),r=s.getMonth(),o=s.getDate(),u=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,c=u.exec(i);c;){switch(c[2]||"d"){case"d":case"D":o+=parseInt(c[1],10);break;case"w":case"W":o+=7*parseInt(c[1],10);break;case"m":case"M":r+=parseInt(c[1],10),o=Math.min(o,e.datepicker._getDaysInMonth(n,r));break;case"y":case"Y":n+=parseInt(c[1],10),o=Math.min(o,e.datepicker._getDaysInMonth(n,r))}c=u.exec(i)}return new Date(n,r,o)},r=null==i||""===i?a:"string"==typeof i?n(i):"number"==typeof i?isNaN(i)?a:s(i):new Date(i.getTime());return r=r&&"Invalid Date"==""+r?a:r,r&&(r.setHours(0),r.setMinutes(0),r.setSeconds(0),r.setMilliseconds(0)),this._daylightSavingAdjust(r)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var a=!t,s=e.selectedMonth,n=e.selectedYear,r=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=r.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=r.getMonth(),e.drawYear=e.selectedYear=e.currentYear=r.getFullYear(),s===e.selectedMonth&&n===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(a?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var i=this._get(t,"stepMonths"),a="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(a,-i,"M")},next:function(){e.datepicker._adjustDate(a,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(a)},selectDay:function(){return e.datepicker._selectDay(a,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(a,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(a,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,i,a,s,n,r,o,u,c,h,l,d,p,g,m,f,_,v,k,y,b,D,w,M,C,x,I,N,T,A,E,S,Y,F,P,O,j,K,R,H=new Date,W=this._daylightSavingAdjust(new Date(H.getFullYear(),H.getMonth(),H.getDate())),L=this._get(e,"isRTL"),U=this._get(e,"showButtonPanel"),B=this._get(e,"hideIfNoPrevNext"),z=this._get(e,"navigationAsDateFormat"),q=this._getNumberOfMonths(e),G=this._get(e,"showCurrentAtPos"),J=this._get(e,"stepMonths"),Q=1!==q[0]||1!==q[1],V=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),$=this._getMinMaxDate(e,"min"),X=this._getMinMaxDate(e,"max"),Z=e.drawMonth-G,et=e.drawYear;if(0>Z&&(Z+=12,et--),X)for(t=this._daylightSavingAdjust(new Date(X.getFullYear(),X.getMonth()-q[0]*q[1]+1,X.getDate())),t=$&&$>t?$:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=z?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-J,1)),this._getFormatConfig(e)):i,a=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(L?"e":"w")+"'>"+i+"</span></a>":B?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(L?"e":"w")+"'>"+i+"</span></a>",s=this._get(e,"nextText"),s=z?this.formatDate(s,this._daylightSavingAdjust(new Date(et,Z+J,1)),this._getFormatConfig(e)):s,n=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+s+"'><span class='ui-icon ui-icon-circle-triangle-"+(L?"w":"e")+"'>"+s+"</span></a>":B?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+s+"'><span class='ui-icon ui-icon-circle-triangle-"+(L?"w":"e")+"'>"+s+"</span></a>",r=this._get(e,"currentText"),o=this._get(e,"gotoCurrent")&&e.currentDay?V:W,r=z?this.formatDate(r,o,this._getFormatConfig(e)):r,u=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",c=U?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(L?u:"")+(this._isInRange(e,o)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+r+"</button>":"")+(L?"":u)+"</div>":"",h=parseInt(this._get(e,"firstDay"),10),h=isNaN(h)?0:h,l=this._get(e,"showWeek"),d=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),g=this._get(e,"monthNames"),m=this._get(e,"monthNamesShort"),f=this._get(e,"beforeShowDay"),_=this._get(e,"showOtherMonths"),v=this._get(e,"selectOtherMonths"),k=this._getDefaultDate(e),y="",D=0;q[0]>D;D++){for(w="",this.maxRows=4,M=0;q[1]>M;M++){if(C=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),x=" ui-corner-all",I="",Q){if(I+="<div class='ui-datepicker-group",q[1]>1)switch(M){case 0:I+=" ui-datepicker-group-first",x=" ui-corner-"+(L?"right":"left");break;case q[1]-1:I+=" ui-datepicker-group-last",x=" ui-corner-"+(L?"left":"right");break;default:I+=" ui-datepicker-group-middle",x=""}I+="'>"}for(I+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+x+"'>"+(/all|left/.test(x)&&0===D?L?n:a:"")+(/all|right/.test(x)&&0===D?L?a:n:"")+this._generateMonthYearHeader(e,Z,et,$,X,D>0||M>0,g,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",N=l?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",b=0;7>b;b++)T=(b+h)%7,N+="<th"+((b+h+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[T]+"'>"+p[T]+"</span></th>";for(I+=N+"</tr></thead><tbody>",A=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,A)),E=(this._getFirstDayOfMonth(et,Z)-h+7)%7,S=Math.ceil((E+A)/7),Y=Q?this.maxRows>S?this.maxRows:S:S,this.maxRows=Y,F=this._daylightSavingAdjust(new Date(et,Z,1-E)),P=0;Y>P;P++){for(I+="<tr>",O=l?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(F)+"</td>":"",b=0;7>b;b++)j=f?f.apply(e.input?e.input[0]:null,[F]):[!0,""],K=F.getMonth()!==Z,R=K&&!v||!j[0]||$&&$>F||X&&F>X,O+="<td class='"+((b+h+6)%7>=5?" ui-datepicker-week-end":"")+(K?" ui-datepicker-other-month":"")+(F.getTime()===C.getTime()&&Z===e.selectedMonth&&e._keyEvent||k.getTime()===F.getTime()&&k.getTime()===C.getTime()?" "+this._dayOverClass:"")+(R?" "+this._unselectableClass+" ui-state-disabled":"")+(K&&!_?"":" "+j[1]+(F.getTime()===V.getTime()?" "+this._currentClass:"")+(F.getTime()===W.getTime()?" ui-datepicker-today":""))+"'"+(K&&!_||!j[2]?"":" title='"+j[2].replace(/'/g,"&#39;")+"'")+(R?"":" data-handler='selectDay' data-event='click' data-month='"+F.getMonth()+"' data-year='"+F.getFullYear()+"'")+">"+(K&&!_?"&#xa0;":R?"<span class='ui-state-default'>"+F.getDate()+"</span>":"<a class='ui-state-default"+(F.getTime()===W.getTime()?" ui-state-highlight":"")+(F.getTime()===V.getTime()?" ui-state-active":"")+(K?" ui-priority-secondary":"")+"' href='#'>"+F.getDate()+"</a>")+"</td>",F.setDate(F.getDate()+1),F=this._daylightSavingAdjust(F);I+=O+"</tr>"}Z++,Z>11&&(Z=0,et++),I+="</tbody></table>"+(Q?"</div>"+(q[0]>0&&M===q[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),w+=I}y+=w}return y+=c,e._keyEvent=!1,y},_generateMonthYearHeader:function(e,t,i,a,s,n,r,o){var u,c,h,l,d,p,g,m,f=this._get(e,"changeMonth"),_=this._get(e,"changeYear"),v=this._get(e,"showMonthAfterYear"),k="<div class='ui-datepicker-title'>",y="";if(n||!f)y+="<span class='ui-datepicker-month'>"+r[t]+"</span>";else{for(u=a&&a.getFullYear()===i,c=s&&s.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",h=0;12>h;h++)(!u||h>=a.getMonth())&&(!c||s.getMonth()>=h)&&(y+="<option value='"+h+"'"+(h===t?" selected='selected'":"")+">"+o[h]+"</option>");y+="</select>"}if(v||(k+=y+(!n&&f&&_?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",n||!_)k+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(l=this._get(e,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?d+parseInt(e,10):parseInt(e,10);
return isNaN(t)?d:t},g=p(l[0]),m=Math.max(g,p(l[1]||"")),g=a?Math.max(g,a.getFullYear()):g,m=s?Math.min(m,s.getFullYear()):m,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=g;g++)e.yearshtml+="<option value='"+g+"'"+(g===i?" selected='selected'":"")+">"+g+"</option>";e.yearshtml+="</select>",k+=e.yearshtml,e.yearshtml=null}return k+=this._get(e,"yearSuffix"),v&&(k+=(!n&&f&&_?"":"&#xa0;")+y),k+="</div>"},_adjustInstDate:function(e,t,i){var a=e.drawYear+("Y"===i?t:0),s=e.drawMonth+("M"===i?t:0),n=Math.min(e.selectedDay,this._getDaysInMonth(a,s))+("D"===i?t:0),r=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(a,s,n)));e.selectedDay=r.getDate(),e.drawMonth=e.selectedMonth=r.getMonth(),e.drawYear=e.selectedYear=r.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),s=i&&i>t?i:t;return a&&s>a?a:s},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,a){var s=this._getNumberOfMonths(e),n=this._daylightSavingAdjust(new Date(i,a+(0>t?t:s[0]*s[1]),1));return 0>t&&n.setDate(this._getDaysInMonth(n.getFullYear(),n.getMonth())),this._isInRange(e,n)},_isInRange:function(e,t){var i,a,s=this._getMinMaxDate(e,"min"),n=this._getMinMaxDate(e,"max"),r=null,o=null,u=this._get(e,"yearRange");return u&&(i=u.split(":"),a=(new Date).getFullYear(),r=parseInt(i[0],10),o=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(r+=a),i[1].match(/[+\-].*/)&&(o+=a)),(!s||t.getTime()>=s.getTime())&&(!n||t.getTime()<=n.getTime())&&(!r||t.getFullYear()>=r)&&(!o||o>=t.getFullYear())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,a){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var s=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(a,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),s,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new i,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.10.4"})(jQuery);(function(t){function e(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))}function i(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")}var s=0;t.widget("ui.tooltip",{version:"1.10.4",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(e,i){var s=this;return"disabled"===e?(this[i?"_disable":"_enable"](),this.options[e]=i,void 0):(this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e)}),void 0)},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,o=e?e.type:null;return"string"==typeof s?this._open(e,t,s):(i=s.call(t[0],function(i){t.data("ui-tooltip-open")&&n._delay(function(){e&&(e.type=o),this._open(e,t,i)})}),i&&this._open(e,t,i),void 0)},_open:function(i,s,n){function o(t){l.of=t,a.is(":hidden")||a.position(l)}var a,r,h,l=t.extend({},this.options.position);if(n){if(a=this._find(s),a.length)return a.find(".ui-tooltip-content").html(n),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),a=this._tooltip(s),e(s,a.attr("id")),a.find(".ui-tooltip-content").html(n),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:o}),o(i)):a.position(t.extend({of:s},this.options.position)),a.hide(),this._show(a,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){a.is(":visible")&&(o(l.of),clearInterval(h))},t.fx.interval)),this._trigger("open",i,{tooltip:a}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var i=t.Event(e);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(a)}},i&&"mouseover"!==i.type||(r.mouseleave="close"),i&&"focusin"!==i.type||(r.focusout="close"),this._on(!0,s,r)}},close:function(e){var s=this,n=t(e?e.currentTarget:this.element),o=this._find(n);this.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&n.attr("title",n.data("ui-tooltip-title")),i(n),o.stop(!0),this._hide(o,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),this.closing=!0,this._trigger("close",e,{tooltip:o}),this.closing=!1)},_tooltip:function(e){var i="ui-tooltip-"+s++,n=t("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return t("<div>").addClass("ui-tooltip-content").appendTo(n),n.appendTo(this.document[0].body),this.tooltips[i]=e,n},_find:function(e){var i=e.data("ui-tooltip-id");return i?t("#"+i):t()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})})(jQuery);(function(t,e){var i="ui-effects-";t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=h(),n=s._rgba=[];return i=i.toLowerCase(),f(l,function(t,a){var o,r=a.re.exec(i),l=r&&a.parse(r),h=a.space||"rgba";return l?(o=s[h](l),s[c[h].cache]=o[c[h].cache],n=s._rgba=o._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,a.transparent),s):a[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],h=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=h.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),h.fn=t.extend(h.prototype,{parse:function(n,o,r,l){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(o),o=e);var u=this,d=t.type(n),p=this._rgba=[];return o!==e&&(n=[n,o,r,l],d="array"),"string"===d?this.parse(s(n)||a._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof h?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var a=s.cache;f(s.props,function(t,e){if(!u[a]&&s.to){if("alpha"===t||null==n[t])return;u[a]=s.to(u._rgba)}u[a][e.idx]=i(n[t],e,!0)}),u[a]&&0>t.inArray(null,u[a].slice(0,3))&&(u[a][3]=1,s.from&&(u._rgba=s.from(u[a])))}),this):e},is:function(t){var i=h(t),s=!0,n=this;return f(c,function(t,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=h(t),n=s._space(),a=c[n],o=0===this.alpha()?h("transparent"):this,r=o[a.cache]||a.to(o._rgba),l=r.slice();return s=s[a.cache],f(a.props,function(t,n){var a=n.idx,o=r[a],h=s[a],c=u[n.type]||{};null!==h&&(null===o?l[a]=h:(c.mod&&(h-o>c.mod/2?o+=c.mod:o-h>c.mod/2&&(o-=c.mod)),l[a]=i((h-o)*e+o,n)))}),this[n](l)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=h(e)._rgba;return h(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),h.fn.parse.prototype=h.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,a=t[2]/255,o=t[3],r=Math.max(s,n,a),l=Math.min(s,n,a),h=r-l,c=r+l,u=.5*c;return e=l===r?0:s===r?60*(n-a)/h+360:n===r?60*(a-s)/h+120:60*(s-n)/h+240,i=0===h?0:.5>=u?h/c:h/(2-c),[Math.round(e)%360,i,u,null==o?1:o]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],a=t[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,e+1/3)),Math.round(255*n(r,o,e)),Math.round(255*n(r,o,e-1/3)),a]},f(c,function(s,n){var a=n.props,o=n.cache,l=n.to,c=n.from;h.fn[s]=function(s){if(l&&!this[o]&&(this[o]=l(this._rgba)),s===e)return this[o].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[o].slice();return f(a,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=h(c(d)),n[o]=d,n):h(d)},f(a,function(e,i){h.fn[e]||(h.fn[e]=function(n){var a,o=t.type(n),l="alpha"===e?this._hsla?"hsla":"rgba":s,h=this[l](),c=h[i.idx];return"undefined"===o?c:("function"===o&&(n=n.call(this,c),o=t.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=c+parseFloat(a[2])*("+"===a[1]?1:-1))),h[i.idx]=n,this[l](h)))})})}),h.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var a,o,r="";if("transparent"!==n&&("string"!==t.type(n)||(a=s(n)))){if(n=h(a||n),!d.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&o&&o.style;)try{r=t.css(o,"backgroundColor"),o=o.parentNode}catch(l){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(l){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=h(e.elem,i),e.end=h(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},h.hook(o),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},a=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function s(e,i){var s,n,o={};for(s in i)n=i[s],e[s]!==n&&(a[s]||(t.fx.step[s]||!isNaN(parseFloat(n)))&&(o[s]=n));return o}var n=["add","remove","toggle"],a={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(e,a,o,r){var l=t.speed(a,o,r);return this.queue(function(){var a,o=t(this),r=o.attr("class")||"",h=l.children?o.find("*").addBack():o;h=h.map(function(){var e=t(this);return{el:e,start:i(this)}}),a=function(){t.each(n,function(t,i){e[i]&&o[i+"Class"](e[i])})},a(),h=h.map(function(){return this.end=i(this.el[0]),this.diff=s(this.start,this.end),this}),o.attr("class",r),h=h.map(function(){var e=this,i=t.Deferred(),s=t.extend({},l,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,h.get()).done(function(){a(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),l.complete.call(o[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,a){return s?t.effects.animateClass.call(this,{add:i},s,n,a):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,a){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,a):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(i){return function(s,n,a,o,r){return"boolean"==typeof n||n===e?a?t.effects.animateClass.call(this,n?{add:s}:{remove:s},a,o,r):i.apply(this,arguments):t.effects.animateClass.call(this,{toggle:s},n,a,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,a){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,a)}})}(),function(){function s(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function n(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}t.extend(t.effects,{version:"1.10.4",save:function(t,e){for(var s=0;e.length>s;s++)null!==e[s]&&t.data(i+e[s],t[0].style[e[s]])},restore:function(t,s){var n,a;for(a=0;s.length>a;a++)null!==s[a]&&(n=t.data(i+s[a]),n===e&&(n=""),t.css(s[a],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},a=document.activeElement;try{a.id}catch(o){a=document.body}return e.wrap(s),(e[0]===a||t.contains(e[0],a))&&t(a).focus(),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).focus()),e},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var a=e.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),t.fn.extend({effect:function(){function e(e){function s(){t.isFunction(a)&&a.call(n[0]),t.isFunction(e)&&e()}var n=t(this),a=i.complete,r=i.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),s()):o.call(n[0],i,s)}var i=s.apply(this,arguments),n=i.mode,a=i.queue,o=t.effects.effect[i.effect];return t.fx.off||!o?n?this[n](i.duration,i.complete):this.each(function(){i.complete&&i.complete.call(this)}):a===!1?this.each(e):this.queue(a||"fx",e)},show:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(t.fn.show),hide:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(t.fn.hide),toggle:function(t){return function(e){if(n(e)||"boolean"==typeof e)return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}()})(jQuery);(function(t){t.effects.effect.fade=function(e,i){var s=t(this),n=t.effects.setMode(s,e.mode||"toggle");s.animate({opacity:n},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}})(jQuery);(function(t){t.effects.effect.highlight=function(e,i){var s=t(this),n=["backgroundImage","backgroundColor","opacity"],a=t.effects.setMode(s,e.mode||"show"),o={backgroundColor:s.css("backgroundColor")};"hide"===a&&(o.opacity=0),t.effects.save(s,n),s.show().css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(o,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===a&&s.hide(),t.effects.restore(s,n),i()}})}})(jQuery);(function(t){t.effects.effect.puff=function(e,i){var s=t(this),n=t.effects.setMode(s,e.mode||"hide"),a="hide"===n,o=parseInt(e.percent,10)||150,r=o/100,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};t.extend(e,{effect:"scale",queue:!1,fade:!0,mode:n,complete:i,percent:a?o:100,from:a?l:{height:l.height*r,width:l.width*r,outerHeight:l.outerHeight*r,outerWidth:l.outerWidth*r}}),s.effect(e)},t.effects.effect.scale=function(e,i){var s=t(this),n=t.extend(!0,{},e),a=t.effects.setMode(s,e.mode||"effect"),o=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"hide"===a?0:100),r=e.direction||"both",l=e.origin,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},c={y:"horizontal"!==r?o/100:1,x:"vertical"!==r?o/100:1};n.effect="size",n.queue=!1,n.complete=i,"effect"!==a&&(n.origin=l||["middle","center"],n.restore=!0),n.from=e.from||("show"===a?{height:0,width:0,outerHeight:0,outerWidth:0}:h),n.to={height:h.height*c.y,width:h.width*c.x,outerHeight:h.outerHeight*c.y,outerWidth:h.outerWidth*c.x},n.fade&&("show"===a&&(n.from.opacity=0,n.to.opacity=1),"hide"===a&&(n.from.opacity=1,n.to.opacity=0)),s.effect(n)},t.effects.effect.size=function(e,i){var s,n,a,o=t(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],l=["position","top","bottom","left","right","overflow","opacity"],h=["width","height","overflow"],c=["fontSize"],u=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],d=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=t.effects.setMode(o,e.mode||"effect"),f=e.restore||"effect"!==p,g=e.scale||"both",m=e.origin||["middle","center"],v=o.css("position"),_=f?r:l,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&o.show(),s={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},"toggle"===e.mode&&"show"===p?(o.from=e.to||b,o.to=e.from||s):(o.from=e.from||("show"===p?b:s),o.to=e.to||("hide"===p?b:s)),a={from:{y:o.from.height/s.height,x:o.from.width/s.width},to:{y:o.to.height/s.height,x:o.to.width/s.width}},("box"===g||"both"===g)&&(a.from.y!==a.to.y&&(_=_.concat(u),o.from=t.effects.setTransition(o,u,a.from.y,o.from),o.to=t.effects.setTransition(o,u,a.to.y,o.to)),a.from.x!==a.to.x&&(_=_.concat(d),o.from=t.effects.setTransition(o,d,a.from.x,o.from),o.to=t.effects.setTransition(o,d,a.to.x,o.to))),("content"===g||"both"===g)&&a.from.y!==a.to.y&&(_=_.concat(c).concat(h),o.from=t.effects.setTransition(o,c,a.from.y,o.from),o.to=t.effects.setTransition(o,c,a.to.y,o.to)),t.effects.save(o,_),o.show(),t.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),m&&(n=t.effects.getBaseline(m,s),o.from.top=(s.outerHeight-o.outerHeight())*n.y,o.from.left=(s.outerWidth-o.outerWidth())*n.x,o.to.top=(s.outerHeight-o.to.outerHeight)*n.y,o.to.left=(s.outerWidth-o.to.outerWidth)*n.x),o.css(o.from),("content"===g||"both"===g)&&(u=u.concat(["marginTop","marginBottom"]).concat(c),d=d.concat(["marginLeft","marginRight"]),h=r.concat(u).concat(d),o.find("*[width]").each(function(){var i=t(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&t.effects.save(i,h),i.from={height:s.height*a.from.y,width:s.width*a.from.x,outerHeight:s.outerHeight*a.from.y,outerWidth:s.outerWidth*a.from.x},i.to={height:s.height*a.to.y,width:s.width*a.to.x,outerHeight:s.height*a.to.y,outerWidth:s.width*a.to.x},a.from.y!==a.to.y&&(i.from=t.effects.setTransition(i,u,a.from.y,i.from),i.to=t.effects.setTransition(i,u,a.to.y,i.to)),a.from.x!==a.to.x&&(i.from=t.effects.setTransition(i,d,a.from.x,i.from),i.to=t.effects.setTransition(i,d,a.to.x,i.to)),i.css(i.from),i.animate(i.to,e.duration,e.easing,function(){f&&t.effects.restore(i,h)})})),o.animate(o.to,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){0===o.to.opacity&&o.css("opacity",o.from.opacity),"hide"===p&&o.hide(),t.effects.restore(o,_),f||("static"===v?o.css({position:"relative",top:o.to.top,left:o.to.left}):t.each(["top","left"],function(t,e){o.css(e,function(e,i){var s=parseInt(i,10),n=t?o.to.left:o.to.top;return"auto"===i?n+"px":s+n+"px"})})),t.effects.removeWrapper(o),i()}})}})(jQuery);(function(t){t.effects.effect.slide=function(e,i){var s,n=t(this),a=["position","top","bottom","left","right","width","height"],o=t.effects.setMode(n,e.mode||"show"),r="show"===o,l=e.direction||"left",h="up"===l||"down"===l?"top":"left",c="up"===l||"left"===l,u={};t.effects.save(n,a),n.show(),s=e.distance||n["top"===h?"outerHeight":"outerWidth"](!0),t.effects.createWrapper(n).css({overflow:"hidden"}),r&&n.css(h,c?isNaN(s)?"-"+s:-s:s),u[h]=(r?c?"+=":"-=":c?"-=":"+=")+s,n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===o&&n.hide(),t.effects.restore(n,a),t.effects.removeWrapper(n),i()}})}})(jQuery);
/*! jQuery UI - v1.11.4 - 2015-11-05
* http://jqueryui.com
* Includes: core.js, widget.js, position.js, autocomplete.js, menu.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var s=0,n=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,a=n.call(arguments,1),o=0,r=a.length;r>o;o++)for(i in a[o])s=a[o][i],a[o].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(a){var o="string"==typeof a,r=n.call(arguments,1),h=this;return o?this.each(function(){var i,n=e.data(this,s);return"instance"===a?(h=n,!1):n?e.isFunction(n[a])&&"_"!==a.charAt(0)?(i=n[a].apply(n,r),i!==n&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+a+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+a+"'")}):(r.length&&(a=e.widget.extend.apply(null,[a].concat(r))),this.each(function(){var t=e.data(this,s);t?(t.option(a||{}),t._init&&t._init()):e.data(this,s,new i(a,this))})),h}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=s++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget,function(){function t(e,t,i){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?i/100:1)]}function i(t,i){return parseInt(e.css(t,i),10)||0}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var n,a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,d=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,p=/%$/,f=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return e("body").append(s),t=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),n=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),n="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,a="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:a?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s||n?i.width():i.outerWidth(),height:s||n?i.height():i.outerHeight()}}},e.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=e.extend({},n);var p,m,g,v,y,b,_=e(n.of),x=e.position.getWithinInfo(n.within),w=e.position.getScrollInfo(x),k=(n.collision||"flip").split(" "),T={};return b=s(_),_[0].preventDefault&&(n.at="left top"),m=b.width,g=b.height,v=b.offset,y=e.extend({},v),e.each(["my","at"],function(){var e,t,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",e=d.exec(i[0]),t=d.exec(i[1]),T[this]=[e?e[0]:0,t?t[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===n.at[0]?y.left+=m:"center"===n.at[0]&&(y.left+=m/2),"bottom"===n.at[1]?y.top+=g:"center"===n.at[1]&&(y.top+=g/2),p=t(T.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var s,l,u=e(this),d=u.outerWidth(),c=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=d+f+i(this,"marginRight")+w.width,S=c+b+i(this,"marginBottom")+w.height,N=e.extend({},y),M=t(T.my,u.outerWidth(),u.outerHeight());"right"===n.my[0]?N.left-=d:"center"===n.my[0]&&(N.left-=d/2),"bottom"===n.my[1]?N.top-=c:"center"===n.my[1]&&(N.top-=c/2),N.left+=M[0],N.top+=M[1],a||(N.left=h(N.left),N.top=h(N.top)),s={marginLeft:f,marginTop:b},e.each(["left","top"],function(t,i){e.ui.position[k[t]]&&e.ui.position[k[t]][i](N,{targetWidth:m,targetHeight:g,elemWidth:d,elemHeight:c,collisionPosition:s,collisionWidth:D,collisionHeight:S,offset:[p[0]+M[0],p[1]+M[1]],my:n.my,at:n.at,within:x,elem:u})}),n.using&&(l=function(e){var t=v.left-N.left,i=t+m-d,s=v.top-N.top,a=s+g-c,h={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:N.left,top:N.top,width:d,height:c},horizontal:0>i?"left":t>0?"right":"center",vertical:0>a?"top":s>0?"bottom":"middle"};d>m&&m>r(t+i)&&(h.horizontal="center"),c>g&&g>r(s+a)&&(h.vertical="middle"),h.important=o(r(t),r(i))>o(r(s),r(a))?"horizontal":"vertical",n.using.call(this,e,h)}),u.offset(e.extend(N,{using:l}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=e.left-t.collisionPosition.marginLeft,h=n-r,l=r+t.collisionWidth-a-n;t.collisionWidth>a?h>0&&0>=l?(i=e.left+h+t.collisionWidth-a-n,e.left+=h-i):e.left=l>0&&0>=h?n:h>l?n+a-t.collisionWidth:n:h>0?e.left+=h:l>0?e.left-=l:e.left=o(e.left-r,e.left)},top:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollTop:s.offset.top,a=t.within.height,r=e.top-t.collisionPosition.marginTop,h=n-r,l=r+t.collisionHeight-a-n;t.collisionHeight>a?h>0&&0>=l?(i=e.top+h+t.collisionHeight-a-n,e.top+=h-i):e.top=l>0&&0>=h?n:h>l?n+a-t.collisionHeight:n:h>0?e.top+=h:l>0?e.top-=l:e.top=o(e.top-r,e.top)}},flip:{left:function(e,t){var i,s,n=t.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,d=l+t.collisionWidth-o-h,c="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+c+p+f+t.collisionWidth-o-a,(0>i||r(u)>i)&&(e.left+=c+p+f)):d>0&&(s=e.left-t.collisionPosition.marginLeft+c+p+f-h,(s>0||d>r(s))&&(e.left+=c+p+f))},top:function(e,t){var i,s,n=t.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,d=l+t.collisionHeight-o-h,c="top"===t.my[1],p=c?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-a,(0>s||r(u)>s)&&(e.top+=p+f+m)):d>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,(i>0||d>r(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,s,n,o,r=document.getElementsByTagName("body")[0],h=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)t.style[o]=s[o];t.appendChild(h),i=r||document.documentElement,i.insertBefore(t,i.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",n=e(h).offset().left,a=n>10&&11>n,t.innerHTML="",i.removeChild(t)}()}(),e.ui.position,e.widget("ui.menu",{version:"1.11.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var i=e(t.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&e(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){if(!this.previousFilter){var i=e(t.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){var i,s,n,a,o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,s=this.previousFilter||"",n=String.fromCharCode(t.keyCode),a=!1,clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e))},refresh:function(){var t,i,s=this,n=this.options.icons.submenu,a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.parent(),s=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))}),t=a.add(this.element),i=t.find(this.options.items),i.not(".ui-menu-item").each(function(){var t=e(this);s._isDivider(t)&&t.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},focus:function(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=t.outerHeight(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-n}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(t),void 0)},previousPage:function(t){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+n>0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first())),void 0):(this.next(t),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).text()))})}}),e.widget("ui.autocomplete",{version:"1.11.4",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,void 0;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),void 0):(this._searchTimeout(e),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(e),this._change(e),void 0)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close()})})},menufocus:function(t,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&e.trim(s).length&&(this.liveRegion.children().hide(),e("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;(!t||t&&!i&&!s)&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()
},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").text(i.label).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[e](t),void 0):(this.search(null,t),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion))}}),e.ui.autocomplete});
/* Audero Unified Placeholders 1.0.2 | Aurelio De Rosa (@AurelioDeRosa) | MIT/GPL-3.0 Licensed */
(function(b){var c={overrideNative:false,className:"",style:{color:"#A9A9A9"}};var a={init:function(d){if(d==null){d={}}d=b.extend(true,{},c,d);if(("placeholder" in document.createElement("input"))&&d.overrideNative===false){return}return this.filter(function(){return(typeof b(this).attr("placeholder")!=="undefined")}).each(function(f,g){var e=b(g);var h=e.attr("placeholder");e.attr({"data-audero-unp-text":h,"data-audero-unp-typed":"false"});e.val("");e.removeAttr("placeholder");e.on("focus.auderoUnifiedPlaceholders",function(){if(b(this).val()===h){if(this.createTextRange){var i=this.createTextRange();i.move("character",0);i.select()}else{if(this.setSelectionRange){this.setSelectionRange(0,0)}}}}).on("keydown.auderoUnifiedPlaceholders",function(){var j=b(this);j.removeClass(d.className);for(var i in d.style){j.css(i,"")}if(j.val()===h&&j.attr("data-audero-unp-typed")==="false"){j.val("")}else{j.attr("data-audero-unp-typed","true")}}).on("keyup.auderoUnifiedPlaceholders",function(){var i=b(this);if(i.val()===""){i.trigger("blur.auderoUnifiedPlaceholders").trigger("focus.auderoUnifiedPlaceholders")}}).on("blur.auderoUnifiedPlaceholders",function(){var i=b(this);if(i.val()===""){i.attr("data-audero-unp-typed","false").val(h).addClass(d.className).css(d.style)}});e.blur()})},enable:function(){return this.each(function(){var e="";var d=b(this);if(typeof d.attr("placeholder")!=="undefined"){e=d.attr("placeholder")}else{if(typeof d.attr("data-audero-unp-text")!=="undefined"){e=d.attr("data-audero-unp-text")}else{return}}if(d.val()===""){d.val(e)}})},disable:function(){return this.each(function(){var e="";var d=b(this);if(typeof d.attr("placeholder")!=="undefined"){e=d.attr("placeholder")}else{if(typeof d.attr("data-audero-unp-text")!=="undefined"){e=d.attr("data-audero-unp-text")}else{return}}if(d.val()===e&&d.attr("data-audero-unp-typed")==="false"){d.val("")}})},reset:function(){return this.filter(function(){return(typeof b(this).attr("placeholder")!=="undefined"||typeof b(this).attr("data-audero-unp-text")!=="undefined")}).val("").trigger("blur.auderoUnifiedPlaceholders")},destroy:function(){return this.trigger("keydown.auderoUnifiedPlaceholders").off("focus.auderoUnifiedPlaceholders keydown.auderoUnifiedPlaceholders blur.auderoUnifiedPlaceholders").each(function(e,f){var d=b(f);if(typeof d.attr("data-audero-unp-text")!=="undefined"&&typeof d.attr("placeholder")==="undefined"){d.attr("placeholder",d.attr("data-audero-unp-text"))}d.removeAttr("data-audero-unp-text data-audero-unp-typed")})}};b.fn.auderoUnifiedPlaceholders=function(d){if(a[d]){return a[d].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof d==="object"||!d){return a.init.apply(this,arguments)}else{b.error("Method "+d+" does not exist on jQuery.auderoUnifiedPlaceholders")}}}})(jQuery);
/**
 * --------------------------------------------------------------------
 * jQuery customfileinput plugin
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 * Customised by Tyson/Made Undercover - 5/Feb/2014
 */
(function( $ ){
	$.fn.customFileInput = function(){
		//apply events and styles for file input element
		var fileInput = $(this)
			.addClass('customfile-input') //add class for CSS
			.mouseover(function(){ upload.addClass('customfile-hover'); })
			.mouseout(function(){ upload.removeClass('customfile-hover'); })
			.focus(function(){
				upload.addClass('customfile-focus');
				fileInput.data('val', fileInput.val());
			})
			.blur(function(){
				upload.removeClass('customfile-focus');
				$(this).trigger('checkChange');
			 })
			 .bind('disable',function(){
				fileInput.attr('disabled',true);
				upload.addClass('customfile-disabled');
			})
			.bind('enable',function(){
				fileInput.removeAttr('disabled');
				upload.removeClass('customfile-disabled');
			})
			.bind('checkChange', function(){
				if(fileInput.val() && fileInput.val() != fileInput.data('val')){
					fileInput.trigger('change');
				}
			})
			.bind('change',function(){
				//get file name
				var fileName = $(this).val().split(/\\/).pop();
				//get file extension
				var fileExt = 'customfile-ext-' + fileName.split('.').pop().toLowerCase();
				//update the feedback
				uploadFeedback
					.text(fileName) //set feedback text to filename
					.removeClass(uploadFeedback.data('fileExt') || '') //remove any existing file extension class
					.addClass(fileExt) //add file extension class
					.data('fileExt', fileExt) //store file extension for class removal on next change
					.addClass('customfile-feedback-populated'); //add class to show populated state
				//change text of button
				uploadButton.text('Pick another file').addClass('customfile-file-selected');
			})
			.click(function(){ //for IE and Opera, make sure change fires after choosing a file, using an async callback
				fileInput.data('val', fileInput.val());
				setTimeout(function(){
					fileInput.trigger('checkChange');
				},100);
			});
			
		//create custom control container
		var upload = $('<div class="customfile"></div>');
		//create custom control button
		var uploadButton = $('<span class="customfile-button" aria-hidden="true">Select a file</span>').appendTo(upload);
		//create custom control feedback
		var uploadFeedback = $('<span class="customfile-feedback" aria-hidden="true">No file chosen</span>').appendTo(upload);
		
		//match disabled state
		if(fileInput.is('[disabled]')){
			fileInput.trigger('disable');
		}


		//on mousemove, keep file input under the cursor to steal click
		upload
			/* .mousemove(function(e){
				fileInput.css({
					'left': e.pageX - upload.offset().left - fileInput.outerWidth() + 20, //position right side 20px right of cursor X)
					//'left': e.pageX - fileInput.outerWidth() + 20, //position right side 20px right of cursor X)
					'top': e.pageY - upload.offset().top - $(window).scrollTop() - 3,
					//'top': e.pageY - $(window).scrollTop() - 3
				});
			}) */
			.insertAfter(fileInput); //insert after the input

		fileInput.appendTo(upload);

		//return jQuery
		return $(this);
	};
})( jQuery );

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0.3
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {

      var div = document.createElement('div'),
          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],
          cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';

      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = cssStyles;

      ref.parentNode.insertBefore(div,ref);

    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*! jCarousel - v0.3.0 - 2013-11-22
* http://sorgalla.com/jcarousel
* Copyright (c) 2013 Jan Sorgalla; Licensed MIT */
(function(t){"use strict";var i=t.jCarousel={};i.version="0.3.0";var s=/^([+\-]=)?(.+)$/;i.parseTarget=function(t){var i=!1,e="object"!=typeof t?s.exec(t):null;return e?(t=parseInt(e[2],10)||0,e[1]&&(i=!0,"-="===e[1]&&(t*=-1))):"object"!=typeof t&&(t=parseInt(t,10)||0),{target:t,relative:i}},i.detectCarousel=function(t){for(var i;t.length>0;){if(i=t.filter("[data-jcarousel]"),i.length>0)return i;if(i=t.find("[data-jcarousel]"),i.length>0)return i;t=t.parent()}return null},i.base=function(s){return{version:i.version,_options:{},_element:null,_carousel:null,_init:t.noop,_create:t.noop,_destroy:t.noop,_reload:t.noop,create:function(){return this._element.attr("data-"+s.toLowerCase(),!0).data(s,this),!1===this._trigger("create")?this:(this._create(),this._trigger("createend"),this)},destroy:function(){return!1===this._trigger("destroy")?this:(this._destroy(),this._trigger("destroyend"),this._element.removeData(s).removeAttr("data-"+s.toLowerCase()),this)},reload:function(t){return!1===this._trigger("reload")?this:(t&&this.options(t),this._reload(),this._trigger("reloadend"),this)},element:function(){return this._element},options:function(i,s){if(0===arguments.length)return t.extend({},this._options);if("string"==typeof i){if(s===void 0)return this._options[i]===void 0?null:this._options[i];this._options[i]=s}else this._options=t.extend({},this._options,i);return this},carousel:function(){return this._carousel||(this._carousel=i.detectCarousel(this.options("carousel")||this._element),this._carousel||t.error('Could not detect carousel for plugin "'+s+'"')),this._carousel},_trigger:function(i,e,r){var n,o=!1;return r=[this].concat(r||[]),(e||this._element).each(function(){n=t.Event((s+":"+i).toLowerCase()),t(this).trigger(n,r),n.isDefaultPrevented()&&(o=!0)}),!o}}},i.plugin=function(s,e){var r=t[s]=function(i,s){this._element=t(i),this.options(s),this._init(),this.create()};return r.fn=r.prototype=t.extend({},i.base(s),e),t.fn[s]=function(i){var e=Array.prototype.slice.call(arguments,1),n=this;return"string"==typeof i?this.each(function(){var r=t(this).data(s);if(!r)return t.error("Cannot call methods on "+s+" prior to initialization; "+'attempted to call method "'+i+'"');if(!t.isFunction(r[i])||"_"===i.charAt(0))return t.error('No such method "'+i+'" for '+s+" instance");var o=r[i].apply(r,e);return o!==r&&o!==void 0?(n=o,!1):void 0}):this.each(function(){var e=t(this).data(s);e instanceof r?e.reload(i):new r(this,i)}),n},r}})(jQuery),function(t,i){"use strict";var s=function(t){return parseFloat(t)||0};t.jCarousel.plugin("jcarousel",{animating:!1,tail:0,inTail:!1,resizeTimer:null,lt:null,vertical:!1,rtl:!1,circular:!1,underflow:!1,relative:!1,_options:{list:function(){return this.element().children().eq(0)},items:function(){return this.list().children()},animation:400,transitions:!1,wrap:null,vertical:null,rtl:null,center:!1},_list:null,_items:null,_target:null,_first:null,_last:null,_visible:null,_fullyvisible:null,_init:function(){var t=this;return this.onWindowResize=function(){t.resizeTimer&&clearTimeout(t.resizeTimer),t.resizeTimer=setTimeout(function(){t.reload()},100)},this},_create:function(){this._reload(),t(i).on("resize.jcarousel",this.onWindowResize)},_destroy:function(){t(i).off("resize.jcarousel",this.onWindowResize)},_reload:function(){this.vertical=this.options("vertical"),null==this.vertical&&(this.vertical=this.list().height()>this.list().width()),this.rtl=this.options("rtl"),null==this.rtl&&(this.rtl=function(i){if("rtl"===(""+i.attr("dir")).toLowerCase())return!0;var s=!1;return i.parents("[dir]").each(function(){return/rtl/i.test(t(this).attr("dir"))?(s=!0,!1):void 0}),s}(this._element)),this.lt=this.vertical?"top":"left",this.relative="relative"===this.list().css("position"),this._list=null,this._items=null;var i=this._target&&this.index(this._target)>=0?this._target:this.closest();this.circular="circular"===this.options("wrap"),this.underflow=!1;var s={left:0,top:0};return i.length>0&&(this._prepare(i),this.list().find("[data-jcarousel-clone]").remove(),this._items=null,this.underflow=this._fullyvisible.length>=this.items().length,this.circular=this.circular&&!this.underflow,s[this.lt]=this._position(i)+"px"),this.move(s),this},list:function(){if(null===this._list){var i=this.options("list");this._list=t.isFunction(i)?i.call(this):this._element.find(i)}return this._list},items:function(){if(null===this._items){var i=this.options("items");this._items=(t.isFunction(i)?i.call(this):this.list().find(i)).not("[data-jcarousel-clone]")}return this._items},index:function(t){return this.items().index(t)},closest:function(){var i,e=this,r=this.list().position()[this.lt],n=t(),o=!1,l=this.vertical?"bottom":this.rtl&&!this.relative?"left":"right";return this.rtl&&this.relative&&!this.vertical&&(r+=this.list().width()-this.clipping()),this.items().each(function(){if(n=t(this),o)return!1;var a=e.dimension(n);if(r+=a,r>=0){if(i=a-s(n.css("margin-"+l)),!(0>=Math.abs(r)-a+i/2))return!1;o=!0}}),n},target:function(){return this._target},first:function(){return this._first},last:function(){return this._last},visible:function(){return this._visible},fullyvisible:function(){return this._fullyvisible},hasNext:function(){if(!1===this._trigger("hasnext"))return!0;var t=this.options("wrap"),i=this.items().length-1;return i>=0&&(t&&"first"!==t||i>this.index(this._last)||this.tail&&!this.inTail)?!0:!1},hasPrev:function(){if(!1===this._trigger("hasprev"))return!0;var t=this.options("wrap");return this.items().length>0&&(t&&"last"!==t||this.index(this._first)>0||this.tail&&this.inTail)?!0:!1},clipping:function(){return this._element["inner"+(this.vertical?"Height":"Width")]()},dimension:function(t){return t["outer"+(this.vertical?"Height":"Width")](!0)},scroll:function(i,s,e){if(this.animating)return this;if(!1===this._trigger("scroll",null,[i,s]))return this;t.isFunction(s)&&(e=s,s=!0);var r=t.jCarousel.parseTarget(i);if(r.relative){var n,o,l,a,h,u,c,f,d=this.items().length-1,_=Math.abs(r.target),p=this.options("wrap");if(r.target>0){var v=this.index(this._last);if(v>=d&&this.tail)this.inTail?"both"===p||"last"===p?this._scroll(0,s,e):t.isFunction(e)&&e.call(this,!1):this._scrollTail(s,e);else if(n=this.index(this._target),this.underflow&&n===d&&("circular"===p||"both"===p||"last"===p)||!this.underflow&&v===d&&("both"===p||"last"===p))this._scroll(0,s,e);else if(l=n+_,this.circular&&l>d){for(f=d,h=this.items().get(-1);l>f++;)h=this.items().eq(0),u=this._visible.index(h)>=0,u&&h.after(h.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(h),u||(c={},c[this.lt]=this.dimension(h),this.moveBy(c)),this._items=null;this._scroll(h,s,e)}else this._scroll(Math.min(l,d),s,e)}else if(this.inTail)this._scroll(Math.max(this.index(this._first)-_+1,0),s,e);else if(o=this.index(this._first),n=this.index(this._target),a=this.underflow?n:o,l=a-_,0>=a&&(this.underflow&&"circular"===p||"both"===p||"first"===p))this._scroll(d,s,e);else if(this.circular&&0>l){for(f=l,h=this.items().get(0);0>f++;){h=this.items().eq(-1),u=this._visible.index(h)>=0,u&&h.after(h.clone(!0).attr("data-jcarousel-clone",!0)),this.list().prepend(h),this._items=null;var g=this.dimension(h);c={},c[this.lt]=-g,this.moveBy(c)}this._scroll(h,s,e)}else this._scroll(Math.max(l,0),s,e)}else this._scroll(r.target,s,e);return this._trigger("scrollend"),this},moveBy:function(t,i){var e=this.list().position(),r=1,n=0;return this.rtl&&!this.vertical&&(r=-1,this.relative&&(n=this.list().width()-this.clipping())),t.left&&(t.left=e.left+n+s(t.left)*r+"px"),t.top&&(t.top=e.top+n+s(t.top)*r+"px"),this.move(t,i)},move:function(i,s){s=s||{};var e=this.options("transitions"),r=!!e,n=!!e.transforms,o=!!e.transforms3d,l=s.duration||0,a=this.list();if(!r&&l>0)return a.animate(i,s),void 0;var h=s.complete||t.noop,u={};if(r){var c=a.css(["transitionDuration","transitionTimingFunction","transitionProperty"]),f=h;h=function(){t(this).css(c),f.call(this)},u={transitionDuration:(l>0?l/1e3:0)+"s",transitionTimingFunction:e.easing||s.easing,transitionProperty:l>0?function(){return n||o?"all":i.left?"left":"top"}():"none",transform:"none"}}o?u.transform="translate3d("+(i.left||0)+","+(i.top||0)+",0)":n?u.transform="translate("+(i.left||0)+","+(i.top||0)+")":t.extend(u,i),r&&l>0&&a.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",h),a.css(u),0>=l&&a.each(function(){h.call(this)})},_scroll:function(i,s,e){if(this.animating)return t.isFunction(e)&&e.call(this,!1),this;if("object"!=typeof i?i=this.items().eq(i):i.jquery===void 0&&(i=t(i)),0===i.length)return t.isFunction(e)&&e.call(this,!1),this;this.inTail=!1,this._prepare(i);var r=this._position(i),n=this.list().position()[this.lt];if(r===n)return t.isFunction(e)&&e.call(this,!1),this;var o={};return o[this.lt]=r+"px",this._animate(o,s,e),this},_scrollTail:function(i,s){if(this.animating||!this.tail)return t.isFunction(s)&&s.call(this,!1),this;var e=this.list().position()[this.lt];this.rtl&&this.relative&&!this.vertical&&(e+=this.list().width()-this.clipping()),this.rtl&&!this.vertical?e+=this.tail:e-=this.tail,this.inTail=!0;var r={};return r[this.lt]=e+"px",this._update({target:this._target.next(),fullyvisible:this._fullyvisible.slice(1).add(this._visible.last())}),this._animate(r,i,s),this},_animate:function(i,s,e){if(e=e||t.noop,!1===this._trigger("animate"))return e.call(this,!1),this;this.animating=!0;var r=this.options("animation"),n=t.proxy(function(){this.animating=!1;var t=this.list().find("[data-jcarousel-clone]");t.length>0&&(t.remove(),this._reload()),this._trigger("animateend"),e.call(this,!0)},this),o="object"==typeof r?t.extend({},r):{duration:r},l=o.complete||t.noop;return s===!1?o.duration=0:t.fx.speeds[o.duration]!==void 0&&(o.duration=t.fx.speeds[o.duration]),o.complete=function(){n(),l.call(this)},this.move(i,o),this},_prepare:function(i){var e,r,n,o,l=this.index(i),a=l,h=this.dimension(i),u=this.clipping(),c=this.vertical?"bottom":this.rtl?"left":"right",f=this.options("center"),d={target:i,first:i,last:i,visible:i,fullyvisible:u>=h?i:t()};if(f&&(h/=2,u/=2),u>h)for(;;){if(e=this.items().eq(++a),0===e.length){if(!this.circular)break;if(e=this.items().eq(0),i.get(0)===e.get(0))break;if(r=this._visible.index(e)>=0,r&&e.after(e.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(e),!r){var _={};_[this.lt]=this.dimension(e),this.moveBy(_)}this._items=null}if(o=this.dimension(e),0===o)break;if(h+=o,d.last=e,d.visible=d.visible.add(e),n=s(e.css("margin-"+c)),u>=h-n&&(d.fullyvisible=d.fullyvisible.add(e)),h>=u)break}if(!this.circular&&!f&&u>h)for(a=l;;){if(0>--a)break;if(e=this.items().eq(a),0===e.length)break;if(o=this.dimension(e),0===o)break;if(h+=o,d.first=e,d.visible=d.visible.add(e),n=s(e.css("margin-"+c)),u>=h-n&&(d.fullyvisible=d.fullyvisible.add(e)),h>=u)break}return this._update(d),this.tail=0,f||"circular"===this.options("wrap")||"custom"===this.options("wrap")||this.index(d.last)!==this.items().length-1||(h-=s(d.last.css("margin-"+c)),h>u&&(this.tail=h-u)),this},_position:function(t){var i=this._first,s=i.position()[this.lt],e=this.options("center"),r=e?this.clipping()/2-this.dimension(i)/2:0;return this.rtl&&!this.vertical?(s-=this.relative?this.list().width()-this.dimension(i):this.clipping()-this.dimension(i),s+=r):s-=r,!e&&(this.index(t)>this.index(i)||this.inTail)&&this.tail?(s=this.rtl&&!this.vertical?s-this.tail:s+this.tail,this.inTail=!0):this.inTail=!1,-s},_update:function(i){var s,e=this,r={target:this._target||t(),first:this._first||t(),last:this._last||t(),visible:this._visible||t(),fullyvisible:this._fullyvisible||t()},n=this.index(i.first||r.first)<this.index(r.first),o=function(s){var o=[],l=[];i[s].each(function(){0>r[s].index(this)&&o.push(this)}),r[s].each(function(){0>i[s].index(this)&&l.push(this)}),n?o=o.reverse():l=l.reverse(),e._trigger(s+"in",t(o)),e._trigger(s+"out",t(l)),e["_"+s]=i[s]};for(s in i)o(s);return this}})}(jQuery,window),function(t){"use strict";t.jcarousel.fn.scrollIntoView=function(i,s,e){var r,n=t.jCarousel.parseTarget(i),o=this.index(this._fullyvisible.first()),l=this.index(this._fullyvisible.last());if(r=n.relative?0>n.target?Math.max(0,o+n.target):l+n.target:"object"!=typeof n.target?n.target:this.index(n.target),o>r)return this.scroll(r,s,e);if(r>=o&&l>=r)return t.isFunction(e)&&e.call(this,!1),this;for(var a,h=this.items(),u=this.clipping(),c=this.vertical?"bottom":this.rtl?"left":"right",f=0;;){if(a=h.eq(r),0===a.length)break;if(f+=this.dimension(a),f>=u){var d=parseFloat(a.css("margin-"+c))||0;f-d!==u&&r++;break}if(0>=r)break;r--}return this.scroll(r,s,e)}}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselControl",{_options:{target:"+=1",event:"click",method:"scroll"},_active:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onReload=t.proxy(this._reload,this),this.onEvent=t.proxy(function(i){i.preventDefault();var s=this.options("method");t.isFunction(s)?s.call(this):this.carousel().jcarousel(this.options("method"),this.options("target"))},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend",this.onReload),this._element.on(this.options("event")+".jcarouselcontrol",this.onEvent),this._reload()},_destroy:function(){this._element.off(".jcarouselcontrol",this.onEvent),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend",this.onReload)},_reload:function(){var i,s=t.jCarousel.parseTarget(this.options("target")),e=this.carousel();if(s.relative)i=e.jcarousel(s.target>0?"hasNext":"hasPrev");else{var r="object"!=typeof s.target?e.jcarousel("items").eq(s.target):s.target;i=e.jcarousel("target").index(r)>=0}return this._active!==i&&(this._trigger(i?"active":"inactive"),this._active=i),this}})}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselPagination",{_options:{perPage:null,item:function(t){return'<a href="#'+t+'">'+t+"</a>"},event:"click",method:"scroll"},_pages:{},_items:{},_currentPage:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onReload=t.proxy(this._reload,this),this.onScroll=t.proxy(this._update,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend",this.onReload).on("jcarousel:scrollend",this.onScroll),this._reload()},_destroy:function(){this._clear(),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend",this.onReload).off("jcarousel:scrollend",this.onScroll)},_reload:function(){var i=this.options("perPage");if(this._pages={},this._items={},t.isFunction(i)&&(i=i.call(this)),null==i)this._pages=this._calculatePages();else for(var s,e=parseInt(i,10)||0,r=this.carousel().jcarousel("items"),n=1,o=0;;){if(s=r.eq(o++),0===s.length)break;this._pages[n]=this._pages[n]?this._pages[n].add(s):s,0===o%e&&n++}this._clear();var l=this,a=this.carousel().data("jcarousel"),h=this._element,u=this.options("item");t.each(this._pages,function(i,s){var e=l._items[i]=t(u.call(l,i,s));e.on(l.options("event")+".jcarouselpagination",t.proxy(function(){var t=s.eq(0);if(a.circular){var e=a.index(a.target()),r=a.index(t);parseFloat(i)>parseFloat(l._currentPage)?e>r&&(t="+="+(a.items().length-e+r)):r>e&&(t="-="+(e+(a.items().length-r)))}a[this.options("method")](t)},l)),h.append(e)}),this._update()},_update:function(){var i,s=this.carousel().jcarousel("target");t.each(this._pages,function(t,e){return e.each(function(){return s.is(this)?(i=t,!1):void 0}),i?!1:void 0}),this._currentPage!==i&&(this._trigger("inactive",this._items[this._currentPage]),this._trigger("active",this._items[i])),this._currentPage=i},items:function(){return this._items},_clear:function(){this._element.empty(),this._currentPage=null},_calculatePages:function(){for(var t,i=this.carousel().data("jcarousel"),s=i.items(),e=i.clipping(),r=0,n=0,o=1,l={};;){if(t=s.eq(n++),0===t.length)break;l[o]=l[o]?l[o].add(t):t,r+=i.dimension(t),r>=e&&(o++,r=0)}return l}})}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselAutoscroll",{_options:{target:"+=1",interval:3e3,autostart:!0},_timer:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onAnimateEnd=t.proxy(this.start,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy),this.options("autostart")&&this.start()},_destroy:function(){this.stop(),this.carousel().off("jcarousel:destroy",this.onDestroy)},start:function(){return this.stop(),this.carousel().one("jcarousel:animateend",this.onAnimateEnd),this._timer=setTimeout(t.proxy(function(){this.carousel().jcarousel("scroll",this.options("target"))},this),this.options("interval")),this},stop:function(){return this._timer&&(this._timer=clearTimeout(this._timer)),this.carousel().off("jcarousel:animateend",this.onAnimateEnd),this}})}(jQuery);
/**
 * menu-aim is a jQuery plugin for dropdown menus that can differentiate
 * between a user trying hover over a dropdown item vs trying to navigate into
 * a submenu's contents.
 *
 * menu-aim assumes that you have are using a menu with submenus that expand
 * to the menu's right. It will fire events when the user's mouse enters a new
 * dropdown item *and* when that item is being intentionally hovered over.
 *
 * __________________________
 * | Monkeys  >|   Gorilla  |
 * | Gorillas >|   Content  |
 * | Chimps   >|   Here     |
 * |___________|____________|
 *
 * In the above example, "Gorillas" is selected and its submenu content is
 * being shown on the right. Imagine that the user's cursor is hovering over
 * "Gorillas." When they move their mouse into the "Gorilla Content" area, they
 * may briefly hover over "Chimps." This shouldn't close the "Gorilla Content"
 * area.
 *
 * This problem is normally solved using timeouts and delays. menu-aim tries to
 * solve this by detecting the direction of the user's mouse movement. This can
 * make for quicker transitions when navigating up and down the menu. The
 * experience is hopefully similar to amazon.com/'s "Shop by Department"
 * dropdown.
 *
 * Use like so:
 *
 *      $("#menu").menuAim({
 *          activate: $.noop,  // fired on row activation
 *          deactivate: $.noop  // fired on row deactivation
 *      });
 *
 *  ...to receive events when a menu's row has been purposefully (de)activated.
 *
 * The following options can be passed to menuAim. All functions execute with
 * the relevant row's HTML element as the execution context ('this'):
 *
 *      .menuAim({
 *          // Function to call when a row is purposefully activated. Use this
 *          // to show a submenu's content for the activated row.
 *            // previouslyActivatedRow parameter can be null if no row was active before.
 *            activate: function(activatedRow, previouslyActivatedRow) {},
 *
 *         // Function to call when a row is deactivated.
 *            // postActivatedRow parameter can be null if mouse cursor exited menu.
 *            deactivate: function(deactivatedRow, postActivatedRow) {},
 *
 *          // Function to call when mouse enters a menu row. Entering a row
 *          // does not mean the row has been activated, as the user may be
 *          // mousing over to a submenu.
 *          enter: function() {},
 *
 *          // Function to call when mouse exits a menu row.
 *          exit: function() {},
 *
 *          // Selector for identifying which elements in the menu are rows
 *          // that can trigger the above events. Defaults to "> li".
 *          rowSelector: "> li",
 *
 *          // You may have some menu rows that aren't submenus and therefore
 *          // shouldn't ever need to "activate." If so, filter submenu rows w/
 *          // this selector. Defaults to "*" (all elements).
 *          submenuSelector: "*",
 *
 *          // Direction the submenu opens relative to the main menu. Can be
 *          // left, right, above, or below. Defaults to "right".
 *          submenuDirection: "right",

            // This option adds a delay (in milliseconds) before really opening
 *            // submenu to prevent flickering submenus when moving cursor quickly
 *            // between rows. Default is 0
 *            activationDelay: 0
 *      });
 *
 * https://github.com/kamens/jQuery-menu-aim
*/
(function($) {

    $.fn.menuAim = function(opts) {
        // Initialize menu-aim for all elements in jQuery collection
        this.each(function() {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var $menu = $(this),
            activeRow = null,
            mouseLocs = [],
            lastDelayLoc = null,
            timeoutId = null,
            activationTimeoutId = undefined,
            options = $.extend({
                rowSelector: "> li",
                submenuSelector: "*",
                submenuDirection: "right",
                tolerance: 75,  // bigger = more forgivey when entering submenu
                enter: $.noop,
                exit: $.noop,
                activate: $.noop,
                deactivate: $.noop,
                exitMenu: $.noop,
                activationDelay: 0
            }, opts);

        var MOUSE_LOCS_TRACKED = 3,  // number of past mouse locations to track
            DELAY = 300;  // ms delay when user appears to be entering submenu

        /**
         * Keep track of the last few locations of the mouse.
         */
        var mousemoveDocument = function(e) {
                mouseLocs.push({x: e.pageX, y: e.pageY});

                if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                    mouseLocs.shift();
                }
            };

        /**
         * Cancel possible row activations when leaving the menu entirely
         */
        var mouseleaveMenu = function() {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                // If exitMenu is supplied and returns true, deactivate the
                // currently active row on menu exit.
                if (options.exitMenu(this)) {
                    if (activeRow) {
                        options.deactivate(activeRow);
                        options.deactivate(activeRow,null);
                    }

                    activeRow = null;
                }
            };

        /**
         * Trigger a possible row activation whenever entering a new row.
         */
        var mouseenterRow = function() {
                if (timeoutId) {
                    // Cancel any previous activation delays
                    clearTimeout(timeoutId);
                }

                options.enter(this);
                possiblyActivate(this);
            },
            mouseleaveRow = function() {
                if (activationTimeoutId) {
                    clearTimeout(activationTimeoutId);
                    activationTimeoutId = undefined;
                }
                options.exit(this);
            };

        /*
         * Immediately activate a row if the user clicks on it.
         */
        var clickRow = function() {
                activate(this);
            };

        /**
         * Activate a menu row.
         */
        var activate = function(row) {
                if (row == activeRow) {
                    return;
                }

               /*  if (activeRow) {
                    options.deactivate(activeRow);
                }

                options.activate(row);
                activeRow = row; */

                if(options.activationDelay > 0) {
                   if(activationTimeoutId) {
                       clearTimeout(activationTimeoutId);
                   }
                   activationTimeoutId = setTimeout(reallyActivate, options.activationDelay);
               } else {
                   reallyActivate();
               }
               
               function reallyActivate() {
                   if (activeRow) {
                       options.deactivate(activeRow, row);
                   }
   
                  options.activate(row, activeRow);
                   activeRow = row;
               }

            };

        /**
         * Possibly activate a menu row. If mouse movement indicates that we
         * shouldn't activate yet because user may be trying to enter
         * a submenu's content, then delay and check again later.
         */
        var possiblyActivate = function(row) {
                var delay = activationDelay();

                if (delay) {
                    timeoutId = setTimeout(function() {
                        possiblyActivate(row);
                    }, delay);
                } else {
                    activate(row);
                }
            };

        /**
         * Return the amount of time that should be used as a delay before the
         * currently hovered row is activated.
         *
         * Returns 0 if the activation should happen immediately. Otherwise,
         * returns the number of milliseconds that should be delayed before
         * checking again to see if the row should be activated.
         */
        var activationDelay = function() {
                if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
                    // If there is no other submenu row already active, then
                    // go ahead and activate immediately.
                    return 0;
                }

                var offset = $menu.offset(),
                    upperLeft = {
                        x: offset.left,
                        //y: offset.top - options.tolerance
                        y: offset.top
                    },
                    upperRight = {
                        x: offset.left + $menu.outerWidth(),
                        y: upperLeft.y
                    },
                    lowerLeft = {
                        x: offset.left,
                        //y: offset.top + $menu.outerHeight() + options.tolerance
                        y: offset.top + $menu.outerHeight()
                    },
                    lowerRight = {
                        x: offset.left + $menu.outerWidth(),
                        y: lowerLeft.y
                    },
                    loc = mouseLocs[mouseLocs.length - 1],
                    prevLoc = mouseLocs[0];

                if (!loc) {
                    return 0;
                }

                if (!prevLoc) {
                    prevLoc = loc;
                }

                // Adjust the corner points to enable tolerance.
                if (options.submenuDirection == "right") {
                    upperRight.y -= options.tolerance;
                    lowerRight.y += options.tolerance;
                } else if (options.submenuDirection == "left") {
                    upperLeft.y -= options.tolerance;
                    lowerLeft.y += options.tolerance;
                } else if (options.submenuDirection == "above") {
                    upperLeft.x -= options.tolerance;
                    upperRight.x += options.tolerance;
                } else if (options.submenuDirection == "below") {
                    lowerLeft.x -= options.tolerance;
                    lowerRight.x += options.tolerance;
                }

                if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
                    prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                    // If the previous mouse location was outside of the entire
                    // menu's bounds, immediately activate.
                    return 0;
                }

                if (lastDelayLoc &&
                        loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                    // If the mouse hasn't moved since the last time we checked
                    // for activation status, immediately activate.
                    return 0;
                }

                // Detect if the user is moving towards the currently activated
                // submenu.
                //
                // If the mouse is heading relatively clearly towards
                // the submenu's content, we should wait and give the user more
                // time before activating a new row. If the mouse is heading
                // elsewhere, we can immediately activate a new row.
                //
                // We detect this by calculating the slope formed between the
                // current mouse location and the upper/lower right points of
                // the menu. We do the same for the previous mouse location.
                // If the current mouse location's slopes are
                // increasing/decreasing appropriately compared to the
                // previous's, we know the user is moving toward the submenu.
                //
                // Note that since the y-axis increases as the cursor moves
                // down the screen, we are looking for the slope between the
                // cursor and the upper right corner to decrease over time, not
                // increase (somewhat counterintuitively).
                function slope(a, b) {
                    return (b.y - a.y) / (b.x - a.x);
                };

                var decreasingCorner = upperRight,
                    increasingCorner = lowerRight;

                // Our expectations for decreasing or increasing slope values
                // depends on which direction the submenu opens relative to the
                // main menu. By default, if the menu opens on the right, we
                // expect the slope between the cursor and the upper right
                // corner to decrease over time, as explained above. If the
                // submenu opens in a different direction, we change our slope
                // expectations.
                if (options.submenuDirection == "left") {
                    decreasingCorner = lowerLeft;
                    increasingCorner = upperLeft;
                } else if (options.submenuDirection == "below") {
                    decreasingCorner = lowerRight;
                    increasingCorner = lowerLeft;
                } else if (options.submenuDirection == "above") {
                    decreasingCorner = upperLeft;
                    increasingCorner = upperRight;
                }

                var decreasingSlope = slope(loc, decreasingCorner),
                    increasingSlope = slope(loc, increasingCorner),
                    prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                    prevIncreasingSlope = slope(prevLoc, increasingCorner);

                if (decreasingSlope < prevDecreasingSlope &&
                        increasingSlope > prevIncreasingSlope) {
                    // Mouse is moving from previous location towards the
                    // currently activated submenu. Delay before activating a
                    // new menu row, because user may be moving into submenu.
                    lastDelayLoc = loc;
                    return DELAY;
                }

                lastDelayLoc = null;
                return 0;
            };

        /**
         * Hook up initial menu events
         */
        $menu
            .mouseleave(mouseleaveMenu)
            .find(options.rowSelector)
                .mouseenter(mouseenterRow)
                .mouseleave(mouseleaveRow)
                .click(clickRow);

        $(document).mousemove(mousemoveDocument);

    };
})(jQuery);


/*	
 * jQuery mmenu v4.1.8
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/MIT_License
 * http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function( $ ) {

	var _PLUGIN_	= 'mmenu',
		_VERSION_	= '4.1.8';


	//	Plugin already excists
	if ( $[ _PLUGIN_ ] )
	{
		return;
	}

	//	Global variables
	var glbl = {
		$wndw: null,
		$html: null,
		$body: null,
		$page: null,
		$blck: null,

		$allMenus: null,
		$scrollTopNode: null
	};

	var _c = {}, _e = {}, _d = {},
		_serialnr = 0;


	$[ _PLUGIN_ ] = function( $menu, opts, conf )
	{
		glbl.$allMenus = glbl.$allMenus.add( $menu );

		this.$menu = $menu;
		this.opts  = opts
		this.conf  = conf;

		this.serialnr = _serialnr++;

		this._init();

		return this;
	};

	$[ _PLUGIN_ ].prototype = {

		open: function()
		{
			this._openSetup();
			this._openFinish();
			return 'open';
		},
		_openSetup: function()
		{
			//	Find scrolltop
			var _scrollTop = findScrollTop();

			//	Set opened
			this.$menu.addClass( _c.current );

			//	Close others
			glbl.$allMenus.not( this.$menu ).trigger( _e.close );

			//	Store style and position
			glbl.$page
				.data( _d.style, glbl.$page.attr( 'style' ) || '' )
				.data( _d.scrollTop, _scrollTop )
				.data( _d.offetLeft, glbl.$page.offset().left );

			//	Resize page to window width
			var _w = 0;
			glbl.$wndw
				.off( _e.resize )
				.on( _e.resize,
					function( e, force )
					{
						if ( force || glbl.$html.hasClass( _c.opened ) )
						{
							var nw = glbl.$wndw.width();
							if ( nw != _w )
							{
								_w = nw;
								/* CGU CUSTOMISATION (start) - to kill horizontal scrolling */
 								//glbl.$page.width( nw - glbl.$page.data( _d.offetLeft ) ); 
								glbl.$page.width( '100%' );
								/* CGU CUSTOMISATION (end) - to kill horizontal scrolling */
							}
						}
					}
				)
				.trigger( _e.resize, [ true ] );

			//	Prevent tabbing out of the menu
			if ( this.conf.preventTabbing )
			{
				glbl.$wndw
					.off( _e.keydown )
					.on( _e.keydown,
						function( e )
						{
							if ( e.keyCode == 9 )
							{
								e.preventDefault();
								return false;
							}
						}
					);
			}

			//	Add options
			if ( this.opts.modal )
			{
				glbl.$html.addClass( _c.modal );
			}
			if ( this.opts.moveBackground )
			{
				glbl.$html.addClass( _c.background );
			}
			if ( this.opts.position != 'left' )
			{
				glbl.$html.addClass( _c.mm( this.opts.position ) );
			}
			if ( this.opts.zposition != 'back' )
			{
				glbl.$html.addClass( _c.mm( this.opts.zposition ) );
			}
			if ( this.opts.classes )
			{
				glbl.$html.addClass( this.opts.classes );
			}

			//	Open
			glbl.$html.addClass( _c.opened );
			this.$menu.addClass( _c.opened );

			//	Scroll page to scrolltop
			glbl.$page.scrollTop( _scrollTop );

			//	Scroll menu to top
			this.$menu.scrollTop( 0 );
		},
		_openFinish: function()
		{
			var that = this;

			//	Callback
			transitionend( glbl.$page,
				function()
				{
					that.$menu.trigger( _e.opened );
				}, this.conf.transitionDuration
			);

			//	Opening
			glbl.$html.addClass( _c.opening );
			this.$menu.trigger( _e.opening );

			//	Scroll window to top
			window.scrollTo( 0, 1 );
		},
		close: function()
		{
			var that = this;

			//	Callback
			transitionend( glbl.$page,
				function()
				{
					that.$menu
						.removeClass( _c.current )
						.removeClass( _c.opened );

					glbl.$html
						.removeClass( _c.opened )
						.removeClass( _c.modal )
						.removeClass( _c.background )
						.removeClass( _c.mm( that.opts.position ) )
						.removeClass( _c.mm( that.opts.zposition ) );

					if ( that.opts.classes )
					{
						glbl.$html.removeClass( that.opts.classes );
					}

					glbl.$wndw
						.off( _e.resize )
						.off( _e.keydown );

					//	Restore style and position
					glbl.$page.attr( 'style', glbl.$page.data( _d.style ) );

					if ( glbl.$scrollTopNode )
					{
						glbl.$scrollTopNode.scrollTop( glbl.$page.data( _d.scrollTop ) );
					}

					//	Closed
					that.$menu.trigger( _e.closed );
					/* CGU CUSTOMISATION (start) - remove .mm-opened when closed */
					$('#menu ul ul li').removeClass('mm-opened');
					/* CGU CUSTOMISATION (end) - remove .mm-opened when closed */
	
				}, this.conf.transitionDuration
			);

			//	Closing
			glbl.$html.removeClass( _c.opening );
			this.$menu.trigger( _e.closing );
	
			return 'close';
		},
	
		_init: function()
		{
			this.opts = extendOptions( this.opts, this.conf, this.$menu );
			this.direction = ( this.opts.slidingSubmenus ) ? 'horizontal' : 'vertical';
	
			//	INIT PAGE & MENU
			this._initPage( glbl.$page );
			this._initMenu();
			this._initBlocker();
			this._initPanles();
			this._initLinks();
			this._initOpenClose();
			this._bindCustomEvents();

			if ( $[ _PLUGIN_ ].addons )
			{
				for ( var a = 0; a < $[ _PLUGIN_ ].addons.length; a++ )
				{
					if ( typeof this[ '_addon_' + $[ _PLUGIN_ ].addons[ a ] ] == 'function' )
					{
						this[ '_addon_' + $[ _PLUGIN_ ].addons[ a ] ]();
					}
				}
			}
		},

		_bindCustomEvents: function()
		{
			var that = this;

			this.$menu
				.off( _e.open + ' ' + _e.close + ' ' + _e.setPage+ ' ' + _e.update )
				.on( _e.open + ' ' + _e.close + ' ' + _e.setPage+ ' ' + _e.update,
					function( e )
					{
						e.stopPropagation();
					}
				);

			//	Menu-events
			this.$menu
				.on( _e.open,
					function( e )
					{
						if ( $(this).hasClass( _c.current ) )
						{
							/* CGU CUSTOMISATION (start) */

							// e.stopImmediatePropagation();
							// return false;

							/* CGU CUSTOMISATION (end) */
						}
						return that.open();
					}
				)
				.on( _e.close,
					function( e )
					{
						if ( !$(this).hasClass( _c.current ) )
						{
							/* CGU CUSTOMISATION (start) */

							// e.stopImmediatePropagation();
							// return false;

							/* CGU CUSTOMISATION (end) */
						}
						return that.close();
					}
				)
				.on( _e.setPage,
					function( e, $p )
					{
						that._initPage( $p );
						that._initOpenClose();
					}
				);

			//	Panel-events
			var $panels = this.$menu.find( this.opts.isMenu && this.direction != 'horizontal' ? 'ul, ol' : '.' + _c.panel );
			$panels
				.off( _e.toggle + ' ' + _e.open + ' ' + _e.close )
				.on( _e.toggle + ' ' + _e.open + ' ' + _e.close,
					function( e )
					{
						/* CGU CUSTOMISATION (start) - so that when in sm size, click events can be overridden by main.js */
						if ($('html').attr('data-bs-size') =='sm') {
							e.stopImmediatePropagation();
						} else {
							e.stopPropagation();
						}
						/* CGU CUSTOMISATION (end) - so that when in sm size, click events can be overridden by main.js */
					}
				);

			if ( this.direction == 'horizontal' )
			{
				$panels
					.on( _e.open,
						function( e )
						{
							return openSubmenuHorizontal( $(this), that.$menu );
						}
					);
			}
			else
			{
				$panels
					.on( _e.toggle,
						function( e )
						{
							var $t = $(this);
							return $t.triggerHandler( $t.parent().hasClass( _c.opened ) ? _e.close : _e.open );
						}
					)
					.on( _e.open,
						function( e )
						{
							/* CGU CUSTOMISATION (start) - it wasn't populating */
							$('#ss-menu ul li').removeClass( 'mm-opened' );
							$(this).parent().addClass( _c.opened );
							$(this).parent().parent().addClass( _c.opened );
							$(this).parent().parent().parent().addClass( _c.opened );
							$(this).parent().parent().parent().parent().addClass( _c.opened );
							$(this).parent().parent().parent().parent().parent().addClass( _c.opened );
							$(this).parent().parent().parent().parent().parent().parent().addClass( _c.opened );
							$(this).parent().parent().parent().parent().parent().parent().parent().addClass( _c.opened );
							$(this).parent().parent().parent().parent().parent().parent().parent().parent().addClass( _c.opened );
							return 'open';
							/* CGU CUSTOMISATION (end) - it wasn't populating */
						}
					)
					.on( _e.close,
						function( e )
						{
							$(this).parent().removeClass( _c.opened );
							return 'close';
						}
					);
			}
		},
		
		_initBlocker: function()
		{
			var that = this;

			if ( !glbl.$blck )
			{
				glbl.$blck = $( '<div id="' + _c.blocker + '" />' )
					.css( 'opacity', 0 )
					/* CGU CUSTOMISATION (start) - changed so that blocker is inside mm-page, so the SM menu can be above it. */
					// .appendTo( glbl.$body );
					.appendTo( glbl.$page );
					/* CGU CUSTOMISATION (end) - changed so that blocker is inside mm-page, so the SM menu can be above it. */
			}

			glbl.$blck
				.off( _e.touchstart )
				.on( _e.touchstart,
					function( e )
					{
						e.preventDefault();
						e.stopPropagation();
						glbl.$blck.trigger( _e.mousedown );
					}
				)
				.on( _e.mousedown,
					function( e )
					{
						e.preventDefault();
						if ( !glbl.$html.hasClass( _c.modal ) )
						{
							that.$menu.trigger( _e.close );
						}
					}
				);
		},
		_initPage: function( $p )
		{
			if ( !$p )
			{
				$p = $(this.conf.pageSelector, glbl.$body);
				if ( $p.length > 1 )
				{
					$[ _PLUGIN_ ].debug( 'Multiple nodes found for the page-node, all nodes are wrapped in one <' + this.conf.pageNodetype + '>.' );
					$p = $p.wrapAll( '<' + this.conf.pageNodetype + ' />' ).parent();
				}
			}
	
			$p.addClass( _c.page );
			glbl.$page = $p;
		},
		_initMenu: function()
		{
			var that = this;

			//	Clone if needed
			if ( this.conf.clone )
			{
				this.$menu = this.$menu.clone( true );
				this.$menu.add( this.$menu.find( '*' ) ).filter( '[id]' ).each(
					function()
					{
						$(this).attr( 'id', _c.mm( $(this).attr( 'id' ) ) );
					}
				);
			}

			//	Strip whitespace
			this.$menu.contents().each(
				function()
				{
					if ( $(this)[ 0 ].nodeType == 3 )
					{
						$(this).remove();
					}
				}
			);

			//	Prepend to body
			this.$menu
				.prependTo( 'body' )
				.addClass( _c.menu );

			//	Add direction class
			this.$menu.addClass( _c.mm( this.direction ) );

			//	Add options classes
			if ( this.opts.classes )
			{
				this.$menu.addClass( this.opts.classes );
			}
			if ( this.opts.isMenu )
			{
				this.$menu.addClass( _c.ismenu );
			}
			if ( this.opts.position != 'left' )
			{
				this.$menu.addClass( _c.mm( this.opts.position ) );
			}
			if ( this.opts.zposition != 'back' )
			{
				this.$menu.addClass( _c.mm( this.opts.zposition ) );
			}
		},
		_initPanles: function()
		{
			var that = this;


			//	Refactor List class
			this.__refactorClass( $('.' + this.conf.listClass, this.$menu), 'list' );

			//	Add List class
			if ( this.opts.isMenu )
			{
				$('ul, ol', this.$menu)
					.not( '.mm-nolist' )
					.addClass( _c.list );
			}

			var $lis = $('.' + _c.list + ' > li', this.$menu);

			//	Refactor Selected class
			this.__refactorClass( $lis.filter( '.' + this.conf.selectedClass ), 'selected' );

			//	Refactor Label class
			this.__refactorClass( $lis.filter( '.' + this.conf.labelClass ), 'label' );

			//	Refactor Spacer class
			this.__refactorClass( $lis.filter( '.' + this.conf.spacerClass ), 'spacer' );

			//	setSelected-event
			$lis
				.off( _e.setSelected )
				.on( _e.setSelected,
					function( e, selected )
					{
						e.stopPropagation();
	
						$lis.removeClass( _c.selected );
						if ( typeof selected != 'boolean' )
						{
							selected = true;
						}
						if ( selected )
						{
							$(this).addClass( _c.selected );
						}
					}
				);

			//	Refactor Panel class
			this.__refactorClass( $('.' + this.conf.panelClass, this.$menu), 'panel' );

			//	Add Panel class
			this.$menu
				.children()
				.filter( this.conf.panelNodetype )
				.add( this.$menu.find( '.' + _c.list ).children().children().filter( this.conf.panelNodetype ) )
				.addClass( _c.panel );

			var $panels = $('.' + _c.panel, this.$menu);

			//	Add an ID to all panels
			$panels
				.each(
					function( i )
					{
						var $t = $(this),
							id = $t.attr( 'id' ) || _c.mm( 'm' + that.serialnr + '-p' + i );

						$t.attr( 'id', id );
					}
			);

			//	Add open and close links to menu items
			$panels
				.find( '.' + _c.panel )
				.each(
					function( i )
					{
						var $t = $(this),
							$u = $t.is( 'ul, ol' ) ? $t : $t.find( 'ul ,ol' ).first(),
							$l = $t.parent(),
							$a = $l.find( '> a, > span' ),
							$p = $l.closest( '.' + _c.panel );

						$t.data( _d.parent, $l );

						if ( $l.parent().is( '.' + _c.list ) )
						{
							var $btn = $( '<a class="' + _c.subopen + '" href="#' + $t.attr( 'id' ) + '" />' ).insertBefore( $a );
							if ( !$a.is( 'a' ) )
							{
								$btn.addClass( _c.fullsubopen );
							}
							if ( that.direction == 'horizontal' )
							{
								$u.prepend( '<li class="' + _c.subtitle + '"><a class="' + _c.subclose + '" href="#' + $p.attr( 'id' ) + '">' + $a.text() + '</a></li>' );
							}
						}
					}
				);

			//	Link anchors to panels
			var evt = this.direction == 'horizontal' ? _e.open : _e.toggle;
			$panels
				.each(
					function( i )
					{
						var $opening = $(this),
							id = $opening.attr( 'id' );

						$('a[href="#' + id + '"]', that.$menu)
							.off( _e.click )
							.on( _e.click,
								function( e )
								{
									e.preventDefault();
									$opening.trigger( evt );
								}
							);
					}
			);

			if ( this.direction == 'horizontal' )
			{
				//	Add opened-classes
				var $selected = $('.' + _c.list + ' > li.' + _c.selected, this.$menu);
				$selected
					.add( $selected.parents( 'li' ) )
					.parents( 'li' ).removeClass( _c.selected )
					.end().each(
						function()
						{
							var $t = $(this),
								$u = $t.find( '> .' + _c.panel );

							if ( $u.length )
							{
								$t.parents( '.' + _c.panel ).addClass( _c.subopened );
								$u.addClass( _c.opened );
							}
						}
					)
					.closest( '.' + _c.panel ).addClass( _c.opened )
					.parents( '.' + _c.panel ).addClass( _c.subopened );
			}
			else
			{
				//	Replace Selected-class with opened-class in parents from .Selected
				$('li.' + _c.selected, this.$menu)
					.addClass( _c.opened )
					.parents( '.' + _c.selected ).removeClass( _c.selected );
			}

			//	Set current opened
			var $current = $panels.filter( '.' + _c.opened );
			if ( !$current.length )
			{
				$current = $panels.first();
			}
			$current
				.addClass( _c.opened )
				.last()
				.addClass( _c.current );

			//	Rearrange markup
			if ( this.direction == 'horizontal' )
			{
				$panels.find( '.' + _c.panel ).appendTo( this.$menu );
			}
		},
		_initLinks: function()
		{
			var that = this;
	
			$('.' + _c.list + ' > li > a', this.$menu)
				.not( '.' + _c.subopen )
				.not( '.' + _c.subclose )
				.not( '[rel="external"]' )
				.not( '[target="_blank"]' )
				.off( _e.click )
				.on( _e.click,
					function( e )
					{
						var $t = $(this),
							href = $t.attr( 'href' );

						//	Set selected item
						if ( that.__valueOrFn( that.opts.onClick.setSelected, $t ) )
						{
							$t.parent().trigger( _e.setSelected );
						}

						//	Prevent default / don't follow link. Default: false
						var preventDefault = that.__valueOrFn( that.opts.onClick.preventDefault, $t, href.slice( 0, 1 ) == '#' );
						if ( preventDefault )
						{
							e.preventDefault();
						}

						//	Block UI. Default: false if preventDefault, true otherwise
						if ( that.__valueOrFn( that.opts.onClick.blockUI, $t, !preventDefault ) )
						{
							glbl.$html.addClass( _c.blocking );
						}

						//	Close menu. Default: true if preventDefault, false otherwise
						if ( that.__valueOrFn( that.opts.onClick.close, $t, preventDefault ) )
						{
							that.$menu.triggerHandler( _e.close );
						}
					}
				);
		},
		_initOpenClose: function()
		{
			var that = this;

			//	Open menu
			var id = this.$menu.attr( 'id' );
			if ( id && id.length )
			{
				if ( this.conf.clone )
				{
					id = _c.umm( id );
				}

				$('a[href="#' + id + '"]')
					.off( _e.click )
					.on( _e.click,
						function( e )
						{
							e.preventDefault();
							that.$menu.trigger( _e.open );
						}
					);
			}

			//	Close menu
			var id = glbl.$page.attr( 'id' );
			if ( id && id.length )
			{
				$('a[href="#' + id + '"]')
					.off( _e.click )
					.on( _e.click,
						function( e )
						{
							e.preventDefault();
							that.$menu.trigger( _e.close );
						}
					);
			}
		},
		
		__valueOrFn: function( o, $e, d )
		{
			if ( typeof o == 'function' )
			{
				return o.call( $e[ 0 ] );
			}
			if ( typeof o == 'undefined' && typeof d != 'undefined' )
			{
				return d;
			}
			return o;
		},
		
		__refactorClass: function( $e, c )
		{
			$e.removeClass( this.conf[ c + 'Class' ] ).addClass( _c[ c ] );
		}
	};


	$.fn[ _PLUGIN_ ] = function( opts, conf )
	{
		//	First time plugin is fired
		if ( !glbl.$wndw )
		{
			_initPlugin();
		}

		//	Extend options
		opts = extendOptions( opts, conf );
		conf = extendConfiguration( conf );

		return this.each(
			function()
			{
				var $menu = $(this);
				if ( $menu.data( _PLUGIN_ ) )
				{
					return;
				}
				$menu.data( _PLUGIN_, new $[ _PLUGIN_ ]( $menu, opts, conf ) );
			}
		);
	};

	$[ _PLUGIN_ ].version = _VERSION_;
	
	$[ _PLUGIN_ ].defaults = {
		position		: 'left',
		zposition		: 'back',
		moveBackground	: true,
		slidingSubmenus	: true,
		modal			: false,
		classes			: '',
		onClick			: {
//			close				: true,
//			blockUI				: null,
//			preventDefault		: null,
			setSelected			: true
		}
	};
	$[ _PLUGIN_ ].configuration = {
		preventTabbing		: true,
		panelClass			: 'Panel',
		listClass			: 'List',
		selectedClass		: 'Selected',
		labelClass			: 'Label',
		spacerClass			: 'Spacer',
		pageNodetype		: 'div',
		panelNodetype		: 'ul, ol, div',
		transitionDuration	: 400
	};



	/*
		SUPPORT
	*/
	(function() {

		var wd = window.document,
			ua = window.navigator.userAgent,
			ds = document.createElement( 'div' ).style;

		var _touch 				= 'ontouchstart' in wd,
			_overflowscrolling	= 'WebkitOverflowScrolling' in wd.documentElement.style,
			_oldAndroidBrowser	= (function() {
				if ( ua.indexOf( 'Android' ) >= 0 )
				{
					return 2.4 > parseFloat( ua.slice( ua.indexOf( 'Android' ) +8 ) );
				}
				return false;
			})();

		$[ _PLUGIN_ ].support = {

			touch: _touch,
			oldAndroidBrowser: _oldAndroidBrowser,
			overflowscrolling: (function() {
				if ( !_touch )
				{
					return true;
				}
				if ( _overflowscrolling )
				{
					return true;
				}
				if ( _oldAndroidBrowser )
				{
					return false;
				}
				return true;
			})()
		};
	})();


	/*
		BROWSER SPECIFIC FIXES
	*/
	$[ _PLUGIN_ ].useOverflowScrollingFallback = function( use )
	{
		if ( glbl.$html )
		{
			if ( typeof use == 'boolean' )
			{
				glbl.$html[ use ? 'addClass' : 'removeClass' ]( _c.nooverflowscrolling );
			}
			return glbl.$html.hasClass( _c.nooverflowscrolling );
		}
		else
		{
			_useOverflowScrollingFallback = use;
			return use;
		}
	};


	/*
		DEBUG
	*/
	$[ _PLUGIN_ ].debug = function( msg ) {};
	$[ _PLUGIN_ ].deprecated = function( depr, repl )
	{
		if ( typeof console != 'undefined' && typeof console.warn != 'undefined' )
		{
			console.warn( 'MMENU: ' + depr + ' is deprecated, use ' + repl + ' instead.' );
		}
	};


	//	Global vars
	var _useOverflowScrollingFallback = !$[ _PLUGIN_ ].support.overflowscrolling;


	function extendOptions( o, c, $m )
	{
		if ( typeof o != 'object' )
		{
			o = {};
		}

		if ( $m )
		{
			if ( typeof o.isMenu != 'boolean' )
			{
				var $c = $m.children();
				o.isMenu = ( $c.length == 1 && $c.is( c.panelNodetype ) );
			}
			return o;
		}


		//	Extend onClick
		if ( typeof o.onClick != 'object' )
		{
			o.onClick = {};
		}


		//	DEPRECATED
		if ( typeof o.onClick.setLocationHref != 'undefined' )
		{
			$[ _PLUGIN_ ].deprecated( 'onClick.setLocationHref option', '!onClick.preventDefault' );
			if ( typeof o.onClick.setLocationHref == 'boolean' )
			{
				o.onClick.preventDefault = !o.onClick.setLocationHref;
			}
		}
		//	/DEPRECATED


		//	Extend from defaults
		o = $.extend( true, {}, $[ _PLUGIN_ ].defaults, o );


		//	Degration
		if ( $[ _PLUGIN_ ].useOverflowScrollingFallback() )
		{
			switch( o.position )
			{
				case 'top':
				case 'right':
				case 'bottom':
					$[ _PLUGIN_ ].debug( 'position: "' + o.position + '" not supported when using the overflowScrolling-fallback.' );
					o.position = 'left';
					break;
			}
			switch( o.zposition )
			{
				case 'front':
				case 'next':
					$[ _PLUGIN_ ].debug( 'z-position: "' + o.zposition + '" not supported when using the overflowScrolling-fallback.' );
					o.zposition = 'back';
					break;
			}
		}

		return o;
	}
	function extendConfiguration( c )
	{
		if ( typeof c != 'object' )
		{
			c = {};
		}


		//	DEPRECATED
		if ( typeof c.panelNodeType != 'undefined' )
		{
			$[ _PLUGIN_ ].deprecated( 'panelNodeType configuration option', 'panelNodetype' );
			c.panelNodetype = c.panelNodeType;
		}
		//	/DEPRECATED


		c = $.extend( true, {}, $[ _PLUGIN_ ].configuration, c )

		//	Set pageSelector
		if ( typeof c.pageSelector != 'string' )
		{
			c.pageSelector = '> ' + c.pageNodetype;
		}

		return c;
	}

	function _initPlugin()
	{
		glbl.$wndw = $(window);
		glbl.$html = $('html');
		glbl.$body = $('body');
		
		glbl.$allMenus = $();


		//	Classnames, Datanames, Eventnames
		$.each( [ _c, _d, _e ],
			function( i, o )
			{
				o.add = function( c )
				{
					c = c.split( ' ' );
					for ( var d in c )
					{
						o[ c[ d ] ] = o.mm( c[ d ] );
					}
				};
			}
		);

		//	Classnames
		_c.mm = function( c ) { return 'mm-' + c; };
		_c.add( 'menu ismenu panel list subtitle selected label spacer current highest hidden page blocker modal background opened opening subopened subopen fullsubopen subclose nooverflowscrolling' );
		_c.umm = function( c )
		{
			if ( c.slice( 0, 3 ) == 'mm-' )
			{
				c = c.slice( 3 );
			}
			return c;
		};

		//	Datanames
		_d.mm = function( d ) { return 'mm-' + d; };
		_d.add( 'parent style scrollTop offetLeft' );

		//	Eventnames
		_e.mm = function( e ) { return e + '.mm'; };
		_e.add( 'toggle open opening opened close closing closed update setPage setSelected transitionend webkitTransitionEnd touchstart touchend mousedown mouseup click keydown keyup resize' );


		$[ _PLUGIN_ ]._c = _c;
		$[ _PLUGIN_ ]._d = _d;
		$[ _PLUGIN_ ]._e = _e;

		$[ _PLUGIN_ ].glbl = glbl;

		$[ _PLUGIN_ ].useOverflowScrollingFallback( _useOverflowScrollingFallback );
	}

	function openSubmenuHorizontal( $opening, $m )
	{
		if ( $opening.hasClass( _c.current ) )
		{
			return false;
		} 

		var $panels = $('.' + _c.panel, $m),
			$current = $panels.filter( '.' + _c.current );
		
		$panels
			.removeClass( _c.highest )
			.removeClass( _c.current )
			.not( $opening )
			.not( $current )
			.addClass( _c.hidden );

		if ( $opening.hasClass( _c.opened ) )
		{
			$current
				.addClass( _c.highest )
				.removeClass( _c.opened )
				.removeClass( _c.subopened );
		}
		else
		{
			$opening
				.addClass( _c.highest );

			$current
				.addClass( _c.subopened );
		}

		$opening
			.removeClass( _c.hidden )
			.removeClass( _c.subopened )
			.addClass( _c.current )
			.addClass( _c.opened );

		return 'open';
	}

	function findScrollTop()
	{
		if ( !glbl.$scrollTopNode )
		{
			if ( glbl.$html.scrollTop() != 0 )
			{
				glbl.$scrollTopNode = glbl.$html;
			}
			else if ( glbl.$body.scrollTop() != 0 )
			{
				glbl.$scrollTopNode = glbl.$body;
			}
		}
		return ( glbl.$scrollTopNode ) ? glbl.$scrollTopNode.scrollTop() : 0;
	}

	function transitionend( $e, fn, duration )
	{
		var _ended = false,
			_fn = function()
			{
				if ( !_ended )
				{
					fn.call( $e[ 0 ] );
				}
				_ended = true;
			};

		$e.one( _e.transitionend, _fn );
		$e.one( _e.webkitTransitionEnd, _fn );
		setTimeout( _fn, duration * 1.1 );
	}

})( jQuery );
/* Parsley dist/parsley.min.js build version 1.2.3 http://parsleyjs.org */
!function(d){var h=function(a){this.messages={defaultMessage:"This value seems to be invalid.",type:{email:"This value should be a valid email.",url:"This value should be a valid url.",urlstrict:"This value should be a valid url.",number:"This value should be a valid number.",digits:"This value should be digits.",dateIso:"This value should be a valid date (YYYY-MM-DD).",alphanum:"This value should be alphanumeric.",phone:"This value should be a valid phone number."},notnull:"This value should not be null.",
notblank:"This value should not be blank.",required:"This value is required.",regexp:"This value seems to be invalid.",min:"This value should be greater than or equal to %s.",max:"This value should be lower than or equal to %s.",range:"This value should be between %s and %s.",minlength:"This value is too short. It should have %s characters or more.",maxlength:"This value is too long. It should have %s characters or less.",rangelength:"This value length is invalid. It should be between %s and %s characters long.",
mincheck:"You must select at least %s choices.",maxcheck:"You must select %s choices or less.",rangecheck:"You must select between %s and %s choices.",equalto:"This value should be the same."};this.init(a)};h.prototype={constructor:h,validators:{notnull:function(){return{validate:function(a){return 0<a.length},priority:2}},notblank:function(){return{validate:function(a){return"string"===typeof a&&""!==a.replace(/^\s+/g,"").replace(/\s+$/g,"")},priority:2}},required:function(){var a=this;return{validate:function(b){if("object"===
typeof b){for(var c in b)if(a.required().validate(b[c]))return!0;return!1}return a.notnull().validate(b)&&a.notblank().validate(b)},priority:512}},type:function(){return{validate:function(a,b){var c;switch(b){case "number":c=/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;break;case "digits":c=/^\d+$/;break;case "alphanum":c=/^\w+$/;break;case "email":c=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
break;case "url":a=/(https?|s?ftp|git)/i.test(a)?a:"http://"+a;case "urlstrict":c=/^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
break;case "dateIso":c=/^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/;break;case "phone":c=/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;break;default:return!1}return""!==a?c.test(a):!1},priority:256}},regexp:function(){return{validate:function(a,b,c){return RegExp(b,c.options.regexpFlag||"").test(a)},priority:64}},minlength:function(){return{validate:function(a,b){return a.length>=b},priority:32}},maxlength:function(){return{validate:function(a,
b){return a.length<=b},priority:32}},rangelength:function(){var a=this;return{validate:function(b,c){return a.minlength().validate(b,c[0])&&a.maxlength().validate(b,c[1])},priority:32}},min:function(){return{validate:function(a,b){return Number(a)>=b},priority:32}},max:function(){return{validate:function(a,b){return Number(a)<=b},priority:32}},range:function(){var a=this;return{validate:function(b,c){return a.min().validate(b,c[0])&&a.max().validate(b,c[1])},priority:32}},equalto:function(){return{validate:function(a,
b,c){c.options.validateIfUnchanged=!0;return a===d(b).val()},priority:64}},remote:function(){return{validate:function(a,b,c){var e={},f={};e[c.$element.attr("name")]=a;"undefined"!==typeof c.options.remoteDatatype&&(f={dataType:c.options.remoteDatatype});var g=function(a,b){"undefined"!==typeof b&&("undefined"!==typeof c.Validator.messages.remote&&b!==c.Validator.messages.remote)&&d(c.UI.ulError+" .remote").remove();if(!1===a)c.options.listeners.onFieldError(c.element,c.constraints,c);else!0===a&&
!1===c.options.listeners.onFieldSuccess(c.element,c.constraints,c)&&(a=!1);c.updtConstraint({name:"remote",valid:a},b);c.manageValidationResult()},k=function(a){if("object"===typeof a)return a;try{a=d.parseJSON(a)}catch(b){}return a},l=function(a){return"object"===typeof a&&null!==a?"undefined"!==typeof a.error?a.error:"undefined"!==typeof a.message?a.message:null:null};d.ajax(d.extend({},{url:b,data:e,type:c.options.remoteMethod||"GET",success:function(a){a=k(a);g(1===a||!0===a||"object"===typeof a&&
null!==a&&"undefined"!==typeof a.success,l(a))},error:function(a){a=k(a);g(!1,l(a))}},f));return null},priority:64}},mincheck:function(){var a=this;return{validate:function(b,c){return a.minlength().validate(b,c)},priority:32}},maxcheck:function(){var a=this;return{validate:function(b,c){return a.maxlength().validate(b,c)},priority:32}},rangecheck:function(){var a=this;return{validate:function(b,c){return a.rangelength().validate(b,c)},priority:32}}},init:function(a){var b=a.validators;a=a.messages;
for(var c in b)this.addValidator(c,b[c]);for(c in a)this.addMessage(c,a[c])},formatMesssage:function(a,b){if("object"===typeof b){for(var c in b)a=this.formatMesssage(a,b[c]);return a}return"string"===typeof a?a.replace(/%s/i,b):""},addValidator:function(a,b){if("undefined"===typeof b().validate)throw Error("Validator `"+a+"` must have a validate method. See more here: http://parsleyjs.org/documentation.html#javascript-general");"undefined"===typeof b().priority&&(b={validate:b().validate,priority:32},
window.console&&window.console.warn&&window.console.warn("Validator `"+a+"` should have a priority. Default priority 32 given"));this.validators[a]=b},addMessage:function(a,b,c){if("undefined"!==typeof c&&!0===c)this.messages.type[a]=b;else if("type"===a)for(var d in b)this.messages.type[d]=b[d];else this.messages[a]=b}};var n=function(a){this.init(a)};n.prototype={constructor:n,init:function(a){this.ParsleyInstance=a;this.hash=a.hash;this.options=this.ParsleyInstance.options;this.errorClassHandler=
this.options.errors.classHandler(this.ParsleyInstance.element,this.ParsleyInstance.isRadioOrCheckbox)||this.ParsleyInstance.$element;this.ulErrorManagement()},ulErrorManagement:function(){this.ulError="#"+this.hash;this.ulTemplate=d(this.options.errors.errorsWrapper).attr("id",this.hash).addClass("parsley-error-list")},removeError:function(a){a=this.ulError+" ."+a;var b=this;this.options.animate?d(a).fadeOut(this.options.animateDuration,function(){d(this).remove();b.ulError&&0===d(b.ulError).children().length&&
b.removeErrors()}):d(a).remove();return this},addError:function(a){for(var b in a){var c=d(this.options.errors.errorElem).addClass(b);d(this.ulError).append(this.options.animate?d(c).html(a[b]).hide().fadeIn(this.options.animateDuration):d(c).html(a[b]))}return this},updateError:function(a){for(var b in a)a[b]!==d(this.ulError+" > li."+b).html()&&this.removeError(b).addError(a);return this},removeErrors:function(){this.options.animate?d(this.ulError).fadeOut(this.options.animateDuration,function(){d(this).remove()}):
d(this.ulError).remove();return this},reset:function(){this.ParsleyInstance.valid=null;this.removeErrors();this.ParsleyInstance.validatedOnce=!1;this.errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);for(var a in this.constraints)this.constraints[a].valid=null;return this},manageError:function(a){d(this.ulError).length||this.manageErrorContainer();if("required"===a.name&&null!==this.ParsleyInstance.getVal()&&0<this.ParsleyInstance.getVal().length)return this;
if(this.ParsleyInstance.isRequired&&"required"!==a.name&&(null===this.ParsleyInstance.getVal()||0===this.ParsleyInstance.getVal().length))return this.removeError(a.name),this;var b=a.name,c=!1!==this.options.errorMessage?"custom-error-message":b,e={};a=!1!==this.options.errorMessage?this.options.errorMessage:"type"===a.name?this.ParsleyInstance.Validator.messages[b][a.requirements]:"undefined"===typeof this.ParsleyInstance.Validator.messages[b]?this.ParsleyInstance.Validator.messages.defaultMessage:
this.ParsleyInstance.Validator.formatMesssage(this.ParsleyInstance.Validator.messages[b],a.requirements);e[c]=a;!d(this.ulError+" ."+c).length?this.addError(e):this.updateError(e);return this},manageErrorContainer:function(){var a=this.options.errorContainer||this.options.errors.container(this.ParsleyInstance.element,this.ParsleyInstance.isRadioOrCheckbox),b=this.options.animate?this.ulTemplate.css("display",""):this.ulTemplate;if("undefined"!==typeof a)d(a).append(b);else return!this.ParsleyInstance.isRadioOrCheckbox?
this.ParsleyInstance.$element.after(b):this.ParsleyInstance.$element.parent().after(b),this}};var m=function(a,b,c){this.options=b;if("ParsleyFieldMultiple"===c)return this;this.init(a,c||"ParsleyField")};m.prototype={constructor:m,init:function(a,b){this.type=b;this.valid=!0;this.element=a;this.validatedOnce=!1;this.$element=d(a);this.val=this.$element.val();this.Validator=new h(this.options);this.isRequired=!1;this.constraints={};"undefined"===typeof this.isRadioOrCheckbox&&(this.isRadioOrCheckbox=
!1,this.hash=this.generateHash());this.UI=new n(this);this.options.useHtml5Constraints&&this.bindHtml5Constraints();this.addConstraints();this.hasConstraints()&&this.bindValidationEvents()},setParent:function(a){this.$parent=d(a)},getParent:function(){return this.$parent},bindHtml5Constraints:function(){if(this.$element.hasClass("required")||this.$element.attr("required"))this.options.required=!0;var a=this.$element.attr("type");"undefined"!==typeof a&&RegExp(a,"i").test("email url number range tel")&&
(this.options.type="tel"===a?"phone":a,RegExp(this.options.type,"i").test("number range")&&(this.options.type="number","undefined"!==typeof this.$element.attr("min")&&this.$element.attr("min").length&&(this.options.min=this.$element.attr("min")),"undefined"!==typeof this.$element.attr("max")&&this.$element.attr("max").length&&(this.options.max=this.$element.attr("max"))));"string"===typeof this.$element.attr("pattern")&&this.$element.attr("pattern").length&&(this.options.regexp=this.$element.attr("pattern"))},
addConstraints:function(){for(var a in this.options){var b={};b[a]=this.options[a];this.addConstraint(b,!0,!1)}},addConstraint:function(a,b,c){for(var d in a)d=d.toLowerCase(),"function"===typeof this.Validator.validators[d]&&(this.constraints[d]={name:d,requirements:a[d],valid:null},"required"===d&&(this.isRequired=!0),this.addCustomConstraintMessage(d));"undefined"===typeof b&&this.bindValidationEvents()},updateConstraint:function(a,b){for(var c in a)this.updtConstraint({name:c,requirements:a[c],
valid:null},b)},updtConstraint:function(a,b){this.constraints[a.name]=d.extend(!0,this.constraints[a.name],a);"string"===typeof b&&("type"===a.name?this.Validator.messages[a.name][a.requirements]=b:this.Validator.messages[a.name]=b);this.bindValidationEvents()},removeConstraint:function(a){a=a.toLowerCase();delete this.constraints[a];"required"===a&&(this.isRequired=!1);this.hasConstraints()?this.bindValidationEvents():this.UI.reset()},addCustomConstraintMessage:function(a){var b=a+("type"===a&&"undefined"!==
typeof this.options[a]?this.options[a].charAt(0).toUpperCase()+this.options[a].substr(1):"")+"Message";"undefined"!==typeof this.options[b]&&this.Validator.addMessage("type"===a?this.options[a]:a,this.options[b],"type"===a)},bindValidationEvents:function(){this.valid=null;this.$element.addClass("parsley-validated");this.$element.off("."+this.type);this.options.remote&&!/change/i.test(this.options.trigger)&&(this.options.trigger=!this.options.trigger?"change":" change");var a=(!this.options.trigger?
"":this.options.trigger)+(/key/i.test(this.options.trigger)?"":" keyup");this.$element.is("select")&&(a+=/change/i.test(a)?"":" change");a=a.replace(/^\s+/g,"").replace(/\s+$/g,"");this.$element.on((a+" ").split(" ").join("."+this.type+" "),!1,d.proxy(this.eventValidation,this))},generateHash:function(){return"parsley-"+(Math.random()+"").substring(2)},getHash:function(){return this.hash},getVal:function(){return"undefined"!==typeof this.$element.domApi(this.options.namespace).value?this.$element.domApi(this.options.namespace).value:
this.$element.val()},eventValidation:function(a){var b=this.getVal();if("keyup"===a.type&&!/keyup/i.test(this.options.trigger)&&!this.validatedOnce||"change"===a.type&&!/change/i.test(this.options.trigger)&&!this.validatedOnce||!this.isRadioOrCheckbox&&this.getLength(b)<this.options.validationMinlength&&!this.validatedOnce)return!0;this.validate()},getLength:function(a){return!a||!a.hasOwnProperty("length")?0:a.length},isValid:function(){return this.validate(!1)},hasConstraints:function(){for(var a in this.constraints)return!0;
return!1},validate:function(a){var b=this.getVal(),c=null;if(!this.hasConstraints()||this.$element.is(this.options.excluded))return null;if(this.options.listeners.onFieldValidate(this.element,this)||""===b&&!this.isRequired)return this.UI.reset(),null;if(!this.needsValidation(b))return this.valid;c=this.applyValidators();("undefined"!==typeof a?a:this.options.showErrors)&&this.manageValidationResult();return c},needsValidation:function(a){if(!this.options.validateIfUnchanged&&null!==this.valid&&this.val===
a&&this.validatedOnce)return!1;this.val=a;return this.validatedOnce=!0},applyValidators:function(){var a=null,b;for(b in this.constraints){var c=this.Validator.validators[this.constraints[b].name]().validate(this.val,this.constraints[b].requirements,this);!1===c?(a=!1,this.constraints[b].valid=a):!0===c&&(this.constraints[b].valid=!0,a=!1!==a)}if(!1===a)this.options.listeners.onFieldError(this.element,this.constraints,this);else!0===a&&!1===this.options.listeners.onFieldSuccess(this.element,this.constraints,
this)&&(a=!1);return a},manageValidationResult:function(){var a=null,b=[],c;for(c in this.constraints)!1===this.constraints[c].valid?(b.push(this.constraints[c]),a=!1):!0===this.constraints[c].valid&&(this.UI.removeError(this.constraints[c].name),a=!1!==a);this.valid=a;if(!0===this.valid)return this.UI.removeErrors(),this.UI.errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass),!0;if(!1===this.valid){if(!0===this.options.priorityEnabled){for(var a=0,e,f=0;f<b.length;f++)e=
this.Validator.validators[b[f].name]().priority,e>a&&(c=b[f],a=e);this.UI.manageError(c)}else for(f=0;f<b.length;f++)this.UI.manageError(b[f]);this.UI.errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass);return!1}this.UI.ulError&&0===d(this.ulError).children().length&&this.UI.removeErrors();return a},addListener:function(a){for(var b in a)this.options.listeners[b]=a[b]},destroy:function(){this.$element.removeClass("parsley-validated");this.UI.reset();this.$element.off("."+
this.type).removeData(this.type)}};var p=function(a,b,c){this.initMultiple(a,b);this.inherit(a,b);this.Validator=new h(b);this.init(a,c||"ParsleyFieldMultiple")};p.prototype={constructor:p,initMultiple:function(a,b){this.element=a;this.$element=d(a);this.group=b.group||!1;this.hash=this.getName();this.siblings=this.group?"["+b.namespace+'group="'+this.group+'"]':'input[name="'+this.$element.attr("name")+'"]';this.isRadioOrCheckbox=!0;this.isRadio=this.$element.is("input[type=radio]");this.isCheckbox=
this.$element.is("input[type=checkbox]");this.errorClassHandler=b.errors.classHandler(a,this.isRadioOrCheckbox)||this.$element.parent()},inherit:function(a,b){var c=new m(a,b,"ParsleyFieldMultiple"),d;for(d in c)"undefined"===typeof this[d]&&(this[d]=c[d])},getName:function(){if(this.group)return"parsley-"+this.group;if("undefined"===typeof this.$element.attr("name"))throw"A radio / checkbox input must have a parsley-group attribute or a name to be Parsley validated !";return"parsley-"+this.$element.attr("name").replace(/(:|\.|\[|\]|\$)/g,
"")},getVal:function(){if(this.isRadio)return d(this.siblings+":checked").val()||"";if(this.isCheckbox){var a=[];d(this.siblings+":checked").each(function(){a.push(d(this).val())});return a}},bindValidationEvents:function(){this.valid=null;this.$element.addClass("parsley-validated");this.$element.off("."+this.type);var a=this,b=(!this.options.trigger?"":this.options.trigger)+(/change/i.test(this.options.trigger)?"":" change"),b=b.replace(/^\s+/g,"").replace(/\s+$/g,"");d(this.siblings).each(function(){d(this).on(b.split(" ").join("."+
a.type+" "),!1,d.proxy(a.eventValidation,a))})}};var q=function(a,b,c){this.init(a,b,c||"parsleyForm")};q.prototype={constructor:q,init:function(a,b,c){this.type=c;this.items=[];this.$element=d(a);this.options=b;var e=this;this.$element.find(b.inputs).each(function(){e.addItem(this)});this.$element.on("submit."+this.type,!1,d.proxy(this.validate,this))},addListener:function(a){for(var b in a)if(/Field/.test(b))for(var c=0;c<this.items.length;c++)this.items[c].addListener(a);else this.options.listeners[b]=
a[b]},addItem:function(a){a=d(a).parsley(this.options);a.setParent(this);this.items.push(a)},removeItem:function(a){a=d(a).parsley();for(var b=0;b<this.items.length;b++)if(this.items[b].hash===a.hash)return this.items[b].destroy(),this.items.splice(b,1),!0;return!1},validate:function(a){var b=!0;this.focusedField=!1;for(var c=0;c<this.items.length;c++)if("undefined"!==typeof this.items[c]&&!1===this.items[c].validate()&&(b=!1,!this.focusedField&&"first"===this.options.focus||"last"===this.options.focus))this.focusedField=
this.items[c].$element;if(this.focusedField&&!b)if(0<this.options.scrollDuration){var e=this,c=this.focusedField.offset().top-d(window).height()/2;d("html, body").animate({scrollTop:c},this.options.scrollDuration,function(){e.focusedField.focus()})}else this.focusedField.focus();a=this.options.listeners.onFormValidate(b,a,this);return"undefined"!==typeof a?a:b},isValid:function(){for(var a=0;a<this.items.length;a++)if(!1===this.items[a].isValid())return!1;return!0},removeErrors:function(){for(var a=
0;a<this.items.length;a++)this.items[a].parsley("reset")},destroy:function(){for(var a=0;a<this.items.length;a++)this.items[a].destroy();this.$element.off("."+this.type).removeData(this.type)},reset:function(){for(var a=0;a<this.items.length;a++)this.items[a].UI.reset()}};d.fn.parsley=function(a,b){function c(b,c){var e=d(b).data(c);if(!e){switch(c){case "parsleyForm":e=new q(b,f,"parsleyForm");break;case "parsleyField":e=new m(b,f,"parsleyField");break;case "parsleyFieldMultiple":e=new p(b,f,"parsleyFieldMultiple");
break;default:return}d(b).data(c,e)}return"string"===typeof a&&"function"===typeof e[a]?(e=e[a].apply(e,k),"undefined"!==typeof e?e:d(b)):e}var e=d(this).data("parsleyNamespace")?d(this).data("parsleyNamespace"):"undefined"!==typeof a&&"undefined"!==typeof a.namespace?a.namespace:d.fn.parsley.defaults.namespace,f=d.extend(!0,{},d.fn.parsley.defaults,"undefined"!==typeof window.ParsleyConfig?window.ParsleyConfig:{},a,this.domApi(e)),g=null,k=Array.prototype.slice.call(arguments,1);d(this).is("form")||
"undefined"!==typeof d(this).domApi(e).bind?g=c(d(this),"parsleyForm"):d(this).is(f.inputs)&&(g=c(d(this),!d(this).is("input[type=radio], input[type=checkbox]")?"parsleyField":"parsleyFieldMultiple"));return"function"===typeof b?b():g};d(window).on("load",function(){d("[parsley-validate], [data-parsley-validate]").each(function(){d(this).parsley()})});d.fn.domApi=function(a){var b,c={},e=RegExp("^"+a,"i");if("undefined"===typeof this[0])return{};for(var f in this[0].attributes)if(b=this[0].attributes[f],
"undefined"!==typeof b&&null!==b&&b.specified&&e.test(b.name)){var g=c,k=r(b.name.replace(a,"")),l;b=b.value;var h=void 0;try{l=b?"true"==b||("false"==b?!1:"null"==b?null:!isNaN(h=Number(b))?h:/^[\[\{]/.test(b)?d.parseJSON(b):b):b}catch(m){l=b}g[k]=l}return c};var r=function(a){return a.replace(/-+(.)?/g,function(a,c){return c?c.toUpperCase():""})};d.fn.parsley.defaults={namespace:"parsley-",inputs:"input, textarea, select",excluded:"input[type=hidden], input[type=file], :disabled",priorityEnabled:!0,
trigger:!1,animate:!0,animateDuration:300,scrollDuration:500,focus:"first",validationMinlength:3,successClass:"parsley-success",errorClass:"parsley-error",errorMessage:!1,validators:{},showErrors:!0,useHtml5Constraints:!0,messages:{},validateIfUnchanged:!1,errors:{classHandler:function(a,b){},container:function(a,b){},errorsWrapper:"<ul></ul>",errorElem:"<li></li>"},listeners:{onFieldValidate:function(a,b){return!1},onFormValidate:function(a,b,c){},onFieldError:function(a,b,c){},onFieldSuccess:function(a,
b,c){}}}}(window.jQuery||window.Zepto);

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.7
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=c.options.asNavFor;d&&null!==d&&(d=a(d).not(c.$slider)),null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=0!==d.slideCount%d.options.slidesToScroll,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&(a("li",b.$dots).off("click.slick",b.changeSlide),b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",a.proxy(b.setPaused,b,!0)).off("mouseleave.slick",a.proxy(b.setPaused,b,!1))),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.options.arrows===!0&&(c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove())),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=-1*(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth,e=-1*(b.options.slidesToShow-(a-b.slideCount))*d):(b.slideOffset=-1*b.slideCount%b.options.slidesToScroll*b.slideWidth,e=-1*b.slideCount%b.options.slidesToScroll*d))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.setPaused,b,!0)).on("mouseleave.slick",a.proxy(b.setPaused,b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.$list.on("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}}))},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:0},100,function(){b.attr("src",c).animate({opacity:1},200,function(){b.removeAttr("data-lazy").removeClass("slick-loading")})})},d.src=c})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay(),b.options.accessibility===!0&&b.initADA()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(b){var c=this,d=c.currentSlide;c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b]),b.options.autoplay===!0&&b.focusHandler()},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,d.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(b,c,d){var f,g,e=this;if("responsive"===b&&"array"===a.type(c))for(g in c)if("array"!==a.type(e.options.responsive))e.options.responsive=[c[g]];else{for(f=e.options.responsive.length-1;f>=0;)e.options.responsive[f].breakpoint===c[g].breakpoint&&e.options.responsive.splice(f,1),f--;e.options.responsive.push(c[g])}else e.options[b]=c;d===!0&&(e.unload(),e.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,a?b.autoPlayClear():b.autoPlay())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),c.asNavFor(e),void 0):(c.slideHandler(e),void 0)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?0!==i.slideCount%i.options.slidesToScroll?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?0!==i.slideCount%i.options.slidesToScroll?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)
})):i.postSlide(e),i.animateHeight(),void 0):(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.swipeLeft=b.options.vertical===!1?d+f*g:d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):a.options.autoplay===!0&&(a.paused=!1,a.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.activateADA=function(){var a=this,b=a.$slider.find("*").is(":focus");a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false",tabindex:"0"}).find("a, input, button, select").attr({tabindex:"0"}),b&&a.$slideTrack.find(".slick-active").focus()},b.prototype.focusHandler=function(){var b=this;b.$slider.on("focus.slick blur.slick","*",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.isPlay&&(d.is(":focus")?(b.autoPlayClear(),b.paused=!0):(b.paused=!1,b.autoPlay()))},0)})},a.fn.slick=function(){var g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length,f=0;for(f;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define("bloodhound", [ "jquery" ], function(a0) {
            return root["Bloodhound"] = factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        root["Bloodhound"] = factory(jQuery);
    }
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var VERSION = "0.11.1";
    var tokenizers = function() {
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey(keys) {
                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(keys, function(k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        "use strict";
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                    this.size--;
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        "use strict";
        var LOCAL_STORAGE;
        try {
            LOCAL_STORAGE = window.localStorage;
            LOCAL_STORAGE.setItem("~~~", "!");
            LOCAL_STORAGE.removeItem("~~~");
        } catch (err) {
            LOCAL_STORAGE = null;
        }
        function PersistentStorage(namespace, override) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
            this.ls = override || LOCAL_STORAGE;
            !this.ls && this._noop();
        }
        _.mixin(PersistentStorage.prototype, {
            _prefix: function(key) {
                return this.prefix + key;
            },
            _ttlKey: function(key) {
                return this._prefix(key) + this.ttlKey;
            },
            _noop: function() {
                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
            },
            _safeSet: function(key, val) {
                try {
                    this.ls.setItem(key, val);
                } catch (err) {
                    if (err.name === "QuotaExceededError") {
                        this.clear();
                        this._noop();
                    }
                }
            },
            get: function(key) {
                if (this.isExpired(key)) {
                    this.remove(key);
                }
                return decode(this.ls.getItem(this._prefix(key)));
            },
            set: function(key, val, ttl) {
                if (_.isNumber(ttl)) {
                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
                } else {
                    this.ls.removeItem(this._ttlKey(key));
                }
                return this._safeSet(this._prefix(key), encode(val));
            },
            remove: function(key) {
                this.ls.removeItem(this._ttlKey(key));
                this.ls.removeItem(this._prefix(key));
                return this;
            },
            clear: function() {
                var i, keys = gatherMatchingKeys(this.keyMatcher);
                for (i = keys.length; i--; ) {
                    this.remove(keys[i]);
                }
                return this;
            },
            isExpired: function(key) {
                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
                return _.isNumber(ttl) && now() > ttl ? true : false;
            }
        });
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return $.parseJSON(val);
        }
        function gatherMatchingKeys(keyMatcher) {
            var i, key, keys = [], len = LOCAL_STORAGE.length;
            for (i = 0; i < len; i++) {
                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
                    keys.push(key.replace(keyMatcher, ""));
                }
            }
            return keys;
        }
    }();
    var Transport = function() {
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastReq = null;
            this._send = o.transport;
            this._get = o.limiter ? o.limiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _fingerprint: function fingerprint(o) {
                o = o || {};
                return o.url + o.type + $.param(o.data || {});
            },
            _get: function(o, cb) {
                var that = this, fingerprint, jqXhr;
                fingerprint = this._fingerprint(o);
                if (this.cancelled || fingerprint !== this.lastReq) {
                    return;
                }
                if (jqXhr = pendingRequests[fingerprint]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb(null, resp);
                    that._cache.set(fingerprint, resp);
                }
                function fail() {
                    cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[fingerprint];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(o, cb) {
                var resp, fingerprint;
                cb = cb || $.noop;
                o = _.isString(o) ? {
                    url: o
                } : o || {};
                fingerprint = this._fingerprint(o);
                this.cancelled = false;
                this.lastReq = fingerprint;
                if (resp = this._cache.get(fingerprint)) {
                    cb(null, resp);
                } else {
                    this._get(o, cb);
                }
            },
            cancel: function() {
                this.cancelled = true;
            }
        });
        return Transport;
    }();
    var SearchIndex = window.SearchIndex = function() {
        "use strict";
        var CHILDREN = "c", IDS = "i";
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.identify = o.identify || _.stringify;
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    var id, tokens;
                    that.datums[id = that.identify(datum)] = datum;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
                            node[IDS].push(id);
                        }
                    });
                });
            },
            get: function get(ids) {
                var that = this;
                return _.map(ids, function(id) {
                    return that.datums[id];
                });
            },
            search: function search(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node[CHILDREN][ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node[IDS].slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    return that.datums[id];
                }) : [];
            },
            all: function all() {
                var values = [];
                for (var key in this.datums) {
                    values.push(this.datums[key]);
                }
                return values;
            },
            reset: function reset() {
                this.datums = {};
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function(token) {
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            var node = {};
            node[IDS] = [];
            node[CHILDREN] = {};
            return node;
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort();
            arrayB = arrayB.sort();
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
        }
    }();
    var Prefetch = function() {
        "use strict";
        var keys;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        function Prefetch(o) {
            this.url = o.url;
            this.ttl = o.ttl;
            this.cache = o.cache;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = o.transport;
            this.thumbprint = o.thumbprint;
            this.storage = new PersistentStorage(o.cacheKey);
        }
        _.mixin(Prefetch.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            store: function store(data) {
                if (!this.cache) {
                    return;
                }
                this.storage.set(keys.data, data, this.ttl);
                this.storage.set(keys.protocol, location.protocol, this.ttl);
                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
            },
            fromCache: function fromCache() {
                var stored = {}, isExpired;
                if (!this.cache) {
                    return null;
                }
                stored.data = this.storage.get(keys.data);
                stored.protocol = this.storage.get(keys.protocol);
                stored.thumbprint = this.storage.get(keys.thumbprint);
                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            fromNetwork: function(cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                settings = this.prepare(this._settings());
                this.transport(settings).fail(onError).done(onResponse);
                function onError() {
                    cb(true);
                }
                function onResponse(resp) {
                    cb(null, that.transform(resp));
                }
            },
            clear: function clear() {
                this.storage.clear();
                return this;
            }
        });
        return Prefetch;
    }();
    var Remote = function() {
        "use strict";
        function Remote(o) {
            this.url = o.url;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = new Transport({
                cache: o.cache,
                limiter: o.limiter,
                transport: o.transport
            });
        }
        _.mixin(Remote.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            get: function get(query, cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                query = query || "";
                settings = this.prepare(query, this._settings());
                return this.transport.get(settings, onResponse);
                function onResponse(err, resp) {
                    err ? cb([]) : cb(that.transform(resp));
                }
            },
            cancelLastRequest: function cancelLastRequest() {
                this.transport.cancel();
            }
        });
        return Remote;
    }();
    var oParser = function() {
        "use strict";
        return function parse(o) {
            var defaults, sorter;
            defaults = {
                initialize: true,
                identify: _.stringify,
                datumTokenizer: null,
                queryTokenizer: null,
                sufficient: 5,
                sorter: null,
                local: [],
                prefetch: null,
                remote: null
            };
            o = _.mixin(defaults, o || {});
            !o.datumTokenizer && $.error("datumTokenizer is required");
            !o.queryTokenizer && $.error("queryTokenizer is required");
            sorter = o.sorter;
            o.sorter = sorter ? function(x) {
                return x.sort(sorter);
            } : _.identity;
            o.local = _.isFunction(o.local) ? o.local() : o.local;
            o.prefetch = parsePrefetch(o.prefetch);
            o.remote = parseRemote(o.remote);
            return o;
        };
        function parsePrefetch(o) {
            var defaults;
            if (!o) {
                return null;
            }
            defaults = {
                url: null,
                ttl: 24 * 60 * 60 * 1e3,
                cache: true,
                cacheKey: null,
                thumbprint: "",
                prepare: _.identity,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("prefetch requires url to be set");
            o.transform = o.filter || o.transform;
            o.cacheKey = o.cacheKey || o.url;
            o.thumbprint = VERSION + o.thumbprint;
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            return o;
        }
        function parseRemote(o) {
            var defaults;
            if (!o) {
                return;
            }
            defaults = {
                url: null,
                cache: true,
                prepare: null,
                replace: null,
                wildcard: null,
                limiter: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("remote requires url to be set");
            o.transform = o.filter || o.transform;
            o.prepare = toRemotePrepare(o);
            o.limiter = toLimiter(o);
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            delete o.replace;
            delete o.wildcard;
            delete o.rateLimitBy;
            delete o.rateLimitWait;
            return o;
        }
        function toRemotePrepare(o) {
            var prepare, replace, wildcard;
            prepare = o.prepare;
            replace = o.replace;
            wildcard = o.wildcard;
            if (prepare) {
                return prepare;
            }
            if (replace) {
                prepare = prepareByReplace;
            } else if (o.wildcard) {
                prepare = prepareByWildcard;
            } else {
                prepare = idenityPrepare;
            }
            return prepare;
            function prepareByReplace(query, settings) {
                settings.url = replace(settings.url, query);
                return settings;
            }
            function prepareByWildcard(query, settings) {
                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
                return settings;
            }
            function idenityPrepare(query, settings) {
                return settings;
            }
        }
        function toLimiter(o) {
            var limiter, method, wait;
            limiter = o.limiter;
            method = o.rateLimitBy;
            wait = o.rateLimitWait;
            if (!limiter) {
                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
            }
            return limiter;
            function debounce(wait) {
                return function debounce(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function throttle(wait) {
                return function throttle(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
        function callbackToDeferred(fn) {
            return function wrapper(o) {
                var deferred = $.Deferred();
                fn(o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function() {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function() {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var Bloodhound = function() {
        "use strict";
        var old;
        old = window && window.Bloodhound;
        function Bloodhound(o) {
            o = oParser(o);
            this.sorter = o.sorter;
            this.identify = o.identify;
            this.sufficient = o.sufficient;
            this.local = o.local;
            this.remote = o.remote ? new Remote(o.remote) : null;
            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
            this.index = new SearchIndex({
                identify: this.identify,
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            o.initialize !== false && this.initialize();
        }
        Bloodhound.noConflict = function noConflict() {
            window && (window.Bloodhound = old);
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            __ttAdapter: function ttAdapter() {
                var that = this;
                return this.remote ? withAsync : withoutAsync;
                function withAsync(query, sync, async) {
                    return that.search(query, sync, async);
                }
                function withoutAsync(query, sync) {
                    return that.search(query, sync);
                }
            },
            _loadPrefetch: function loadPrefetch() {
                var that = this, deferred, serialized;
                deferred = $.Deferred();
                if (!this.prefetch) {
                    deferred.resolve();
                } else if (serialized = this.prefetch.fromCache()) {
                    this.index.bootstrap(serialized);
                    deferred.resolve();
                } else {
                    this.prefetch.fromNetwork(done);
                }
                return deferred.promise();
                function done(err, data) {
                    if (err) {
                        return deferred.reject();
                    }
                    that.add(data);
                    that.prefetch.store(that.index.serialize());
                    deferred.resolve();
                }
            },
            _initialize: function initialize() {
                var that = this, deferred;
                this.clear();
                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
                return this.initPromise;
                function addLocalToIndex() {
                    that.add(that.local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
                return this;
            },
            get: function get(ids) {
                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
                return this.index.get(ids);
            },
            search: function search(query, sync, async) {
                var that = this, local;
                local = this.sorter(this.index.search(query));
                sync(this.remote ? local.slice() : local);
                if (this.remote && local.length < this.sufficient) {
                    this.remote.get(query, processRemote);
                } else if (this.remote) {
                    this.remote.cancelLastRequest();
                }
                return this;
                function processRemote(remote) {
                    var nonDuplicates = [];
                    _.each(remote, function(r) {
                        !_.some(local, function(l) {
                            return that.identify(r) === that.identify(l);
                        }) && nonDuplicates.push(r);
                    });
                    async && async(nonDuplicates);
                }
            },
            all: function all() {
                return this.index.all();
            },
            clear: function clear() {
                this.index.reset();
                return this;
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.prefetch && this.prefetch.clear();
                return this;
            },
            clearRemoteCache: function clearRemoteCache() {
                Transport.resetCache();
                return this;
            },
            ttAdapter: function ttAdapter() {
                return this.__ttAdapter();
            }
        });
        return Bloodhound;
    }();
    return Bloodhound;
});

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define("typeahead.js", [ "jquery" ], function(a0) {
            return factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var WWW = function() {
        "use strict";
        var defaultClassNames = {
            wrapper: "twitter-typeahead",
            input: "tt-input",
            hint: "tt-hint",
            menu: "tt-menu",
            dataset: "tt-dataset",
            suggestion: "tt-suggestion",
            selectable: "tt-selectable",
            empty: "tt-empty",
            open: "tt-open",
            cursor: "tt-cursor",
            highlight: "tt-highlight"
        };
        return build;
        function build(o) {
            var www, classes;
            classes = _.mixin({}, defaultClassNames, o);
            www = {
                css: buildCss(),
                classes: classes,
                html: buildHtml(classes),
                selectors: buildSelectors(classes)
            };
            return {
                css: www.css,
                html: www.html,
                classes: www.classes,
                selectors: www.selectors,
                mixin: function(o) {
                    _.mixin(o, www);
                }
            };
        }
        function buildHtml(c) {
            return {
                wrapper: '<span class="' + c.wrapper + '"></span>',
                menu: '<div class="' + c.menu + '"></div>'
            };
        }
        function buildSelectors(classes) {
            var selectors = {};
            _.each(classes, function(v, k) {
                selectors[k] = "." + v;
            });
            return selectors;
        }
        function buildCss() {
            var css = {
                wrapper: {
                    position: "relative",
                    display: "inline-block"
                },
                hint: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    borderColor: "transparent",
                    boxShadow: "none",
                    opacity: "1"
                },
                input: {
                    position: "relative",
                    verticalAlign: "top",
                    backgroundColor: "transparent"
                },
                inputWithNoHint: {
                    position: "relative",
                    verticalAlign: "top"
                },
                menu: {
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    zIndex: "100",
                    display: "none"
                },
                ltr: {
                    left: "0",
                    right: "auto"
                },
                rtl: {
                    left: "auto",
                    right: " 0"
                }
            };
            if (_.isMsie()) {
                _.mixin(css.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                });
            }
            return css;
        }
    }();
    var EventBus = function() {
        "use strict";
        var namespace, deprecationMap;
        namespace = "typeahead:";
        deprecationMap = {
            render: "rendered",
            cursorchange: "cursorchanged",
            select: "selected",
            autocomplete: "autocompleted"
        };
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            _trigger: function(type, args) {
                var $e;
                $e = $.Event(namespace + type);
                (args = args || []).unshift($e);
                this.$el.trigger.apply(this.$el, args);
                return $e;
            },
            before: function(type) {
                var args, $e;
                args = [].slice.call(arguments, 1);
                $e = this._trigger("before" + type, args);
                return $e.isDefaultPrevented();
            },
            trigger: function(type) {
                var deprecatedType;
                this._trigger(type, [].slice.call(arguments, 1));
                if (deprecatedType = deprecationMap[type]) {
                    this._trigger(deprecatedType, [].slice.call(arguments, 1));
                }
            }
        });
        return EventBus;
    }();
    var EventEmitter = function() {
        "use strict";
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function() {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function() {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function() {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function(doc) {
        "use strict";
        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function() {
        "use strict";
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o, www) {
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            www.mixin(this);
            this.$hint = $(o.hint);
            this.$input = $(o.input);
            this.query = this.$input.val();
            this.queryWhenFocused = this.hasFocus() ? this.query : null;
            this.$overflowHelper = buildOverflowHelper(this.$input);
            this._checkLanguageDirection();
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
        }
        Input.normalizeQuery = function(str) {
            return _.toStr(str).replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.queryWhenFocused = this.query;
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._setQuery(this.getInputValue());
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault;
                switch (keyName) {
                  case "up":
                  case "down":
                    preventDefault = !withModifier($e);
                    break;

                  default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                  case "tab":
                    trigger = !withModifier($e);
                    break;

                  default:
                    trigger = true;
                }
                return trigger;
            },
            _checkLanguageDirection: function checkLanguageDirection() {
                var dir = (this.$input.css("direction") || "ltr").toLowerCase();
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.$hint.attr("dir", dir);
                    this.trigger("langDirChanged", dir);
                }
            },
            _setQuery: function setQuery(val, silent) {
                var areEquivalent, hasDifferentWhitespace;
                areEquivalent = areQueriesEquivalent(val, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== val.length : false;
                this.query = val;
                if (!silent && !areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (!silent && hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            bind: function() {
                var that = this, onBlur, onFocus, onKeydown, onInput;
                onBlur = _.bind(this._onBlur, this);
                onFocus = _.bind(this._onFocus, this);
                onKeydown = _.bind(this._onKeydown, this);
                onInput = _.bind(this._onInput, this);
                this.$input.on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
                if (!_.isMsie() || _.isMsie() > 9) {
                    this.$input.on("input.tt", onInput);
                } else {
                    this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                        if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                            return;
                        }
                        _.defer(_.bind(that._onInput, that, $e));
                    });
                }
                return this;
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getLangDir: function getLangDir() {
                return this.dir;
            },
            getQuery: function getQuery() {
                return this.query || "";
            },
            setQuery: function setQuery(val, silent) {
                this.setInputValue(val);
                this._setQuery(val, silent);
            },
            hasQueryChangedSinceLastFocus: function hasQueryChangedSinceLastFocus() {
                return this.query !== this.queryWhenFocused;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value) {
                this.$input.val(value);
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            hasFocus: function hasFocus() {
                return this.$input.is(":focus");
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$overflowHelper.remove();
                this.$hint = this.$input = this.$overflowHelper = $("<div>");
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function() {
        "use strict";
        var keys, nameGenerator;
        keys = {
            val: "tt-selectable-display",
            obj: "tt-selectable-object"
        };
        nameGenerator = _.getIdGenerator();
        function Dataset(o, www) {
            o = o || {};
            o.templates = o.templates || {};
            o.templates.notFound = o.templates.notFound || o.templates.empty;
            if (!o.source) {
                $.error("missing source");
            }
            if (!o.node) {
                $.error("missing node");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            www.mixin(this);
            this.highlight = !!o.highlight;
            this.name = o.name || nameGenerator();
            this.limit = o.limit || 5;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source;
            this.async = _.isUndefined(o.async) ? this.source.length > 2 : !!o.async;
            this._resetLastSuggestion();
            this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name);
        }
        Dataset.extractData = function extractData(el) {
            var $el = $(el);
            if ($el.data(keys.obj)) {
                return {
                    val: $el.data(keys.val) || "",
                    obj: $el.data(keys.obj) || null
                };
            }
            return null;
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _overwrite: function overwrite(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (this.async && this.templates.pending) {
                    this._renderPending(query);
                } else if (!this.async && this.templates.notFound) {
                    this._renderNotFound(query);
                } else {
                    this._empty();
                }
                this.trigger("rendered", this.name, suggestions, false);
            },
            _append: function append(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length && this.$lastSuggestion.length) {
                    this._appendSuggestions(query, suggestions);
                } else if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (!this.$lastSuggestion.length && this.templates.notFound) {
                    this._renderNotFound(query);
                }
                this.trigger("rendered", this.name, suggestions, true);
            },
            _renderSuggestions: function renderSuggestions(query, suggestions) {
                var $fragment;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                this.$lastSuggestion = $fragment.children().last();
                this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions));
            },
            _appendSuggestions: function appendSuggestions(query, suggestions) {
                var $fragment, $lastSuggestion;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                $lastSuggestion = $fragment.children().last();
                this.$lastSuggestion.after($fragment);
                this.$lastSuggestion = $lastSuggestion;
            },
            _renderPending: function renderPending(query) {
                var template = this.templates.pending;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _renderNotFound: function renderNotFound(query) {
                var template = this.templates.notFound;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _empty: function empty() {
                this.$el.empty();
                this._resetLastSuggestion();
            },
            _getSuggestionsFragment: function getSuggestionsFragment(query, suggestions) {
                var that = this, fragment;
                fragment = document.createDocumentFragment();
                _.each(suggestions, function getSuggestionNode(suggestion) {
                    var $el, context;
                    context = that._injectQuery(query, suggestion);
                    $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + " " + that.classes.selectable);
                    fragment.appendChild($el[0]);
                });
                this.highlight && highlight({
                    className: this.classes.highlight,
                    node: fragment,
                    pattern: query
                });
                return $(fragment);
            },
            _getFooter: function getFooter(query, suggestions) {
                return this.templates.footer ? this.templates.footer({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _getHeader: function getHeader(query, suggestions) {
                return this.templates.header ? this.templates.header({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _resetLastSuggestion: function resetLastSuggestion() {
                this.$lastSuggestion = $();
            },
            _injectQuery: function injectQuery(query, obj) {
                return _.isObject(obj) ? _.mixin({
                    _query: query
                }, obj) : obj;
            },
            update: function update(query) {
                var that = this, canceled = false, syncCalled = false, rendered = 0;
                this.cancel();
                this.cancel = function cancel() {
                    canceled = true;
                    that.cancel = $.noop;
                    that.async && that.trigger("asyncCanceled", query);
                };
                this.source(query, sync, async);
                !syncCalled && sync([]);
                function sync(suggestions) {
                    if (syncCalled) {
                        return;
                    }
                    syncCalled = true;
                    suggestions = (suggestions || []).slice(0, that.limit);
                    rendered = suggestions.length;
                    that._overwrite(query, suggestions);
                    if (rendered < that.limit && that.async) {
                        that.trigger("asyncRequested", query);
                    }
                }
                function async(suggestions) {
                    suggestions = suggestions || [];
                    if (!canceled && rendered < that.limit) {
                        that.cancel = $.noop;
                        rendered += suggestions.length;
                        that._append(query, suggestions.slice(0, that.limit - rendered));
                        that.async && that.trigger("asyncReceived", query);
                    }
                }
            },
            cancel: $.noop,
            clear: function clear() {
                this._empty();
                this.cancel();
                this.trigger("cleared");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = $("<div>");
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || _.stringify;
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                notFound: templates.notFound && _.templatify(templates.notFound),
                pending: templates.pending && _.templatify(templates.pending),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return $("<div>").text(displayFn(context));
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Menu = function() {
        "use strict";
        function Menu(o, www) {
            var that = this;
            o = o || {};
            if (!o.node) {
                $.error("node is required");
            }
            www.mixin(this);
            this.$node = $(o.node);
            this.query = null;
            this.datasets = _.map(o.datasets, initializeDataset);
            function initializeDataset(oDataset) {
                var node = that.$node.find(oDataset.node).first();
                oDataset.node = node.length ? node : $("<div>").appendTo(that.$node);
                return new Dataset(oDataset, www);
            }
        }
        _.mixin(Menu.prototype, EventEmitter, {
            _onSelectableClick: function onSelectableClick($e) {
                this.trigger("selectableClicked", $($e.currentTarget));
            },
            _onRendered: function onRendered(type, dataset, suggestions, async) {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetRendered", dataset, suggestions, async);
            },
            _onCleared: function onCleared() {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetCleared");
            },
            _propagate: function propagate() {
                this.trigger.apply(this, arguments);
            },
            _allDatasetsEmpty: function allDatasetsEmpty() {
                return _.every(this.datasets, isDatasetEmpty);
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _getSelectables: function getSelectables() {
                return this.$node.find(this.selectors.selectable);
            },
            _removeCursor: function _removeCursor() {
                var $selectable = this.getActiveSelectable();
                $selectable && $selectable.removeClass(this.classes.cursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, nodeScrollTop, nodeHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                nodeScrollTop = this.$node.scrollTop();
                nodeHeight = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$node.scrollTop(nodeScrollTop + elTop);
                } else if (nodeHeight < elBottom) {
                    this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
                }
            },
            bind: function() {
                var that = this, onSelectableClick;
                onSelectableClick = _.bind(this._onSelectableClick, this);
                this.$node.on("click.tt", this.selectors.selectable, onSelectableClick);
                _.each(this.datasets, function(dataset) {
                    dataset.onSync("asyncRequested", that._propagate, that).onSync("asyncCanceled", that._propagate, that).onSync("asyncReceived", that._propagate, that).onSync("rendered", that._onRendered, that).onSync("cleared", that._onCleared, that);
                });
                return this;
            },
            isOpen: function isOpen() {
                return this.$node.hasClass(this.classes.open);
            },
            open: function open() {
                this.$node.addClass(this.classes.open);
            },
            close: function close() {
                this.$node.removeClass(this.classes.open);
                this._removeCursor();
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.attr("dir", dir);
            },
            selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
                var $selectables, $oldCursor, oldIndex, newIndex;
                $oldCursor = this.getActiveSelectable();
                $selectables = this._getSelectables();
                oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
                newIndex = oldIndex + delta;
                newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;
                newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;
                return newIndex === -1 ? null : $selectables.eq(newIndex);
            },
            setCursor: function setCursor($selectable) {
                this._removeCursor();
                if ($selectable = $selectable && $selectable.first()) {
                    $selectable.addClass(this.classes.cursor);
                    this._ensureVisible($selectable);
                }
            },
            getSelectableData: function getSelectableData($el) {
                return $el && $el.length ? Dataset.extractData($el) : null;
            },
            getActiveSelectable: function getActiveSelectable() {
                var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
                return $selectable.length ? $selectable : null;
            },
            getTopSelectable: function getTopSelectable() {
                var $selectable = this._getSelectables().first();
                return $selectable.length ? $selectable : null;
            },
            update: function update(query) {
                var isValidUpdate = query !== this.query;
                if (isValidUpdate) {
                    this.query = query;
                    _.each(this.datasets, updateDataset);
                }
                return isValidUpdate;
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.query = null;
                this.$node.addClass(this.classes.empty);
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            destroy: function destroy() {
                this.$node.off(".tt");
                this.$node = $("<div>");
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Menu;
    }();
    var DefaultMenu = function() {
        "use strict";
        var s = Menu.prototype;
        function DefaultMenu() {
            Menu.apply(this, [].slice.call(arguments, 0));
        }
        _.mixin(DefaultMenu.prototype, Menu.prototype, {
            open: function open() {
                !this._allDatasetsEmpty() && this._show();
                return s.open.apply(this, [].slice.call(arguments, 0));
            },
            close: function close() {
                this._hide();
                return s.close.apply(this, [].slice.call(arguments, 0));
            },
            _onRendered: function onRendered() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onRendered.apply(this, [].slice.call(arguments, 0));
            },
            _onCleared: function onCleared() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onCleared.apply(this, [].slice.call(arguments, 0));
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.css(dir === "ltr" ? this.css.ltr : this.css.rtl);
                return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
            },
            _hide: function hide() {
                this.$node.hide();
            },
            _show: function show() {
                this.$node.css("display", "block");
            }
        });
        return DefaultMenu;
    }();
    var Typeahead = function() {
        "use strict";
        function Typeahead(o, www) {
            var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            if (!o.menu) {
                $.error("missing menu");
            }
            if (!o.eventBus) {
                $.error("missing event bus");
            }
            www.mixin(this);
            this.eventBus = o.eventBus;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.input = o.input;
            this.menu = o.menu;
            this.enabled = true;
            this.active = false;
            this.input.hasFocus() && this.activate();
            this.dir = this.input.getLangDir();
            this._hacks();
            this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
            onFocused = c(this, "activate", "open", "_onFocused");
            onBlurred = c(this, "deactivate", "_onBlurred");
            onEnterKeyed = c(this, "isActive", "isOpen", "_onEnterKeyed");
            onTabKeyed = c(this, "isActive", "isOpen", "_onTabKeyed");
            onEscKeyed = c(this, "isActive", "_onEscKeyed");
            onUpKeyed = c(this, "isActive", "open", "_onUpKeyed");
            onDownKeyed = c(this, "isActive", "open", "_onDownKeyed");
            onLeftKeyed = c(this, "isActive", "isOpen", "_onLeftKeyed");
            onRightKeyed = c(this, "isActive", "isOpen", "_onRightKeyed");
            onQueryChanged = c(this, "_openIfActive", "_onQueryChanged");
            onWhitespaceChanged = c(this, "_openIfActive", "_onWhitespaceChanged");
            this.input.bind().onSync("focused", onFocused, this).onSync("blurred", onBlurred, this).onSync("enterKeyed", onEnterKeyed, this).onSync("tabKeyed", onTabKeyed, this).onSync("escKeyed", onEscKeyed, this).onSync("upKeyed", onUpKeyed, this).onSync("downKeyed", onDownKeyed, this).onSync("leftKeyed", onLeftKeyed, this).onSync("rightKeyed", onRightKeyed, this).onSync("queryChanged", onQueryChanged, this).onSync("whitespaceChanged", onWhitespaceChanged, this).onSync("langDirChanged", this._onLangDirChanged, this);
        }
        _.mixin(Typeahead.prototype, {
            _hacks: function hacks() {
                var $input, $menu;
                $input = this.input.$input || $("<div>");
                $menu = this.menu.$node || $("<div>");
                $input.on("blur.tt", function($e) {
                    var active, isActive, hasActive;
                    active = document.activeElement;
                    isActive = $menu.is(active);
                    hasActive = $menu.has(active).length > 0;
                    if (_.isMsie() && (isActive || hasActive)) {
                        $e.preventDefault();
                        $e.stopImmediatePropagation();
                        _.defer(function() {
                            $input.focus();
                        });
                    }
                });
                $menu.on("mousedown.tt", function($e) {
                    $e.preventDefault();
                });
            },
            _onSelectableClicked: function onSelectableClicked(type, $el) {
                this.select($el);
            },
            _onDatasetCleared: function onDatasetCleared() {
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered(type, dataset, suggestions, async) {
                this._updateHint();
                this.eventBus.trigger("render", suggestions, async, dataset);
            },
            _onAsyncRequested: function onAsyncRequested(type, dataset, query) {
                this.eventBus.trigger("asyncrequest", query, dataset);
            },
            _onAsyncCanceled: function onAsyncCanceled(type, dataset, query) {
                this.eventBus.trigger("asynccancel", query, dataset);
            },
            _onAsyncReceived: function onAsyncReceived(type, dataset, query) {
                this.eventBus.trigger("asyncreceive", query, dataset);
            },
            _onFocused: function onFocused() {
                this._minLengthMet() && this.menu.update(this.input.getQuery());
            },
            _onBlurred: function onBlurred() {
                if (this.input.hasQueryChangedSinceLastFocus()) {
                    this.eventBus.trigger("change", this.input.getQuery());
                }
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                } else if ($selectable = this.menu.getTopSelectable()) {
                    this.autocomplete($selectable) && $e.preventDefault();
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.close();
            },
            _onUpKeyed: function onUpKeyed() {
                this.moveCursor(-1);
            },
            _onDownKeyed: function onDownKeyed() {
                this.moveCursor(+1);
            },
            _onLeftKeyed: function onLeftKeyed() {
                if (this.dir === "rtl" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onRightKeyed: function onRightKeyed() {
                if (this.dir === "ltr" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
            },
            _onLangDirChanged: function onLangDirChanged(e, dir) {
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.menu.setLanguageDirection(dir);
                }
            },
            _openIfActive: function openIfActive() {
                this.isActive() && this.open();
            },
            _minLengthMet: function minLengthMet(query) {
                query = _.isString(query) ? query : this.input.getQuery() || "";
                return query.length >= this.minLength;
            },
            _updateHint: function updateHint() {
                var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
                $selectable = this.menu.getTopSelectable();
                data = this.menu.getSelectableData($selectable);
                val = this.input.getInputValue();
                if (data && !_.isBlankString(val) && !this.input.hasOverflow()) {
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(data.val);
                    match && this.input.setHint(val + match[1]);
                } else {
                    this.input.clearHint();
                }
            },
            isEnabled: function isEnabled() {
                return this.enabled;
            },
            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            isActive: function isActive() {
                return this.active;
            },
            activate: function activate() {
                if (this.isActive()) {
                    return true;
                } else if (!this.isEnabled() || this.eventBus.before("active")) {
                    return false;
                } else {
                    this.active = true;
                    this.eventBus.trigger("active");
                    return true;
                }
            },
            deactivate: function deactivate() {
                if (!this.isActive()) {
                    return true;
                } else if (this.eventBus.before("idle")) {
                    return false;
                } else {
                    this.active = false;
                    this.close();
                    this.eventBus.trigger("idle");
                    return true;
                }
            },
            isOpen: function isOpen() {
                return this.menu.isOpen();
            },
            open: function open() {
                if (!this.isOpen() && !this.eventBus.before("open")) {
                    this.menu.open();
                    this._updateHint();
                    this.eventBus.trigger("open");
                }
                return this.isOpen();
            },
            close: function close() {
                if (this.isOpen() && !this.eventBus.before("close")) {
                    this.menu.close();
                    this.input.clearHint();
                    this.input.resetInputValue();
                    this.eventBus.trigger("close");
                }
                return !this.isOpen();
            },
            setVal: function setVal(val) {
                this.input.setQuery(_.toStr(val));
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            select: function select($selectable) {
                var data = this.menu.getSelectableData($selectable);
                if (data && !this.eventBus.before("select", data.obj)) {
                    this.input.setQuery(data.val, true);
                    this.eventBus.trigger("select", data.obj);
                    this.close();
                    return true;
                }
                return false;
            },
            autocomplete: function autocomplete($selectable) {
                var query, data, isValid;
                query = this.input.getQuery();
                data = this.menu.getSelectableData($selectable);
                isValid = data && query !== data.val;
                if (isValid && !this.eventBus.before("autocomplete", data.obj)) {
                    this.input.setQuery(data.val);
                    this.eventBus.trigger("autocomplete", data.obj);
                    return true;
                }
                return false;
            },
            moveCursor: function moveCursor(delta) {
                var query, $candidate, data, payload, cancelMove;
                query = this.input.getQuery();
                $candidate = this.menu.selectableRelativeToCursor(delta);
                data = this.menu.getSelectableData($candidate);
                payload = data ? data.obj : null;
                cancelMove = this._minLengthMet() && this.menu.update(query);
                if (!cancelMove && !this.eventBus.before("cursorchange", payload)) {
                    this.menu.setCursor($candidate);
                    if (data) {
                        this.input.setInputValue(data.val);
                    } else {
                        this.input.resetInputValue();
                        this._updateHint();
                    }
                    this.eventBus.trigger("cursorchange", payload);
                    return true;
                }
                return false;
            },
            destroy: function destroy() {
                this.input.destroy();
                this.menu.destroy();
            }
        });
        return Typeahead;
        function c(ctx) {
            var methods = [].slice.call(arguments, 1);
            return function() {
                var args = [].slice.call(arguments);
                _.each(methods, function(method) {
                    return ctx[method].apply(ctx, args);
                });
            };
        }
    }();
    (function() {
        "use strict";
        var old, keys, methods;
        old = $.fn.typeahead;
        keys = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        };
        methods = {
            initialize: function initialize(o, datasets) {
                var www;
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                www = WWW(o.classNames);
                return this.each(attach);
                function attach() {
                    var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
                    _.each(datasets, function(d) {
                        d.highlight = !!o.highlight;
                    });
                    $input = $(this);
                    $wrapper = $(www.html.wrapper);
                    $hint = $elOrNull(o.hint);
                    $menu = $elOrNull(o.menu);
                    defaultHint = o.hint !== false && !$hint;
                    defaultMenu = o.menu !== false && !$menu;
                    defaultHint && ($hint = buildHintFromInput($input, www));
                    defaultMenu && ($menu = $(www.html.menu).css(www.css.menu));
                    $hint && $hint.val("");
                    $input = prepInput($input, www);
                    if (defaultHint || defaultMenu) {
                        $wrapper.css(www.css.wrapper);
                        $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint);
                        $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null);
                    }
                    MenuConstructor = defaultMenu ? DefaultMenu : Menu;
                    eventBus = new EventBus({
                        el: $input
                    });
                    input = new Input({
                        hint: $hint,
                        input: $input
                    }, www);
                    menu = new MenuConstructor({
                        node: $menu,
                        datasets: datasets
                    }, www);
                    typeahead = new Typeahead({
                        input: input,
                        menu: menu,
                        eventBus: eventBus,
                        minLength: o.minLength
                    }, www);
                    $input.data(keys.www, www);
                    $input.data(keys.typeahead, typeahead);
                }
            },
            isEnabled: function isEnabled() {
                var enabled;
                ttEach(this.first(), function(t) {
                    enabled = t.isEnabled();
                });
                return enabled;
            },
            enable: function enable() {
                ttEach(this, function(t) {
                    t.enable();
                });
                return this;
            },
            disable: function disable() {
                ttEach(this, function(t) {
                    t.disable();
                });
                return this;
            },
            isActive: function isActive() {
                var active;
                ttEach(this.first(), function(t) {
                    active = t.isActive();
                });
                return active;
            },
            activate: function activate() {
                ttEach(this, function(t) {
                    t.activate();
                });
                return this;
            },
            deactivate: function deactivate() {
                ttEach(this, function(t) {
                    t.deactivate();
                });
                return this;
            },
            isOpen: function isOpen() {
                var open;
                ttEach(this.first(), function(t) {
                    open = t.isOpen();
                });
                return open;
            },
            open: function open() {
                ttEach(this, function(t) {
                    t.open();
                });
                return this;
            },
            close: function close() {
                ttEach(this, function(t) {
                    t.close();
                });
                return this;
            },
            select: function select(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.select($el);
                });
                return success;
            },
            autocomplete: function autocomplete(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.autocomplete($el);
                });
                return success;
            },
            moveCursor: function moveCursoe(delta) {
                var success = false;
                ttEach(this.first(), function(t) {
                    success = t.moveCursor(delta);
                });
                return success;
            },
            val: function val(newVal) {
                var query;
                if (!arguments.length) {
                    ttEach(this.first(), function(t) {
                        query = t.getVal();
                    });
                    return query;
                } else {
                    ttEach(this, function(t) {
                        t.setVal(newVal);
                    });
                    return this;
                }
            },
            destroy: function destroy() {
                ttEach(this, function(typeahead, $input) {
                    revert($input);
                    typeahead.destroy();
                });
                return this;
            }
        };
        $.fn.typeahead = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
        function ttEach($els, fn) {
            $els.each(function() {
                var $input = $(this), typeahead;
                (typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input);
            });
        }
        function buildHintFromInput($input, www) {
            return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly", true).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
        }
        function prepInput($input, www) {
            $input.data(keys.attrs, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass(www.classes.input).attr({
                autocomplete: "off",
                spellcheck: false
            });
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input;
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function revert($input) {
            var www, $wrapper;
            www = $input.data(keys.www);
            $wrapper = $input.parent().filter(www.selectors.wrapper);
            _.each($input.data(keys.attrs), function(val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);
            if ($wrapper.length) {
                $input.detach().insertAfter($wrapper);
                $wrapper.remove();
            }
        }
        function $elOrNull(obj) {
            var isValid, $el;
            isValid = _.isJQuery(obj) || _.isElement(obj);
            $el = isValid ? $(obj).first() : [];
            return $el.length ? $el : null;
        }
    })();
});
$(document).ready(function() {
	// Stop console.log in unsupported browsers (IE)
	// From http://stackoverflow.com/a/1215400
	// Keep this at the beginning so that following console calls are considered.
	var logger = function() {
		var oldConsoleLog = null;
	    var pub = {};
		pub.enableLogger =  function enableLogger() {
			if(oldConsoleLog == null) {
				return;
				window['console']['log'] = oldConsoleLog;
			}
		};
		pub.disableLogger = function disableLogger() {
			//oldConsoleLog = console.log;
			window['console']['log'] = function() {};
		};
		return pub;
	}();
	logger.enableLogger();

	/* GLOBAL */

	 // ADD IOS7 CLASS TO HTML ELEMENT
    var isIos7 = navigator.userAgent.match(/(iPhone|iPod touch|iPad);.*CPU.*OS 7_\d/i);
    if (isIos7) $('html').addClass('ios7');

    var isIos = navigator.userAgent.match(/(iPhone|iPod touch|iPad);.*CPU.*OS \d/i);
    if (isIos) $('html').addClass('ios');

    var isIpadIos7 = navigator.userAgent.match(/(iPad);.*CPU.*OS 7_\d/i);
    if (isIpadIos7) $('html').addClass('ipadios7');

    var isIpad = navigator.userAgent.match(/iPad/i);
    if (isIpad) $('html').addClass('ipad');

    var isIphone = navigator.userAgent.match(/iPhone|iPod touch/i);
    if (isIphone) $('html').addClass('iphone');

    var isHandheld = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
    if (isHandheld) $('html').addClass('handheld');

    var isIE8 = ($('html').hasClass('lt-ie9'));

	// For IE respond tweak to enable page zoom
	function ie8ZoomFix() {
		if (typeof detectZoom !== 'undefined') {
			var zoom = detectZoom.zoom();
			if (zoom > 1) {
				$('header.whole-header').removeClass('fixed global-closed global-open animate');
				$('header.whole-header .site-header').removeClass('slim');
			} else {
				$('header.whole-header').addClass('fixed global-closed animate');
				$('header.whole-header .site-header').addClass('slim');
			}
		}
	}

	// IE8 nth-of-type override
	function ie8NthFix() {
		// .no-js-alternate-bg is for pages like get-a-quote... which have background overrides
		if ($('.content-module:not(.no-js-alternate-bg)').length) {
			$('.content-module:nth-of-type(odd)').addClass('js-alternate-bg-odd');
			$('.content-module:nth-of-type(even)').addClass('js-alternate-bg-even');
		}
		if ($('.content-module .related-products').length) {
			$('.content-module .related-products .products:nth-of-type(odd)').addClass('js-alternate-bg-odd');
			$('.content-module .related-products .products:nth-of-type(even)').addClass('js-alternate-bg-even');			
		}
		if ($('.content-module .accordian').length) {
			$('.content-module .accordian ul li:nth-of-type(odd)').addClass('js-alternate-bg-odd');
			$('.content-module .accordian ul li:nth-of-type(even)').addClass('js-alternate-bg-even');			
		}
	}
	if (isIE8) {
		ie8NthFix();
		$(window).on('resize',function() {
			ie8ZoomFix();
			$(window).trigger('scroll');
		});
		ie8ZoomFix();
	}

	// Quick fix for Menu positioning
	$('.megamenu#explore .megamenu-content .col-xs-9 .col-xs-4:nth-child(3n+1)').css('clear','left');
	// We should ask for a markup change to avoid the above line

    var isAndroid2 = false;
    var ua = navigator.userAgent;
	if( ua.indexOf("Android") >= 0 ) {
		var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
		if (androidversion < 2.3) {
			isAndroid2 = true;
		}
	}

	// Replace SVGs with PNGs for IE8 & old Android
	if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
		$('img[data-png]').each(function() {
			$(this).attr('src',$(this).attr('data-png'));
		});
	}


	// Hide empty H3 tags
	$('.content-module.description h3').each(function() {
		var trimmed = $.trim($(this).text());
		if (trimmed == '') $(this).hide();
	});

	function setCookie(c_name,value,exdays) {
	    var exdate=new Date();
	    exdate.setDate(exdate.getDate() + exdays);
	    var expires = exdate.toUTCString();
	    var isIE8 = (document.documentMode !== undefined);
	    if (exdays == 0) {
	        expires = (isIE8 == true) ? "" : "0";
	    }
	    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+expires);
	    document.cookie=c_name + "=" + c_value;
	}
	
	function unsetLanding() {
		if (getCookie('CGUdpage')) {
			document.cookie = "CGUdpage=; max-age=0";
			//localStorage.removeItem('tempLandingPageSet');
		}
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i=0; i<ca.length; i++) {
			//var c = ca[i].trim();
			var c = $.trim(ca[i]);
			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return false;
	}
	
	/* if (getCookie('CGUdpage')) {
		// something
	} else {
		$('html').addClass('set-landing-open');
	}
	
    $('.set-landing-agree, .set-landing-disagree').on('click',function() {
		$('.set-landing').css('min-height','0').slideUp("slow",function() {
			//window.localStorage.setItem("tempLandingPageSet", "Personal");
			//document.cookie="CGUdpage=Personal; max-age="+60*60*24*30+"; path=/";
			hideSetLanding();
		});
		$('header.whole-header').animate({
			top: 0
		},"slow");
    });

    $('.set-landing-agree').on('click', function() {
    	var landing = $('span.set-landing-type').text();
    	document.cookie="CGUdpage="+landing+"; max-age="+60*60*24*30+"; path=/";
    }); */

    // ALERT BANNER HANDLING
    $('.close-special-alert').on('click',function() {
    	var eventid = $(this).closest('section').attr('id');
    	document.cookie = "CGUhidealert-"+eventid+"=true; max-age="+60*60*24*30+"; path=/";

    	// Close the alert
    	$(this).closest('section').slideUp('fast');
    });

    if ($('section.special-alert').length) {
    	$('section.special-alert').each(function() {
    		var eventid = $(this).attr('id');
    		if (getCookie('CGUhidealert-'+eventid)) {
    			$(this).hide();
    		}
    	});
    }
	
	// Header show/hide behaviour	
	function getScrollY() {
		return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	}
	
	// Hide .set-landing
	function hideSetLanding() {
		$('html').removeClass('set-landing-open');
		set_globalNavOffset();
	}

	// Hide .set-landing
	function set_globalNavOffset() {
		if($('html').hasClass('set-landing-open')) {
			window.cgu.globalNavOffset = 100;
		} else {
			window.cgu.globalNavOffset = 40;
		}
		if ($('.whole-header').hasClass('xero')) {
			window.cgu.globalNavOffset = 1;
		}
	}

	window.cgu = {};
	window.cgu.lastKnownScrollY = getScrollY();
	set_globalNavOffset();

	// Showing the global nav when scrolling up
	$(window).scroll(function() {
		if (typeof detectZoom !== 'undefined') {
			if (isIE8 && detectZoom.zoom() > 1) {
				// cancel fixed header if it's IE8 and zoomed
				return;
			}
		}

		var tolerance = 5;
		var currentScrollY = getScrollY();
		var toleranceExceeded = (Math.abs(currentScrollY - window.cgu.lastKnownScrollY) >= tolerance);
		if (currentScrollY < 0) return; // Ignore scroll beyond scope of the HTML
		
		var scrollUpThreshold = window.cgu.globalNavOffset;
		if ($('header.whole-header').hasClass('global-open')) scrollUpThreshold = window.cgu.globalNavOffset - 40;

		// When scrolling down over the global header threshold
		var pageJustLoaded = (currentScrollY == window.cgu.lastKnownScrollY);
		if (currentScrollY >= window.cgu.globalNavOffset && window.cgu.lastKnownScrollY < window.cgu.globalNavOffset) {
			$('header.whole-header').addClass('fixed').removeClass('global-open');
			$('div.site-header').addClass('slim');
			setTimeout(function() {
				$('header.whole-header').addClass('animate');
			},50);

		// When scrolling up over the global header threshold
		} else if (currentScrollY < scrollUpThreshold && window.cgu.lastKnownScrollY >= window.cgu.globalNavOffset) {
			if (!$('header.whole-header').hasClass('global-open')) {
				$('header.whole-header').removeClass('animate');
			}
			$('header.whole-header').removeClass('animate').removeClass('fixed');
			$('.cyber-nav-wrapper').removeClass('fixed');
			$('.cyber.hero').removeClass('nav-fixed');
			$('div.site-header').removeClass('slim');
		} else if (currentScrollY < scrollUpThreshold || currentScrollY == 0) {
			if ($('header.whole-header').hasClass('global-open')) {
				$('header.whole-header').removeClass('global-open');
				$('.cyber-nav-wrapper').removeClass('fixed');
				$('.cyber.hero').removeClass('nav-fixed');
			}
			$('header.whole-header').removeClass('animate').removeClass('fixed');
			$('div.site-header').removeClass('slim');
			$('.cyber-nav-wrapper').removeClass('fixed');
			$('.cyber.hero').removeClass('nav-fixed');
		}


		// Fixed Cyber nav 
		if(currentScrollY >= 100){
			$('.cyber-nav-wrapper').addClass('fixed');
			$('.cyber.hero').addClass('nav-fixed');
		} else if(currentScrollY < 100){
			$('.cyber-nav-wrapper').removeClass('fixed');
			$('.cyber.hero').removeClass('nav-fixed');
		}

		// When scrolling up and should be triggering the global to drop back in
		if (!$('body').hasClass('smoothScrolling')) {
			if (currentScrollY > window.cgu.lastKnownScrollY && currentScrollY >= window.cgu.globalNavOffset) {
				$('header.whole-header').removeClass('global-open').addClass('global-closed');
			} else if (currentScrollY < window.cgu.lastKnownScrollY && toleranceExceeded && currentScrollY >= window.cgu.globalNavOffset*2) {
				$('header.whole-header').addClass('global-open').removeClass('global-closed');
			}
		}
		window.cgu.lastKnownScrollY = getScrollY();
	}); 


	window.cgu.lastKnownScrollY = 0;
	$(window).trigger('scroll');


	/* If there is an odd number of widgets in the sidebar, make the last one full width on tablet */
	if ($('.widget').length%2 == 1) {
		$('.widget').last().removeClass('col-sm-6').addClass('col-sm-12').addClass('full-width-widget-sm');
	}

	/* $('.widget').each(function() {
		if ($('div',$(this)).length == 1) {
			$(this).removeClass('col-sm-6').addClass('col-sm-12').addClass('full-width-widget-sm');
		}
	}); */

	// Megamenu triggers with jQuery-menu-aim
	$("nav.site-nav ul.menu").menuAim({
	     activate: openMegamenu,  // fired on row activation
	     deactivate: closeMegamenu,  // fired on row deactivation
	     exitMenu: exitMegamenu,
	     submenuDirection: "below",
	     submenuSelector: ".has-megamenu",
	     activationDelay: 80
	 });

	function openMegamenu(tt) {
		// Close any open dropdowns
		//$('select').trigger('chosen:close');

		if ($(tt).hasClass('has-megamenu')) {
			$('nav.site-nav,header.whole-header').addClass('menu-open');
		}
		$(tt).addClass('active');
		var $megamenu = $('.megamenu',tt);
		positionMegamenuArrow(tt);
		if (!$('.megamenu').is(':visible')) {
			//$megamenu.fadeIn(120);
			$megamenu.show();
		} else {
			if (!$(tt).hasClass('has-megamenu') && !$(tt).hasClass('pinned')) {
				//$('.megamenu').fadeOut(120);
				$('.megamenu').hide();
			} else {
				$('.megamenu').hide();
			}
			$megamenu.show();
		}
		if ($(tt).hasClass('has-megamenu')) {
			$('body').addClass('blackout');
		}
	}

	function closeMegamenu(tt) {
		if (!$(tt).hasClass('pinned')) {
			$('nav.site-nav,header.whole-header').removeClass('menu-open');
			var $megamenu = $('.megamenu',tt);
			$megamenu.hide();
			$('body').removeClass('blackout');
			/* setTimeout(function() {
				if (!$('nav.site-nav').hasClass('menu-open')) {
					$megamenu.fadeOut(120);
					$('body').removeClass('blackout');
				}
			},250); */
			$(tt).removeClass('active');
		}
	}

	function exitMegamenu() {
		if ($('.pac-container').is(':visible')) {
			return;
		}
		$('.megamenu-content .adviser-product-dropdown').removeClass('open');
		return true;
	}

	function positionMegamenuArrow(li) {
		//var browserWidth = $(window).width();
		var liLeft = $(li).offset().left;
		var widthOfArrow = 40;
		var liWidth = $(li).innerWidth();

		var arrowLeft = liLeft + (liWidth/2) - (widthOfArrow/2);
		// special, for search icon, because it doesn't have padding on both sides like the others
		if (getCurrentBootstrapSize() == 'md') {
			if ($(li).hasClass('search')) arrowLeft = parseInt(arrowLeft) + 5;
		} else if (getCurrentBootstrapSize() == 'lg') {
			if ($(li).hasClass('search')) arrowLeft = parseInt(arrowLeft) + 9;
		}


		var $megamenu = $('.megamenu',li);	
		if ($megamenu.find('.megamenu-arrow').length < 1) {
			$('.container',$megamenu).append('<span class="megamenu-arrow"></span>');
		}
		
		$megamenu.find('.megamenu-arrow').css('left',arrowLeft+'px');
	}

	// DISABLE TOP LEVEL LINKS FOR TOUCHSCREEN AT MD OR ABOVE (otherwise the megamenu can't be opened)
	$('html.touch .site-nav .menu .has-megamenu > a').bind('touchend', function(e) {
		if (getCurrentBootstrapSize() == 'md' || getCurrentBootstrapSize() == 'lg') {
			if ($(this).parent().hasClass('active')) {
				closeMegamenu($(this).parent());
				$(this).addClass('touch-up');
				$('input.md-search').blur();
			} else {
				closeMegamenu('.site-nav .menu .has-megamenu');
				openMegamenu($(this).parent());
				$(this).removeClass('touch-up');
				//console.log('Top level menu touched');
				if ($(this).hasClass('search-button')) {
					$('input.md-search').focus();
				} else {
					$('input.md-search').blur();
				}
			}
			e.preventDefault();
		}
	});
	// The preventDefault in the above is killing the first click on links *inside* the menu for some reason.
	// This forces it on the first click, but it's unpleasant.
	$('html.touch .site-nav .menu .has-megamenu .megamenu-content a').bind('touchend', function(e) {
		//console.log('Inside megamenu touched: ',$(this).attr('href'));
		window.location.href = $(this).attr('href');
	});
	$('html.touch .menu-blackout').on('click',function(e) {
		if (getCurrentBootstrapSize() == 'md' || getCurrentBootstrapSize() == 'lg') {
			closeMegamenu('.site-nav .menu .has-megamenu');
		}
	});

	$(window).on('resize',function() {
		// Desktop menu
		var li = $('nav.site-nav ul.menu li.active, nav.site-nav ul.menu li.pinned');
		if (li.length > 0) {
			positionMegamenuArrow(li);
		}
		// Small screen menu
		// iOS below 7 (or 6?) shows the address bar, which is considered a resize, so don't close the menu
		if (!window.cgu.ssMenuIsOpening) {
			closeSSMenu();
		}
	});

	$(window).on('orientationchange',function() {
		// Small screen menu
		closeSSMenu();
	});
	
    // Don't follow href="#" links
    $('a[href=#]').on('click',function(e) {
        e.preventDefault();
        return true;
    });

	// Handle static open dropdowns
	/* $('.megamenu .keep-open, .site-header .search-button').on('click',function() {
		$('nav.site-nav li').removeClass('pinned');
		$(this).parents('li').addClass('pinned');
	}); */
	
	/* SEARCH */
	if ($('.ss-header-search-button div.search-button').length < 1) {
		$('.ss-header-search-button input[type=submit]').wrap('<div class="search-button"></div>');
	}

	$('.site-header .search-button').on('click',function(event) {
		$('input.md-search').focus();
	});
	
    if ($('.search-results-wrapper').length) {
		$('.search-results-filter-tabs-input').on('change', function(evt, params) {
			$('.search-results-filter-tabs li').each(function() {
				if ($(this,'a').text() == params.selected) {
					$('.search-results-filter-tabs li').removeClass('active');
					$(this).addClass('active');
					openResults = $(this).data('show-results');
				}
			});
			$('div[data-results]').addClass('hide');
			$('div[data-results='+openResults+']').removeClass('hide');
		});
		$('.search-results-filter-tabs li').on('click', function(e) {
			$('.search-results-filter-tabs li').removeClass('active');
			$(this).addClass('active');
			var selectedTab = $(this,'a').text();
			$('.search-results-filter-tabs-input option').each(function() {
				if ($(this).val() == selectedTab) {
					$(this).prop('selected', true).trigger('chosen:updated')
				}
			});
			var openResults = $(this).data('show-results');
			$('div[data-results]').addClass('hide');
			$('div[data-results='+openResults+']').removeClass('hide');
		});
	}
	
	if ($('.business-landing-find-tailored-insurance').length) {
		$('#find-tailored-insurance-search-input-field').on('change keydown keyup blur focus',function(e) {
			if ($(this).val().length) {
				$('.business-landing-find-tailored-insurance .clear-button').show();
			} else {
				$('.business-landing-find-tailored-insurance .clear-button').hide();
			}
		});
		$('#find-tailored-insurance-search-input-field').on('keydown',function(e) {
			if (e.keyCode == 13) {
				// if the input and the first item in the select are an exact match, select the first item and execute it instead of submitting
				var currentInputItem = $('#find-tailored-insurance-search-input-field').val();
				var firstIndustryItem = $('.tt-dropdown-menu .tt-suggestions .tt-suggestion:first').text();
				// remove special characters and spaces
				currentInputItem = currentInputItem.replace(/[^a-zA-Z ]/g, "");
				firstIndustryItem = firstIndustryItem.replace(/[^a-zA-Z ]/g, "");
				currentInputItem = currentInputItem.replace(/\s+/g, '');
				firstIndustryItem = firstIndustryItem.replace(/\s+/g, '');
				currentInputItem = currentInputItem.toLowerCase();
				firstIndustryItem = firstIndustryItem.toLowerCase();
				if (currentInputItem == firstIndustryItem) {
					$('.tt-dropdown-menu .tt-suggestions .tt-suggestion:first').trigger('click');
				} else {
					$('.find-tailored-insurance-profession-tips, .find-tailored-insurance-profession, .find-tailored-insurance-container-top hr').hide();
					$('.find-tailored-insurance-container-bottom, .find-tailored-insurance-no-results').show();
				}
				return false;
			}
		});
		$('#find-tailored-insurance-search-input-field').on('keyup',function(e) {
			if (e.keyCode == 13) {
				$('#find-tailored-insurance-search-input-field').blur();
				return false;
			}
		});
		$('.business-landing-find-tailored-insurance .clear-button').click(function(e) {
			$('.find-tailored-insurance-search-input.tt-input, .find-tailored-insurance-search-input.tt-hint').val('');
			$('.business-landing-find-tailored-insurance .clear-button').hide();
		});
		var randomQS = Math.floor((Math.random() * 99999 * 321) + 1);
		var jsonPath = 'business-landing-find-tailored-insurance.json?'+randomQS;
		var countries = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			limit: 10,
			prefetch: {
				url: jsonPath,
				filter: function(list) {
					return $.map(list, function(country) { return { name: country }; });
				}
			}
		});
		countries.initialize();
		$('.find-tailored-insurance-search-input').typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		},{
			name: 'countries',
			displayKey: 'name',
			source: countries.ttAdapter()
		});
		$('.find-tailored-insurance-container-top .twitter-typeahead').on('typeahead:selected', function(jqObject,suggestionObject,objectDataset) {
			var selectedProfession = suggestionObject.name;
			// remove special characters
			selectedProfession = selectedProfession.replace(/[^a-zA-Z ]/g, "");
			// remove spaces
			selectedProfession = selectedProfession.replace(/\s+/g, '');
			selectedProfession = selectedProfession.toLowerCase();
			window.cgu.tailoredInsuranceProfession = selectedProfession;
			showTailoredInsuranceProfession();
		});
		function showTailoredInsuranceProfession() {
			$('.find-tailored-insurance-profession-tips, .find-tailored-insurance-profession, .find-tailored-insurance-container-top hr').hide();
			$('.find-tailored-insurance-container-bottom, .'+window.cgu.tailoredInsuranceProfession).show();
		}
	}



	if ($('.find-a-product-widget').length) {
		$('.find-a-product-search-input').on('change keydown keyup blur focus',function(e) {
			if($('.small-business-hub').length) {
				// if small business hub
			} else {
				if ($(this).val().length) {
					$('.search-input-container .clear-button').show();
				} else {
					$('.search-input-container .clear-button').hide();
				}
			}
			
		});
		$('.find-a-product-search-input').on('keydown',function(e) {
			if (e.keyCode == 13) {
				// if the input and the first item in the select are an exact match, select the first item and execute it instead of submitting
				var currentInputItem = $('#find-a-product-input-field').val();
				var firstIndustryItem = $('#search-suggestions ul li:first').text();
				// remove special characters and spaces
				currentInputItem = currentInputItem.replace(/[^a-zA-Z ]/g, "");
				firstIndustryItem = firstIndustryItem.replace(/[^a-zA-Z ]/g, "");
				currentInputItem = currentInputItem.replace(/\s+/g, '');
				firstIndustryItem = firstIndustryItem.replace(/\s+/g, '');
				currentInputItem = currentInputItem.toLowerCase();
				firstIndustryItem = firstIndustryItem.toLowerCase();
				if (currentInputItem == firstIndustryItem) {
					$('#search-suggestions ul li:first').trigger('click');
				} else {
					//$('.find-tailored-insurance-profession-tips, .find-tailored-insurance-profession, .find-tailored-insurance-container-top hr').hide();
					//$('.find-tailored-insurance-container-bottom, .find-tailored-insurance-no-results').show();
				}
				return false;
			}
		});
		$('.find-a-product-search-input').on('keyup',function(e) {
			if (e.keyCode == 13) {
				$('.find-a-product-search-input').blur();
				return false;
			}
		});
		$('.search-input-container .clear-button').click(function(e) {
			$('.find-a-product-search-input').val('');
			$('.search-input-container .clear-button').hide();
			$('.results-component').slideUp();
		});
		// Popular products links populate input
		$('a.popular-result').click(function(e) {
			e.preventDefault();
			var label = $(this).text();			
			$('#find-a-product-input-field').focus().typeahead('val', label).focus();
			$('.tt-dropdown-menu .tt-suggestions .tt-suggestion:first').trigger('click');
		});
		var randomQS = Math.floor((Math.random() * 99999 * 321) + 1);
		var productType = $('section.find-a-product-widget').data('product-type');
		var jsonPath = 'find-a-product-'+productType+'.json?'+randomQS;
		products = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			limit: 10,
			prefetch: {
				url: jsonPath,
				/* filter: function(list) {
					return $.map(list, function(input) { return { title: input.title }; });
				} */
			}
		});

		products.initialize();

		$('#find-a-product-input-field').typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		},{
			name: 'products',
			displayKey: 'title',
			source: products.ttAdapter()
		});
		$('.find-a-product-widget .search-component .twitter-typeahead').on('typeahead:selected', function(jqObject,suggestionObject,objectDataset) {
			showTailoredInsuranceProfession(suggestionObject);
		});
		function showTailoredInsuranceProfession(suggestionObject) {
			if (suggestionObject.referto) {
				var referringObject = suggestionObject;
				var suggestionObject = products.index.datums[eval(suggestionObject.referto-1)];

			}
			$('.results-component').removeClass('hide').slideDown();
			var title = suggestionObject.title;
			if (referringObject) {
				title = title+' for '+referringObject.title+'s';
			}
			$('.results-component .main-result-title').text(title);
			$('.results-component .main-result-blurb').html(suggestionObject.description);
			$('.results-component .main-result-image').attr('src',suggestionObject.image);
			$('.results-component .cta-find-an-adviser,.results-component .cta-more-information,.results-component .cta-get-a-quote').hide();

			if (referringObject) {
				$('.results-component h3.related-covers-heading').text('Other insurance cover for '+referringObject.title+'s...');
			} else {
				$('.results-component h3.related-covers-heading').text('Related covers...');
			}
			if (suggestionObject.calltoaction == "more-information") {
				$('.results-component .cta-more-information a.call-to-action-button').attr('href',suggestionObject.url);
				$('.results-component .cta-more-information').show();
			} else if (suggestionObject.calltoaction == "find-an-adviser") {
				//$('.results-component .cta-find-an-adviser a.call-to-action-button').attr('href',suggestionObject.url);
				$('.results-component .cta-find-an-adviser').show();
			} else if (suggestionObject.calltoaction == "get-a-quote") {
				$('.results-component .cta-get-a-quote').show();
			}
			$('.results-component .call').html(suggestionObject.description);

			$.each(suggestionObject.relatedcovers,function(index,value) {
				// get the object
				var related = products.index.datums[eval(value-1)];
				$('.results-component .related-cover-link-'+(index + 1)).attr('href',related.url);
				$('.results-component .related-cover-link-'+(index + 1)).text(related.title);
			});
			//$('.find-tailored-insurance-profession-tips, .find-tailored-insurance-profession, .find-tailored-insurance-container-top hr').hide();
			//$('.find-tailored-insurance-container-bottom, .'+window.cgu.tailoredInsuranceProfession).show();
		}
	}

	// PLACEHOLDERS
    $('input, textarea').auderoUnifiedPlaceholders({className:"placeholder-text",style:"#666666"});
   	$('form').on('submit',function() {
        $('input, textarea', $(this)).auderoUnifiedPlaceholders('disable');
    });

	
	// For Adviser Drop Down Menu
	$(".for-advisers").menuAim({
	     activate: openForAdvisers,  // fired on row activation
	     deactivate: closeForAdvisers,  // fired on row deactivation
	     exitMenu: exitForAdvisers,
	     submenuDirection: "below",
	     rowSelector: "> a",
	     activationDelay: 50
	 });
	function openForAdvisers(tt) { $('.for-advisers-dropdown').slideDown(); }
	function closeForAdvisers(tt) { setTimeout(function() { $('.for-advisers-dropdown').slideUp(); }, 200); }
	function exitForAdvisers(tt) { return true; }
	
	// Existing Customers Drop Down Menu
	$(".existing-customers").menuAim({
	     activate: openExistingCustomers,  // fired on row activation
	     deactivate: closeExistingCustomers,  // fired on row deactivation
	     exitMenu: exitExistingCustomers,
	     submenuDirection: "below",
	     rowSelector: "> a",
	     activationDelay: 50
	 });
	function openExistingCustomers(tt) { $('.existing-customers-dropdown').slideDown(); }
	function closeExistingCustomers(tt) { setTimeout(function() { $('.existing-customers-dropdown').slideUp(); }, 200); }
	function exitExistingCustomers(tt) { return true; }
	

	// Sitemap expandables in the footer
	$('.upper-footer a[data-open-sitemap]').click(function(e) {
		e.preventDefault();
		// Don't do anything if the visible on is clicked again
		if ($('.sitemap-box .container.'+$(this).data('open-sitemap')).is(':visible')) {
			$('.sitemap-box .container:visible').slideUp(500);
			$(this).removeClass('active');
			return;
		}
		var isSwitching = false;
		if ($('.sitemap-box .container:visible').length > 0) {
			$('.lower-footer').css('height',700);
			isSwitching = true;
		}
		$('.sitemap-box .container').hide();
		$('.sitemap-box .container.'+$(this).data('open-sitemap')).slideDown(500);
		$('.upper-footer a[data-open-sitemap]').removeClass('active');
		$(this).addClass('active');
		smoothScrollTo('footer .upper-footer',-90);
		if (isSwitching) {
			setTimeout(function() {
				$('.lower-footer').css('height','auto');
			}, 500);
		}
	});

	/* SCROLLING FEATURES */

	$('a[href=#]').click(function(e) {
		//e.preventDefault();
	});

	/* SMOOTH SCROLLING FOR INTERNAL LINKS */
    $('a[href*=#]:not([href=#]):not([data-toggle])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name="' + this.hash.slice(1) +'"]');

          //var additional = parseInt($('header.global-header').height())*-1;
          var additional = parseInt($('header.whole-header .site-header').height())*-1;
          if($(".cyber").length){
           	return false;
          }
          //if ($(this).hasClass('no-scrolling-offset')) additional = 0;
          if (isNaN(additional)) {
          	additional = 0;
          }
          if (target.length) {
            var offset = target.offset();
            $('html,body').animate({
              scrollTop: offset.top+additional
            }, 1000);
            return false;
          }
        }
    });

    // SMOOTH SCROLL TO ELEMENT 
    function smoothScrollTo(selector,additional) {
        var offset = $(selector+':first').offset();
        $('body').addClass('smoothScrolling');
        $('html,body').animate({
            scrollTop: offset.top+additional
            }, 1000);
        //$(window).trigger('scroll');
        $('body').removeClass('smoothScrolling');
    }

	// Scroll To Get Quote
	$('.more-info.get-a-quote a').click(function() {
		smoothScrollTo('.product_summary_wrap',-90);
	});

	function getCurrentBootstrapSize() {
        var wwidth = $(window).width();
        if (wwidth >= 1200) {
            return 'lg';
        } else if (wwidth >= 992) {
            return 'md';
        } else if (wwidth >= 768) {
            return 'sm';
        } else {
            return 'xs';
        }
    }




    // Live chat tray

	var livechat = $('.livechat-tray-container');
	var livechattab = livechat.find('.livechat-tray-tab');
	function updateBtnColor() {
		// Style livechat inserted
		if(!$('#lpButtonDiv').find('h4').length) {
			$('#lpButtonDiv').css('padding', '0');
			$('.tray-block.call').addClass('no-livechat');
		} else {
			$('#lpButtonDiv').attr('style', '');
			$('.tray-block.call').removeClass('no-livechat');
		}
	}

	livechattab.on('click', function(){
		var topHeight = $(window).scrollTop();
		if(livechat.hasClass('in')){
			livechat.removeClass('in').css('top', 0);
			$('body, html').removeClass('livechat-in');
			var top = $("body").position().top; 
           $("body").attr('style', '').scrollTop(-top);
           $('body').removeClass('blackout');
		} else {
			livechat.addClass('in');
			$('body, html').addClass('livechat-in');
			var top = $("body").scrollTop(); 
          	$("body").css('position','fixed').css('overflow','hidden').css('top',-top).css('width','100%').css('height',top+5000);
          	updateBtnColor();
		}
		
	});

	if (getCurrentBootstrapSize() == "xs") {
		$('.ss-header-livechat').on('click', function(){
		var topHeight = $(window).scrollTop();
		if(livechat.hasClass('in')){
			livechat.removeClass('in').css('top', 0);
			$('body, html').removeClass('livechat-in');
			
			var top = $("body").position().top; 
           	$("body").attr('style', '').scrollTop(-top);
		} else {
			livechat.addClass('in');
			$('body, html').addClass('livechat-in');
			var top = $("body").scrollTop(); 
          	$("body").css('position','fixed').css('overflow','hidden').css('top',-top).css('width','100%').css('height',top+5000);
          	$('body').addClass('blackout');
          	updateBtnColor();
		}
		
	});
	$('html.touch .menu-blackout').on('click',function(e) {	
			livechat.removeClass('in').css('top', 0);
			$('body, html').removeClass('livechat-in');
			$('body').removeClass('blackout');
			// $('.menu-blackout').css('opacity', 0);
		});
		$('.menu-blackout').on('touchmove', function(e){
			if($('.livechat-in').has($(e.target)).length) e.preventDefault();
			});
		$('html.livechat-in, body.livechat-in').on('touchmove', function(e) {
	        e.preventDefault();
		}, false);
	} else if(getCurrentBootstrapSize() == "sm"){
		$('html.touch .menu-blackout').on('click',function(e) {	
			livechat.removeClass('in').css('top', 0);
			$('body, html').removeClass('livechat-in');
			$('body').removeClass('blackout');

			// $('.menu-blackout').hide();
		});

		$('body').on('touchmove', function(e){
			if(livechat.hasClass('nochat') && livechat.hasClass('in')){
				e.preventDefault();
			}
			if($('.livechat-in').has($(e.target)).length) {
				e.preventDefault();
			}
		});
	} else {
		$('.menu-blackout').on('click',function(e) {	
			livechat.removeClass('in').css('top', 0);
			$('body, html').removeClass('livechat-in');
			$('body').removeClass('blackout');

		});
		$('body').on('touchmove', function(e){
			if(livechat.hasClass('nochat') && livechat.hasClass('in')){
				e.preventDefault();
			}
			if($('.livechat-in').has($(e.target)).length) {
				e.preventDefault();
			}

		});
	}


	
	// function fixBGonModalOpen() {
 //       $(window).on('shown.bs.modal', function() { 
 //          var top = $("body").scrollTop(); 
 //          $("body").css('position','fixed').css('overflow','hidden').css('top',-top).css('width','100%').css('height',top+5000);
 //        }).on("hidden.bs.modal", function () {
 //          var top = $("body").position().top; 
 //          $("body").css('position','relative').css('overflow','auto').css('top',0).scrollTop(-top).css('height', 'auto');
 //        });
 //    }

 
    // ADD BOOTSTRAP SIZE TO HTML ELEMENT
    function addBootstrapSize() {
        var bootstrapSize = getCurrentBootstrapSize();
        $('html').attr('data-bs-size',bootstrapSize);
    }
    addBootstrapSize();

	function detectLocationAnchor() {
		function maybeScrollToHash() {
			var hash_name = self.location.hash.slice(1);
			if (hash_name.length) {
				var target = $(self.location.hash);
				target = target.length ? target : $('[name="' + self.location.hash.slice(1) +'"]');
				if (target.length == 0) return;
				if (getCurrentBootstrapSize() == 'xs' || getCurrentBootstrapSize() == 'sm') {
					// 40 is a bit arbitrary and this whole thing should be tweaked. It was done in a hurry for the launch of this page.

					var newTop = $(target).offset().top - $('.ss-header').outerHeight() + 50;
				} else {
					var newTop = $(target).offset().top - $('.whole-header .site-header').outerHeight();
				}
				$('html,body').animate({
					scrollTop: newTop
				}, 100);
			}
		}
		$(self).bind('hashchange', function() {
			maybeScrollToHash();
		});
		maybeScrollToHash();
	}
	detectLocationAnchor();    

    // TRIGGER AN EVENT WHEN SHIFTING BETWEEN BREAKPOINTS
    $(window).on('resize',function() {
        var previousSize = $('html').attr('data-bs-size');
        var newSize = getCurrentBootstrapSize();
        var triggerName = '';
        if (previousSize != newSize) {
            var triggerName = 'bsResizeTo'+newSize;
            $('body').trigger('bsResize').trigger(triggerName);
        }
        addBootstrapSize();
        wrapTables();
    });
 
   	// HERO CAROUSEL ON LANDING PAGE CONTROLS
   	if ($('#hero-carousel .slider').length < 2) { $('#hero-carousel .carousel-controls').hide(); }
   	if ($('#hero-carousel-mob .slider').length < 2) { $('#hero-carousel-mob .carousel-controls').hide(); }
   	$('section.hero .carousel-pause').on('click',function() {
		var $carousel = $(this).closest('section.hero');
		$carousel.carousel('pause');
		$(this).hide();
   		$('.carousel-play',$carousel).css('display','inline-block');
   	});
   	$('section.hero .carousel-play').on('click',function() {
   		var $carousel = $(this).closest('section.hero');
   		$carousel.carousel('cycle');
   		$(this).hide();
   		$('.carousel-pause',$carousel).css('display','inline-block');
   	});

    // Custom polyfill for sticky
	// Check for position: (-webkit-)sticky support
	var vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-'],
		vendorListLength = vendorList.length,
		stickyElement = document.createElement('div'),
		supportsSticky = false;

	if (!isIE8) {
		for (var i = 0; i < vendorListLength; i++) {
			stickyElement.style.position = vendorList[i] + 'sticky';
			if (stickyElement.style.position != '') {
				supportsSticky = true;
			}
		}
	}

	function resetFixedItems() {
		$('.sticky').each(function() {
			$(this).css('width','').css('position','relative').css('left','').css('top','');
		});
	}

	function setupFixedItems() {
		$('.sticky').each(function() {
			// If it was set before, let's reset it
			if ($(this).data('stickyTop')) {
				$(this).css('width','').css('position','relative').css('left','').css('top','0');
			} else {
				var topValue = $(this).css('top');
				$(this).data('stickyTop',topValue).css('top','0');
			}

			// Setup scrolling events
			var elementOffset = $(this).offset();
			var fixedThreshold = elementOffset.top - parseInt($(this).data('stickyTop'));
			$(this).data('stickyThreshold',fixedThreshold);
			$(this).data('stickyLeft',elementOffset.left);
			$(this).data('stickyPreLeft',$(this).css('left'));
			$(this).data('stickyWidth',$(this).outerWidth(true));
			$(this).data('stickyPreWidth',$(this).outerWidth(true));
			$(this).data('stickyHeight',$(this).outerHeight(true));
		});
	}

	function positionFixedItems() {

		// If the scrollpoint is below the top offset, start shifting it
		$('.sticky').each(function() {
			// Get element offset
			var scrollPosY = getScrollY();
			if (scrollPosY+1 > $(this).data('stickyThreshold')) {
				$(this).css('position','fixed');
				// Check if we're going outside of the parent and freeze it
				var bottomOfParent = $(this).parent().offset().top+$(this).parent().outerHeight(true);
				var bottomOfSticky = parseInt($(this).data('stickyTop')) + $(this).data('stickyHeight') + scrollPosY;
				if (bottomOfParent <= bottomOfSticky) {
					$(this).css('top',(bottomOfParent - $(this).data('stickyHeight')) - scrollPosY);
				} else {
					$(this).css('top',$(this).data('stickyTop'));
				}
				$(this).css('left',$(this).data('stickyLeft')).css('width',$(this).data('stickyWidth'));
			} else {
				// We're above the offset, make normal sized
				$(this).css('position','relative').css('top','0').css('left','').css('width','');
			}
		});
	}


	if (!supportsSticky) {
		if (($('html').attr('data-bs-size') == 'md') || ($('html').attr('data-bs-size') == 'lg')) { 
			setupFixedItems();
			positionFixedItems();
		}
		$(window).resize(function() {
			if (($('html').attr('data-bs-size') == 'md') || ($('html').attr('data-bs-size') == 'lg')) { 
				setupFixedItems();
				positionFixedItems();
			} else {
				resetFixedItems();
			}
		});
		$(window).scroll(function() {
			if (($('html').attr('data-bs-size') == 'md') || ($('html').attr('data-bs-size') == 'lg')) { 
				positionFixedItems();
			}
		});

	}



    /* RETINA IMAGES */
    var dpr = 1;
    if(window.devicePixelRatio !== undefined) dpr = window.devicePixelRatio;
    if (dpr >= 2) {
        $('img[data-2x]').each(function() {
            $(this).attr('src',$(this).attr('data-2x'));
        });
    }

    /* FIX FOR FIXED HEADER ON IPAD */
    if (isIos) {
		$('input.sm-search, .ss-header-search-button .search-button').on('focus',function() {
			if (getCurrentBootstrapSize() == 'sm') {
				if ($('.set-landing-open').length > 0) {
					$('.ss-header').css('position','absolute').css('top','-125px');
				} else {
					$('.ss-header').css('position','absolute').css('top','-75px');
				}
			} else if (getCurrentBootstrapSize() == 'xs') {
				if ($('.set-landing-open').length > 0) {
					$('.ss-header').css('position','absolute').css('top','-155px');
				} else {
					$('.ss-header').css('position','absolute').css('top','-50px');
				}
			}
			$('body,html').scrollTop(0);
	    });

	    $('input.sm-search').on('blur',function() {
	    	$('.ss-header').css('position','fixed').css('top','0');
	    });
    }
   
	/* FIX FOR TABLES ENABLING HORIZONTAL SCROLLING IN SM/XS */
    function wrapTables() {
		if (getCurrentBootstrapSize() == 'sm' || getCurrentBootstrapSize() == 'xs') {
			$('.content-module table').each(function() {
				if (!$(this).parent().hasClass('table-responsive') && !$(this).hasClass('no-responsive-wrapper')) {
					$(this).wrap('<div class="table-responsive"></div>');
				}
			});
		}
    }
    wrapTables();

    /* BIG TABS */
    $bigTabs = $('.big-tabs');
    $('a',$bigTabs).click(function() {
    	$thisLi = $(this).parents('li');
    	$('li',$bigTabs).removeClass('active').find('a').attr('aria-selected','false');
    	$('section[data-big-tabs-id]').hide().attr('aria-hidden','true');
    	$('section[data-big-tabs-id='+$thisLi.data('big-tabs-show')+']').show().attr('aria-hidden','false');
    	$thisLi.addClass('active').find('a').attr('aria-selected','true');
    	if( $thisLi.hasClass('mini-tab') ) return false;
    	// smoothScrollTo('nav.big-tabs',-105);
    });
    // Load the correct Big Tab on launch
    $('a',$bigTabs).each(function() {
    	if ($('html').data('bs-size') == 'xs') return;
    	if (window.location.hash == $(this).attr('href')) {
    		$(this).trigger('click');
    	}
    });
    // Mini Tabs
    if( $('.mini-tabs').length ) {
	    $('.mobile-tab').on('click', function() {
	    	if( $(this).hasClass('open') ) return false;
	    	$('.mobile-tab.open').removeClass('open').next().hide();
	    	$(this).addClass('open').next().show();
	    	smoothScrollTo('.mobile-tab.open',-65);
	    });
	    $(window).on('bsResizeTosm bsResizeTomd bsResizeTolg',function() {
			$('.mini-tab-content .inner').show();
		});
		$(window).on('bsResizeToxs',function() {
			$('.mini-tab-content .inner').hide();
		}); 	
    }





    /* INDIVIDUAL PRODUCTS CAROUSEL */
    $('.jcarousel').jcarousel({
     	wrap: 'circular'
     });
 
    if ($('html').data('bs-size') !== 'xs') {
    	$('.jcarousel ul li:first-child').addClass('active');
    }

	$('.jcarousel-control-prev')
		.on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=1'
        });

	$('.jcarousel-control-next')
		.on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel').on('jcarousel:targetin', 'li', function(event, carousel) {
    	if ($('html').data('bs-size') == 'xs') return;
	    $('li',$('.jcarousel')).removeClass('active');
	    $(this).addClass('active');
	    $('.individual-covers-content').hide();
	    $('.individual-covers-content#'+$(this).data('show-individual-cover')).show();
	});

	$('.jcarousel li').click(function() {
		if ($('html').data('bs-size') == 'xs') return;
		$(this).parents('.jcarousel').jcarousel('scroll',$(this));
	});

	/* ARTICLES CAROUSEL ON BUSINESS LANDING PAGE */
	$(window).on('bsResizeToxs',function() {
		// Pause the carousel
		$('.article-carousel').bootstrapCarousel('pause');
		$(window).on('bsResizeTosm bsResizeTomd bsResizeTolg',function() {
			// Unpause the carousel
			$('.article-carousel').bootstrapCarousel('cycle');
		});

		/* SWITCH BUSINESS LANDING TAB WHEN MOVING TO XS  */
		$('nav.big-tabs li[data-big-tabs-show=products] a').click();

		/* REMOVE THE ACTIVE CLASS FROM THE COMBINED COVERS */
		$('.jcarousel ul li.active').removeClass('active');
	});

	/* PRODUCT GRID FOR XS - COPY THE BACKGROUND IMAGE TO A NEW ELEMENT */
	$('.xs-accordian [class*=product-tile]').each(function() {
		var backgroundImage = $(this).css('backgroundImage');
		$('.backface',$(this)).prepend('<div class="visible-xs product-image-for-xs" style="background-image:'+backgroundImage+';"></div>');
	});

	/* PRODUCT GRID FOR SM - WITH TOUCH DISABLE HOVER */
	$('html.touch div[class*=product-tile]').on('click',function() {
		if (getCurrentBootstrapSize() !== 'xs') {
			if ($(this).hasClass('touched')) {
				$(this).removeClass('touched');
			} else {
				$(this).closest('.product-grid').find('div[class*=product-tile]').removeClass('touched');
				$(this).addClass('touched');
				return false;
			}
		}
	});
	$('html.touch div[class*=product-tile] > a').on('click',function(e){
		if (getCurrentBootstrapSize() == 'sm') {
			e.preventDefault();
			//return false;
		}
	});

	/* OPEN / CLOSE DROPDOWNS FOR PRODUCT LIs ON BUSINESS LANDING PAGE */
	$('body').on('click','.xs-accordian .product-tile-1x1 > a:first-child, .xs-accordian .product-tile-1x2 > a:first-child, .xs-accordian .product-tile-2x2 > a:first-child',function(e) {
		if ($('html').attr('data-bs-size') != 'xs') return;
		e.preventDefault();
		var tile = $(this).closest('[class^=product-tile]');
		var groupOfTiles = $(this).closest('.xs-accordian');
		var alreadyActive = tile.hasClass('active');
		$('[class^=product-tile]',groupOfTiles).removeClass('active');
		if (!alreadyActive) {
			tile.addClass('active');
		}
	});

	$('.product_summary_wrap .content-bg').on('click', function(e){
		e.stopPropagation();
		// only active when XS display width
		if( $( 'html[data-bs-size="xs"]' ).length ) {
			if($(this).hasClass('open')){$(this).removeClass('open')}else{
				$('.content-bg.open').removeClass('open');
				$(this).addClass('open');
			}
		}
	});

	$('.xs-accordian').each(function() {
		$('[class^=product-tile]',this).last().addClass('last');
	});




	$('.existing-customers-xs-dropdown-link').click(function(e) {
		e.preventDefault();
		if ($('.existing-customers-xs-dropdown-content').is(':visible')) {
			$('.existing-customers-xs-dropdown-content').slideUp();
		} else {
			$('.existing-customers-xs-dropdown-content').slideDown();
		}
	});
	
	// Initiate onload
	if ($('html').attr('data-bs-size') != 'xs') {
		$('.article-carousel').bootstrapCarousel();
	}


	/* CONTACT US MAP */
	if ($('#contact-us-map').length) {
		// Load the Google Maps js
		var script = document.createElement('script');
	    script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=contactUsMapInit";
	    document.body.appendChild(script);

	    if ($('html').attr('data-bs-size') == "xs") {
	    	var zoomLevel = 3;
	    } else {
	    	var zoomLevel = 4;
	    }
	    window.contactUsMapInit = function contactUsMapInit() {
	    	var map;
	    	var mapOptions = {
	          center: new google.maps.LatLng(-26.588527, 134.252930),
	          zoom: zoomLevel
	        };

	        map = new google.maps.Map(document.getElementById("contact-us-map"), mapOptions);

	        var branches = [
		    	{title:"Adelaide",lon:-34.926821,lat:138.603269,content:"<h5>Adelaide</h5> 80 Flinders Street<br />Phone <span class='phone-number'>13 24 81</span><br /> Fax 1300 349 283<br />Hours 8:30am to 5:00pm"},
		    	{title:"Sydney",lon:-33.868118,lat:151.207269,content:"<h5>Sydney – Corporate</h5> (Admin only)<br />Level 14, 388 George Street<br /> Phone <span class='phone-number'>13 24 81</span><br /> Fax 1300 349 283<br />Hours 8:30am to 5:00pm"},
		    	{title:"Newcastle",lon:-32.929326,lat:151.783838,content:"<h5>Newcastle</h5> 3rd Floor, The Metro<br />Cnr Scott & Watt Streets<br />Phone <span class='phone-number'>(02) 4935 7100</span><br /> Fax 1300 349 283<br />Hours 8:30am to 5:00pm"},
		    	{title:"Melbourne",lon:-37.8149780,lat:144.9578090,content:"<h5>Melbourne</h5> CGU Centre<br />181 William Street<br />Phone <span class='phone-number'>13 24 81</span><br /> Fax 1300 349 283<br />Hours 8:30am to 5:00pm"},
		    	{title:"Brisbane",lon:-27.4802908,lat:153.0226609,content:"<h5>Brisbane</h5> 189 Grey Street South Bank<br />Phone <span class='phone-number'>13 24 81</span><br /> Fax 1300 349 283<br />Hours 8:30am to 5:00pm"},
		    	{title:"Perth",lon:-31.950171,lat:115.842171,content:"<h5>Perth</h5> 46 Colin Street<br />Phone <span class='phone-number'>13 24 81</span><br /> Fax 1300 349 283<br />Hours 8:30am to 5:00pm"},
		    	{title:"Hobart",lon:-42.885521,lat:147.325363,content:"<h5>Hobart</h5> 188 Collins Street<br />Phone <span class='phone-number'>13 24 81</span><br /> Fax 1300 349 283<br />Hours 8:30am to 5:00pm"}
		    	];

		    var infoWindow = new google.maps.InfoWindow(), marker, i;

		    // Place the markers on the map
		    for( i = 0; i < branches.length; i++ ) {
		        marker = new google.maps.Marker({
		            position: new google.maps.LatLng(branches[i].lon, branches[i].lat),
		            map: map,
		            title: branches[i].title
		        });
		        
		        // Allow each marker to have an info window    
		        google.maps.event.addListener(marker, 'click', (function(marker, i) {
		            return function() {
		                infoWindow.setContent('<div class="info-window">'+branches[i].content+'<br />&nbsp;</div>');
		                infoWindow.open(map, marker);
		            }
		        })(marker, i));
		    }
	    }
	}

	// Add some styling things to the map	
	$('.map-container, #faa_googleMap_container').append('<i class="map-shadow-top"></i><i class="map-shadow-right"></i><i class="map-shadow-bottom"></i><i class="map-shadow-left"></i>');

	// Show the correct branches tab when linked from the Megamenu
    /* $('').each(function() {

    	if ($('html').data('bs-size') == 'xs') return;
    	if (window.location.hash == $(this).attr('href')) {
    		$(this).trigger('click');
    	}
    }); */

	/* GENERIC ACCORDIAN BEHAVIOUR */
	$('.accordian').on('click','ul li h4, ul li .open-accordian',function(e) {
		var isAlreadyActive = $(this).parents('li').hasClass('active');
		$('ul li.active .inside').slideUp();
		$('ul li').removeClass('active');
		if (!isAlreadyActive) {
			$(this).parents('li').addClass('active');
			$(this).parents('li').find('.inside').slideDown();
		}
	});
	// hide first if mobile
	if(getCurrentBootstrapSize() === 'xs') {
		$('.accordian ul li:first-child').removeClass('active').find('.inside').hide();
	}
	
	/* SMALL SCREEN MENU */
	
	window.cgu.ssMenuIsOpening = false;
	
	$('html').addClass('mm-front');

	function closeSSMenu() {
		$('#ss-menu').trigger('close.mm');
	}
	
	$('#ss-menu').mmenu({
		slidingSubmenus: false
		}, {
		pageNodetype: "form" /* (for the Kentico <form> wrapper) */
	});
	
	$('.ss-header-menu-button').on('click',function() {
		$('#ss-menu').trigger('open.mm');
	});
	
	$('#ss-menu').on('open.mm',function() {
		$('body').addClass('blackout');
		window.cgu.ssSMSubSelection = '';
		// get the blocker into the right position after scrolling now that it's inside .mm-page
		$('#mm-blocker').css('top',$('.mm-page').scrollTop());
		$('#ss-menu').append('<button class="close-menu-button"></button>');
	});
	
	$('#ss-menu').on('opening.mm',function() {
		window.cgu.ssMenuIsOpening = true;
	});

	function setSMLabelClick() {
		$('#ss-menu > ul > li > ul > li > a.ss-link').each(function() {
			if ($(this).attr('href') == '#') {
				$(this).attr('href','_#');
			}
		});
		// At sm size, open green ss-sm-megamenu when level 2 buttons (text or arrows) are clicked.
		$('#ss-menu a.ss-link, #ss-menu > ul > li > ul > li > a.ss-link').unbind('click');
		$('#ss-menu > ul > li > ul > li > a.ss-link').on('click',function(e) {
			// If it has no data-megamenu, allow the default link
			if ($(this).parent().data('megamenu')) {
				var smPreviousSelection = window.cgu.ssSMSubSelection;
				var smNextSelection = $(this).parent().data('megamenu');
				if (smNextSelection !== smPreviousSelection) {
					window.cgu.ssSMSubSelection = smNextSelection;
					// Hide .ss-sm-megamenu behind the right edge of #ss-menu
					$('.ss-sm-megamenu').hide().css('left','-'+($('.ss-sm-megamenu').outerWidth() - $('#ss-menu').outerWidth())+'px');
					$('#ss-sm-megamenu-'+smNextSelection).animate({
						left: $('#ss-menu').outerWidth()+'px'
					}, 200);
					$('#ss-sm-megamenu-'+smNextSelection).show();
					// reset selected class before setting
					$('#ss-menu li').removeClass('ss-sm-selected');
					$('#ss-menu ul').removeClass('ss-sm-selected-first');
					$(this).parent().addClass('ss-sm-selected');
					// Check whether it's the first LI, make the arrow green if it is
					if ($(this).parent().is(':first-child')) {
						$(this).parent().parent().addClass('ss-sm-selected-first');
					}
				}
		        e.preventDefault();
		        return true;
			}
		});
	}

	function setXSLabelClick() {
		$('#ss-menu a.ss-link, #ss-menu > ul > li > ul > li > a.ss-link').unbind('click');
		$('#ss-menu .ss-link').each(function(ii) {
			if ($(this).attr('href') == '#') {
				$(this).attr('href','_#');
				if ($(this).prev().hasClass('mm-subopen')) {
					$(this).on('click',function(e) {
						$(this).prev().trigger('click');
						e.preventDefault();
		        		return true;
					});
				}
			}
		});
		$('#ss-menu ul > li a.active').each(function(ii) {
			if ($(this).parent().is(':first-child')) {
				$(this).parent().parent().addClass('ss-sm-active-first');
			}
		});
	}

	$('#ss-menu').on('opened.mm',function() {
		window.cgu.ssMenuIsOpening = false;
		/* Set height of shadow to match the menu. + 120px allows for top: -60px to hide the corners. */
		$('.ss-menu-shadow').height($('#ss-menu').height() + 120).fadeIn();
		// Rewrite # links for unreleased pages
		// For now, make only level 2 # links in sm switch to _# so that they open the green panel
		if (getCurrentBootstrapSize() == 'sm') {
			setSMLabelClick();
		}
		// For now, make all # links in xs switch to the same link as its previous sibling (mm-subopen, if there is one), so that it opens the submenu or does nothing
		if (getCurrentBootstrapSize() == 'xs') {
			setXSLabelClick();
		}
	});
	
	$('#ss-menu').on('close.mm',function() {
		$('body').removeClass('blackout');
		$('.ss-menu-shadow').hide();
		// reset selected class so it doesn't show up at other breakpoints
		$('#ss-menu li').removeClass('ss-sm-selected');
		$('#ss-menu ul').removeClass('ss-sm-selected-first');
		// Hide ss-megamenu at all sizes, in case it was open before a resize
		$('.ss-sm-megamenu').hide();
	});
	
	$('#ss-menu').on('closed.mm',function() {
		// Reset opened submenus so that only corresponding top level item is open when opening the menu again (also so that the previously opened submenu from xs isn't open at sm size
		$('#ss-menu ul li').removeClass('mm-selected mm-opened').eq(1).addClass('mm-selected mm-opened');
		// rewrite # links between sm and xs states (can probably be removed after some testing)
		$('#ss-menu .ss-link, #ss-menu > ul > li > ul > li > a.ss-link').each(function() {
			if ($(this).attr('href') == '_#') {
				$(this).attr('href','#');
			}
		});
	});
	
	$('#ss-menu .cgu-logo').on('click',function() {
		window.location.href = "http://cgu.com.au/";
	});
	
	/* X close button at top right of the small screen menu */
	$('#ss-menu').on('click', '.close-menu-button' ,function(e) {
		console.log('clicked');
		closeSSMenu();
		// immediately reopen first level UL, because the default for that subopen is to close it when it's open
		$('#ss-menu ul li').eq(2).addClass('mm-selected mm-opened');
        e.stopImmediatePropagation();
        return false;
	});
	

	// Header search button on small screen
	$('.ss-header-search-button .search-button').on('click',function(event) {
		// For tablet (sm)...
		if ($('html').attr('data-bs-size') == 'sm') {
			var $container = $(this).closest('.ss-header-search-button');
			if ($('input.sm-search',$container).val() == '') {
				$('input.sm-search').focus();
				event.preventDefault();
			}
		}
		// For small (xs)...
		if ($('html').attr('data-bs-size') == 'xs') {
			var $container = $(this).closest('.ss-header-search-button');
			// When open, check the value
			if ($container.hasClass('search-open')) {
				if ($('input.sm-search').val() == '') {
					$('input.sm-search').focus();
					event.preventDefault();
				}
			} else {
				// Closed, so open the input
				$('.ss-header-container').addClass('xs-search-open');
				$('body').addClass('blackout');
				$container.addClass('search-open');
				$('input.sm-search').focus();
				event.preventDefault();
			}
		}
	});
	$('.ss-header-search-button i.close-search-button').on('click',function() {
		$('.ss-header-container').removeClass('xs-search-open');
		$('.ss-header-search-button').removeClass('search-open');
		$('body').removeClass('blackout');
	});

	/* DASHBOARD */

	$('.dash_nav a').on('click',function() {
		if($(this).parent().parent().hasClass('float_dash_nav')) {
			$('.float_dash_nav').addClass('off');	
			$('#dashboard').modal();		
		}
		$('#dashboard section').hide();
		var dashSection = $(this).parent().attr('data-section');
		$('#dashboard').find('.'+dashSection).show();
		$('#dashboard .dash_nav li.active').removeClass('active');
		$('#dashboard .dash_nav li[data-section="'+dashSection+'"]').addClass('active');
	});

	$('#dashboard').on('hidden.bs.modal', function (e) {
		$('.float_dash_nav').removeClass('off');
	});


	/* FORMS RELATED JS */

	function initiCheck() {
	    $('.radio-box').on('click',function(e) {
	        var inputradio = $(this).find('input[type=radio]');
	        inputradio.trigger('click change');
	        inputradio.blur();
	        inputradio.focus();
	        inputradio.blur();
	        //e.preventDefault();
	    }); 
	    $('.radio-box input').on('click',function(e) {
			//e.stopPropagation();
	    });
		$('.radio-box input').on('change',function(e) {
			var $radiobox = $(this).closest('.radio-box');
			var inputname = $(this).attr('name');
			$('.radio-box input[name='+inputname+']').closest('.radio-box').removeClass('active');
			$radiobox.addClass('active');
		});
		$('.radio-box input:checked').each(function() {
			var $radiobox = $(this).closest('.radio-box');
			$radiobox.addClass('active');
			if ($radiobox.data('show-dropdown')) {
				$('.form-dropdown#'+$radiobox.data('show-dropdown')).show();
			}
		});

		// iCheck activation and setup
		$('#blog-search input[type=radio], label:not(.no-replace):not(.radio-box) input[type=radio],label:not(.no-replace) input[type=checkbox], .form-page input[type=radio], .form-page input[type=checkbox], .connect-to-xero-form input[type=checkbox],.connect-to-xero-form input[type=radio]').icheck({
	        checkboxClass: 'icheckbox',
	        radioClass: 'iradio'
	    });
	    // Fix for iCheck when nested inside label 
	    $('.icheckbox, .iradio').on('click',function(e) {
	    	if ($(this).closest('.form-page').length == 0 && $(this).closest('.connect-to-xero-form').length == 0 && $(this).parents('#blog-search').length == 0) {
	    		e.stopPropagation();
	    		console.log('Fix');
	    	}

	    });
	}

	initiCheck();
 
 	// Form dropdown/reveal boxes (divs, not selects)
 	$('.radio-box[data-show-dropdown]').on('change',function() {
 		var inputname = $(this).find('input').attr('name');
 		var dropdownId = $(this).data('show-dropdown');
 		$('.radio-box[data-show-dropdown] input[name='+inputname+']').each(function() {
 			var hideDropdownId = $(this).parents('.radio-box[data-show-dropdown]').data('show-dropdown');
 			if (hideDropdownId != dropdownId) $('.form-dropdown#'+hideDropdownId).hide();
 		});
 		$('.form-dropdown#'+dropdownId).show();
 	});

 	// Reveal field div when a checkbox is ticked
 	$('.toggle-fields').on('change',function() {
 		var fieldName = $(this).attr('name');
 		if ($(this).is(':checked')) {
 			$('div[data-show-when-active='+fieldName+']').slideDown(300);
 		} else {
 			$('div[data-show-when-active='+fieldName+']').slideUp(300);
 		}

 	});


	/* CUSTOM SELECT DROPDOWN BOXES USING CHOSEN (JQUERY PLUGIN) */
    // Don't load chosen if Windows phone
    function initChosen() {
	    var loadChosen = true;
	    var winPhone = navigator.userAgent.match(/Windows Phone/i);
	    if (winPhone) loadChosen = false;
	    var winPhone = navigator.userAgent.match(/iemobile/i);
	    if (winPhone) loadChosen = false;
	    if (isIphone) loadChosen = false;
	    
	    if (loadChosen) {
	       $('select:not(.no-replace):not(.chosen-with-search)').chosen({
	            disable_search_threshold: 999,
	            width: '100%',
	            display_disabled_options: false,
	            display_selected_options: false
	        });
	        $('select.chosen-with-search:not(.no-replace)').chosen({
	            width: '100%',
	            display_disabled_options: false,
	            display_selected_options: false
	        });

	    } else if(!isIphone) {
	    	// Add markup for dropdown indicators
	    	$('select').wrap('<div class="native-select-wrapper"></div>');
	    	$('.native-select-wrapper').append('<span class="native-select-arrow"></span>');
	    }
	}
	initChosen();

	// Useful for when the form content is reloaded via AJAX
	$('body').on('restyleForms', function() {
		// initChosen();
		initiCheck();
		initCustomFileInput();
		initDatepicker();
	});

	// Restyle forms when the UpdatePanel is refreshed
	if (typeof Sys !== "undefined") {
		var prm = Sys.WebForms.PageRequestManager.getInstance();
		prm.add_endRequest(function() {
		    $('body').trigger('restyleForms');
		});
	}
    
    /* IN IE8 , INSERT SPANS TO DISPLAY PSEUDO-ELEMENTS IN INPUT-CONTAINERS */
    if (isIE8) {
        $('.input-container.select').each(function() {
            if ($(this).find('.chosen-container').length > 1) {
                $(this).append('<span class="icon-triangle"></span>');
                $(this).find('.icon-triangle').on('click',function() {
                    $(this).siblings('.chosen-container').click();
                });
            }
        });
    }
    
    // Fix for when CHOSEN is NOT activated in newer browsers (which need the arrow)

    // if (!isIE8) {
    //     $('.input-container.select').each(function() {
    //         if ($(this).find('.chosen-container').length < 1) {
    //             var $select = $(this).find('select');
    //             $select.wrap('<span class="select-lookalike-wrapper"></span>');
    //             $select.addClass('transparent');
    //         }
    //     });
    // }


    // Fix up the icon when Chosen is turned on for newer browsers (this fixes the clickability of it)
    //if (!ie8) {
    $('.input-container.select').each(function() {
        if ($(this).find('.chosen-container').length > 0) {
            $(this).append('<span class="icon-triangle"></span>');
            $(this).find('.icon-triangle').on('click',function() {
                $(this).siblings('.chosen-container').click();
            });
            $(this).addClass('no-triangle');
        }
    });

    /* FILE UPLOAD FIELDS */
    function initCustomFileInput() {
	    $('input[type=file]').customFileInput(); // Commented out until fix found to work with CMS form generator
	    $('.customfile').closest('label').addClass('customfile-label');
	    $('.customfile').before('<br />');
	    
	    // Add file size limit handling
	    $('input[type=file]').on('change', function() {
	    	if ( window.FileReader && window.File && window.FileList && window.Blob ) {
	    		if (typeof this.files == "undefined" || this.files.length < 1) return;
				var filesize = this.files[0].size;
				if (filesize > 5242880) {
					// Larger than 5MB
					if ($('span[id$="_AttachmentWarning_lb"]').length > 0) {
						$('span[id$="_AttachmentWarning_lb"]').addClass('attachment-warning').show().text('Please ensure the attachment is 5MB or less.');
						// Clear the input
						$(this).wrap('<form>').closest('form').get(0).reset();
						$(this).unwrap().trigger('change');
					}
				} else {
					// 5MB or smaller
					if ($('span[id$="_AttachmentWarning_lb"]').length > 0) {
						$('span[id$="_AttachmentWarning_lb"]').hide();
					}
				}
			}
	    });
	    

	}
	initCustomFileInput();

    /* DATEPICKER */
    function styleDatepickerMenus() {
    	if (!$('.native-select-wrapper').length) {
	    	$('.ui-datepicker select.ui-datepicker-month').wrap('<div class="native-select-wrapper month"></div>');
	    	$('.ui-datepicker select.ui-datepicker-year').wrap('<div class="native-select-wrapper year"></div>');
	    	$('.ui-datepicker .native-select-wrapper').append('<span class="native-select-arrow"></span>');
	    }
    }

    function initDatepicker() {
	    if (isHandheld) {
			if ($('.phone-number').length) {
				$('.phone-number').each(function() {
					var phoneNumber = $(this).text();
					$(this).wrap('<a href="tel:'+phoneNumber+'" class="phone-number-a"></a>');
				});
			}
	    	$('fieldset.date input[type=number]').on('focus',function() {
	    		var $fieldset = $(this).closest('fieldset.date');
	    		//$(this).blur();
	    		$('input.hidden-date',$fieldset).trigger('focus');
	    	});
	    	$('input.hidden-date').on('change',function() {
	    		var dateText = $(this).val();
	    		var dateArr = dateText.split('-');
	    		var $fieldset = $(this).closest('fieldset.date');

	    		$('.date-day input',$fieldset).val(dateArr[2]);
	    		$('.date-month input',$fieldset).val(dateArr[1]);
	    		$('.date-year input',$fieldset).val(dateArr[0]);
	    	});
	    	$('fieldset.date label.date-year input[type=number]').after('<button type="button" class="ui-datepicker-trigger"></button>');
	    } else {

	    	// Craavan Quote form - datepicker restricted to 90days 

			$('.date-year input#edit-submitted-proposed-policy-start-date-year').datepicker({
		    	showOn: 'button',
		    	changeMonth: true,
		    	changeYear: true,
		    	dateFormat: 'dd/mm/yy',
		    	yearRange: "1900:+5",
		    	buttonText: '',
		    	maxDate: "+90d",
		    	minDate: 0,
		    	monthNamesShort: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		    	onSelect: function(dateText, inst) { 
	                dateArr = dateText.split('/');
	                var $dateFieldset = $(this).closest('fieldset.date');
	                $('.date-day input',$dateFieldset).val(dateArr[0]);
	                $('.date-month input',$dateFieldset).val(dateArr[1]);
	                $('.date-year input',$dateFieldset).val(dateArr[2]);
	                $('input.hidden-date',$dateFieldset).val(dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0]);
	            },
	            onChangeMonthYear: function(year, month, inst) {
	                // Update the date with the new month/date selection
	                var $dateFieldset = $(this).closest('fieldset.date');
	                var day = $('.date-day input',$dateFieldset).val();
	                var dateText = day+"/"+month+"/"+year;
	                $(this).datepicker("setDate",dateText);
	                $('.date-day input',$dateFieldset).val(day);
	                $('.date-month input',$dateFieldset).val(month);
	                $('.date-year input',$dateFieldset).val(year);
	                $('input.hidden-date',$dateFieldset).val(year+'-'+month+'-'+day);
	                setTimeout(function() {
	                    styleDatepickerMenus();
	                },10);
	            }
		    }).on('change', function() {
        $(this).valid();  // triggers the validation test
        // '$(this)' refers to '$("#datepicker")'
    });

 			// all other datepickers
		    $('.date-year input').datepicker({
		    	showOn: 'button',
		    	changeMonth: true,
		    	changeYear: true,
		    	dateFormat: 'dd/mm/yy',
		    	yearRange: "1900:+5",
		    	buttonText: '',
		    	monthNamesShort: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		    	onSelect: function(dateText, inst) { 
	                dateArr = dateText.split('/');
	                var $dateFieldset = $(this).closest('fieldset.date');
	                $('.date-day input',$dateFieldset).val(dateArr[0]);
	                $('.date-month input',$dateFieldset).val(dateArr[1]);
	                $('.date-year input',$dateFieldset).val(dateArr[2]);
	                $('input.hidden-date',$dateFieldset).val(dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0]);
	            },
	            onChangeMonthYear: function(year, month, inst) {
	                // Update the date with the new month/date selection
	                var $dateFieldset = $(this).closest('fieldset.date');
	                var day = $('.date-day input',$dateFieldset).val();
	                var dateText = day+"/"+month+"/"+year;
	                $(this).datepicker("setDate",dateText);
	                $('.date-day input',$dateFieldset).val(day);
	                $('.date-month input',$dateFieldset).val(month);
	                $('.date-year input',$dateFieldset).val(year);
	                $('input.hidden-date',$dateFieldset).val(year+'-'+month+'-'+day);
	                setTimeout(function() {
	                    styleDatepickerMenus();
	                },10);
	            }
		    }); 



		    // Add select styling wrappers around the datepicker dropdowns
		    $('.ui-datepicker-trigger').on('click',function() {
		    	styleDatepickerMenus();
		    });
		}

		// On change of input fields directly, update the hidden input {
		$('fieldset.date input').on('focusout',function() {
			var dateText = $(this).val();
			var dateArr = dateText.split('-');
			var $fieldset = $(this).closest('fieldset.date');

			var day = $('.date-day input',$fieldset).val();
			if (day.length == 1) day = '0'+day;
			var month = $('.date-month input',$fieldset).val();
			if (month.length == 1) month = '0'+month;
			var year = $('.date-year input',$fieldset).val();

			$('input.hidden-date',$fieldset).val(year+'-'+month+'-'+day);
		});

		// Advance to the next field when you put in the number of characters in the datepicker
		$('fieldset.date input[type=number]').on('keyup',function(e) {
			if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106)) {
				if ($(this).parent().hasClass('date-day')) {
					if ($(this).val().length == 2) {
						$(this).closest('fieldset.date').find('.date-month input').focus();
					}
				} else if ($(this).parent().hasClass('date-month')) {
					if ($(this).val().length == 2) {
						$(this).closest('fieldset.date').find('.date-year input').focus();
					}
				}
			}
		});
	}
	initDatepicker();




	/* FORM VALIDATION USING PARSLEY.JS */
	$('form').parsley({
		successClass: 'validation-okay',
		errorClass: 'validation-error',
		errors: {
			classHandler: function (elem, isRadioOrCheckbox) {
				return $(elem).closest('label');
			}
		},
		listeners: {
			onFormValidate: function(isFormValid, event, ParsleyForm) {
				// Show the failed validation box
				if (!isFormValid) {
					var form = ParsleyForm.$element[0];
					$('.failed-validation-message',form).show();
					//event.stopImmediatePropagation();
				}
			}
		}
	});

	/*  FULL LINK TARGET  */
	$('.full-link-target').click(function(e) {
		var $link = $('a',$(this))
		$link.click(function(e) {
			e.stopImmediatePropagation();
		});
		$link[0].click();
	});

	if ($('.forms-and-downloads:not(.full-width)').length) {
		$('.forms-and-downloads li:nth-child(odd)').addClass('odd');
	}

	equalheight = function(container){

		var currentTallest = 0,
		     currentRowStart = 0,
		     rowDivs = new Array(),
		     $el,
		     topPosition = 0;
		 $(container).each(function() {

		   $el = $(this);
		   $($el).height('auto')
		   topPostion = $el.position().top;

		   if (currentRowStart != topPostion) {
		     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		       rowDivs[currentDiv].height(currentTallest);
		     }
		     rowDivs.length = 0; // empty the array
		     currentRowStart = topPostion;
		     currentTallest = $el.height();
		     rowDivs.push($el);
		   } else {
		     rowDivs.push($el);
		     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		  }
		   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		     rowDivs[currentDiv].height(currentTallest);
		   }
		});
	}

	removeBorderFromLastRow = function(container, element){
		$(element,container).removeClass('no-border');
		$(container).each(function() {
			var numberOfElements = $(element,this).length;
			var numberPerRow = 3;
			if ($('html').attr('data-bs-size') == 'sm') numberPerRow = 2;
			if ($('html').attr('data-bs-size') == 'xs') numberPerRow = 1;

			var leftOverElements = numberOfElements%numberPerRow;
			if ($('html').attr('data-bs-size') == 'xs') {
				$(element+':last-child',this).addClass('no-border');
			} else {
				$(element,this).slice(leftOverElements*-1).addClass('no-border');
			}
		});
	}

	// EQUAL HEIGHT FORM DOWNLOAD BOXES
	if ($('.full-width.forms-and-downloads').length) {
	
		equalheight('.full-width.forms-and-downloads li');
		removeBorderFromLastRow('.full-width.forms-and-downloads','li');
		
		$(window).on('bsResizeTolg bsResizeTomd bsResizeTosm', function(){
			equalheight('.full-width.forms-and-downloads li');
			removeBorderFromLastRow('.full-width.forms-and-downloads','li');
		});
		$(window).on('bsResizeToxs', function(){
			$('.full-width.forms-and-downloads li').height('auto');
			removeBorderFromLastRow('.full-width.forms-and-downloads','li');
		});
	}

	// EQUAL HEIGHT FOR RELATED PRODUCTS WIDGET
	if ($('.related-products').length > 0) {

		equalheight('.related-products > div');
		
		$(window).on('bsResizeTolg bsResizeTomd bsResizeTosm', function(){
			equalheight('.related-products > div');
		});

		$(window).on('bsResizeToxs', function() {
			$('.related-products > div').height('auto');
		});
	}

	// OUR PEOPLE EQUAL HEIGHTS
	if ($('.our-people').length) {
		equalheight('.our-people li');
		$(window).on('bsResizeTolg bsResizeTomd bsResizeTosm', function(){
			equalheight('.our-people li');
		});
		$(window).on('bsResizeToxs', function(){
			$('.our-people li').height('auto');
		});
	}

	// OUR LEADERSHIP, ADD FALLBACK ODD CLASS
	if ($('.our-leadership').length) {
		$('.our-leadership .col-sm-6:even').addClass('even');
	}

	// FIT VID 
	$(".content-module").fitVids();

	// IE8 SUPPORT FOR BACKGROUND-SIZE: COVER 
	// $.expr[':'].css = function(obj, index, meta, stack) {
	//     var args = meta[3].split(/\s*=\s*/);
	//     return $(obj).css(args[0]) == args[1];
	// }
	//$("div:css(background-size=cover)").attr('style','background: red;');


	/* [START] QUALIFY LEAD SCRIPT */
	if ($('.qualify-lead-form').length > 0) {
		$('.side-notes.collapsed-version h2').on('click',function() {
			var $parent = $(this).closest('.side-notes');
			if ($parent.hasClass('open')) {
				$parent.removeClass('open');
				$('.inner-content',$parent).slideUp();
			} else {
				$parent.addClass('open');
				$('.inner-content',$parent).slideDown();
			}
		});

		// Product dropdowns		
		$('select.product-level-1').on('change',function() {
			$('select.product-level-2').closest('div[class^=col-xs-]').removeClass('hide');
			var productoption = $('option:selected',$(this)).attr('id');
			$('select.product-level-2 option').removeAttr('disabled');
			$('select.product-level-2 option:not([id^="'+productoption+'"])').attr('disabled',true);
			if ($('select.product-level-2 option:selected').attr('disabled')) {
				$('select.product-level-2 option:first').prop('selected',true);
				$('select.product-level-3 option:not(:first)').attr('disabled',true);
				$('select.product-level-3 option:first').removeAttr('disabled').prop('selected',true);
				$('select.product-level-3').trigger('chosen:updated');
			}
			$('select.product-level-2').trigger('chosen:updated');
		});

		$('select.product-level-2').on('change',function() {
			$('select.product-level-3').closest('div[class^=col-xs-]').removeClass('hide');
			var productoption = $('option:selected',$(this)).attr('id');
			$('select.product-level-3 option').removeAttr('disabled');
			$('select.product-level-3 option:not([id^="'+productoption+'"])').attr('disabled',true);
			if ($('select.product-level-3 option:selected').attr('disabled')) $('select.product-level-3 option:first').prop('selected',true);
			$('select.product-level-3').trigger('chosen:updated');
		});

		var preselected_option_1 = $('select.product-level-1 option:selected').attr('id');
		if ($('select.product-level-1 option:selected').attr('id').length && preselected_option_1.length > 0) {
			$('select.product-level-1').trigger('change');
		}
		var preselected_option_2 = $('select.product-level-2 option:selected').attr('id');
		if ($('select.product-level-2 option:selected').attr('id').length && preselected_option_2.length > 0) {
			$('select.product-level-2').trigger('change');
		}

	}
	/* [END] QUALIFY LEAD SCRIPT */


	/* [START] WORKERS COMP SCRIPT */
	if ($('.workers-comp-pre-landing-form').length > 0) {
		var $container = $('.workers-comp-pre-landing-form');
		var $button = $('a.button',$container);

		$button.on('click',function(e) {
			var pass = true;
			var message = '';

			// Clear existing message
			$('.workers-comp-choice-validation-msg',$container).remove();
			$('.workers-comp-choices',$container).removeClass('validation-error');
			$('.workers-comp-choice-state',$container).removeClass('validation-error');

			//var input_name = $('.workers-comp-choice-worker input:first').attr('name');
			var value = $('.workers-comp-choice-worker input:checked').val();
			if (value == null || value.length < 1) {
				pass = false;
				$('.workers-comp-choices',$container).addClass('validation-error');
			}

			var value = $('.workers-comp-choice-state select').val();
			if (value == "Please select a state" || value.length < 1) {
				pass = false;
				$('.workers-comp-choice-state',$container).addClass('validation-error');
			}

			if (!pass) {
				$container.append('<div class="workers-comp-choice-validation-msg">Please select whether you are an Employer or Injured Worker and your state.</div>');
				e.preventDefault();
			}
		});
	}
	/* [END] WORKERS COMP SCRIPT */


	/* [START] NEW PROJECT X LANDING PAGES SCRIPT */
	if ($('.get-a-quote-entry-form').length > 0) {
		$('.get-a-quote-entry-form .chosen-search input').before('<span class="search-icon"></span>').after('<a class="search-clear-button"></a>');
		$('.search-clear-button').on('click',function() {
			var $chosenSearch = $(this).closest('.chosen-search');
			$('input',$chosenSearch).val('').focus();
		});

		// Inject "placeholder" text as span, due to issues with styling disabled input text in IE8
		if( $('.states').hasClass('market-stall'))
		{
			$('.states .chosen-container').unbind().find('.search-field').append('<span class="pholder">Which state(s) do you operate in?</span>');
		} 
		else 
		{
			$('.states .chosen-container').unbind().find('.search-field').append('<span class="pholder">select one or more states</span>');
		}
		

		// Now hide the search-field text if an option is selected (for states multiselect)
		$('label.states select').on('change', function(e,params) {
			if ($(this).val() != null) {
				$(this).next().find('.chosen-choices').addClass('has-choices');
			} else {
				$(this).next().find('.chosen-choices').removeClass('has-choices');
			}
		});

		// Manually apply "has-choices" class on load if page is reloaded with selected value. 
		if ($('label.states select').val()){
			$('label.states .chosen-choices').addClass('has-choices');
		}

		// Temp remove "onclick" attribute and assign to "data-onclick" so we can perform validation w/o form submitting
		$('.submit-get-a-quote').attr('data-onclick', $('.submit-get-a-quote').attr('onclick')).attr('onclick', '');

		// Manually trigger "chosen:close" event with timeouts to fix cross browser bugs / Chosen limitations
		var dropStatus = false;
		$('label.states select').on('chosen:hiding_dropdown',function(e) {			
			setTimeout(function() { dropStatus = false }, 150);
			$('label.states .search-field span').addClass('active');
			// Re-bind more info scroll link
			setTimeout(function() { $('.get-a-quote-landing-header-information-scroll a').click(function() {smoothScrollTo('.get-a-quote-landing-descriptions',-90)})}, 500);
		});
		$('label.states select').on('chosen:showing_dropdown',function(e) {
			setTimeout(function() { dropStatus = true }, 150);
			$('label.states .search-field span').removeClass('active');
			// Unbind more info scroll link to fix iPad click-thru issue.
			$('.get-a-quote-landing-header-information-scroll a').unbind('click');
		});

		$('.states .chosen-container').on('click', function(e){
			if(($(e.target).hasClass('pholder') || $(e.target).hasClass('chosen-container') || $(e.target).hasClass('chosen-choices'))){				
				if(dropStatus) setTimeout(function() { $('.states select').trigger('chosen:close') }, 150);
			}
		});

		function smoothScrollToTop() {
			$('html,body').animate({scrollTop: 0}, 1000);
		}

	    $('div.start-your-quote-now a, a.start-your-quote-now').click(function() {
	    	smoothScrollToTop();
	    });

	    $('.get-a-quote-landing-header-information-scroll a').click(function() {
	    	smoothScrollTo('.get-a-quote-landing-descriptions',-90);
	    });


	    // Replace the multiselect with checkboxes for iOS 7
	    // Q: DO WE NEED THIS FOR iOS 6 TOO?
        var isIos7 = navigator.userAgent.match(/(iPhone|iPod touch);.*CPU.*OS 7_\d/i);
        // isIos7 = true;
        if (isIos) {
            // Hide state selector
            var $origSelect = $('select.oitmp:first');
            $origSelect.hide().next().hide();
            var newCheckboxes = '<div class="checkReplace">';
            var options = $origSelect.find('option').each(function() {
                var value = $(this).attr('value');
                var label = $(this).text();
                newCheckboxes += '<br /><label for="oitmp_checkbox_'+value+'"><input type="checkbox" name="oitmp_checkbox" value="'+value+'" id="oitmp_checkbox_'+value+'">'+label+'</label>';
            });
            newCheckboxes += '</div>';
            $origSelect.after(newCheckboxes);
            // $inputContainer.after(newCheckboxes);
            // $inputContainer.removeClass('select multiselect');
            $('.checkReplace input[type=checkbox]').icheck({
                checkboxClass: 'icheckbox'
            });
            $('.checkReplace .icheckbox').on('click',function(e) {
			    e.stopPropagation();
		    });
            // Update the hidden select when the checkbox changes
            $('input[name="oitmp_checkbox"][type=checkbox]').on('ifToggled',function() {
                var checkedStates = $('input[name="oitmp_checkbox"]:checked').map(function() {
                    return $(this).val();
                }).get();
                $('select.oitmp:first').val(checkedStates);
            });
        }


		// Validation and state field prep
		// Validation on the get-a-quote intro form
        $('.submit-get-a-quote').on('click',function(e) {
            var proceedToGo = true;
            var errorMsg = '';

            // Remove any existing validationError
            $('.get-a-quote-entry-form .validationError').remove();
 
            if (!$('select.hp-business-type:first').val()) {
                proceedToGo = false;
                errorMsg = 'Please select a business type.';
            }
            if (!$('select.oitmp:first').val()) {
                proceedToGo = false;
                if (errorMsg == '') {
                    errorMsg = 'Please choose at least one state.';
                } else {
                    errorMsg = 'Please select a business and at least one state.';
                }
            }

            if (proceedToGo == false) {
            	if ($('.get-a-quote-entry-form div.call-to-action').length) {
                	$('.get-a-quote-entry-form div.call-to-action').prepend('<div class="validationError">'+errorMsg+'</div>');
                } else {
                	$('.get-a-quote-entry-form button').before('<div class="validationError">'+errorMsg+'</div>');
                }
                return false;
            }

            // Clean up state selection string
            var str = $('select.oitmp:first').val() + '';
            $("#operatingin").val('[' + str + ']');
            
            // Manually run Kentico "onclick" function from value saved in "data-onclick"
            eval($('.get-a-quote-entry-form button').attr('data-onclick'));
            
            return true;
        });
	}

	/* [END] NEW PROJECT X LANDING PAGES SCRIPT */

	/* [START] MEET MAX/JOHN SCRIPT */
	if ($('section.meet-promo').length) {


		// Youtube iFrame embed API
		var tag = document.createElement('script');
		tag.src = "//www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		var player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('header-video', {
            events: {

            }
          });
        }

		$('.meet-video').on('click',function(e) {
			if ($(this).hasClass('closed')) {
				$(this).addClass('open').removeClass('closed');
				//$(this).animate({height: "500px", width: "850px"},500,'ease');
				$('.share-buttons').addClass("hidden");
				setTimeout(function() {
					if (getCurrentBootstrapSize() == 'sm') {
						$('.video-embed-sm').show();
						$('.video-embed-sm iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");
					} else {
						$('.video-embed').show();
						$('.video-embed iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");
					}
				}, 500);
				$('.close-video-button').addClass('open');
			} else {
				$(this).addClass('closed').removeClass('open');
				//$(this).animate({height: "316px", width: "562px"},500,'ease');
				$('.share-buttons').removeClass("hidden");
				$('.video-embed, .video-embed-sm').hide();
				$('.close-video-button').removeClass('open');
			}
		});
		$('.close-video-button').on('click',function() {
			$('.video-embed-iframe').each(function(){
				// Bit of a hack to reliably stop youtube embeds on close (otherwise it just keeps playing invisibly)
				var video = $(this).attr("src");
				$(this).attr("src","");
				$(this).attr("src",video);
			});
			$('.meet-video').removeClass('open').addClass('closed');
			$('.video-embed, .video-embed-sm').hide();
			$('.share-buttons').removeClass("hidden");
			$('.close-video-button').removeClass('open');
			return false;
		});
	}

	if ($('.watch-his-story-xs').length) {
		$('.watch-his-story-xs').on('click',function() {
			if ($(this).hasClass('open')) {
				$videoParent = $(this).parent();
				$videoParent.find('.video-embed-xs').show();
				$videoParent.find('.video-embed-xs iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");
				$(this).addClass('closed').removeClass('open');
				$('body').trigger('remove_blackout');
			} else {
				$(this).addClass('open').removeClass('closed');
				$(this).hide();
				$videoParent = $(this).parent();
				$videoParent.find('.video-embed-xs').show();
				$videoParent.find('.video-embed-xs iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");
			}
		});
	}

	if ($('.meet-episode-video').length) {
		$('.meet-episode-video').on('click',function() {
			if ($(this).hasClass('open')) {
				$videoParent = $(this).parent();
				$videoParent.find('.embed-video').show();
				$videoParent.find('.embed-video iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");
				$(this).addClass('closed').removeClass('open');
				$('body').trigger('remove_blackout');
			} else {
				// OPENING VIDEO
				$(this).addClass('open').removeClass('closed');
				$videoParent = $(this).parent();
				if (getCurrentBootstrapSize() == "xs") {
					$videoParent.find('.embed-video').show();
					//$videoParent.find('iframe:first')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");
				} else {
					$('body').trigger('add_blackout');
					setTimeout(function() {
						$videoParent.find('.embed-video').show();
						$videoParent.find('iframe:first')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");
					}, 500);
				}

			}
		});
		$('.close-episode-video-button').on('click',function(e) {
			e.stopPropagation();
			var $parentVideo = $(this).closest('div[class*=col-]').find('.meet-episode-video');
			$parentVideo.addClass('closed').removeClass('open');
			$parentVideo.parent().find('.embed-video').hide();
			$('body').trigger('remove_blackout');
			// Bit of a hack to reliably stop youtube embeds on close (otherwise it just keeps playing invisibly)
			$videoiFrame = $parentVideo.parent().find('iframe');
			var videoSrc = $videoiFrame.attr("src");
			$videoiFrame.attr("src","");
			$videoiFrame.attr("src",videoSrc);
		});
	}

	$('body').on('add_blackout',function() {
		$('body').append('<div class="full-blackout"></div>');
		$('.full-blackout').on("click",function(e) {
			e.stopPropagation();
			$('.meet-episode-video.open').parent().find('.close-episode-video-button').trigger('click');
		});
	});

	$('body').on('remove_blackout',function() {
		$('div.full-blackout').remove();
	});


	$(".embed-video, .video-embed-xs").fitVids();
	/* [END] MEET MAX/JOHN SCRIPT */

	/* [START] WIDGET VERSION OF FIND AN ADVISER ADDITIONAL SCRIPTING */
	if ($('.find-an-adviser-form h2[data-toggle-form]').length) {
		if (getCurrentBootstrapSize() == "xs") {
			$('.find-an-adviser-form h2[data-toggle-form]').click(function() {
				var $parentForm = $(this).closest('.find-an-adviser-form');
				$('.fold-out-form-xs',$parentForm).slideToggle();
				$(this).toggleClass('open');
			});
		}
	}

	$('body').on('faa_insurance_type_selected',function() {
		if (getCurrentBootstrapSize() == "xs") {
			$('.placeholder-product-list-xs').hide();
		}
	});
	/* [ED] WIDGET VERSION OF FIND AN ADVISER ADDITIONAL SCRIPTING */

	/* [START] EMBEDDED VIDEO BEHAVIOUR */
	if ($('.content-module .video-embed').length) {
		
		// Load click capture div on top of embed
		$('.content-module .video-embed').append('<div class="video-embed-capture-click"></div>');
		$('.content-module .video-embed').append('<a href="#" class="closeEmbedVideo"><i class="icon-circle-cancel-close-exit"></i></a>');

		// Youtube iFrame embed API
		/* var tag = document.createElement('script');
		tag.src = "//www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		var player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('video-embed', {
            events: {

            }
          });
        } */

		$('.video-embed-capture-click').on('click', function() {
			var videoEmbed = $(this).closest('.video-embed');
			videoEmbed.addClass('open');
			$('iframe',videoEmbed).addClass('modal-style');
			
			// Add blackout
			$('body').append('<div class="full-blackout darker"></div>');
			$('.full-blackout').on("click",function(e) {
				e.stopPropagation();
				$('.video-embed.open').find('.closeEmbedVideo').trigger('click');
			});

			// Now play the video
			videoEmbed.find('iframe')[0].src += "&autoplay=1";
			//videoEmbed.find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");
		});

		$('.closeEmbedVideo').on('click',function() {
			var videoEmbed = $(this).closest('.video-embed');
			videoEmbed.removeClass('open');
			$('iframe',videoEmbed).removeClass('modal-style');

			// Remove blackout
			//$('body').append('<div class="full-blackout"></div>');
			$('div.full-blackout.darker').remove();

			// Bit of a hack to reliably stop youtube embeds on close (otherwise it just keeps playing invisibly)
			$videoiFrame = $('iframe',videoEmbed);
			var videoSrc = $videoiFrame.attr("src");
			videoSrc = videoSrc.replace('&autoplay=1','');
			$videoiFrame.attr("src","");
			$videoiFrame.attr("src",videoSrc);
		});

	}

	/* [START] XERO CONNECT FORM BEHAVIOUR */
	if ($('.connect-to-xero-form').length) {
		$('input').on('change focus',function() {
			var form = $(this).closest('.connect-to-xero-form');
			var valid = true;
			if ($('input[id^=first_name]',form).val().length < 1) valid = false; 
			if ($('input[id^=last_name]',form).val().length < 1) valid = false; 
			var phone = $('input[id^=phone]',form).val().replace(/ /g,"");
			if (typeof phone == "undefined") {
				valid = false;
			} else {
				if (!$.isNumeric(phone)) valid = false;
				if (phone.length < 6) valid = false; 	
			}
			var emailvalidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!emailvalidation.test($('input[id^=email]',form).val())) valid = false;
			if ($('input[name^=business_person]:checked',form).length == 0) valid = false;
			if ($('select[id^=business_type]',form).val() == null) valid = false;
			if ($('select[id^=business_type]',form).val() == 'Sole Trader') valid = false;

			if (valid) {
				form.addClass('show-privacy');
			} else {
				//form.removeClass('show-privacy');
			}

			if ($('input[id^=privacy_policy]',form).prop('checked') !== true) valid = false;

			if (valid) {
				$('button.connect-to-xero-form-button',form).removeClass('disabled').removeAttr('disabled');
			} else {
				$('button.connect-to-xero-form-button',form).addClass('disabled').attr('disabled','disabled');
			}
		});

		// Check for Business Type - Sole trader alert
		$('select').on('change',function() {
			var form = $(this).closest('.connect-to-xero-form');

			if ($(this).val() == "Sole Trader") {
				$('.sole-traders',form).show();
				$('.non-sole-traders',form).hide();
			} else {
				$('.sole-traders',form).hide();
				$('.non-sole-traders',form).show();
			}
		});

		// As you type validation on the email address
		$('input.email').on('keyup change',function() {
			var emailvalidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if ($(this).val() !== '' && !emailvalidation.test($(this).val())) {
				$(this).addClass('invalid');
			} else {
				$(this).removeClass('invalid');
			}
		});

		$('.connect-to-xero-form input[id^=first_name]').trigger('change');
	}

	if ($('.xero-header a.connect-to-xero-button').length > 0) {
		$('.xero-header a.connect-to-xero-button').on('click',function() {
			smoothScrollTo('.xero-module-start',-80);
			$('.connect-to-xero-form-bottom input[id^=first_name]').focus();
		});
	}

	// Handle show/
	$('.connect-to-xero-form-button').on('click',function(e) {
		e.preventDefault();
		$('.modal-window.xero-granting-access').show();
		$('body').append('<div class="full-blackout darker"></div>');
		$('.full-blackout').on("click",function(e) {
			e.stopPropagation();
			$('.modal-window.xero-granting-access button.cancel').trigger('click');
		});
	});
	$('.modal-window.xero-granting-access button, .modal-window.xero-granting-access input').on('click',function(e) {
		e.preventDefault();
		$('.modal-window.xero-granting-access').hide();
		$('body .full-blackout').remove();
	});
	

	// START: Blog Functions

	var blogLoadMoreAmount = 0;
	var blogCount = 0;
	var blogHiddenCount = 0; 

	$('.blog-article img').each(function(){
		$(this).wrap('<figure>').after('<figcaption>'+$(this).attr('alt')+'</figcaption>');
	});

	function loadMoreBlogs() {
		var showCounter = 1;
		var totalDelay = 0;
		$(".blog-listing article.ui-helper-hidden").each(function (index, element) {
		    if ($(this).attr("data-item-index") > 0 && showCounter <= blogLoadMoreAmount) {
		        $(this).hide();
				$(this).removeClass("ui-helper-hidden");
				$(this).delay(showCounter * 500).fadeIn(1000);		
		        showCounter = showCounter + 1;
		    }
		});
		checkLoadMoreDisplay();
	}

	function checkLoadMoreDisplay() {
	    blogHiddenCount = $(".blog-listing article.ui-helper-hidden").size();
	    if (blogHiddenCount == 1) {
	        $('.load-more').fadeOut(1000);
	    }
	}

	function showLatest() {
		$('.mobile-button-popular').removeClass('active');
		$('.mobile-button-popular').addClass('not-active');
		
		$('.mobile-button-latest').removeClass('not-active');
		$('.mobile-button-latest').addClass('active');	
		
		$('.blog-popular-widget').addClass('hidden-xs');		
		$('.blog-listing').removeClass('hidden-xs');
	}

	function showPopular() {
		$('.mobile-button-latest').removeClass('active');
		$('.mobile-button-latest').addClass('not-active');
		
		$('.mobile-button-popular').removeClass('not-active');
		$('.mobile-button-popular').addClass('active');
		
		$('.blog-listing').addClass('hidden-xs');
		$('.blog-popular-widget').removeClass('hidden-xs');
	}

	blogLoadMoreAmount = $('.hcs_Blog_LoadMoreAmount').val();
    blogCount = $(".blog-listing article").size();
    blogHiddenCount = $(".blog-listing article.ui-helper-hidden").size();
    checkLoadMoreDisplay();

	$('.load-more').on('click', function () {		
		loadMoreBlogs();
	});
	
	$('#categories_mobile_chosen ul.chosen-results').on('click', function() {
		var selectedItemText = $('#categories_mobile_chosen a.chosen-single span').text();
		var selectedCategoryOption = $('#categories-mobile option:contains(' + selectedItemText + ')');				
		if (selectedCategoryOption.length != 0 && selectedCategoryOption.val() != "")
			window.location.href = selectedCategoryOption.val();
	});
	
	$('#sub_categories_mobile_chosen ul.chosen-results').on('click', function() {
		var selectedItemText = $('#sub_categories_mobile_chosen a.chosen-single span').text();
		var selectedCategoryOption = $('#sub-categories-mobile option:contains(' + selectedItemText + ')');				
		if (selectedCategoryOption.length != 0 && selectedCategoryOption.val() != "")
			window.location.href = selectedCategoryOption.val();
	});

	$('.mobile-button-latest').on('click', function() {
		showLatest();
	});
	
	$('.mobile-button-popular').on('click', function() {
		showPopular();
	});

	// END: Blog Functions

	// START: Xero 2.0 functions 
	if (($('.xero-2-1-landing').length) || ($('.xero-2-landing').length)) {
		
		$('.video-container a.play-video').on('click',function() {
			var $parent = $(this).closest('.video-container');
			if (getCurrentBootstrapSize() == "xs") {
				$parent.addClass('open');
				$parent.find('iframe').attr('src',$parent.find('iframe').data('src'));
				$(".video-container").fitVids();
			} else {
				$parent.addClass('open');
				$parent.find('iframe').attr('src',$parent.find('iframe').data('src'));
				$(".video-container").fitVids();
				$(".video-onchange").fadeTo('fast',0);
			}
		});
		$('.video-container a.close-video').on('click',function() {
			var $parent = $(this).closest('.video-container');
			$parent.removeClass('open');
			$parent.find('iframe').attr('src','');
			$('.video-onchange').fadeTo('fast',1);
		});
		$('body').on('bsResize',function() {
			$(".video-container").fitVids();
		});
	}
	// END: Xero 2.0 functions 

	// START: Tropfest functions
	if (($('.tropfest').length) || ($('.cyber').length))  {

		$('.video-thumbnail a').on('click',function(e) {
			e.preventDefault();
			var parent = $(this).closest('.video-thumbnail');
			parent.addClass('show-video');
			var iframe = parent.find('iframe');
			iframe.attr('src',iframe.attr('data-src'));
			iframe.closest('.video-thumbnail').fitVids();
		});

		// Countdown 
		/* if ($('.tropfest-countdown').length) {
			setTropfestCountdown();
			tropfestCountdownInterval = setInterval(function() {
				setTropfestCountdown();
			},1000);

		}
		
		function setTropfestCountdown() {
			var countdown = getTimeRemaining('14 Feb, 2016 19:30:00 GMT+1100');
			if (countdown.total <= 0) {
				clearInterval(tropfestCountdownInterval);
				$('.tropfest-countdown').hide();
				$('.tropfest-countdown-intro').hide();
				return;
			}
			var countdownString = countdown.days+'d, '+countdown.hours+'h, '+countdown.minutes+'m, '+countdown.seconds+'s';
			$('.tropfest-countdown').html(countdownString);
		}

		function getTimeRemaining(endtime){
		  var t = Date.parse(endtime) - Date.parse(new Date());
		  var seconds = Math.floor( (t/1000) % 60 );
		  var minutes = Math.floor( (t/1000/60) % 60 );
		  var hours = Math.floor( (t/(1000*60*60)) % 24 );
		  var days = Math.floor( t/(1000*60*60*24) );
		  return {
		    'total': t,
		    'days': days,
		    'hours': hours,
		    'minutes': minutes,
		    'seconds': seconds
		  };
		}

		// Twitter vertical carousel
		$('.tropfest-twitter-carousel')
			.carousel();
		$('#tropfest-twitter-carousel')
			.on('slide.bs.carousel',function(e) {
				$('.tropfest-twitter-carousel .item.slid-out').removeClass('slid-out');
				$('.tropfest-twitter-carousel .item.active').addClass('slid-out');
			});
			*/
	}
	// END: Tropfest functions

	/* Community Coach */
	if ($('.community-coach').length) {

		// Add placeholders
		function addCommunityCoachPlaceholders() { 
			$('.community-coach.signup input[name*="FullName"]').attr('placeholder','Your full name');
			$('.community-coach.signup input[name*="EmailAddress"]').attr('placeholder','Your email address');
			$('.community-coach.signup textarea').attr('placeholder','Your tip');
			$('input, textarea').auderoUnifiedPlaceholders({className:"placeholder-text",style:"#666666"});
		}
		if (typeof Sys !== "undefined") {
			var prm = Sys.WebForms.PageRequestManager.getInstance();
			prm.add_endRequest(function() {
			    addCommunityCoachPlaceholders();
			});
		}
		addCommunityCoachPlaceholders();

		$('.showPostFormDiv').on('click',function(e) {
			$('#community-coach-form').hide();
			$('#community-coach-form-after').show();
		});

		$('.showFormDiv').on('click',function(e) {
			$('#community-coach-form').show();
			$('#community-coach-form-after').hide();
		});

		$('.scrolling-video-list a').on('click',function(e) {
			e.preventDefault();
			// Set video details
			var $vid = $('.featured-video');
			$vid.find('iframe').attr('src','https://www.youtube.com/embed/'+$(this).data('video-id')+'?wmode=transparent');
			$vid.find('h3').text($(this).data('video-title'));
			$vid.find('.duration').text($(this).data('video-duration'));
			$vid.find('.date').text($(this).data('video-date'));
			$vid.find('p').text($(this).data('video-description'));

			$('.scrolling-video-list li').removeClass('active');
			$(this).closest('li').addClass('active');

			if (getCurrentBootstrapSize() == 'xs') {
				smoothScrollTo('.featured-video',-60);
			}
		});

		$('.tips-slider-container').slick({
		  prevArrow: '<button type="button" class="slick-prev"></button>',
		  nextArrow: '<button type="button" class="slick-next"></button>',
		  dots: true,
		  infinite: true,
		  speed: 1000,
		  fade: false,
		  pauseOnHover: false,
		  cssEase: 'linear',
		  accessibility: false,
		  autoplay: true,
	  	  autoplaySpeed: 10000,
	  	  cssEase: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)'
		});
	}

	// Show all tip videos on mobile
	$('.show-all-tip-videos').on('click',function(e) {
		e.preventDefault();
		$(this).hide();
		$('.all-tips').show();
	});
	/* END: Community Coach */


	/* START: PI Product pages */
	if ($('.pi-product').length || $('.faa-page').length || $('.cyber').length || $('.small-business-hub').length) {
		$(window).on('scroll',function() {
			$('.parallax-scroll').each(function(i,e) {
				if (getCurrentBootstrapSize() !== "xs" && isPartOnScreen(this)) {

					// Amount scrolled past top
					var offset = $(this).offset();
					var sTop = $(document).scrollTop();
					var sBottom = sTop + $(window).outerHeight();
					var yTop = offset.top;
					var yBottom = offset.top + $(this).outerHeight();

					// Working on 30% additional height
					var scrollPastTop = sBottom - yTop;
					var spanningHeight = $(window).outerHeight() + $(this).outerHeight();
					// If the item is above the fold, remove the amount of scrolling it can't do
					if (yTop <= $(window).outerHeight()) {
						spanningHeight = spanningHeight - yTop;
						if($('.site-header-standalone').length) {
							scrollPastTop = scrollPastTop - (yBottom + 450);
						} else {
							scrollPastTop = scrollPastTop - (yBottom + 150);
						}
						
					}
					var percentageOfVisibleScroll = scrollPastTop / spanningHeight;
					var shift = percentageOfVisibleScroll * $(this).outerHeight() * .3;

					var backgroundPositionX = $(this).find('.bg-image').data('background-position-x');
					if (typeof backgroundPositionX == "undefined" || backgroundPositionX == '') {
						backgroundPositionX = '50%';
					}

					$(this).find('.bg-image').css('backgroundPosition',backgroundPositionX+' -'+shift+'px')
				}
			});
		});

		// Factors slider
		$('.factors-slider').slick({
			autoplay: true,
	  		autoplaySpeed: 5000,
	  		dots: true
		});

		$('.horizontal-parallax').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			var toMove = (slick.slideWidth*.25)*(nextSlide/slick.slideCount);
			//var toMove = 30;
			if ($(this).closest('.pi-product').find('.bg-image-xs').length) {
				$(this).closest('.pi-product').find('.bg-image-xs').css('transform','translateX(-'+toMove+'px)');
			}
			if ($(this).closest('.horizontal-slider').find('.bg-image').length) {
				$(this).closest('.horizontal-slider').find('.bg-image').css('transform','translateX(-'+toMove+'px)');
			}
		});

		// Convert the Features to slider or destroy
		function addFeaturesSlider() {
			if (getCurrentBootstrapSize() == 'xs') {
				$('.features-carousel').slick({
					autoplay: true,
			  		autoplaySpeed: 5000,
			  		dots: true,
			  		prevArrow: '<button type="button" class="slick-prev slick-arrow" role="button" label="Previous"></button>',
			  		nextArrow: '<button type="button" class="slick-next slick-arrow" role="button" label="Next"></button>'
				});
			}
		}

		function addCallOutSlider() {
			if (getCurrentBootstrapSize() == 'xs') {
				$('.pi-product ul.slider-on-xs, .small-business-hub ul.slider-on-xs').slick({
					autoplay: true,
			  		autoplaySpeed: 5000,
			  		dots: true,
			  		prevArrow: '<button type="button" class="slick-prev slick-arrow" role="button" label="Previous"></button>',
			  		nextArrow: '<button type="button" class="slick-next slick-arrow" role="button" label="Next"></button>',
			  		slickFilter: 'li'
				});
			}
		}
		// Landing page
		function addStatsSlider() {
			if (getCurrentBootstrapSize() == 'xs') {
				$('.stats-carousel').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
					nextArrow: '<button type="button" class="slick-arrow slick-next"></button>'
				});
			}
		}
		addFeaturesSlider();
		addCallOutSlider();
		addStatsSlider();

		function destroyXsSliders() {
			$('.features-carousel.slick-initialized, .slider-on-xs.slick-initialized, .stats-carousel.slick-initialized').slick('unslick');
		}

		$('body').on('bsResizeToxs',function() {
			addFeaturesSlider();
			addCallOutSlider();
		});
		$('body').on('bsResizeTosm bsResizeTomd bsResizeTolg',function() {
			destroyXsSliders();
		});

		// Show more policy details fade in reveal
		$('a.show-more').on('click',function(e) {
			$('a.show-more').hide();
			if ($(this).hasClass('more-tick-list')) {
				$('ul.tick-list.more li:not(.show-on-xs)').each(function(i) {
					$(this).delay((i++) * 200).fadeTo(300, 1);
				});
			} else {
				$('ul.more').each(function() {
					$(this).find('li').each(function(i) {
						$(this).delay((i++) * 200).fadeTo(300, 1);
					});
				});
			}
		});


		function showNextMoreItem() {
			$('ul.more li:not(.in)').first().show();
			setTimeout(function() {
				$('ul.more li:not(.in)').first().addClass('in');
			}, 20);

			if ($('ul.more li:not(.in)').length) {
				setTimeout(function() {
					showNextMoreItem();
				}, 100);
			}
		}

		// Compare modal on xs - lock screen height
		/* $('.modal#compare-policy-xs')
		    .on('show.bs.modal', function (){
		        scrollPos = $('body').scrollTop();
		        setTimeout(function() {
			        $('body').css({
			            overflow: 'hidden',
			            position: 'fixed',
			            top : -scrollPos
			        });
			    },500);
		    })
		    .on('hide.bs.modal', function (){
		        $('body').css({
		            overflow: '',
		            position: '',
		            top: ''
		        }).scrollTop(scrollPos);
		    }); */

		// New Browse policy buttons reveal on mobile
		$('.pi-product-variants .toggle-buttons-on-xs').on('click',function(e) {
			e.preventDefault();
			if (getCurrentBootstrapSize() !== 'xs') return;
			if ($('.pi-product-variants').hasClass('open')) {
				$('.pi-product-variants .buttons-container').slideUp(200);
				$('.pi-product-variants').removeClass('open');
			} else {
				$('.pi-product-variants .buttons-container').slideDown(200);
				$('.pi-product-variants').addClass('open');
			}
		});
	}

	function isPartOnScreen(e) {
		var offset = $(e).offset();
		var yTop = offset.top;
		var yBottom = offset.top + $(e).outerHeight();
		var sTop = $(document).scrollTop();
		var sBottom = sTop + $(window).outerHeight();

		var onScreen = true;

		if (yBottom < sTop) onScreen = false;
		if (yTop > sBottom) onScreen = false;

		return onScreen;
	}
        
	/* END: PI Product pages */

	/* START: Generic inline video playback functionality */
	$('.inline-video .play-button').on('click',function(e) {
		e.preventDefault();
		var $container = $(this).closest('.inline-video');
		if (getCurrentBootstrapSize() == "xs") {
			$container.parent().find('.embed-video').show();
			$iframe = $container.parent().find('iframe');
			$iframe.attr('src',$iframe.attr('data-src'));
			$iframe.parent().fitVids();
		} else {
			if ($container.hasClass('use-blackout')) {
				$('body').trigger('add_blackout');
				$('.full-blackout').css('background','rgba(0, 0, 0, .75)');
				$('.full-blackout').on('click',function(e) {
					e.stopPropagation();
					$('.embed-video.on .close-video').trigger('click');
				});
			}
			if (!$container.hasClass('video-on')) {
				$container.addClass('video-on place-on-top');
				$iframe = $container.find('iframe');
				if ($iframe.length < 1) {
					$iframe = $container.parent().find('.embed-video iframe');
				}
				setTimeout(function() {
					$iframe.closest('.embed-video').addClass('on');
					$iframe.attr('src',$iframe.attr('data-src'));
					$iframe.parent().fitVids();
				},500);
			}
		}
	});

	$('.embed-video .close-video').on('click',function(e) {
		e.preventDefault();
		$('body').trigger('remove_blackout');
		var $container = $(this).closest('.embed-video').parent().find('.inline-video');
		$iframe = $container.find('iframe');
		if ($iframe.length < 1) {
			$iframe = $container.parent().find('.embed-video iframe');
		}

		$iframe.closest('.embed-video').removeClass('on');
		$iframe.attr('src','');
		$container.removeClass('video-on');
		setTimeout(function() {
			$container.removeClass('place-on-top');
		},500);
	});


	/* END: Generic inline video playback functionality */

});

// GET A QUOTE

$('.get-a-quote-case-study-show-story').on('click',function() {
	$('.get-a-quote-case-study-show-story-more').slideDown();
	//$(this).css('visibility','hidden');
	$(this).hide();
});

$(window).load(function() {
    if (typeof respond !== 'undefined') {
        respond.update();
    }
});

// Xero Landing page - Occupation

$('.xero-register-interest-form #occupation').on('change', function(){
	var getOccupationVal = $('.xero-register-interest-form #occupation').val();
	if (getOccupationVal == 'other') {
		$('.otherOccupation').slideDown('fast');
	} else {
		$('.otherOccupation').slideUp('fast');
	}
});


// Xero Landing page - COUNTDOWN CLOCK
if ($('.countdown-clock-top').length) {
	// Grab the current date
	var currentDate = new Date();
	// Set some date in the future. In this case, it's always Jan 1
	var futureDate  = new Date(2015, 10, 5, 14);
	// Calculate the difference in seconds between the future and current date
	var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
	// Instantiate a coutdown FlipClock
	clock = $('.countdown-clock-top').FlipClock(diff, {
		clockFace: 'DailyCounter',
		countdown: true
	});

	clock = $('.countdown-clock-bottom').FlipClock(diff, {
		clockFace: 'DailyCounter',
		countdown: true
	});
}

if ($('.motor #find-a-product-input-field-header').length) {
	$visibleFieldsMotor =  $(".motor #find-a-product-input-field-header, .motor #find-a-product-input-field-lower");
	$visibleFieldsMotor.on('input',function(e) {
		$visibleFieldsMotor.data('matched',false);
		$( "#find-a-product-input-field-val" ).val( '' );
		$visibleFieldsMotor.val($(this).val());
		//$visibleFieldsMotor.autocomplete( "search" );
	});
	$visibleFieldsMotor.on('propertychange',function(e) {
		if (e.originalEvent.propertyName == "value") {
	        $visibleFieldsMotor.data('matched',false);
	        $( "#find-a-product-input-field-val" ).val( '' );
	        $visibleFieldsMotor.val($(this).val());
	        //$(this).autocomplete( "search" );
	    }
	});
	$visibleFieldsMotor.on('blur',function(e) {
		$('ul.ui-autocomplete').removeClass('no-match');
		$('.autocomplete-error-message').hide();
		if ($visibleFieldsMotor.data('matched') == false) {
			$('.autocomplete-error-message').show();
		} 
	});
	$( ".motor #find-a-product-input-field-header" ).autocomplete({
	  minLength: 0,
	  source: occupations,
	  delay: 50,
	  autoFocus: true,
	  open: function() {
	  	var inputWidth = $( "#find-a-product-input-field-header" ).outerWidth();
	    $('.ui-menu').css('width', inputWidth);
	  },
	  focus: function( event, ui ) {
	  	return false;
	  },
	  select: function( event, ui ) {
	  	//$parent = $(this).closest('.motor');
	  	if (typeof ui.item == "undefined") {
	  		$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).data('matched',false);
	    	$( "#find-a-product-input-field-val" ).val( '' );
	    	return false;
	  	} else {
	  		$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).data('matched',true);
	  		$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).val( ui.item.label );
	    	$( "#find-a-product-input-field-val" ).val( ui.item.value );
	    	$('.autocomplete-error-message').hide();
	    	$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).autocomplete( "close" );
	    	return false;
	  	}
	  },
	  response: function( event, ui ) {
	  	$('ul.ui-autocomplete').removeClass('no-match');
	  	if (ui.content.length === 0) {
	  		$('#find-a-product-input-field-header').autocomplete("search","");
	  		$('ul.ui-autocomplete li').remove();
	  		$('ul.ui-autocomplete#ui-id-1').addClass('no-match');
	  		$('ul.ui-autocomplete').html('<ul tabindex="-1" id="" class="ui-menu-item">No matching occupation found.</ul>');
	  		$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).data('matched',false);
	  	} 
	  	return false;
	  }
	});
	$( ".motor #find-a-product-input-field-lower" ).autocomplete({
	  minLength: 0,
	  source: occupations,
	  delay: 50,
	  autoFocus: true,
	  open: function() {
	  	var inputWidth = $( "#find-a-product-input-field-lower" ).outerWidth();
	    $('.ui-menu').css('width', inputWidth);
	  },
	  focus: function( event, ui ) {
	  	return false;
	  },
	  select: function( event, ui ) {
	  	//$parent = $(this).closest('.motor');
	  	if (typeof ui.item == "undefined") {
	  		$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).data('matched',false);
	    	$( "#find-a-product-input-field-val" ).val( '' );
	    	return false;
	  	} else {
	  		$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).data('matched',true);
	  		$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).val( ui.item.label );
	    	$( "#find-a-product-input-field-val" ).val( ui.item.value );
	    	$('.autocomplete-error-message').hide();
	    	$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).autocomplete( "close" );
	    	return false;
	  	}
	  },
	  response: function( event, ui ) {
	  	$('ul.ui-autocomplete').removeClass('no-match');
	  	if (ui.content.length === 0) {
	  		$('#find-a-product-input-field-lower').autocomplete("search","");
	  		$('ul.ui-autocomplete li').remove();
	  		$('ul.ui-autocomplete#ui-id-2').addClass('no-match');
	  		$('ul.ui-autocomplete').html('<ul tabindex="-1" id="" class="ui-menu-item">No matching occupation found.</ul>');
	  		$( "#find-a-product-input-field-header, #find-a-product-input-field-lower" ).data('matched',false);
	  	} 
	  	return false;
	  }
	});
	$('.motor .submit-get-a-quote').on('click',function(e) {
		//$parent = $(this).closest('.motor');
		if ($('#find-a-product-input-field-header').data('matched') !== true) {
			$('.autocomplete-error-message').show();
			return false;
			e.preventDefault();
		}
	});
}


// 
// Cyber Defence page calculator 
// 

    function priceCheck() {
        $('input.price').on('blur', function(){
            var validValue;
            function isNumeric(numstr) {
                if (numstr.match(/^(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)$/ ) || numstr == "") {
                    validValue = true;
                } else {
                    validValue = false;
                }
            }
            var value = $(this).val();
            var error = $(this).closest('.input-container').find('.error');
            isNumeric(value);
            if(!validValue) {
                console.log('Please enter a valid number');
                error.find('.message').text('Please enter a valid number');
                error.show();
            } else {
                error.hide();
            }
            
        });
    }

    if($('.cyber').length){


    	

 
    }


    /* Small Business Hub pages */
    if ($('.small-business-hub').length) {

    	//$('.masonry-grid').masonry({
    	//	itemSelector: '.risk-panel'
    	//});
		function setCookie(c_name,value,exdays) {
		    var exdate = new Date();
		    exdate.setDate(exdate.getDate() + exdays);
		    var expires = exdate.toUTCString();
		    var isIE8 = (document.documentMode !== undefined);
		    if (exdays == 0) {
		        expires = (isIE8 == true) ? "" : "0";
		    }
		    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+expires);
		    document.cookie=c_name + "=" + c_value;
		}

		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i=0; i<ca.length; i++) {
				//var c = ca[i].trim();
				var c = $.trim(ca[i]);
				if (c.indexOf(name)==0) return c.substring(name.length,c.length);
			}
			return false;
		}
		if ($('body').data('visited')){
			setCookie('returnVisitor', $('body').data('visited'), 999); //999 days expiration
			setCookie('lastURL', window.location.pathname, 999); //999 days expiration
		}

		if (getCookie('returnVisitor')) {
			var lastPage = getCookie('returnVisitor');
			var lastPageURL = getCookie('lastURL');
	    	$('.small-business-hub.occupation-search').addClass('return-visitor');
	    	$('.last-visit a').attr('href', lastPageURL);
	    	$('.last-visit a').text(lastPage+" Business Hub");
		}
		
    	$('.risk-panel').on('click',function(e) {
    		$(this).find('a').trigger('click');
    	});
    	$('.risk-panel a').on('click',function(e) {
    		e.stopPropagation(); // Stop the risk-panel being clicked and therefore an infinite loop
    		$($(this).data('target')).modal('show');
    	});
    	$('.small-business-hub-risk.modal .close-modal').on('click',function(e) {
    		var modal = $(this).closest('.modal');
    		modal.find('.close').click();
    	})

    	if ($('.associations-slider').length) {
    		$('.associations-slider').slick({
    			prevArrow: '<button type="button" class="slick-prev"></button>',
			  nextArrow: '<button type="button" class="slick-next"></button>',
			  dots: true,
			  infinite: true,
			  speed: 1000,
			  fade: false,
			  pauseOnHover: false,
			  cssEase: 'linear',
			  accessibility: false,
			  autoplay: true,
		  	  autoplaySpeed: 7000,
		  	  cssEase: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)'
		  	});
    	}

    	// Small Business Hub Overview page
    	$('.articles-carousel').slick({
		  infinite: true,
		  slidesToShow: 4,
		  slidesToScroll: 4,
		  infinite: false,
		  //variableWidth: true,
		  prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
		  nextArrow: '<button type="button" class="slick-arrow slick-next"></button>',
		   responsive: [
			    {
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
		      	},
		      	{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
		      	}
		    ]
		});


    	$('select.chosen-with-search').chosen({
    		placeholder_text_single: "Search for your occupation or insurance product",


    	});
		

    }



   $('input.price').keyup(function(event) {

      // skip for arrow keys
      if(event.which >= 37 && event.which <= 40) return;

      // format number
      $(this).val(function(index, value) {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
    });

	// when value changes - make calculation
	$('#recordsExposed').on('keyup', function(){
		var amount = $('#recordsExposed').val();
		
		amount = parseFloat(amount.replace(/,/g, ''));
		var calcAmount = amount * 144;
		function numberWithCommas(x) {
	        return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	    }
		var calcContainer = $('.breach-cost-tool').find('.amount');
		calcContainer.html(numberWithCommas(calcAmount));
	});

	// increase value

	$('.increase-input').on('click', function(){
		var amount = $('#recordsExposed').val();
		amount = parseFloat(amount.replace(/,/g, ''));
		amount = amount + 1000;
		function numberWithCommas(x) {
	        return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	    }

		$('#recordsExposed').val(numberWithCommas(amount));

		var calcAmount = amount * 144;
		var calcContainer = $('.breach-cost-tool').find('.amount');
		calcContainer.html(numberWithCommas(calcAmount));
	});
	// decrease value

	$('.decrease-input').on('click', function(){
		var amount = $('#recordsExposed').val();
		amount = parseFloat(amount.replace(/,/g, ''));
		amount = amount - 1000;
		function numberWithCommas(x) {
	        return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	    }

		$('#recordsExposed').val(numberWithCommas(amount));

		var calcAmount = amount * 144;
		var calcContainer = $('.breach-cost-tool').find('.amount');
		calcContainer.html(numberWithCommas(calcAmount));
	});


	// Cyber Score Questions

	if($('.cyber-score-questions').length){
		var qWrapper = $('.cyber-score-questions');
		// Question set
		var itQuestions = [
			{"question":"Do you have a firewall enabled?", "helpText":"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},
			{"question":"Is your email system SMTP?", "helpText":"Ullam voluptas velit repudiandae asperiores sunt impedit non."},
			{"question":"Is your antivirus up to date?", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."},
			{"question":"Do you have a business continuity plan?", "helpText":"Aliquid nulla maxime iusto optio iure?"},
			{"question":" Do you have intrusion prevention or detection system running on your network?", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."},
			{"question":"Do you update firewalls, virus protection and other security software regularly?", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."},
			{"question":"Do you encript client data when sending it offsite?"}
		];
		var insuranceQuestions = [
			{"question":"Are all PCs, Macs, smartphones and tablets protected with security software?", "helpText":"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},
			{"question":"Would you know what to do if your data was being held as ransom?"},
			{"question":"Do you have a response plan to a cyber attack?", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."},
			{"question":"Are your employees aware of the importance of cyber security?", "helpText":"Aliquid nulla maxime iusto optio iure?"},
			{"question":"Have or your employees sent an email to the wrong person?", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."},
			{"question":"If your client/employee records were locked by ransom software, would you be able to release these files quickly?", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."},
			{"question":"Are images used in marketing material, printed or online, used within copyright?", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."},
			{"question":"Could your business withstand a three day lock down and loss of client information?", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."},
			{"question":"Australian businesses are the fifth most targeted by cryto ransomware", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."},
			{"question":"If you pay an online ransom to release your files, you can be guaranteed they will be freed", "helpText":"Recusandae saepe, id cupiditate voluptatum aliquam obcaecati beatae."}
		];

		function shuffleShowQuestions(questionArray, questionType){
			// Shuffle questions
			questionArray.sort(function() { return 0.5 - Math.random() })
			var i = 0;
			for (i = 0; i < 3; i++) {
				var html = '<div class="input-container"><div class="row">';
			    html += '<div class="text-wrapper col-xs-12 col-sm-6 col-md-8"><label class="question">'+ questionArray[i].question;
				// if question has helptext
				if(questionArray[i].helpText){
					html += '<a href="#" class="help-text"><i class="icon-question-mark"></i><div class="hidden-help-text"><p>'+questionArray[i].helpText+'</p></div></a>';	 	
				}
							 	
				html += '</label></div>';
				html += '<div class="col-xs-12 col-sm-6 col-sm-push-6 col-md-4 col-md-push-8 text-right"><label class="inline-radio"><input type="radio" name="'+questionType+'_question_'+i+'" value="Yes" class="replace" > Yes</label><!----><label class="inline-radio"><input type="radio" name="'+questionType+'_question_'+i+'" value="No" class="replace" > No</label></div>';
				html += '</div></div>';
				qWrapper.append(html);
			}
		}
		shuffleShowQuestions(itQuestions, "it");
		shuffleShowQuestions(insuranceQuestions, "insurance");
		var hiddenHelp = $('.help-text');
		hiddenHelp.on('mouseenter', function(){
			$(this).find('.hidden-help-text').addClass('fade-in');
		})
		hiddenHelp.on('mouseleave', function(){
			$(this).find('.hidden-help-text').delay(500).removeClass('fade-in');
		})
	}

	// Sums insured calculator

	if($('.sums-insured').length){
		// on button click
		var button = $('button[type="submit"]');
		var answer = $('.answer');
		$('.error').hide();

		button.on('click', function(e){
			e.preventDefault();
			// get values
			var sumInsured = $('input[name="sum_for_item"]').val();
			var valueAtRisk = $('input[name="risk_value"]').val();
			var coInsurance = $('select[name="co_insurance_percentage"]').val();
			// remove commmas
			sumInsured = parseFloat(sumInsured.replace(/,/g, ''));
			valueAtRisk = parseFloat(valueAtRisk.replace(/,/g, ''));
			coInsurance = parseFloat(coInsurance.replace(/,/g, ''));
			console.log(sumInsured);
			console.log(valueAtRisk);
			console.log(coInsurance);

			coInsurance = coInsurance / 100;
			var loss = $('input[name="loss"]').val();
			loss = parseFloat(loss.replace(/,/g, ''));

			// Do calculation:

			// Insurer pays = (Sum Insured/(co-insurance % * Value at risk)) * Loss Amount
			var insurerPays = (sumInsured / (coInsurance * valueAtRisk)) * loss;
			if(insurerPays > loss) {
				insurerPays = loss;
			}

			
			// Uninsured Portion = Loss Amount - Insurer pays  
			var uninsuredPortion = loss - insurerPays;

			insurerPays = insurerPays.toFixed(2);
			uninsuredPortion = uninsuredPortion.toFixed(2);
			if(!isNaN(insurerPays) && !isNaN(uninsuredPortion)){
				// add commas
				function numberWithCommas(x) {
			        return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
			    }
				
			
				// Send values to page
				if(insurerPays > loss){
					insurerPays = numberWithCommas(insurerPays);
					answer.find('.insured span').text('$'+insurerPays+' Limited to the Loss Amount (Less any Deductible)');
				} else {
					insurerPays = numberWithCommas(insurerPays);
					answer.find('.insured span').text('$'+insurerPays+' (Less any Deductible)');
				}
				

				console.log(uninsuredPortion);
				if(uninsuredPortion < 1) {
					answer.find('.uninsured span').text('$'+uninsuredPortion+' (Plus any Deductible)');
				} else {
					uninsuredPortion = numberWithCommas(uninsuredPortion);
					answer.find('.uninsured span').text('$'+uninsuredPortion+' (Plus any Deductible)');
				}
				
				answer.slideDown(600);
				$('.error').hide();
			} else {
				// display errors
				console.log("errors");
				if(isNaN(sumInsured)) {
					console.log("sumInsured is NaN");
					$('label[for="sum_for_item"] .error').find('span').text('Please enter a valid number.');
					$('label[for="sum_for_item"] .error').slideDown('fast');
				} else {
					$('label[for="sum_for_item"] .error').slideUp('fast');
				}
				if(isNaN(valueAtRisk)) {
					$('label[for="risk_value"] .error').find('span').text('Please enter a valid number.');
					$('label[for="risk_value"] .error').slideDown('fast');
				} else {
					$('label[for="risk_value"] .error').slideUp('fast');
				}
				if(isNaN(coInsurance)) {
					$('label[for="co_insurance_percentage"] .error').find('span').text('Please select a percentage.');
					$('label[for="co_insurance_percentage"] .error').slideDown('fast');
				} else {
					$('label[for="co_insurance_percentage"] .error').slideUp('fast');
				}
				if(isNaN(loss)) {
					$('label[for="loss"] .error').find('span').text('Please enter a valid number.');
					$('label[for="loss"] .error').slideDown('fast');
				} else {
					$('label[for="loss"] .error').slideUp('fast');
				}
			}
			
			


		});


		
		
		
	}

	

	// Caravan form
	function caravanForm(){
		var dollarAmounts = $('.dollar-amount input');
		// numberWithCommas(insurerPays)
		function numberWithCommas(x) {
	        return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	    }
		dollarAmounts.each(function(){
			$(this).on('keyup', function(){
				var amount = $(this).val();
				// remove existing commas
				amount = parseFloat(amount.replace(/,/g, ''));
				// add commas
				if(!isNaN(amount)) {
					$(this).val(numberWithCommas(amount))
				} 
			});
		});
	}

	if($('body.caravan').length) {
		caravanForm();
	}
	