function buttonPush(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function buttonPush2(cmd) {
    var frm = document.forms['man001Form'];
    frm.CMD.value=cmd;
    frm.submit();
    return false;
}

function movePortalSetting() {
    document.man001Form.ptlBackPage.value=1;
    document.man001Form.CMD.value='portalSetting';
    document.man001Form.submit();
    return false;
}

function loadSortable() {
    var lockFlg = document.forms['lockForm'].lockFlg.value;
    if (lockFlg == 1) {
        return false;
    }
    createSortable();
}

$(function () {
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

    $(document).on("click", "#lockFlg_02", function() {
        $( ".js_column" ).sortable({
            opacity: 0.6,
            tolerance: 'pointer',
            connectWith: '.js_column2',
            stop: function(event, ui) {

                var paramString = '';

                positionParam = String($('#mainScreenListLeft').sortable('toArray'));
                if (positionParam != null && positionParam != '') {
                    idList = positionParam.split(",");
                    for (count = 0; count < idList.length; count++) {
                        paramString += '&man001PositionLeft=' + idList[count];
                    }
                }

                positionParam = String($('#mainScreenListRight').sortable('toArray'));
                if (positionParam != null && positionParam != '') {
                    idList = positionParam.split(",");
                    for (count = 0; count < idList.length; count++) {
                        paramString += '&man001PositionRight=' + idList[count];
                    }
                }

                jQuery.ajax("../main/man001.do?CMD=setPosition" + paramString);

            },
            over: function(event, ui) {
                $(ui.item).css("width", "75%");
            }
        });

        $( ".js_column2" ).sortable({
            opacity: 0.6,
            tolerance: 'pointer',
            connectWith: '.js_column',
            stop: function(event, ui) {

               var paramString = '';

               positionParam = String($('#mainScreenListLeft').sortable('toArray'));
               if (positionParam != null && positionParam != '') {
                   idList = positionParam.split(",");
                   for (count = 0; count < idList.length; count++) {
                       paramString += '&man001PositionLeft=' + idList[count];
                   }
               }

               positionParam = String($('#mainScreenListRight').sortable('toArray'));
               if (positionParam != null && positionParam != '') {
                   idList = positionParam.split(",");
                   for (count = 0; count < idList.length; count++) {
                       paramString += '&man001PositionRight=' + idList[count];
                   }
               }

               jQuery.ajax("../main/man001.do?CMD=setPosition" + paramString);

            },
            over: function(event, ui) {
                $(ui.item).css("width", "25%");
            }
        });

        $( ".js_column3" ).sortable({
            opacity: 0.6,
            tolerance: 'pointer',
            connectWith: '.js_column3',
            stop: function(event, ui) {saveScreenPosition();}
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
    });

   Initialization();
   $('#mainScreenListLeft').sortable( "disable" )
   $('#mainScreenListRight').sortable( "disable" )
   $('#mainScreenListTop').sortable( "disable" )
   $('#mainScreenListBottom').sortable( "disable" )
   $('#mainScreenListCenter').sortable( "disable" )


   //ヘッダーソートホバー設定
   $(document).on('click', '.mainTable .js_table_header-evt', function(e) {
       if (e.target.type == undefined) {
           $(this).find('a, button, select:not([multiple])').click();
       }
   });
   $('#mainScreenListLeft').children().removeClass( "ui-sortable-handle" );
   $('#mainScreenListRight').children().removeClass( "ui-sortable-handle" );
   $('#mainScreenListTop').children().removeClass( "ui-sortable-handle" );
   $('#mainScreenListBottom').children().removeClass( "ui-sortable-handle" );
   $('#mainScreenListCenter').children().removeClass( "ui-sortable-handle" );
});

function saveScreenPosition() {
    Initialization();
    var paramString = '';
    if ($('#mainScreenListLeft').length != 0) {
        positionParam = String($('#mainScreenListLeft').sortable('toArray'));
    } else {
        positionParam = '';
    }
    if (positionParam != null && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            paramString += '&man001PositionLeft=' + idList[count];
        }
    }
    if ($('#mainScreenListRight').length != 0) {
        positionParam = String($('#mainScreenListRight').sortable('toArray'));
    } else {
        positionParam = '';
    }
    if (positionParam != null && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            paramString += '&man001PositionRight=' + idList[count];
        }
    }

    if ($('#mainScreenListTop').length != 0) {
        positionParam = String($('#mainScreenListTop').sortable('toArray'));
    } else {
        positionParam = '';
    }
    if (positionParam != null && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            paramString += '&man001PositionTop=' + idList[count];
        }
    }

    if ($('#mainScreenListBottom').length != 0) {
        positionParam = String($('#mainScreenListBottom').sortable('toArray'));
    } else {
        positionParam = '';
    }
    if (positionParam != null && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            paramString += '&man001PositionBottom=' + idList[count];
        }
    }

    if ($('#mainScreenListCenter').length != 0) {
        positionParam = String($('#mainScreenListCenter').sortable('toArray'));
    } else {
        positionParam = '';
    }
    if (positionParam != null && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            paramString += '&man001PositionCenter=' + idList[count];
        }
    }
    jQuery.ajax("../main/man001.do?CMD=setPosition" + paramString);
    return false;
}

