function getForm() {
    return document.forms['tcd060Form'];
}

function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
  }

function tcd060ButtonPush() {

}
function TimeAdd(kbn) {
     if(kbn !=3) {
         var element = document.getElementById( "timeFlg_" + kbn )
         element.checked = true ;
         $("#kbnDsp").show();
     } else {
        $("#kbnDsp").hide();
     }
    $('#Fr_h').val("9");
    $('#Fr_m').val("0");
    $('#To_h').val("18");
    $('#To_m').val("0");
    getForm().tcd060ZoneNo.value=-1;
    TimeAddPop("add", kbn);
}


function TimeEdit(row,kbn,time) {
 if(kbn !=3) {
     var element = document.getElementById( "timeFlg_" + kbn )
     element.checked = true ;
     $("#kbnDsp").show();
 } else {
    $("#kbnDsp").hide();
 }
    var timeList = time.split('～');
    var fr =timeList[0];
    var to = timeList[1];
    var frSp = fr.split(':');
    var fr_h = Number(frSp[0]);
    var fr_m = Number(frSp[1]);
    $('#Fr_h').val(fr_h);
    $('#Fr_m').val(fr_m);
    var toSp = to.split(':');
    var to_h = Number(toSp[0]);
    var to_m = Number(toSp[1]);
    $('#To_h').val(to_h);
    $('#To_m').val(to_m);

    getForm().tcd060ZoneNo.value=row;
    TimeEditPop("edit", kbn);
}


function TimeAddPop(mode, kbn) {
    $('#timezone_edit').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        width: 600,
        minHeight:0,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            設定: function() {
                doAddEdit(mode, kbn);
            },
            閉じる: function() {
                $(".js_errMsg").children().remove();
                $('input:hidden[name=tcd060ZoneKbn]').val(-1);
                $(this).dialog('close');
            }
        }
    });
}

function TimeEditPop(mode, kbn) {
    $('#timezone_edit').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height:'auto',
        minHeight:0,
        width: 600,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            設定: function() {
                doAddEdit(mode, kbn);
            },
            削除: function() {
                doDelete();
            },
            閉じる: function() {
                $(".js_errMsg").children().remove();
                $('input:hidden[name=tcd060ZoneKbn]').val(-1);
                $(this).dialog('close');
            }
        }
    });
}


// 登録編集処理
function doAddEdit(mode, kbn) {
    getForm().CMD.value="changeTimeZoneList";
    $('input:hidden[name=tcd060FrH]').val($('#Fr_h').val());
    $('input:hidden[name=tcd060FrM]').val($('#Fr_m').val());
    $('input:hidden[name=tcd060ToH]').val($('#To_h').val());
    $('input:hidden[name=tcd060ToM]').val($('#To_m').val());
    $('input:hidden[name=tcd060ToM]').val($('#To_m').val());
    if (kbn != 3) {
      $('input:hidden[name=tcd060ZoneKbn]').val( $("input[name='tcd060TimeKbn']:checked").val());
    } else {
      $('input:hidden[name=tcd060ZoneKbn]').val(3);
    }

    var paramStr = "";
    paramStr += getFormData($('#tcd060Form'));
    $.ajax({
        async: true,
        url:  "../timecard/tcd060.do",
        type: "post",
        data: paramStr
    }).done(function(data) {
        if (data["success"]) {
            timeZone_hidden(data);
            getForm().CMD.value="init";
            getForm().submit();
        } else if(data["validateError"]) {
            dspErrMsg(data);
        } else {
            alert("error");
        }
    }).fail(function(data){
        alert("error");
    });

}


//削除処理
function doDelete(mode) {
    getForm().CMD.value="deleteTimeZoneList";
    var paramStr = "";
    paramStr += getFormData($('#tcd060Form'));
    $.ajax({
        async: true,
        url:  "../timecard/tcd060.do",
        type: "post",
        data: paramStr
    }).done(function(data) {
        if (data["success"]) {
            timeZone_hidden(data);
            getForm().CMD.value="init";
            getForm().submit();
        } else {
            alert("error");
        }
    }).fail(function(data){
        alert("error");
    });

}


//hidden値作成
 function timeZone_hidden(data) {
    var detail = "";
    var inf = data["tcd060TimezoneMeiList"];
    for (var idx = 0; idx < data["hidden_timezone_list"]; idx++) {
       var dateFr = data["fr_time"+idx];
       var dateTo = data["to_time"+idx];
       detail +="<input type=\"hidden\"  name=\"meiList["+idx+"].frTime\" value=\"" + dateFr +":00" + "\">";
       detail +="<input type=\"hidden\"  name=\"meiList["+idx+"].toTime\" value=\"" + dateTo +":00" + "\">";
       detail +="<input type=\"hidden\"  name=\"meiList["+idx+"].timeZoneKbn\" value=\"" + inf[idx].timeZoneKbn + "\">";
       detail +="<input type=\"hidden\"  name=\"meiList["+idx+"].timeZoneNo\" value=\"" + inf[idx].timeZoneNo + "\">";
       detail +="<input type=\"hidden\"  name=\"meiList["+idx+"].timeZoneStr\" value=\"" + inf[idx].timeZoneStr + "\">";
       detail +="<input type=\"hidden\"  name=\"meiList["+idx+"].timeZoneSID\" value=\"" + inf[idx].timeZoneSID + "\">";
    }
    $(".js_hidden").children().remove();
    $(".js_hidden").append(detail);
}

//エラーメッセージ値作成
 function dspErrMsg(data) {
     var detail = "";
     for (var idx = 0; idx < data["errMessage_size"]; idx++) {
      detail += "<div class=\"chat_margin_bottom_0\">"
          +"<span class=\"text_r2\">" + data["errMessage_" + idx] + "</span></div>";
     }
     $(".js_errMsg").children().remove();
     $(".js_errMsg").append(detail);
}


