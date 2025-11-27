
//表示設定初期化
function group_dspConfClaer() {
  js_leftMenu_active();
  append_remove();
}

//左側メニュー操作禁止解除
function js_leftMenu_active() {
  $(".js_grpconfEdit").removeClass("cht_grpConfSelectedGroup");
  $(".js_grpconfAddGroup").removeClass("cht_grpConfSelectedAddGroup");
  $(".js_leftMenu").removeClass("leftmenu_disabled bgC_gray");
  $(".js_leftMenu").find(".leftmenu_abled").removeClass("leftmenu_abled");
  $("#searchform").prop("disabled", false);
}

//要素内容削除
function append_remove() {
  $(".js_adminSid_hidden").children().remove();
  $(".js_generalSid_hidden").children().remove();
  $(".js_cgiSid_hidden").children().remove();
  $(".js_grpconf_error").children().remove();
  $(".js_grpconfTokureiError").children().remove();
}

//初期表示設定
function group_dspInit() {
  $(".js_grpconfSearchKeyword").val("");
  $('input:checkbox[name=cht010GrpConfDspArcKbn]').prop("checked", false);
}

// グループ管理画面
function group_dspConfig() {
    $(".js_dialog_overlay").removeClass("dialog_overlay_off");
    $(".js_dialog_overlay").addClass("dialog_overlay_on");
    $('#groupConfigPop').dialog({
      modal: true,
        title:msglist_cht010["cht.cht020.03"],
        dialogClass:'dialog_button',
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        width: 1000,
        height: 735,
        overlay: {
          backgroundColor: '#000000',
            opacity: 0.5
        },
        close : function(){
          right_area_append(0,null);
          group_dspInit();
          group_dspConfClaer();
        },
          buttons: {
              閉じる: function() {
              group_dspInit();
              group_dspConfClaer();
              $(this).dialog('close');
            }
          }
      });
}

// エラーダイアログ
function group_dspError(data, sid) {
  err_message_append(data, sid);
  var popHeight = "";
  if (sid == -3) {
      popHeight = 180;
  } else {
      popHeight = 150 + data["errMessage_size"] * 30;
  }
  var h = window.innerHeight / 2;
  $('#errorGroupChtPop').dialog({
      position: {
          of : 'body',
          at: 'top+' + h,
          my: 'center'
      },
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        dialogClass:'dialog_button',
        height:popHeight,
        width: 450,
        modal: true,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          ＯＫ: function() {
                  if(sid != -1) {
                      right_area_append(0,data);
                        group_dspConfClaer();
                      $('#group_' + sid).remove();
                  }
                  if(sid == -2) {
                      $(".js_grpconfAddGroup").hide();
                  }
                  $(this).dialog('close');
           },
        }
  });
}

// アーカイブ表示判定値取得
function get_search_archive() {
if ($('input:checkbox[name=cht010GrpConfDspArcKbn]').is(':checked')) {
  return 1;
}
return 0;
}

// 全グループ表示判定値取得
function get_grpAllDsp() {
if ($('input:checkbox[name=cht010GrpConfAllDspKbn]').is(':checked')) {
  return 1;
}
return 0;
}

// 管理者メンバー値取得
function get_grpAdminMember() {
const paramList = document.getElementById('cht010GrpMemberFrame').contentWindow.document.getElementsByName('cht010GrpConfMemberAdminSid');
let adminMember = [];
for (paramId = 0; paramId < paramList.length; paramId++) {
  adminMember.push(paramList[paramId].value);
}
return adminMember;
}

//一般メンバー値取得
function get_grpGeneralMember() {
const paramList = document.getElementById('cht010GrpMemberFrame').contentWindow.document.getElementsByName('cht010GrpConfMemberGeneralSid');
let generalMember = [];
for (paramId = 0; paramId < paramList.length; paramId++) {
  generalMember.push(paramList[paramId].value);
}
return generalMember;
}

