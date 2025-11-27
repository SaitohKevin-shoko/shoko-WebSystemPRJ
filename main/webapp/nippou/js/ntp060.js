$(function() {
    $(".js_ankenLinkTag").on("click", function(){
        buttonSubmit('edit',$(this).attr('id'));
    });

    //見積もり金額ツールチップ
    $(".js_mitumoriKinStrArea").on("mouseenter",function(e){
        $("#tooltip_area").append("<div id=\"ttp\">"+ ($(this).next().html()) +"</div>");
        $("#ttp")
         .css("position","absolute")
         .css("top",(e.pageY) - 35 + "px")
         .css("left",(e.pageX) - 70 + "px")
         .removeClass('display_none')
         .css("filter","alpha(opacity=85)")
         .fadeIn("fast");
    }).on("mousemove",function(e){
        $("#ttp")
         .css("top",(e.pageY) - 35 + "px")
         .css("left",(e.pageX) - 70 + "px")
    }).on("mouseleave",function(e){
        $("#ttp").remove();
    });

    //受注金額ツールチップ
    $(".js_jutyuKinStrArea").on("mouseenter",function(e){
        $("#tooltip_area").append("<div id=\"ttp\">"+ ($(this).next().html()) +"</div>");
        $("#ttp")
         .css("position","absolute")
         .css("top",(e.pageY) - 35 + "px")
         .css("left",(e.pageX) - 70 + "px")
         .removeClass('display_none')
         .css("filter","alpha(opacity=85)")
         .fadeIn("fast");
    }).on("mousemove",function(e){
        $("#ttp")
         .css("top",(e.pageY) - 35 + "px")
         .css("left",(e.pageX) - 70 + "px")
    }).on("mouseleave",function(e){
        $("#ttp").remove();
    });

});

function buttonSubmit(mode, sid) {
    document.forms[0].ntp060NanSid.value=sid;
	setParams();        
    buttonPush(mode);
}
function changePage(pageCombo) {
    if (pageCombo == 0) {
        document.forms[0].ntp060PageBottom.value = document.forms[0].ntp060PageTop.value;
    } else {
        document.forms[0].ntp060PageTop.value = document.forms[0].ntp060PageBottom.value;
    }
    buttonPush('changePage');
}

function ntpSearch(sid) {
    document.forms[0].paramAnkenSid.value = sid;
    document.forms[0].CMD.value='ntpSearch';
    setParams();
    document.forms[0].submit();
    return false;
}

function setParams() {
	setYmdParam($("input[name='ntp060FrDate']"),
        $("input[name='ntp060FrYear']"),
        $("input[name='ntp060FrMonth']"),
        $("input[name='ntp060FrDay']"));
        
    setYmdParam($("input[name='ntp060ToDate']"),
        $("input[name='ntp060ToYear']"),
        $("input[name='ntp060ToMonth']"),
        $("input[name='ntp060ToDay']"));
}