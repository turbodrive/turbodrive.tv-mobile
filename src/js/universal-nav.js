/*jslint browser: true*/
/*global $, jQuery, alert*/

$(window).load(function () {
    // load instead of ready to get right values for height.
    
    "use strict";
    var closeButton = $("#close-button"),
        openButton = $("#open-button"),
        infoButton = $("#info-button"),
        blogButton = $("#blog-dropdown"),
        brand = $(".brand"),
        uninav = $("#nav"),
        mainMenu = $(".menu .main"),
        viewportWidth,
        viewportHeight,
        subMenuHeight,
        hMenuBase,
        hMenuInfo,
        hMenuSub,
        leftOpen,
        infoIsOpen = false,
        submenuIsOpen = false,
        menuIsOpen = true,
        isBlog = true,
        
        updateMenuLeftStatus = function () {
            if (!infoIsOpen) {
                mainMenu.css("left", leftOpen + "px");
            } else {
                mainMenu.css("left", "0px");
            }
        },
        
        updateSubMenuHeight = function () {
            if (submenuIsOpen && !infoIsOpen) {
                $("ul.sub-menu").css("height", subMenuHeight + "px");
                setTimeout(function () {
                    $("ul.sub-menu").addClass("fast-transition");

                }, 400);

            } else {
                $("ul.sub-menu").css("height", "0px");
                setTimeout(function () {
                    $("ul.sub-menu").removeClass("fast-transition");

                }, 400);
            }
        },
        
        updateBrandPadding = function () {
            if (hMenuBase === undefined) {
                hMenuBase = brand.height() + mainMenu.height();
            }
            hMenuSub = hMenuBase + subMenuHeight;
            hMenuInfo = hMenuBase + 50;

            var useH = infoIsOpen ? hMenuInfo : (submenuIsOpen ? hMenuSub : hMenuBase),
                pBrand = (viewportHeight - useH) * 0.5;
            pBrand = pBrand < 40 ? 40 : pBrand;
            
            brand.css("padding-top", pBrand + "px");
        },
        
        updateNavHeight = function () {
            menuIsOpen = uninav.hasClass("minified");
            if (menuIsOpen) {
                uninav.css("height", "40px");
            } else {
                uninav.css("height", viewportHeight + "px");
            }
        },
        
        onResizeWindowHandler = function (e) {
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;
            leftOpen = (window.innerWidth - 220) * 0.5;
        },
        
        init = function () {
            isBlog = uninav.hasClass("blog");
            var subMenuChildren = $(".sub-menu").children(),
                linkMain = $(".nav .main a"),
                height = -90,
                max,
                w,
                mr,
                i;
            
            for (i = 0; i < subMenuChildren.length; i += 1) {
                height += $(subMenuChildren[i]).height();
            }
            subMenuHeight = height;

            for (i = 0, max = linkMain.length; i < max; i += 1) {
                w = $(linkMain[i]).width() + 2;
                mr = (220 - w) * 0.5;
                $(linkMain[i]).css("width", w + "px");
                $(linkMain[i]).css("display", "block");
                $(linkMain[i]).css("margin-right", mr + "px");
            }

            if (isBlog) {
                closeButton.click();
                blogButton.parent().click();
            }
        };
    
    /* USER / BROWSER EVENTS */
    
    /* CLOSE BUTTON */
    closeButton.click(function () {
        uninav.addClass("minified");
        updateNavHeight();
        setTimeout(function () {
            if (infoIsOpen) {
                infoButton.click();
            }
        }, 300);
        
    });
    
    openButton.click(function () {
        uninav.removeClass("minified");
        updateNavHeight();
    });
    
    /* INFO MENU */
    infoButton.click(function () {
        uninav.toggleClass("info");
        infoIsOpen = uninav.hasClass("info");
        updateMenuLeftStatus();
        updateSubMenuHeight();
        
        if (infoIsOpen) {
            $(".menu-button").css("width", (viewportWidth * 0.43) + "px");
            setTimeout(function () {
                //$(".over-details").addClass("immediate");
                $(".over-details").css("display", "inline-block");
                $(".over-details").animate({opacity: 1}, 300);
                
                mainMenu.addClass("delayed-transition");
                
            }, 600);
            
        } else {
            $(".menu-button").css("width", "220px");
            $(".over-details").css("display", "none");
            $(".over-details").css("opacity", 0);
            
            setTimeout(function () {
                mainMenu.removeClass("delayed-transition");
                
            }, 500);
        }
        
        updateBrandPadding();
        
        /*margin*/
        var linkMain = $(".nav .main a"),
            mr,
            i,
            max;
        for (i = 0, max = linkMain.length; i < max; i += 1) {
            if (infoIsOpen) {
                $(linkMain[i]).css("margin-right", "0px");
            } else {
                mr = (220 - $(linkMain[i]).width()) * 0.5;
                $(linkMain[i]).css("margin-right", mr + "px");
            }
        }
    });
    
    /* BLOG SUB-MENU */
    blogButton.parent().click(
        function () {
            if (infoIsOpen || !isBlog) {
                return;
            }
            var p = $(this).parent().parent();
            p.toggleClass("open");
            submenuIsOpen = p.hasClass("open");
            updateSubMenuHeight();
            updateBrandPadding();
        }
    );
    
    window.addEventListener("resize", onResizeWindowHandler);
    
    /*Start*/
    onResizeWindowHandler();
    updateBrandPadding();
    updateNavHeight();
    init();
    updateMenuLeftStatus();
});