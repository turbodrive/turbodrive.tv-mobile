var mainMenu,mainContent,mainHeader,hireMeButton,warningMobile,bttrButton,video,videoContainer,playButton,menuPausedVideo=!1,viewportHeight=0,viewportWidth=0,contactPanelIsOpen=!1,flashUrl="http://flash.turbodrive.tv/",html5Url="http://www.turbodrive.tv/",mobileUrl="http://m.turbodrive.tv/",redirectEnabled=!0,hWarning=200,isIOS7=!1;$(document).ready(function(){Modernizr.addTest("ipad",function(){return!!navigator.userAgent.match(/iPad/i)}),Modernizr.addTest("iphone",function(){return!!navigator.userAgent.match(/iPhone/i)}),Modernizr.addTest("ipod",function(){return!!navigator.userAgent.match(/iPod/i)}),Modernizr.addTest("android",function(){return!!navigator.userAgent.match(/android/i)}),Modernizr.addTest("ieMobile",function(){return!!navigator.userAgent.match(/IEMobile/i)}),Modernizr.addTest("ie",function(){return!!navigator.userAgent.match(/MSIE/i)}),Modernizr.addTest("ie2",function(){return!!navigator.userAgent.match(/Trident/i)}),Modernizr.addTest("appleios",function(){return Modernizr.ipad||Modernizr.ipod||Modernizr.iphone}),Modernizr.addTest("mobile",function(){return Modernizr.appleios||Modernizr.android||Modernizr.ieMobile}),redirectEnabled&&(!Modernizr.video||Modernizr.ie||Modernizr.ie2?window.location.href=flashUrl:Modernizr.mobile&&screen.height<1e3&&screen.width<1e3||(window.location.href=html5Url)),Modernizr.addTest("ios7",function(){return!!navigator.userAgent.match(/OS 7_\d/i)}),isIOS7=Modernizr.ios7,$(".menu-button").on("click",clickMenuButtonHandler),$(".lines-button").on("click",clickMenuButtonHandler),$("a").on("click",clickAnchorHandler),mainMenu=$(".menu"),$(window).resize(resizeHandler),video=$("#video")[0],video.addEventListener("webkitbeginfullscreen",onVideoBeginsFullScreen,!1),video.addEventListener("webkitendfullscreen",onVideoEndsFullScreen,!1),videoContainer=$(".intro-reel"),mainContent=$(".main-content"),mainContent.scroll(updateScroll),mainHeader=$(".main-header"),hireMeButton=$(".main-header .hire-me"),warningMobile=$(".warning-mobile"),bttrButton=$(".bttr-button"),bttrButton.on("click",function(a){a.preventDefault(),setMode(REEL_MODE),closeMenu()}),$("#submit_btn").on("click",submitMessage),$(".email").on("click",clickEmailLinkHandler),playButton=$("#play-pause"),playButton.on("click",function(){return menuIsOpen?void closeMenu():warningOpen?void closeWarning():(video.controls=!0,video.webkitSupportsFullscreen&&video.webkitEnterFullscreen(),video.play(),$(video).css("display","inline"),playButton.hide(),void warningMobile.hide())}),$(".form-feedback").hide(),$(".form-feedback").on("click",removeFeedback),$(".feedback-filter").on("click",removeFeedback),setMode(REEL_MODE),window.scrollTo(0,1),resizeHandler(),$(".buttonShare, .trackSocial").on("click",function(){var a=$(this).attr("data-network"),b=$(this).attr("data-action");ga("send","social",a,b,window.location)}),$(".trackEvent").on("click",function(){var a=$(this).attr("data-event").split(",");ga("send","event",a[0],a[1],a[1])}),document.addEventListener("touchmove",touchMoveHandler),document.addEventListener("touchstart",touchstartHandler),document.addEventListener("touchend",touchendHandler)});var startx,starty,touchMoveHandler=function(a){var b=a.changedTouches[0],c=b.pageX-startx,d=b.pageY-starty;return Math.abs(3*c)>Math.abs(d)&&a.preventDefault(),starty>viewportHeight-30&&30>d&&(warningOpen||openWarning()),d>30&&warningOpen?void closeWarning():(startx>viewportWidth-50&&50>c&&(contactPanelIsOpen||menuIsOpen||openMenu()),targetIsAPartOfMenu&&c>30&&menuIsOpen?(startx=6e3,void closeMenu()):void(100>startx&&c>15&&(contactPanelIsOpen||currentMode!=ABOUT_MODE||setMode(REEL_MODE,!0))))},targetTouchStart,targetIsAPartOfMenu=!1,touchstartHandler=function(a){var b=a.changedTouches[0];startx=b.pageX,starty=b.pageY,targetTouchStart=a.target,targetIsAPartOfMenu=$.contains(mainMenu[0],targetTouchStart)},touchendHandler=function(){};onVideoBeginsFullScreen=function(){},onVideoEndsFullScreen=function(){video.pause(),playButton.show(),warningMobile.show(),$(video).css("display","none")};var resizeHandler=function(){viewportHeight=window.innerHeight,viewportWidth=window.innerWidth,contactPanelIsOpen&&updateContactPanel(),mainContent.css("height",viewportHeight)},REEL_MODE="reel mode",ABOUT_MODE="about mode",menuIsOpen=!1,currentMode="",updateScroll=function(){var a=mainContent.scrollTop();70>=a?mainHeader.removeClass("opaque"):mainHeader.addClass("opaque")},setMode=function(a,b){if(a!=currentMode){currentMode=a,currentMode==REEL_MODE?(warningMobile.removeClass("small"),b?(mainContent.addClass("boost-transition"),mainHeader.addClass("boost-transition"),hireMeButton.addClass("boost-transition"),mainContent.animate({right:"-100%"},200,function(){mainContent.removeClass("boost-transition"),mainHeader.removeClass("boost-transition"),hireMeButton.removeClass("boost-transition")}),mainHeader.animate({right:"-100%"},200),hireMeButton.animate({right:"-100%"},200)):(mainContent.animate({right:"-100%"},400),mainHeader.animate({right:"-100%"},300),hireMeButton.animate({right:"-100%"},200))):(mainContent.animate({right:"0%"},300),mainHeader.animate({right:"0%"},400),hireMeButton.animate({right:"0%"},500),warningMobile.addClass("small"),warningMobile.show());var c=currentMode==REEL_MODE?-hWarning:-hWarning-20;warningMobile.animate({bottom:c},300,function(){warningOpen=!1})}},clickMenuButtonHandler=function(){return contactPanelIsOpen?(closeContactPanel(),void(contact_direct&&closeMenu())):void(menuIsOpen?(closeMenu(),menuPausedVideo&&(menuPausedVideo=!1,video.play())):openMenu())},openMenu=function(){menuIsOpen||(video.paused||(menuPausedVideo=!0,video.pause()),mainMenu.animate({right:"0%"},300),currentMode==ABOUT_MODE&&bttrButton.animate({left:"0%"},250),menuIsOpen=!0)},closeMenu=function(){mainMenu.animate({right:"-100%"},300,function(){menuIsOpen=!1}),bttrButton.animate({left:"-100%"},200)},scrollToSection=function(a){var b=$("#"+a).position().top-100;mainContent.animate({scrollTop:b},500)},warningOpen=!1,openWarning=function(){warningMobile.animate({bottom:-0},300,function(){$(document).on("click",closeWarning)}),videoContainer.animate({top:-hWarning},300),mainContent.animate({top:-hWarning},300),mainHeader.animate({top:-hWarning},300),hireMeButton.animate({top:-hWarning},300),warningOpen=!0},closeWarning=function(){$(document).off("click",closeWarning);var a=currentMode==REEL_MODE?-hWarning:-hWarning-20;warningMobile.animate({bottom:a},300,function(){warningOpen=!1}),videoContainer.animate({top:0},300),mainContent.animate({top:0},300),mainHeader.animate({top:0},300),hireMeButton.animate({top:0},300)},updateContactPanel=function(){if($(".contact-panel").css("height",viewportHeight-36),"share"==currentContactSectionId){var a=$("#share-section").offset().top-120;$(".contact-panel").scrollTop(a)}},currentContactSectionId="",openContactPanel=function(a){if(removeFeedback(),contactPanelIsOpen||$(".contact-panel").animate({height:viewportHeight}),currentContactSectionId=a,"share"==a){var b=$("#share-section").offset().top-120;$(".contact-panel").animate({scrollTop:b},500)}else $(".contact-panel").animate({scrollTop:0},500);contactPanelIsOpen=!0,$(".lines-button.x").addClass("close")},closeContactPanel=function(){removeFeedback(),$(".contact-panel").animate({height:0}),contactPanelIsOpen=!1,$(".lines-button.x").removeClass("close")},contact_direct=!1,clickAnchorHandler=function(a){a.preventDefault();var b=$(this).attr("data-id"),c=$(this).attr("data-section"),d=$(this).attr("href");if(void 0==b&&void 0==c){if("#"==d)return;"_blank"==$(this).attr("target")?window.open(d,"_blank"):window.location.href=d,closeMenu()}else"email"==b||"email-direct"==b||"share"==b||"hire-me"==b?(contact_direct="email-direct"==b||"hire-me"==b,openMenu(),openContactPanel(b)):("mobile-info"==b?warningOpen?closeWarning():openWarning():("reel"==b?setMode(REEL_MODE,!1):setMode(ABOUT_MODE,!1),closeWarning(),void 0!=c&&scrollToSection(c)),closeMenu())},removeFeedback=function(){$(".feedback-filter").removeClass("open"),$(".form-feedback").animate({opacity:0,bottom:295},300,function(){})},removeErrorClasses=function(){$(this).off("click",removeErrorClasses),$(this).removeClass("field-error")},sentEmailHandler=function(a){$(".feedback-filter").addClass("open");var b;"error"==a.type?(b=a.text,$("#error-content").html(b),$(".form-feedback.error").show(),$(".form-feedback.error").css("opacity",0),$(".form-feedback.error").css("bottom","35%"),$(".form-feedback.error").animate({opacity:1,bottom:"45%"},300),$(".form-feedback.success").hide()):($(".form-feedback.error").hide(),$(".form-feedback.success").show(),$(".form-feedback.success").css("opacity",0),$(".form-feedback.success").css("bottom","35%"),$(".form-feedback.success").animate({opacity:1,bottom:"45%"},300))},submitMessage=function(){removeFeedback("null");var a=$("input[name=email]").val(),b=$("textarea[name=message]").val(),c="Message from Turbodrive Contact form - [mobile]",d=!0;if(""==a&&($("input[name=email]").addClass("field-error"),$("input[name=email]").on("click",removeErrorClasses),d=!1),""==b&&($("textarea[name=message]").addClass("field-error"),$("textarea[name=message]").on("click",removeErrorClasses),d=!1),d){var e={userEmail:a,userMessage:b,userSubject:c};$.post("php/contact.php",e,sentEmailHandler,"json")}},clickEmailLinkHandler=function(){linkTo_UnCryptMailto("nbjmup;jogpAuvscpesjwf/uw")},UnCryptMailto=function(a){for(var b=0,c="",d=0;d<a.length;d++)b=a.charCodeAt(d),b>=8364&&(b=128),c+=String.fromCharCode(b-1);return c},linkTo_UnCryptMailto=function(a){window.open(UnCryptMailto(a),"_blank")};