$(function() {
    $(document).on("change", ".js_LimitChange",function(){
      limitFreeCheck()
    });
    limitFreeCheck();
});

function limitFreeCheck() {
  var free = $(".js_LimitChange").val();
  if (free == 14) {
    $(".js_limitFree").removeClass("display_n");
  } else {
    $(".js_limitFree").addClass("display_n");
  }
}