function searchGroup() {
  var param = createParamCht010();
  param['CMD'] = 'groupConfSearch';
  param['cht010GrpConfSearchKeyword'] = $(".js_grpconfSearchKeyword").val();
  param['cht010GrpConfDspArcKbn'] = get_search_archive();
  param['cht010GrpConfAllDspKbn'] = get_grpAllDsp();
  $.ajax({
      async: true,
      url:  "../chat/cht010.do",
      type: "post",
      data: $.param(param, true)
  }).done(function( data ) {
      if (data["success"]) {
          append_grouplist(data);
            right_area_append(0,data);
      } else if(data["validate_error"]) {
          group_dspError(data, -1);
      } else {
          err_message_allert();
      }
  }).fail(function(data){
          err_message_allert();
  });
}

$(function(){

    //メッセージエリア キー押下
    $(document).on("keydown", ".js_grpconfSearchKeyword", function(e){
      if (e.which == 13) {
          searchGroup();
      }
    });

  //サイドメニュー タブクリックイベント
  $(document).on("click", ".js_tabHead_all",function(){
      changeTab('tabAll');
      $(".js_tabHead_all").removeClass("bgC_lightGray");
      $(".js_tabHead_all").removeClass("cursor_p");
      $(".js_tabHead_all").removeClass("bor_r1");
      $(".js_tabHead_all").removeClass("bor_b1");
      $(".js_tabHead_all").addClass("cht_sideHeader");
      $(".js_tabHead_all").addClass("cl_fontOutline");
      $(".js_tabHead_all").addClass("fw_b");
      $(".js_tabHead_all").addClass("chtTabHead_all");
      $(".js_tabHead_timeline").removeClass("cht_sideHeader");
      $(".js_tabHead_timeline").removeClass("cl_fontOutline");
      $(".js_tabHead_timeline").removeClass("fw_b");
      $(".js_tabHead_timeline").removeClass("chtTabHead_timeline");
      $(".js_tabHead_timeline").addClass("bgC_lightGray");
      $(".js_tabHead_timeline").addClass("cursor_p");
      $(".js_tabHead_timeline").addClass("bor_b1");
      $(".js_tabHead_timeline").addClass("bor_l1");
      $(".js_moreButton").removeClass("display_n");
      $(".js_moreButton").addClass("display_n");
  });
  //サイドメニュー タブクリックイベント
  $(document).on("click", ".js_tabHead_timeline",function(){
      changeTab('tabTimeline');
      $(".js_tabHead_all").removeClass("cht_sideHeader");
      $(".js_tabHead_all").removeClass("cl_fontOutline");
      $(".js_tabHead_all").removeClass("fw_b");
      $(".js_tabHead_all").removeClass("chtTabHead_all");
      $(".js_tabHead_all").addClass("bgC_lightGray");
      $(".js_tabHead_all").addClass("cursor_p");
      $(".js_tabHead_all").addClass("bor_r1");
      $(".js_tabHead_all").addClass("bor_b1");
      $(".js_tabHead_timeline").removeClass("bgC_lightGray");
      $(".js_tabHead_timeline").removeClass("cursor_p");
      $(".js_tabHead_timeline").removeClass("bor_b1");
      $(".js_tabHead_timeline").removeClass("bor_l1");
      $(".js_tabHead_timeline").addClass("cht_sideHeader");
      $(".js_tabHead_timeline").addClass("cl_fontOutline");
      $(".js_tabHead_timeline").addClass("fw_b");
      $(".js_tabHead_timeline").addClass("chtTabHead_timeline");
      $(".js_moreButton").addClass("display_n");
      $(".js_moreButton").removeClass("display_n");
  });
  //サイドメニュー お気に入りクリックイベント
  $(document).on("click", "#favoriteHeadArea",function(){
      if ($("#favoriteHeadArea").children().hasClass("side_header-open")) {
          $("#favoriteHeadArea").children().removeClass("side_header-open");
          $("#favoriteHeadArea").children().addClass("side_header-close");
      } else {
          $("#favoriteHeadArea").children().removeClass("side_header-close");
          $("#favoriteHeadArea").children().addClass("side_header-open");
      }
      $("#favoriteBodyArea").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
  });
  //サイドメニュー グループ情報クリックイベント
  $(document).on("click", "#groupHeadArea",function(){
      $("#groupBodyArea").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
      if ($("#groupHeadArea").children().hasClass("side_header-open")) {
          $("#groupHeadArea").children().removeClass("side_header-open");
          $("#groupHeadArea").children().addClass("side_header-close");
      } else {
          $("#groupHeadArea").children().removeClass("side_header-close");
          $("#groupHeadArea").children().addClass("side_header-open");
      }
  });
  //サイドメニュー ユーザ情報クリックイベント
  $(document).on("click", "#userHeadArea",function(){
      $("#userBodyArea").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
      if ($("#userHeadArea").children().hasClass("side_header-open")) {
          $("#userHeadArea").children().removeClass("side_header-open");
          $("#userHeadArea").children().addClass("side_header-close");
      } else {
          $("#userHeadArea").children().removeClass("side_header-close");
          $("#userHeadArea").children().addClass("side_header-open");
      }
  });
  //サイドメニュー タイムラインクリックイベント
  $(document).on("click", "#timelineHeadArea",function(){
      $("#timelineBodyArea").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
      if ($("#timelineHeadArea").children().hasClass("side_header-open")) {
          $("#timelineHeadArea").children().removeClass("side_header-open");
          $("#timelineHeadArea").children().addClass("side_header-close");
      } else {
          $("#timelineHeadArea").children().removeClass("side_header-close");
          $("#timelineHeadArea").children().addClass("side_header-open");
      }
  });

    // グループ管理画面初期表示設定
    $(document).on("click", ".js_grpconf_initDsp", function() {
      var param = createParamCht010();
      param['CMD'] = 'groupConfInit';
      $.ajax({
          async : true,
          url : "../chat/cht010.do",
          type : "post",
          data : $.param(param, true)
      }).done(function(data) {
          if (data["success"]) {
              if(data["limitGrpFlg"] == 0) {
                  $(".js_grpconfAddGroup").hide();
              } else {
                  $(".js_grpconfAddGroup").show();
              }
              group_dspConfig();
              append_grouplist(data);
              right_area_append(0, data);
              append_allDspCheckbox(data);
          } else {
              err_message_allert();
          }
      }).fail(function(data) {
          err_message_allert();
      });
  });

    //アーカイブの表示切替
    $(document).on("change", ".js_grpconf_searchArchive",function(){
      searchGroup();
    });

    //全てのグループ表示切替
    $(document).on("change", ".js_grpconf_searchAllGroup",function(){
      searchGroup();
    });


    //検索ボタン
    $(document).on("click", ".js_grpconf_search",function(){
        searchGroup();
    });


    // 登録
    $(document).on("click", ".js_grpconfAddGroup",function(){
      var param = createParamCht010();
      param['CMD'] = 'groupConfAddEditDsp';
      param['cht010GrpConfProcMode']  = 0;
        $.ajax({
            async: true,
            url:  "../chat/cht010.do",
            type: "post",
          data: $.param(param, true)
        }).done(function( data ) {
            if (data["success"]) {
                // 左側メニュー使用禁止
                $(".js_grpconfAddGroup").addClass("cht_grpConfSelectedAddGroup");
                $(".js_leftMenu").addClass("leftmenu_disabled bgC_gray");
                $("#searchform").prop("disabled", true);
                // 右側
                right_area_append(1,data);
                member_area(data);
            } else if(data["validate_error"]) {
                group_dspError(data, -2);
            }  else {
                err_message_allert();
            }
        }).fail(function(data){
                err_message_allert();
        });
    });

    // 編集
    $(document).on("click", ".js_grpconfEdit",function(e){
           e.stopImmediatePropagation();
       var param = createParamCht010();
           var sid = $(this).children().attr("value");
       param['CMD'] = 'groupConfAddEditDsp';
       param['cht010GrpConfCgiSid'] = sid;
       param['cht010GrpConfProcMode']  = 1;
           $.ajax({
               async: true,
               url:  "../chat/cht010.do",
               type: "post",
               data: $.param(param, true)
           }).done(function( data ) {
               if (data["success"]) {
                // 左側メニュー使用禁止
                   $('#group_' + sid).addClass("cht_grpConfSelectedGroup");
                $('#group_' + sid).find(".js_grpconfSelectDeleteGroup").children().addClass("leftmenu_abled");
                $(".js_leftMenu").addClass("leftmenu_disabled bgC_gray");
                $("#searchform").prop("disabled", true);
                // 右側
                right_area_append(1,data);
                member_area(data);
                append_cgisid_hidden(data);
               } else if(data["validate_error"]) {
                   group_dspError(data, sid);
               } else {
                  err_message_allert();
                  $(this).dialog('close');
              }
           }).fail(function(data){
               err_message_allert();
           });
    });


  /**
   * パラメータ生成 グループ追加編集
   */
  function __createParamAddEditGroup(procMode) {
      //親form値 全件取得
      var param = createParamCht010();
      param['CMD'] = 'groupConfAddEditGroup';
      param['cht010GrpConfProcMode'] = procMode;
      param['cht010GrpConfGroupId'] = $(".js_grpconfGroupId").val();
      param['cht010GrpConfGroupName'] = $(".js_grpconfGroupname").val();
      param['cht010GrpConfCategory'] = $(".js_grpconfCategory").val();
      param['cht010GrpConfBiko'] = $(".js_grpconf_biko").val();
      param['cht010GrpConfMemberAdminSid'] = get_grpAdminMember();
      param['cht010GrpConfMemberGeneralSid']  = get_grpGeneralMember();
      param['cht010GrpConfSearchKeyword'] = $(".js_grpconfSearchKeyword").val();
      param['cht010GrpConfDspArcKbn'] = get_search_archive();
      param['cht010GrpConfAllDspKbn'] = get_grpAllDsp();
      if (procMode == 1) {
          param['cht010GrpConfCgiSid'] = $(':hidden[name="cht010GrpConfCgiSid"]').val();
          var archive = 0;
          if ($('input:checkbox[name=cht010GrpConfArchiveKbn]').is(':checked')) {
              archive = 1;
          }
          param['cht010GrpConfArchiveKbn'] = archive;
      }
      return param;

  }
    //グループ作成
    $(document).on("click", ".js_addGroup",function(){
        var h = window.innerHeight / 2;
      $('#addGroupKakuninChtPop').dialog({
          position: {
              of : 'body',
              at: 'top+' + h,
              my: 'center'
          },
            autoOpen: true,
            bgiframe: true,
            resizable: false,
            dialogClass:'dialog_button',
            height:160,
            width: 400,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              はい: function() {
                  var param = __createParamAddEditGroup(0);
                  $(this).dialog('close');
                  var paramStr = $.param(param, true);
                  paramStr = setToken(paramStr);
                  $.ajax({
                      async: true,
                      url:  "../chat/cht010.do",
                      type: "post",
                      data: paramStr
                  }).done(function( data ) {
                      if (data["success"]) {
                          append_grouplist(data);
                            right_area_append(0,data);
                            group_dspConfClaer();
                      } else if(data["validate_error"]) {
                          group_dspError(data, -1);
                      } else if (data["tokenError"]){
                          group_dspError(data, -3);
                      } else {
                          group_dspError(data, -2);
                      }
                  }).fail(function(data){
                    err_message_allert();
                    $(this).dialog('close');
                  });
              },
              いいえ: function() {
                $(this).dialog('close');
              }
            }
      });
    });


    //グループ編集
    $(document).on("click", ".js_editGroup",function(e){
        var h = window.innerHeight / 2;
          $('#editGroupKakuninChtPop').dialog({
              position: {
                  of : 'body',
                  at: 'top+' + h,
                  my: 'center'
              },
                autoOpen: true,
                bgiframe: true,
                resizable: false,
                dialogClass:'dialog_button',
                height:160,
                width: 400,
                modal: true,
                overlay: {
                  backgroundColor: '#000000',
                  opacity: 0.5
                },
                buttons: {
                  はい: function() {
                      //親form値 全件取得
                      var param = __createParamAddEditGroup(1);
                      var paramStr = $.param(param, true);
                      paramStr = setToken(paramStr);

                      $(this).dialog('close');
                      $.ajax({
                          async: true,
                          url:  "../chat/cht010.do",
                          type: "post",
                          data: paramStr
                      }).done(function( data ) {
                          if (data["success"]) {
                            append_grouplist(data);
                              right_area_append(0,data);
                              group_dspConfClaer();
                          } else if(data["validate_error"]) {
                              group_dspError(data, -1);
                          } else if (data["tokenError"]){
                              group_dspError(data, -3);
                          } else {
                              group_dspError(data, param['cht010GrpConfCgiSid']);
                          }
                      }).fail(function(data){
                        err_message_allert();
                        $(this).dialog('close');
                      });
                  },
                  いいえ: function() {
                    $(this).dialog('close');
                  }
                }
          });
    });

    // グループ削除
    $(document).on("click", ".js_grpconf_delete",function(e){
        e.stopImmediatePropagation();
        var sid = $(this).parent().parent().find(".js_valueEdit").attr("value");
        $('#group_' + sid).addClass("cht_grpConfSelectedGroup");
        var h = window.innerHeight / 2;
        $('#delGroupKakuninChtPop').dialog({
              position: {
                  of : 'body',
                  at: 'top+' + h,
                  my: 'center'
              },
              autoOpen : true,
              bgiframe : true,
              resizable : false,
              dialogClass:'dialog_button',
              height : 160,
              width : 400,
              modal : true,
              overlay : {
                  backgroundColor : '#000000',
                  opacity : 0.5
              },
              buttons : {
                  はい : function() {
                    var param = createParamCht010();
                    param['CMD'] = 'groupConfDeleteGroup';
                    param['cht010GrpConfSearchKeyword'] = $(".js_grpconfSearchKeyword").val();
                    param['cht010GrpConfDspArcKbn'] = get_search_archive();
                    param['cht010GrpConfAllDspKbn'] = get_grpAllDsp();
                    param['cht010GrpConfCgiSid'] = sid;
                      $(this).dialog('close');
                    var paramStr = $.param(param, true);
                    paramStr = setToken(paramStr);
                      $.ajax({
                          async : true,
                          url : "../chat/cht010.do",
                          type : "post",
                          data : paramStr
                      }).done(function(data) {
                          if (data["success"]) {
                              append_grouplist(data);
                              right_area_append(0, data);
                              group_dspConfClaer();
                          } else if (data["tokenError"]){
                              group_dspError(data, -3);
                          } else {
                              group_dspError(data, sid);
                          }
                      }).fail(function(data) {
                          err_message_allert();
                          $(this).dialog('close');
                      });
                  },
                  いいえ : function() {
                        if(!$(".leftmenu_disabled").length) {
                            $('#group_' + sid).removeClass("cht_grpConfSelectedGroup");
                        }
                      $(this).dialog('close');
                  }
              }
          });
    });

    //キャンセルボタン
    $(document).on("click", ".js_grpconfCancel",function(){
        right_area_append(0,null);
        group_dspConfClaer();
    });
});

