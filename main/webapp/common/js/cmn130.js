function buttonPush(cmd, sid){

    if (cmd == 'groupAdd') {
        document.forms[0].cmn130cmdMode.value = '0';
    } else if (cmd == 'groupEdit') {
        document.forms[0].cmn130cmdMode.value = '1';
        document.forms[0].cmn130selectGroupSid.value = sid;
    } else if (cmd == 'view'){
        document.forms[0].cmn130selectGroupSid.value = sid;
    }

    document.forms[0].CMD.value = cmd;
    document.forms[0].submit();
    return false;
}
var subWindow;
var flagSubWindow = false;
function opnDetail(gsid, kbn) {
    var winWidth=800;
    var winHeight=500;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ",left=" + winx + ",top=" + winy + ",toolbar=no,scrollbars=yes";

    var url = '../common/cmn132.do';
    url = url + '?cmn130selectGroupSid=' + gsid;
    url = url + '&cmn132MyGroupKbn=' + kbn;

    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;
        subWindow.focus();
    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
}
function windowClose(){
    if(subWindow != null){
        subWindow.close();
    }
}

function getCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

$(function() {
	$(".js_listClick_myGroup").live("click", function(){
      var sid = $(this).attr("id");
      buttonPush('groupEdit', sid);
    });

    $(".js_listClick_myGroupCount").live("click", function(){
      var sid = $(this).attr("id");
      opnDetail(sid, '0');
    });

    $(".js_listClick_shareGroup").live("click", function(){
      var sid = $(this).parent().attr("id");
      opnDetail(sid, '1');
    });

    /* 行 hover */
    $('.js_listHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });
})