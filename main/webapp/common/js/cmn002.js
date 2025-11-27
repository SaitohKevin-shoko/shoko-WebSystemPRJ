var menuHeight = 0;
var dispPlugin = "";

function menuReload() {
  var iframe = document.getElementById('menuFrame');
  iframe.contentWindow.location.reload(true);
}

function windowReload() {
  window.location.reload(true);
}

function menuUnlock(menuHeight, duration) {

    var offset = $("#menuFrame").height();

    $("#bodyFrame").css('margin-top', offset + 'px');
    $("#menuFrame").addClass("cmn002_menu-float");
    $("#bodyFrame").animate({'margin-top': menuHeight + 'px'}, {'duration': duration});
}

function menuLock(duration) {

    var offset = $("#menuFrame").height();

    $("#bodyFrame").animate({'margin-top': offset + 'px'}, {'duration': duration, complete:function() {
        $("#bodyFrame").css('margin-top', 0 + 'px');
        $("#menuFrame").removeClass("cmn002_menu-float");
    }});
}

function changeMenuHeight(height) {
    $('.cmn002').removeClass('cmn002-hidden');
    $("#menuFrame").removeAttr("height").height(height);
}

function toggleMenu(height, duration, callback) {
    $("#menuFrame").removeAttr("height").animate({'height': height + 'px'}, {'duration': duration, 'complete':callback });

}

//ターゲットはフレーム内（開かない）
function clickMenuTarConf(conf, paramKbn, sendKbn, pluginId) {

    //URL、パラメータ情報を取得する
    var pluginIdParam = pluginId;
    if (pluginIdParam == "") {
      pluginIdParam = "main";
    }
    $.ajax({
        async: true,
        url:"../common/cmn003.do",
        type: "post",
        data: {
            CMD: "getClickConf",
            conf: conf,
            pluginId: pluginIdParam}
    }).done(function( data ) {
        if (data != null || data != "") {
            //POST形式の場合かつパラメータ設定するの場合
            if (sendKbn == 0 && paramKbn != 0) {

                var formName = 'fnamemain';

                var form = $('<form/>', {action: data.url, method: 'post', target:'body', name:formName});

                if (data.paramList != null && data.paramList.length > 0) {
                    for (row=0; row<data.paramList.length; row++) {
                        var paramName = data.paramList[row].cppName;
                        var paramValue = data.paramList[row].cppValue;
                        form.append($('<input/>',{type:'hidden',name:paramName ,value:paramValue}));
                    }
                }


                //body内にformを追加(IE対応)
                $('body').append(form);
                //サブミット
                form.submit();
                //formの削除（jsp内の既存のformは削除されない）
                form.remove();


            } else {
                //パラメータセットしない場合、又は、パラメータセットする且つGET形式の場合
                //パラメータセットしない場合は現仕様通りGETで行う
                var cmn002Form = $("#menuFrame").contents().find("form");
                if ($("#bodyFrame").contents().find("#js_chtForm").length > 0) {
                    var backSrc = $("#bodyFrame").contents().find("form").eq(1).attr("action");
                } else {
                    var backSrc = $("#bodyFrame").contents().find("form").eq(0).attr("action");
                }

                var endIdx =  backSrc.lastIndexOf("/", backSrc.lastIndexOf(".do"));
                var startIdx = backSrc.lastIndexOf("/", endIdx -1) + 1;
                var backPlugin = backSrc.substring(startIdx, endIdx);
                $("#menuFrame").contents().find("input[name='url']").val(data.url);
                $("#menuFrame").contents().find("input[name='backPlugin']").val(backPlugin);
                cmn002Form.submit();
                return false;
            }
        }
    }).fail(function(data){
        //JSONデータ失敗時の処理
    });

    return false;
}

function setSettei() {
    var settei = $("#menuFrame").contents().find(".js_setteiArea");
    $(".js_settingResetArea").removeClass("display_n");

    var top = settei.offset().top;
    var left = settei.offset().left;
    if ($("#menuFrame").contents().find(".js_menu_header").length > 0) {
        $(".js_setteiArea").outerHeight(settei.outerHeight() -2);
        var top = settei.offset().top;
        var left = settei.offset().left;
        $(".js_setteiLink").offset({top: top, left: left});

    } else {
        $(".js_setteiArea").outerHeight(settei.outerHeight());
        $(".js_setteiLink").offset({top: top, left: left});
    }
}

