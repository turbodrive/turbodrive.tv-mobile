$(window).load(function() {
    // load instead of ready to get right values for height.
    
    var closeButton = $("#close-button");
    var infoButton = $("#info-button");
    var blogButton = $("#blog-dropdown");
    var uninav = $("#nav");
    var subMenuHeight;
    
    infoButton.click(function(){
           uninav.toggleClass("info");
    })
    
    blogButton.click(function(){        
        var p = $(this).parent();
        if(!p.hasClass("open")){
            $("ul.sub-menu").css("height", subMenuHeight+"px");
        }else {
            $("ul.sub-menu").css("height", "0px");   
        }
        $(this).parent().toggleClass("open");
        
    })
    
    
    var getSubMenuHeight = function() {
        var subMenuChildren = $(".sub-menu").children()
        var height = 0;
        for(var i=0; i< subMenuChildren.length; i++){
            height += $(subMenuChildren[i]).height();
        }
        subMenuHeight = height;
        
        var linkMain = $(".nav .main a")
        //var height = 0;
        for(var i=0; i< linkMain.length; i++){
            var w = $(linkMain[i]).width();
            console.log("w> " +w )
            $(linkMain[i]).css("width", w+"px");
            $(linkMain[i]).css("display", "block");
        }
        subMenuHeight = height;
        
    }
    
    getSubMenuHeight();
});