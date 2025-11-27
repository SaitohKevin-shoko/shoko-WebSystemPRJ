function changeZasekiCombo(){
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}
function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='';
    document.forms[0].sortKey.value = fid;
    document.forms[0].orderKey.value = order;
    document.forms[0].submit();
    return false;
}
function updateZasekiStatus(uid, status){
    document.forms[0].CMD.value='zskEdit';
    document.forms[0].uioUpdateUsrSid.value=uid;
    document.forms[0].uioUpdateStatus.value=status;
    document.forms[0].submit();
    return false;
}
function moveCreateMsg(uid, ukbn){
    document.forms[0].CMD.value='newsmail';
    document.forms[0].sch010SelectUsrSid.value=uid;
    document.forms[0].sch010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}
function moveMonthSchedule(cmd, uid, ukbn){
    window.document.forms[0].CMD.value=cmd;
    window.document.forms[0].sch010SelectUsrSid.value=uid;
    window.document.forms[0].sch010SelectUsrKbn.value=ukbn;
    window.document.forms[0].submit();
    return false;
}

$(function() {

    /* ユーザ  在席時 hover */
    $(".js_zskUio_in").live({
        mouseenter:function (e) {
          dsplinkSid = $(this).attr("id");
          changeZIndex();

          $(this).removeClass('z_index-10');
          $(this).addClass('z_index-20');
          $(this).append( '<div class="display_n lh150">&nbsp;<span class="td_hovu" href="#!" onClick="updateZasekiStatus(' + dsplinkSid + ',2)">' + msglist.zskLeave + '</span><br>'
                                      + '&nbsp;<span class="td_hovu" href="#!" onClick="updateZasekiStatus(' + dsplinkSid + ',0)">' + msglist.zskEtc + '</span><br>'
//                                    + '&nbsp;<a href="#!" onClick="moveCreateMsg(' + dsplinkSid + ', 0)">ショートメール</a>'
                                      + ((document.forms[0].smailUseOk.value == 0 && document.forms[0].elements["smlAble["+dsplinkSid+"]"].value == 1) ? '&nbsp;<span id="' + dsplinkSid + '" class="js_sml_sendLink td_hovu" target=”_blank”>' + msglist.smail + '</span><br>' : '')
                                      + '&nbsp;<span class="td_hovu" href="#!" onClick="openUserInfoWindow(' + dsplinkSid + ')">' + msglist.userInfo + '</span></div>');

          $(this).children().next().animate( { height: 'toggle', opacity: 'toggle' }, 'middle' )

    },
        mouseleave:function (e) {
          $(this).children().next().remove();
        }
    });


    /* ユーザ  その他 hover */
    $(".js_zskUio_etc").live({
        mouseenter:function (e) {
          dsplinkSid = $(this).attr("id");
          changeZIndex();
          $(this).removeClass('z_index-10');
          $(this).addClass('z_index-20');
          $(this).append( '<div class="display_n lh150">'
                                      + '&nbsp;<span class="td_hovu" onClick="updateZasekiStatus(' + dsplinkSid + ',1)">' + msglist.zskIn + '</span><br>'
                                      + '&nbsp;<span class="td_hovu" onClick="updateZasekiStatus(' + dsplinkSid + ',2)">' + msglist.zskLeave + '</span><br>'
//                                      + '&nbsp;<a href="#!" onClick="moveCreateMsg(' + dsplinkSid + ', 0)">ショートメール</a>'
                                      + ((document.forms[0].smailUseOk.value == 0 && document.forms[0].elements["smlAble["+dsplinkSid+"]"].value == 1) ? '&nbsp;<span id="' + dsplinkSid + '" class="js_sml_sendLink td_hovu" target=”_blank”>' + msglist.smail + '</span><br>' : '')
                                      + '&nbsp;<span class="td_hovu" onClick="openUserInfoWindow(' + dsplinkSid + ')">' + msglist.userInfo + '</span></div>');

          $(this).children().next().animate( { height: 'toggle', opacity: 'toggle' }, 'middle' )

    },
        mouseleave:function (e) {
          $(this).children().next().remove();
        }
    });


    /* ユーザ  不在  hover */
    $(".js_zskUio_leave").live({
        mouseenter:function (e) {
          dsplinkSid = $(this).attr("id");
          changeZIndex();
          $(this).removeClass('z_index-10');
          $(this).addClass('z_index-20');
          $(this).append( '<div class="display_n thovu lh150">'
                                      + '&nbsp;<span class="td_hovu" href="#!" onClick="updateZasekiStatus(' + dsplinkSid + ',1)">' + msglist.zskIn + '</span><br>'
                                      + '&nbsp;<span class="td_hovu" href="#!" onClick="updateZasekiStatus(' + dsplinkSid + ',0)">' + msglist.zskEtc + '</span><br>'
//                                      + '&nbsp;<a href="#" target=”_blank” onClick="moveCreateMsg(' + dsplinkSid + ', 0)">ショートメール</a><br>'
                                      + ((document.forms[0].smailUseOk.value == 0 && document.forms[0].elements["smlAble["+dsplinkSid+"]"].value == 1) ? '&nbsp;<span id="' + dsplinkSid + '" class="js_sml_sendLink td_hovu" target=”_blank”>' + msglist.smail + '</span><br>' : '')
                                      + '&nbsp;<span class="td_hovu" href="#!" onClick="openUserInfoWindow(' + dsplinkSid + ')">' + msglist.userInfo + '</span></div>');

          $(this).children().next().animate( { height: 'toggle', opacity: 'toggle' }, 'middle' )

    },
        mouseleave:function (e) {
          $(this).children().next().remove();
        }
    });

    $(".js_sml_sendLink").live("click", function(){

        $('#smlCreateArea').children().remove();
        $('#smlCreateArea').append('<iframe src=\"../smail/sml010.do?sml010scriptFlg=1&sml010scriptKbn=2&sml010scriptSelUsrSid='
                                   + $(this).attr('id')
                                   + '\" name=\"sample\" class="js_smlFrame" width=\"1000\" height=\"690\"></iframe>');

        /* テンプレートポップアップ */
        $('#smlPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 768,
            width: 1024,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              閉じる: function() {
            	  $(".js_smlFrame")[0].contentWindow.warning_alert();
              }
            }
        });
    });

});

function changeZIndex() {
    $(".js_zskUio_in").removeClass('z_index-20');
    $(".js_zskUio_leave").removeClass('z_index-20');
    $(".js_zskUio_etc").removeClass('z_index-20');
    $(".js_zskUio_in").addClass('z_index-10');
    $(".js_zskUio_leave").addClass('z_index-10');
    $(".js_zskUio_etc").addClass('z_index-10');
}

function callSmailWindowClose() {
    $('#smlPop').dialog('close');
}