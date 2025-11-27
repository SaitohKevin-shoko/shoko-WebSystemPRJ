var initTtpPositionTop = 15;
var initTtpPositionLeft = 15;
var ttpMinWidth = 70;
var ttpOpacity = 85;

$(function(){
    $("span.tooltips").each(function() {
        $(this).css("display","none");
    });
    $("a:has(span.tooltips)").mouseover(function(e){
        $("form").append("<div id=\"ttp\">"+ ($(this).children("span.tooltips").html()) +"</div>");
        setTooltipMouseOver(e);
    }).mousemove(function(e){
        setTooltipPosition(e);
    }).mouseout(function(){
        $("#ttp").remove();
    });

    $(".js_nlTooltips").each(function() {
        $(this).css("display","none");
    });
    $(".js_nlTooltips").parent().mouseover(function(e){
        $("form").append("<div id=\"ttp\">"+ ($(this).children(".js_nlTooltips").html()) +"</div>");
        setTooltipMouseOver(e);
    }).mousemove(function(e){
        setTooltipPosition(e);
    }).mouseout(function(){
        $("#ttp").remove();
    });
});

function setTooltipMouseOver(e) {
    setTooltipPosition(e)
    $("#ttp")
    .css("display","none")
    .css("filter","alpha(opacity=" + ttpOpacity + ")")
    .fadeIn("fast")
} 

function setTooltipPosition(e) {
    setTooltipSize(e);
    var tooltipW = $("#ttp").outerWidth() + (e.pageX) + initTtpPositionLeft;
    if (tooltipW > document.documentElement.clientWidth) {
        var tooltipPosW = (e.pageX) - ttpMinWidth - initTtpPositionLeft;
        $("#ttp")
        .css("top",(e.pageY) + initTtpPositionTop + "px")
        .css("left",tooltipPosW + "px")
    } else {
        var tooltipPosW = (e.pageX) + initTtpPositionLeft
        $("#ttp")
        .css("top",(e.pageY) + initTtpPositionTop + "px")
        .css("left",tooltipPosW + "px")
    }
}

function setTooltipSize(e) {
    var maxHeigth = document.documentElement.offsetHeight - (e.pageY) - initTtpPositionTop;
    var maxWidth = document.documentElement.clientWidth - (e.pageX);
    if (maxWidth < ttpMinWidth) {
        maxWidth = ttpMinWidth;
    }
    $("#ttp")
    .css("max-height", maxHeigth + "px")
    .css("max-width", maxWidth + "px")
    .css("min-width", ttpMinWidth + "px")
    .css("overflow", "hidden");
}