function destroySortable(){
     Initialization()
     $('#mainScreenListLeft').sortable( "disable" )
     $('#mainScreenListRight').sortable( "disable" )
     $('#mainScreenListTop').sortable( "disable" )
     $('#mainScreenListBottom').sortable( "disable" )
     $('#mainScreenListCenter').sortable( "disable" )
}

function createSortable(){
     Initialization()
     $('#mainScreenListLeft').sortable( "enable" )
     $('#mainScreenListRight').sortable( "enable" )
     $('#mainScreenListTop').sortable( "enable" )
     $('#mainScreenListBottom').sortable( "enable" )
     $('#mainScreenListCenter').sortable( "enable" )
}

function man001ChangeSearchMode(mode) {
    var webObj = document.getElementById('man001searchWeb');
    var imgObj = document.getElementById('man001searchImage');

    if (mode == 1) {
        webObj.setAttribute('class', 'web mode_font_not_select');
        imgObj.setAttribute('class', 'image mode_font_select');
    } else {
        webObj.setAttribute('class', 'web mode_font_select');
        imgObj.setAttribute('class', 'image mode_font_not_select');
    }

    document.getElementsByName('man001searchMode')[0].value = mode;
}

function infoConf(cmd){
    document.forms['man001Form'].CMD.value=cmd;
    document.forms['man001Form'].submit();
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


function initArea() {
    if (document.forms['man001Form'].man001layoutDefFlg.value == "false") {

        hideArea('Top', document.forms['man001Form'].man001areaTop.value);
        hideArea('Left', document.forms['man001Form'].man001areaLeft.value);
        hideArea('Center', document.forms['man001Form'].man001areaCenter.value);
        hideArea('Right', document.forms['man001Form'].man001areaRight.value);
        hideArea('Bottom', document.forms['man001Form'].man001areaBottom.value);
        setAreaWidth();
    }

}

function hideArea(areaType, value) {
    if (value == "0") {
        $('#mainScreenList' + areaType).show();
    } else {
        $('#mainScreenList' + areaType).hide();
    }
}

function setAreaWidth() {

    var leftFlg = (document.forms['man001Form'].man001areaLeft.value == "0");
    var centerFlg = (document.forms['man001Form'].man001areaCenter.value == "0");
    var rightFlg = (document.forms['man001Form'].man001areaRight.value == "0");

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

function Initialization() {
    $('#mainScreenListLeft').sortable();
    $('#mainScreenListRight').sortable();
    $('#mainScreenListTop').sortable();
    $('#mainScreenListBottom').sortable();
    $('#mainScreenListCenter').sortable();
}