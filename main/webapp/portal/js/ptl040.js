var portalSubWindow;
var portalPreview;

function changeOpenKbn(itemId, value){

    if (value == 1) {
        $('#portlet_area' + itemId).addClass("bgC_other1");
    } else {
        $('#portlet_area' + itemId).removeClass("bgC_other1");
    }

    var url = '../portal/ptl040.do';
    param= '?CMD=' + 'changeDsp';
    param= param + '&' + 'ptlPortalSid=' + document.forms[0].ptlPortalSid.value;
    param= param + '&' + 'ptl040PortalItemId=' + itemId;
    param= param + '&' + 'ptl040view=' + value;
    url = url + param;
    $.get(url);
}

function delPortlet(itemId, pltName){
    if (confirm(pltName + 'を削除します。\r\nよろしいですか?')) {
       var id = document.getElementById(itemId);
       var ptlParent = id.parentNode;

       var url = '../portal/ptl040.do';
       param= '?CMD=' + 'deletePosition';
       param= param + '&' + 'ptlPortalSid=' + document.forms[0].ptlPortalSid.value;
       param= param + '&' + 'ptl040PortalItemId=' + itemId;
       url = url + param;
       $.get(url);

       ptlParent.removeChild(id);
    }

    return false;
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

var subWindow;
var flagSubWindow = false;

$(function() {
    $( ".portal_area" ).sortable({ revert: true });
    $( ".portal_area" ).sortable({ opacity: 0.6 });
    $( ".portal_area" ).sortable({ tolerance: 'pointer' });
    $( ".portal_area" ).sortable({
        connectWith: ".portal_area"
    });
    $( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
                   .find( ".portlet-header" )
                   .addClass( "ui-widget-header ui-corner-all" )
                   .prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
                   .end()
                   .find( ".portlet-content" );
    $( ".portlet-header .ui-icon" ).click(function() {
          $( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
          $( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
    });
    $( ".portal_area" ).disableSelection();
    $( ".portal_area" ).sortable({
         stop: function(event, ui) {saveScreenPosition();}
    });

});

function saveScreenPosition() {
    var formData = new FormData();

    formData.append('CMD', 'setPosition');
    formData.append('ptlPortalSid', document.forms[0].ptlPortalSid.value);

    positionParam = String($('#mainScreenListTop').sortable('toArray'));
    if ($('#mainScreenListTop').length > 0 && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            formData.append('ptl040PortalItemHead', idList[count]);
        }
    }

    positionParam = String($('#mainScreenListBottom').sortable('toArray'));
    if ($('#mainScreenListBottom').length > 0 && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            formData.append('ptl040PortalItemBottom', idList[count]);
        }
    }

    positionParam = String($('#mainScreenListLeft').sortable('toArray'));
    if ($('#mainScreenListLeft').length > 0 && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            formData.append('ptl040PortalItemLeft', idList[count]);
        }
    }

    positionParam = String($('#mainScreenListCenter').sortable('toArray'));
    if ($('#mainScreenListCenter').length > 0 && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            formData.append('ptl040PortalItemCenter', idList[count]);
        }
    }

    positionParam = String($('#mainScreenListRight').sortable('toArray'));
    if ($('#mainScreenListRight').length > 0 && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            formData.append('ptl040PortalItemRight', idList[count]);
        }
    }

    $.ajax({
        async: true,
        url:  "../portal/ptl040.do",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false
    }).done(function( data ) {
    }).fail(function(data){
    });

    return false;
}


function initChgArea() {

    var topView = document.forms[0].ptl040areaTop.value;
    var bottomView = document.forms[0].ptl040areaBottom.value;
    var leftView = document.forms[0].ptl040areaLeft.value;
    var centerView = document.forms[0].ptl040areaCenter.value;
    var rightView = document.forms[0].ptl040areaRight.value;

    areaShowOrHide('Top', topView);
    areaShowOrHide('Bottom', bottomView);
    areaShowOrHide('Left', leftView);
    areaShowOrHide('Center', centerView);
    areaShowOrHide('Right', rightView);

    spaceShowOrHide();
}

function chgArea(checkId, areaType, view) {

    areaShowOrHide(areaType, view);
    setAreaWidth();
    spaceShowOrHide();
}

function areaShowOrHide(areaType, view) {

    if (view == 0) {
        $('#mainScreenList' + areaType).removeClass("display_n");
    } else {
        $('#mainScreenList' + areaType).addClass("display_n");
    }

    setAreaWidth();
    spaceShowOrHide();
}