//エラーメッセージ表示
function err_message_allert() {
  alert(msglist_cht010["man.error"]);
}

//エラーメッセージ表示
function err_tokureiError_append() {
     var detail = "<span class=\"cl_fontWarn\">" + msglist_cht010["cht.cht010.30"] +"</span>";
     $(".js_grpconfTokureiError").children().remove();
     $(".js_grpconfTokureiError").append(detail);
}

// エラーメッセージ表示
function err_message_append(data, sid) {
  var detail = "";
  if (sid == -3) {
      detail += "<div class=\"chat_margin_bottom_0\">"
          +"<span class=\"cl_fontWarn\">" + data["errorMessage_0"] + "</span></div>";
  } else {
      for (var idx = 0; idx < data["errMessage_size"]; idx++) {
      detail += "<div class=\"chat_margin_bottom_0\">"
          +"<span class=\"cl_fontWarn\">" + data["errMessage_" + idx] + "</span></div>";
     }
  }
  $(".js_grpconf_error").children().remove();
  $(".js_grpconf_error").append(detail);
}

// 管理者メンバーではないチャットグループ表示のチェックボックス表示
function append_allDspCheckbox(data) {
 var detail = "";
 if(data["adminFlg"] == 1) {
  detail += "<div class=\"verAlignMid\"><input type=\"checkbox\" name=\"cht010GrpConfAllDspKbn\" value=\"0\" id=\"allsearch\" class=\"checkbox_position_2 mr5 js_grpconf_searchAllGroup\">"
         +" <label for=\"allsearch\">"
         + msglist_cht010["cht.cht010.31"] + "</label></div>"
 }
 $(".js_grpconfAllDsp").children().remove();
 $(".js_grpconfAllDsp").append(detail);
}

