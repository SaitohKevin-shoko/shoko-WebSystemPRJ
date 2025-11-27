function loop(opa) {
     if (opa <= 100) {
       element.style.filter = "alpha(opacity:"+opa+")";
       element.style.opacity = opa/100;
       opa = opa + 15;
       setTimeout("loop(" + opa + ")", 10);
     }
   }

$(function(){
  $(document).on('mouseenter', ".js_mainTooltip", function(e) {
      $(this).children(".js_addTooltip").append("<div id=\"ttp\"><table class=\"table-noBorder\"><tr class=\"tooltip_body\"><td class=\"no_w border_right_none\">"
        + ($(this).data("tooltip")) +"</td></tr></table></div>");

       setMouseEnterEvt(e);
  });

  $(document).on('mousemove', ".js_mainTooltip", function(e) {
      setMouseMoveEvt(e);
  });

  $(document).on('mouseleave', ".js_mainTooltip", function(e) {
      setMouseLeaveEvt(e);
  });


  $(document).on('mouseenter', "a:has(span.tooltips)", function(e) {
      $(this).append("<div id=\"ttp\"><table class=\"table-noBorder\"><tr class=\"tooltip_body\"><td class=\"no_w border_right_none\">"
          + ($(this).children("span.tooltips").html()) +"</td></tr></table></div>");

      setMouseEnterEvt(e);
  });

  $(document).on('mousemove', "a:has(span.tooltips)", function(e) {
      setMouseMoveEvt(e);
  });

  $(document).on('mouseleave', "a:has(span.tooltips)", function(e) {
      setMouseLeaveEvt(e);
  });

});
      
function setMouseEnterEvt(e) {
    $("#ttp")
      .css("position","absolute")
      .css("text-align","left")
      .css("font-size","12px")
      .css("top",(e.pageY) + 15 + "px")
      .css("left",(e.pageX) + 15 + "px")

    var opa = 10;
    element = document.getElementById("ttp");
    element.style.visibility = "visible";
    loop(opa);
}

function setMouseMoveEvt(e) {
    $("#ttp")
      .css("top",(e.pageY) + 15 + "px")
      .css("left",(e.pageX) + 15 + "px");
}

function setMouseLeaveEvt(e) {
    $("#ttp").remove();
}