function setAreaWidth() {

    var leftFlg = (document.forms[0].ptl040areaLeft.value == 0);
    var centerFlg = (document.forms[0].ptl040areaCenter.value == 0);
    var rightFlg = (document.forms[0].ptl040areaRight.value == 0);

    if (leftFlg) {
        if (centerFlg && rightFlg) {
           $('#mainScreenListLeft').addClass("w33");
           $('#mainScreenListCenter').addClass("w34");
           $('#mainScreenListRight').addClass("w33");
        } else {

           if (centerFlg && !rightFlg) {
               $('#mainScreenListLeft').addClass("w30");
               $('#mainScreenListCenter').addClass("w70");
           } else if (!centerFlg && rightFlg) {
               $('#mainScreenListLeft').addClass("w50");
               $('#mainScreenListRight').addClass("w50");
           } else {
               $('#mainScreenListLeft').addClass("w100");

           }
        }

     } else {
         if (centerFlg && rightFlg) {
             $('#mainScreenListCenter').addClass("w70");
             $('#mainScreenListRight').addClass("w30");
         } else if (centerFlg && !rightFlg) {
             $('#mainScreenListCenter').addClass("w100");
         } else if (!centerFlg && rightFlg) {
             $('#mainScreenListRight').addClass("w100");
         }
     }
}

function spaceShowOrHide() {
    var leftView = document.forms[0].ptl040areaLeft.value;
    var centerView = document.forms[0].ptl040areaCenter.value;
    var rightView = document.forms[0].ptl040areaRight.value;
    var topView = document.forms[0].ptl040areaTop.value;
    var bottomView = document.forms[0].ptl040areaBottom.value;

    var leftSpaceDspFlg = false;
    if (leftView == 0) {
        if (centerView == 0 || rightView == 0) {
            leftSpaceDspFlg = true;
        }
    }

    var rightSpaceDspFlg = false;
    if (rightView == 0) {
        if (centerView == 0 || leftView == 0) {
            rightSpaceDspFlg = true;
        }
    }

    if (leftSpaceDspFlg == true) {
        $('#left_space').removeClass("display_n");
    } else {
        $('#left_space').addClass("display_n");
    }

    if (rightSpaceDspFlg == true) {
        if (leftSpaceDspFlg && centerView != 0) {
            $('#right_space').addClass("display_n");
        } else if (centerView == 0) {
            $('#right_space').removeClass("display_n");
        }
    } else {
        $('#right_space').addClass("display_n");
    }

    var topSpaceDspFlg = false;
    if (topView == 0) {
        if (leftView == 0 || centerView == 0 || rightView == 0 || bottomView == 0
                || (leftView != 0 && centerView != 0 && rightView != 0 && bottomView != 0)) {
            topSpaceDspFlg = true;
        }
    }

    var bottomDspFlg = false;
    if (bottomView == 0) {
        if (leftView == 0 || centerView == 0 || rightView == 0) {
            bottomDspFlg = true;
        } else if (topView != 0) {
            bottomDspFlg = false;
        } else if (!topSpaceDspFlg) {
            bottomDspFlg = true;
        }
    }

    if (topSpaceDspFlg == true) {
        $('#portal_space_Top').removeClass("display_n");
    } else {
        $('#portal_space_Top').addClass("display_n");
    }

    if (bottomDspFlg == true) {
        $('#portal_space_Bottom').removeClass("display_n");
    } else {
        $('#portal_space_Bottom').addClass("display_n");
    }
}

function openPortalPopup(num){
    var winWidth=600;
    var winHeight=400;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);
    var ptlSid = document.forms[0].ptlPortalSid.value;

    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=yes ,' +
    'resizable=yes , left=' + winx + ', top=' + winy + ',scrollbars=yes';

    var popupHtml = '../portal/ptl080.do?ptlPortalSid=' + ptlSid;
    if (num && num == 1) {
        popupHtml = '../portal/ptl081.do?ptlPortalSid=' + ptlSid;
    }
    portalSubWindow = window.open(popupHtml, 'thissite', opt);

    return false;
}

function portalPopupClose() {
    if(portalSubWindow != null){
        portalSubWindow.close();
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

function openPortalPreview(sid) {
    var winLocation=0;
    var winStatus=0;
    var winToolbar=0;
    var winScrollbars=1;

    var opt = 'location=' + winLocation + ', status=' + winStatus + ', toolbar=' + winToolbar + ', scrollbars=' + winScrollbars;
    var popHtml = '../portal/ptl070.do?ptlPortalSid=' + sid;

    portalPreview = window.open(popHtml, 'portalPreview', opt);
}

function closePortalPreview() {
    if(portalPreview != null){
        portalPreview.close();
    }
}