// 左側メニューグループ一覧表示
function append_grouplist(data) {
  var detail = "";
  for (var idx = 0; idx < data["size"]; idx++) {
    detail += "<div class=\"cht_grpConfSelectGroup verAlignMid cursor_p w100 js_grpconfEdit pl5 pt5 pb5\" id=\"group_"+data["cgiSid_"+idx]+"\" >";
    if(data["archiveFlg_"+idx] == 0) {
      detail +="<div class=\"cl_linkDef js_valueEdit word_b-all\" value=\""+ data["cgiSid_"+idx] + "\">"
           + data["groupName_"+idx] + "</div>"
    } else {
      detail +="<div class=\"cl_linkDef js_valueEdit word_b-all\" value=\""+ data["cgiSid_"+idx] + "\">"
         +" <span class=\"cl_fontWeek\">"+ data["groupName_"+idx] + "</span></div>"
    }
    detail +=" <div class=\"js_grpconfSelectDeleteGroup grpconfDspDustion ml_auto\">"
           +"  <img src=\"../common/images/classic/icon_trash.png\" class=\"js_grpconf_delete header_pluginImg-classic\">"
           +"  <img src=\"../common/images/original/icon_delete.png\" class=\"js_grpconf_delete header_pluginImg\">"
           +" </div>"
           +"</div>";
  }

  $(".js_grpconfGrouplist").children().remove();
  $(".js_grpconfGrouplist").append(detail);
}

