function movePortal(ptlSid) {
    document.forms[0].ptlMainSid.value=ptlSid;
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function movePortalSetting() {
    document.forms[0].ptlBackPage.value=1;
    document.forms[0].CMD.value='portalSetting';
    document.forms[0].submit();
    return false;
}

function initArea() {
    hideArea('Top', document.forms[0].ptl010areaTop.value);
    hideArea('Left', document.forms[0].ptl010areaLeft.value);
    hideArea('Center', document.forms[0].ptl010areaCenter.value);
    hideArea('Right', document.forms[0].ptl010areaRight.value);
    hideArea('Bottom', document.forms[0].ptl010areaBottom.value);
    setAreaWidth();
}

function hideArea(areaType, value) {
    if (value == "0") {
        $('#mainScreenList' + areaType).show();
    } else {
        $('#mainScreenList' + areaType).hide();
    }
}

function setAreaWidth() {

    var leftFlg = (document.forms[0].ptl010areaLeft.value == "0");
    var centerFlg = (document.forms[0].ptl010areaCenter.value == "0");
    var rightFlg = (document.forms[0].ptl010areaRight.value == "0");

    var leftArea = document.getElementById('mainScreenListLeft');
    var centerArea = document.getElementById('mainScreenListCenter');
    var rightArea = document.getElementById('mainScreenListRight');

    if (leftFlg) {
        if (centerFlg && rightFlg) {
           $("#mainScreenListLeft").addClass("w33");
           $("#mainScreenListCenter").addClass("w33");
           $("#mainScreenListRight").addClass("w33");
        } else {

           if (centerFlg && !rightFlg) {
               $("#mainScreenListLeft").addClass("w30");
               $("#mainScreenListCenter").addClass("w70");
           } else if (!centerFlg && rightFlg) {
               $("#mainScreenListLeft").addClass("w50");
               $("#mainScreenListRight").addClass("w50");
           } else {
               $("#mainScreenListLeft").addClass("w100");
           }
        }

     } else {
         leftArea.width = '1';
         if (centerFlg && rightFlg) {
             $("#mainScreenListCenter").addClass("w70");
             $("#mainScreenListRight").addClass("w30");
         } else if (centerFlg && !rightFlg) {
             $("#mainScreenListCenter").addClass("w100");
         } else if (!centerFlg && rightFlg) {
             $("#mainScreenListRight").addClass("w100");
         }
     }
}

function openMainInfoWindow(sid) {

    var winWidth=800;
    var winHeight=600;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../main/man310.do?imssid=' + sid;

    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;
    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
}

$(function() {
    /*hover */
    $('.js_listHover')
      .mouseenter(function (e) {
          $(this).children().addClass("list_content-on");
          $(this).prev().children().addClass("list_content-topBorder");
      })
      .mouseleave(function (e) {
          $(this).children().removeClass("list_content-on");
          $(this).prev().children().removeClass("list_content-topBorder");
      });
    /* hover:click */
    $(document).on("click", ".js_listInfoClick", function(){
        window.location.href = $(this).parent().data('url');
    });

    //aタグhref属性に ${TIME} or ${HASH_UID_TM_KW} が含まれている
    $(document).on("click", "a[href *= '${TIME}'],a[href *= '${HASH_UID_TM_KW}']", function() {

        var url = $(this).attr("href");
        var target = $(this).attr("target");

        clickUrl(url, target);
        return false;
    });
});

function clickUrl(url, target) {

    //URL、パラメータ情報を取得する
    $.ajax({
        async: true,
        url:"../portal/ptl010.do",
        type: "post",
        data: {
            CMD: "getClickUrl",
            url: url}
    }).done(function( data ) {
        if (data != null || data != "") {

            var clickUrl = data.url;
            if( typeof target == 'undefined') {
                window.open(clickUrl, "body");
            } else {
                window.open(clickUrl, target);
            }
        }
    }).fail(function(data){
        //JSONデータ失敗時の処理
    });
}