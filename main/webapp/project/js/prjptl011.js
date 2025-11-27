function buttonPushAdd(cmd, cmdMode){
    $('#CMD')[0].value = cmd;
    document.forms[0].prj050cmdMode.value=cmdMode;
    document.forms[0].submit();
    return false;
}

function changeTab(cmd){
    $('#CMD')[0].value = cmd;
    document.forms[0].submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        document.forms[0].prj010page2.value=document.forms[0].prj010page1.value;
    } else {
        document.forms[0].prj010page1.value=document.forms[0].prj010page2.value;
    }

    document.forms[0].submit();
    return false;
}

function viewPoject(cmd, id){
    $('#CMD')[0].value = cmd;
    document.forms[0].prj030prjSid.value=id;
    document.forms[0].submit();
    return false;
}

function viewTodo(cmd, prjSid, todoSid){
    $('#CMD')[0].value = cmd;
    document.forms[0].prj060prjSid.value=prjSid;
    document.forms[0].prj060todoSid.value=todoSid;
    document.forms[0].submit();
    return false;
}

function editTodo(cmd, cmdMode, prjSid, todoSid){
    $('#CMD')[0].value = cmd;
    document.forms[0].prj050cmdMode.value=cmdMode;
    document.forms[0].prj050prjSid.value=prjSid;
    document.forms[0].prj050todoSid.value=todoSid;
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(sortKey, order) {
    document.forms[0].prj010sort.value = sortKey;
    document.forms[0].prj010order.value = order;
    document.forms[0].submit();
    return false;
}

function changeTodoPrj() {
    document.forms[0].CMD.value = "changeTodoPrj";
    document.forms[0].submit();
    return false;
}

function viewTodoComment(cmd, prjSid, todoSid) {
    document.forms['prj010Form'].prjmvComment.value = 1;
    return viewTodo(cmd, prjSid, todoSid);
}

function doOpenDialog(){

    var idList = [];
    $('.td_type_selected').each(function() {
      idList.push($(this).attr('id'));
    });

    var userAgent = window.navigator.userAgent.toLowerCase();
    var appVersion = window.navigator.appVersion.toLowerCase();
    var dwidth = 100;
    var dwidth2 = 180;
    if (userAgent.indexOf("firefox") > -1) {
      dwidth = 160;
    }

    if (idList.length > 0) {

        if (msglist.shifts == "シフト") {
            $('#dialog-form').dialog({
                dialogClass:"fs_13",
                autoOpen: true,
                resizable: false,
                height: 180,
                width: 350,
                modal: true,
                buttons: {
                    "シフト": function() {
                        var listStr = '';
                        //prj010selectTodoの値を設定
                        for (i = 0; i < idList.length; i++) {
                          if (idList[i] != null) {
                              if (i == (idList.length - 1)) {
                                  listStr += idList[i];
                              } else {
                                  listStr += idList[i] + ',';
                              }
                          }
                        }
                        //休日設定
                        var holKbn = 0;
                        if (!$('#holSet').is(':checked')) {
                            holKbn = 1;
                        }
                        //移動区分
                        var mvKbn = 0;
                        if ($('#radioMi').is(':checked')) {
                           mvKbn = 1;
                        }
                        //移動日数 月
                        var mvMonth = $('#selMonth option:selected').text();
                        //移動日数 日
                        var mvDay = $('#selDay option:selected').text();

                        $.ajaxSetup({async:false});
                        $.post('../project/prj010.do', {"cmd":"editDate","CMD":"editDate",
                                                        "prj010selectTodoStr":listStr,
                                                        "prj010chDateKbn":mvKbn,
                                                        "prj010chDateHol":holKbn,
                                                        "prj010mvMonth":mvMonth,
                                                        "prj010mvDay":mvDay},
                           function(data) {
                              $( this ).dialog( "close" );
                              buttonPush('updateTodoList');
                           }
                        );


                    },
                    "キャンセル": function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
        } else {
            $('#dialog-form').dialog({
                dialogClass:"fs_13",
                autoOpen: true,
                resizable: false,
                height: 180,
                width: 350,
                modal: true,
                buttons: {
                    "shifts": function() {
                        var listStr = '';
                        //prj010selectTodoの値を設定
                        for (i = 0; i < idList.length; i++) {
                          if (idList[i] != null) {
                              if (i == (idList.length - 1)) {
                                  listStr += idList[i];
                              } else {
                                  listStr += idList[i] + ',';
                              }
                          }
                        }
                        //休日設定
                        var holKbn = 0;
                        if (!$('#holSet').is(':checked')) {
                            holKbn = 1;
                        }
                        //移動区分
                        var mvKbn = 0;
                        if ($('#radioMi').is(':checked')) {
                           mvKbn = 1;
                        }
                        //移動日数 月
                        var mvMonth = $('#selMonth option:selected').text();
                        //移動日数 日
                        var mvDay = $('#selDay option:selected').text();

                        $.ajaxSetup({async:false});
                        $.post('../project/prj010.do', {"cmd":"editDate","CMD":"editDate",
                                                        "prj010selectTodoStr":listStr,
                                                        "prj010chDateKbn":mvKbn,
                                                        "prj010chDateHol":holKbn,
                                                        "prj010mvMonth":mvMonth,
                                                        "prj010mvDay":mvDay},
                           function(data) {
                              $( this ).dialog( "close" );
                              buttonPush('updateTodoList');
                           }
                        );


                    },
                    "cancel": function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
        }
    } else {

        if (msglist.shifts == "シフト") {
          $('#dialog-error').dialog({
              dialogClass:"fs_13",
              autoOpen: true,
              resizable: false,
              height: 180,
              width: 350,
              modal: true,
              buttons: {
                "閉じる": function() {
                    $( this ).dialog( "close" );
                }
              }
          });
        } else {
            $('#dialog-error').dialog({
                dialogClass:"fs_13",
                autoOpen: true,
                resizable: false,
                height: 180,
                width: 350,
                modal: true,
                buttons: {
                  "Close": function() {
                      $( this ).dialog( "close" );
                  }
                }
            });
        }
    }
    return false;
}

function chgCheckAllChange(allChkName, chkName) {
    if (document.getElementsByName(allChkName)[0].checked) {
        $(".checkSelected").addClass("td_type_selected");
    } else {
        $(".checkSelected").removeClass("td_type_selected");
    }
}

function chgCheckAllChange2(allChkName, chkName) {
    if (document.getElementsByName(allChkName)[0].checked) {
        $(".checkSelected").addClass("td_type_selected");
    } else {
        $(".checkSelected").removeClass("td_type_selected");
    }
}

$(function() {

    $(document).on("change", '.js_tableTopCheck-header', function() {
      chgCheckAll('prj010AllCheck', 'prj010selectTodo');
      chgCheckAllChange('prj010AllCheck', 'prj010selectTodo');
    });

    $(document).on("click", '.judgCheck', function() {

       var sid = $(this).parent().attr("id");
       var cls = $(this).parent().attr("class");
       var tts = "td_type_selected";
       var result = sid.split(':');

       strSid =".n" + result[0] + result[1];

       var truth = cls.indexOf(tts);

       if(truth !== -1) {
         $(strSid).removeClass("td_type_selected");
       } else {
         $(strSid).addClass("td_type_selected");
       }
      });
    /* hover */
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
    $(document).on("click", ".js_listClick", function(){
        var prjId = $(this).attr('id');
        viewPoject('prjMain', prjId)
    });

});