// 右側初期・登録編集表示
function right_area_append(mode,data) {
var detail = "";
if(mode == 0) {
   detail +="<span class=\"fs_20 fw_b cl_fontWeek\">" + msglist_cht010["cht.cht010.32"] + "</span>";
   $(".js_rightPosition").removeClass("txt_t");
   $(".js_rightPosition").addClass("txt_m");
} else {
detail +="<div class=\"js_grpconfTokureiError txt_l ml20\"> </div>"
       +"<div class=\"fw_b txt_l ml20\">" + msglist_cht010["cht.02"] + "<span class=\"cl_fontWarn\">"+ msglist_cht010["cmn.asterisk"]
        +"</span></div>"
       +"<div class=\"txt_l ml20\"><input type=\"text\" name=\"cht010GrpConfGroupId\" value=\""
       + data["cht010GrpConfGroupId"]
       +"\" maxlength=\"20\" class=\"w40 js_grpconfGroupId\">"
       +"</div>";
if(data["adminFlg"] == 1) {
detail +="<div class=\"fw_b txt_l ml20 mt10\">" + msglist_cht010["cmn.category"] +"<span class=\"cl_fontWarn\">" + msglist_cht010["cmn.asterisk"]
        +"</span></div>"
       +"<div class=\"txt_l ml20\"><select name=\"cht010GrpConfCategory\" id=\"category\" class=\"w30 js_grpconfCategory\">";
        for (var idx = 0; idx < data["category_size"]; idx++) {
            detail += "<option value=\"" + data["categorySid_"+idx] +"\"";
            if(data["categorySid_"+idx] == data["cht010GrpConfCategory"]) {
                detail +=" selected=\"selected\"";
            }
            detail += ">"
                   + data["categoryName_"+idx]
                   + "</option>";
        }
        detail +="  </select>"
        +"</div>"
}
detail +="<div class=\"fw_b txt_l ml20 mt10\">" + msglist_cht010["cmn.group.name"] +"<span class=\"cl_fontWarn\">" + msglist_cht010["cmn.asterisk"]
        +"</span></div>"
       +"<div class=\"txt_l ml20\"><input type=\"text\" name=\"cht010GrpConfGroupName\" maxlength=\"100\" class=\"w100 js_grpconfGroupname\"";
       if(typeof(data["cht010GrpConfGroupName"]) != "undefined") {
         detail += "value=\""+ data["cht010GrpConfGroupName"] +"\">";
       } else {
           detail += ">";
       }
detail +="</div>"
       +"<div class=\"fw_b txt_l ml20 mt10\"><span class=\"js_groupconfMemberarea\"></span></div>"
       +"<div class=\"fw_b txt_l ml20 mt10\">"
        + msglist_cht010["cmn.memo"]
       + "</div><div class=\"txt_l ml20\"><textarea name=\"cht010GrpConfBiko\" maxlength=\"500\" rows=\"3\" class=\"w100 js_grpconf_biko\"  \">";
       if(typeof(data["cht010GrpConfBiko"]) != "undefined") {
           detail += data["cht010GrpConfBiko"];
       }
detail += "</textarea>"
       +"</div>";
       if(data["grp_procmode"] == 1) {
   detail +="<div class=\"txt_l ml20 mt10\"><div class=\"verAlignMid\">"
           +"  <input type=\"checkbox\" name=\"cht010GrpConfArchiveKbn\" value=\"1\" id=\"cht010compFlg\"";
   if(data["cht010GrpConfArchiveKbn"] == 1) {
       detail +=" checked=\"checked\"";
   }
   detail +=">"
   +"<span class=\"fw_b\"><label for=\"cht010compFlg\">" + msglist_cht010["cht.cht110.01"] + "</label></span>"
           +"</div></div>";
       } else {
   detail +="<div class=\"mb20\">"
           +"</div>";
       }
detail +="<div class=\"flo_r\">"
       +" <button type=\"button\" role=\"button\" class=\"baseBtn cursor_p ";
if(data["grp_procmode"] == 0) {
   detail +=" js_addGroup"
}else {
   detail +=" js_editGroup"
}
detail +="\">" + msglist_cht010["cmn.ok"]
       +" </button>"
       +" <button type=\"button\" class=\"baseBtn js_grpconfCancel cursor_p\" role=\"button\">"
       + msglist_cht010["cmn.cancel"]
       +" </button>"
       +"</div>"
       +"";
$(".js_rightPosition").removeClass("txt_m");
$(".js_rightPosition").addClass("txt_t");
}
$(".js_groupconfRightarea").children().remove();
$(".js_groupconfRightarea").append(detail);
}