function resetSettei(settei) {
    $(".topMenu_confList").addClass("display_n");
    $(".js_settingResetArea").addClass("display_n");
    settei.removeClass("setting_hover");
    if ($("#menuFrame").contents().find("#menuCloseFlg").length > 0) {
        $("#menuFrame").contents().find("#menuCloseFlg").val(1);
        $(":hover").each(function () {
            if ($(this).is("[class]") && $(this).attr("class").indexOf("cmn002_menu-float") != -1) {
                $("#menuFrame").contents().find("#menuOpenFlg").val(0);
            }
        });
    }
    $("#menuFrame").contents().find(".js_menu_header.menu_header-unlock").removeClass("menu_header-hover");
}

$(function() {
    $('iframe').on({
        'load':function() {
            $(this).hide();
            $(this).show();
        }
    });

    $(".js_setteiLink").off("mouseenter");
    $(".js_setteiLink").off("mouseleave");
    $(".js_setteiArea").off("mouseenter");
    $(".js_setteiArea").on("mouseenter", function(){
        $("#menuFrame").contents().find(".js_setteiArea").addClass("setting_hover");
    });
    $(".js_settingResetArea").on("mouseenter", function(){
        resetSettei($("#menuFrame").contents().find(".js_setteiArea"));
    });

    window.addEventListener("message", function(event){
        if (event.data.targetOrigin == location.origin && event.data.message == "isNeedToast" && $("#cmn002InfoToast .js_toastMessage").text().length > 0) {
            document.getElementById('bodyFrame').contentWindow.postMessage({
                cmd: "cmn999InfoToast",
                message: $("#cmn002InfoToast .js_toastMessage").text()
            });
        }
    })
});

function setteiHover() {
    var nowDispPlugin = "";
    if ($("#bodyFrame").contents().find("#js_chtForm").length > 0) {
        var nowDispPlugin = $("#bodyFrame").contents().find("form").eq(1).attr("name");
    } else {
        var nowDispPlugin = $("#bodyFrame").contents().find("form").eq(0).attr("name");
        if (nowDispPlugin == null) {
          nowDispPlugin = "none";
        }
    }
    $(".js_setteiLink").removeClass("display_n");
    if (dispPlugin != nowDispPlugin.substring(0, 3) || dispPlugin == "") {
        dispPlugin = nowDispPlugin.substring(0, 3);

        //ajaxで該当プラグインの管理者,個人設定が操作出来るか判定し、
        //それを元に表示する設定エリアの要素を作成する。
        $.ajax({
            async: true,
            url:"../common/cmn003.do",
            type: "post",
            data: {
                CMD: "getSettingParam",
                plugin: dispPlugin}
        }).done(function( data ) {
            if (data != null || data != "") {
                var str = "";
                if (data.mainPluginAdmKbn == "true") {
                    str += "<div onClick='clickMenuTarConf(\"1\", \"0\", \"0\", \"main\");' class='settei_content bgC_body content-hoverChange'>";
                    str += msglist_cmn002['cmn.admin.setting'];
                    str += "</div>";
                    $(".js_setteiMainArea").empty();
                    $(".js_setteiMainArea").append(str);
                }

                str = "";
                if (data.dispPluginAdmKbn == "true" || data.dispPluginPreKbn == "true") {
                    str += "<div class='pl5 pr5 pt5 bgC_body lh100'>";
                    str += "<div class='verAlignMid'>";
                    str += "<img class='btn_originalImg-display mr5' src='" + data.dispPluginOriginalIcon + "'>";
                    str += "<img class='btn_classicImg-display mr5' src='" + data.dispPluginClassicIcon + "'>";
                    str += data.dispPluginName;
                    str += "</div>";
                    str += "</div>";
                    if (data.dispPluginAdmKbn == "true") {
                        str += "<div onClick='clickMenuTarConf(\"1\", \"0\", \"0\", \"" + data.dispPluginId + "\");' class='settei_content bgC_body content-hoverChange'>";
                        str += msglist_cmn002['cmn.admin.setting'];
                        str += "</div>";
                    }
                    if (data.dispPluginPreKbn == "true") {
                        str += "<div onClick='clickMenuTarConf(\"0\", \"0\", \"0\", \"" + data.dispPluginId + "\");' class='settei_content bgC_body content-hoverChange'>";
                        str += msglist_cmn002['cmn.preferences2'];
                        str += "</div>";
                    }
                }

                $(".js_setteiPluginpArea").empty();
                $(".js_setteiPluginpArea").append(str);
            }
        }).fail(function(data){
            //JSONデータ失敗時の処理
        });
    }
    setSettei();
    if ($("#menuFrame").contents().find("#menuCloseFlg").length > 0) {
        $("#menuFrame").contents().find("#menuCloseFlg").val(0);
    }
    $("#menuFrame").contents().find(".js_menu_header.menu_header-unlock").addClass("menu_header-hover");
}