// 右側メンバー登録編集要素表示
function member_area(data) {
$(".js_groupconfMemberarea").html('<iframe id="cht010GrpMemberFrame" name="cht010GrpMemberFrame" class="wp600 hp300 ml0 of_h" frameborder="0" scrolling="no" style="display: block;"></iframe>');
$('body').append('<form action="../chat/cht010_grpmember.do" method="post" target="cht010GrpMemberFrame" id="postCht010GrpMemberForm"></form>');

addGrpMemberFrameParam('CMD', 'groupConfViewMember');
for (var idx = 0; idx < data["adminmemberSid_size"]; idx++) {
  addGrpMemberFrameParam('cht010GrpConfMemberAdminSid', data["adminmemberSid_"+idx]);
}
for (var idx = 0; idx < data["generalmemberSid_size"]; idx++) {
  addGrpMemberFrameParam('cht010GrpConfMemberGeneralSid', data["generalmemberSid_"+idx]);
}
$('#postCht010GrpMemberForm').submit().remove();
}
function addGrpMemberFrameParam(name, value) {
$('#postCht010GrpMemberForm').append('<input type="hidden" name="' + name + '" value="' + value + '" />');
}


//右側表示グループチャットSidhidden値作成
function append_cgisid_hidden(data) {
   var detail = "";
   detail +="<input type=\"hidden\"  name=\"cht010GrpConfCgiSid\" value=\"" + data["cht010GrpConfCgiSid"] + "\">"
   $(".js_cgiSid_hidden").children().remove();
   $(".js_cgiSid_hidden").append(detail);
}

// トークンエラー(ポップアップ用)
function popTokenError(data) {
var detail = data["errorMessage_"].replace(denger,"");
$("#errorGroupChtPop").text(detail);
}