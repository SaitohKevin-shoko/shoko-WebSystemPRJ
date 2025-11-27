$(function() {

    /* 目標ポップアップ */
    $(".js_targetPopLink").live("click", function(){

        var yearDataId = $(this).parent().attr('id');

        //年間目標ポップアップ
        $('#targetPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,  // for IE6
            resizable: false,
            height: 600,
            width: 850,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              閉じる: function() {
                  graphReset();
                  $(this).dialog('close');
              }
            }
        });

        //目標年間データ取得
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp240.do', {"cmd":"yearData",
                                       "CMD":"yearData",
                                       "yearDataId":yearDataId},
          function(data) {
            if (data != null || data != "") {
                setPopData(data);
            }
        });

        buttonInit();

    });

    /* 目標達成ポップアップ  今年度ボタン*/
    $("#popThisYearBtn").live("click", function(){

        var selYear   = $('#popHideYear').val();
        var selMonth  = $('#popHideMonth').val();
        var selUsrSid = $('#popHideUsrSid').val();
        var selNtgSid = $('#popHideNtgSid').val();
        var selYearDataId = selYear + "_" + selMonth + "_" + selUsrSid + "_" + selNtgSid;

        $.post('../nippou/ntp240.do', {"cmd":"yearDataNow",
                                       "CMD":"yearDataNow",
                                       "yearDataId":selYearDataId},
        function(data) {
            if (data != null || data != "") {
                graphReset();
                setPopData(data);
            }
        });
        buttonInit();
    });

    /* 目標達成ポップアップ  次年度ボタン*/
    $("#popNextBtn").live("click", function(){

        var selYear   = $('#popHideYear').val();
        var selMonth  = $('#popHideMonth').val();
        var selUsrSid = $('#popHideUsrSid').val();
        var selNtgSid = $('#popHideNtgSid').val();
        var selYearDataId = (parseInt(selYear) + 1) + "_" + selMonth + "_" + selUsrSid + "_" + selNtgSid;

        $.post('../nippou/ntp240.do', {"cmd":"yearData",
                                       "CMD":"yearData",
                                       "yearDataId":selYearDataId},
        function(data) {
            if (data != null || data != "") {
                graphReset();
                setPopData(data);
            }
        });
        buttonInit();
    });

    /* 目標達成ポップアップ  前年度ボタン*/
    $("#popPrevBtn").live("click", function(){

        var selYear       = $('#popHideYear').val();
        var selMonth      = $('#popHideMonth').val();
        var selUsrSid     = $('#popHideUsrSid').val();
        var selNtgSid     = $('#popHideNtgSid').val();
        var selYearDataId = (parseInt(selYear) - 1) + "_" + selMonth + "_" + selUsrSid + "_" + selNtgSid;

        $.post('../nippou/ntp240.do', {"cmd":"yearData",
                                       "CMD":"yearData",
                                       "yearDataId":selYearDataId},
        function(data) {
            if (data != null || data != "") {
                graphReset();
                setPopData(data);
            }
        });
        buttonInit();
    });

    /* 変更ボタンクリック */
    $(".js_targetSetteiBtn").live("click", function(){
        $('.js_target_' + $(this).attr('id')).addClass("display_n");
        $('.js_editTarget_' + $(this).attr('id')).removeClass("display_n");
    });

    /* 確定ボタンクリック */
    $(".js_targetKakuteiBtn").live("click", function(){

        var targetId = $(this).attr('id');

        $('#dialogEditOk').dialog({
            autoOpen: true,
            bgiframe: true,
            resizable: false,
            height: 160,
            modal: true,
            closeOnEscape: false,
            overlay: {
                backgroundColor: '#000000',
                opacity: 0.5
            },
            buttons: {
                OK: function() {

                    var recordVal = $('#trgRecord_' + targetId).val();
                    var targetVal = $('#trgTarget_' + targetId).val();

                    //データ送信
                    $.ajaxSetup({async:false});
                    $.post('../nippou/ntp240.do', {"cmd":"edit",
                                                   "CMD":"edit",
                                                   "targetId":targetId,
                                                   "recordVal":recordVal,
                                                   "targetVal":targetVal},
                      function(data) {
                        if (data != null || data != "") {

                            if (data.length > 0) {

                                //エラー
                                $("#error_msg").html("");

                                for (var d in data) {
                                    $("#error_msg").append("<span class=\"cl_fontWarn\">" + data[d] + "</span><br>");
                                }

                                //エラーメッセージ
                                $('#dialog_error').dialog({
                                    autoOpen: true,
                                    bgiframe: true,
                                    resizable: false,
                                    modal: true,
                                    width: 350,
                                    closeOnEscape: false,
                                    overlay: {
                                        backgroundColor: '#000000',
                                        opacity: 0.5
                                    },
                                    buttons: {
                                        OK: function() {
                                            $(this).dialog('close');
                                        }
                                    }
                                });
                            } else {
                                //データ設定
                                resetData(targetId, data);
                            }

                        } else {
                            $('.js_target_' + $(this).attr('id')).removeClass("display_n");
                            $('.js_editTarget_' + $(this).attr('id')).addClass("display_n");
                        }
                    });

                    $(this).dialog('close');
                },
                Cancel: function() {

                  $(this).dialog('close');

                }
            }
        });

    });

    /* キャンセルボタンクリック */
    $(".js_targetCanselBtn").live("click", function(){

        var canselId = $(this).attr('id');

        //データ再設定
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp240.do', {"cmd":"cansel",
                                       "CMD":"cansel",
                                       "canselId":canselId},
          function(data) {
            if (data != null || data != "") {
                //データ設定
                resetData(canselId, data);

            } else {
                $('.js_target_' + $(this).attr('id')).removeClass("display_n");
                $('.js_editTarget_' + $(this).attr('id')).addClass("display_n");
            }
        });
    });


    /* 達成率ボタンクリック */
    $("#changeLineGraph").live("click", function(){
        $('#linechart').removeClass('display_n');
        $('#barchart').addClass('display_n');
        $("#changeLineGraph").removeClass('graph-btn-unactive bgC_lightGray');
        $("#changeLineGraph").addClass('graph-btn-active bgC_body');
        $("#changeLineGraph").removeClass('graph-btn-unactive-hover');
        $("#changeBarGraph").removeClass('graph-btn-active bgC_body');
        $("#changeBarGraph").addClass('graph-btn-unactive bgC_lightGray');
        $("#changeBarGraph").removeClass('graph-btn-unactive-hover');
        $('#line_title').removeClass('display_n');
        $('#bar_title').addClass('display_n');
    });

    /* 実績ボタンクリック */
    $("#changeBarGraph").live("click", function(){
        $('#barchart').removeClass('display_n');
        $('#linechart').addClass('display_n');
        $("#changeBarGraph").removeClass('graph-btn-unactive bgC_lightGray');
        $("#changeBarGraph").addClass('graph-btn-active bgC_body');
        $("#changeBarGraph").removeClass('graph-btn-unactive-hover');
        $("#changeLineGraph").removeClass('graph-btn-active bgC_body');
        $("#changeLineGraph").addClass('graph-btn-unactive bgC_lightGray');
        $("#changeLineGraph").removeClass('graph-btn-unactive-hover');
        $('#bar_title').removeClass('display_n');
        $('#line_title').addClass('display_n');
    });

    /* グラフボタン hover */
    $('.graph-btn-unactive').live({
          mouseenter:function () {
            $(this).addClass("graph-btn-unactive-hover");
          },
          mouseleave:function () {
              $(this).removeClass("graph-btn-unactive-hover");
          }
    });
});

function changeGroupCombo(){
    document.forms[0].cmd.value='';
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}


function changeCmb(){
    document.forms[0].submit();
    return false;
}

function nextMonth(){
    document.forms[0].cmd.value='nextmonth';
    document.forms[0].CMD.value='nextmonth';
    document.forms[0].submit();
    return false;
}

function prevMonth(){
    document.forms[0].cmd.value='prevmonth';
    document.forms[0].CMD.value='prevmonth';
    document.forms[0].submit();
    return false;
}

function thisMonth(){
    document.forms[0].cmd.value='thismonth';
    document.forms[0].CMD.value='thismonth';
    document.forms[0].submit();
    return false;
}

function resetData(id, data){
    $('#spanRecord_' + id).html("");
    $('#spanRecord_' + id).append(data.npgRecord);
    $('#trgRecord_'  + id).val(data.npgRecord);
    $('#spanTarget_' + id).html("");
    $('#spanTarget_' + id).append(data.npgTarget);
    $('#trgTarget_'  + id).val(data.npgTarget);
    $('.js_target_' + id).removeClass("display_n");
    $('.js_editTarget_' + id).addClass("display_n");

    if (data.npgTargetKbn == 0) {
        $('#spanRecord_' + id).removeClass("cl_fontWarn");
        $('#barTargetRatio_' + id).addClass('bgC_ntpBarParcent');
        $('#barTargetRatio_' + id).removeClass('bgC_ntpBarParcentComp');
    } else {
        $('#spanRecord_' + id).addClass("cl_fontWarn");
        $('#barTargetRatio_' + id).removeClass('bgC_ntpBarParcent');
        $('#barTargetRatio_' + id).addClass('bgC_ntpBarParcentComp');
    }

    //棒グラフ
    $('#ratioStr_' + id).html("");
    $('#ratioStr_' + id).html(data.npgTargetRatioStr + "%");
    $('#barTargetRatio_' + id).css('width', data.npgTargetRatio + '%');
    $('#barTargetUnRatio_' + id).css('width', data.npgTargetUnRatio + '%');

    return false;
}

//目標達成ポップアップの設定
function setPopData(data){

    //年
    $('#popTrgYear').html("");
    $('#popTrgYear').append(data.year);

    //ユーザ名
    $('#popTrgUsr').html("");
    $('#popTrgUsr').append(data.usrName);

    //目標名
    $('#popTrgTarget').html("");
    $('#popTrgTarget').append(data.targetName);

    //年平均
    $('#popTrgRatio').html("");
    $('#popTrgRatio').append(data.targetRatio);

    //単位
    $('#bar_unit').html("");
    $('#bar_unit').html(data.targetUnit);

    var monthArray = [];
    var targetArray = [];
    var recordArray = [];
    var recordKbnArray = [];
    var ratioArray = [];

    //データ格納
    var priData = data.ntgList;
    if (priData.length > 0) {
        for (var p in priData) {
            monthArray.push(priData[p].npgMonth);
            targetArray.push(priData[p].npgTarget);
            recordArray.push(priData[p].npgRecord);
            recordKbnArray.push(priData[p].npgTargetKbn);
            ratioArray.push(priData[p].npgTargetRatio);
        }
    }

    //hiddenデータ設定
    $('#popHideYear').val(data.year);
    $('#popHideMonth').val(data.month);
    $('#popHideUsrSid').val(data.usrSid);
    $('#popHideNtgSid').val(data.targetSid);

    //月データ成形
    var tdMonthData = "";

    for (var m in monthArray) {
        tdMonthData += "<th class=\"wp120\">"
                    +  monthArray[m]
                    +  "月</th>";
    }



    //目標データ成形
    var tdTargetData = "";
    for (var t in targetArray) {
        tdTargetData += "<td class=\"txt_c bgC_tableCell\">"
                     +  targetArray[t]
                     +  "</td>";
    }

    //実績データ成形
    var tdRecordData = "";
    var recordClass = "";
    for (var r in recordArray) {
        recordClass = "";
        if (recordKbnArray[r] == 1) {
            recordClass = "cl_fontWarn";
        }

        tdRecordData += "<td class=\"" + recordClass + " txt_c fw_b bgC_tableCell\">"
                     +  recordArray[r]
                     +  "</td>";
    }

    //達成率データ成形
    var tdRatioData = "";
    for (var r in ratioArray) {
        tdRatioData += "<td class=\"txt_c bgC_tableCell\">"
                    +  ratioArray[r]
                    +  "</td>";
    }

    var yearTrgStr = "";


    yearTrgStr = "<div class=\"ofx_s\" id=\"yearTargetDataArea\">"
               + "<table class=\"table-top w100\">"
               + "<tbody>"
               +  "<tr>"
               +    "<th></th>"
               +      tdMonthData
               +  "</tr>"
               +  "<tr>"
               +    "<th class=\"no_w wp100\">目標</th>"
               +     tdTargetData
               +  "</tr>"
               +  "<tr>"
               +    "<th class=\"no_w wp100\">実績</th>"
               +     tdRecordData
               +  "</tr>"
               +  "<tr>"
               +    "<th class=\"no_w wp100\">達成率(%)</th>"
               +     tdRatioData
               +  "</tr>"
               + "</tbody>"
               + "</table></div>";

    $('#yearTargetDataArea').remove();
    $('#yearTargetArea').append(yearTrgStr);


    //グラフ描画(折れ線グラフ)
    var month1  = monthArray[0]  + "月";
    var month2  = monthArray[1]  + "月";
    var month3  = monthArray[2]  + "月";
    var month4  = monthArray[3]  + "月";
    var month5  = monthArray[4]  + "月";
    var month6  = monthArray[5]  + "月";
    var month7  = monthArray[6]  + "月";
    var month8  = monthArray[7]  + "月";
    var month9  = monthArray[8]  + "月";
    var month10 = monthArray[9]  + "月";
    var month11 = monthArray[10] + "月";
    var month12 = monthArray[11] + "月";

    $.jqplot('linechart', [
            [[1, ratioArray[0]],
             [2, ratioArray[1]],
             [3, ratioArray[2]],
             [4, ratioArray[3]],
             [5, ratioArray[4]],
             [6, ratioArray[5]],
             [7, ratioArray[6]],
             [8, ratioArray[7]],
             [9, ratioArray[8]],
             [10,ratioArray[9]],
             [11,ratioArray[10]],
             [12,ratioArray[11]]]
            ],
            {
            axes:{
                // X軸
                xaxis:{
                label: "",
                ticks: [[0,  ''],
                    [1,  month1],
                    [2,  month2],
                    [3,  month3],
                    [4,  month4],
                    [5,  month5],
                    [6,  month6],
                    [7,  month7],
                    [8,  month8],
                    [9,  month9],
                    [10, month10],
                    [11, month11],
                    [12, month12],
                    [13, '']]
            },
                // Y軸
                yaxis:{
                label: ""
                }
            },
                highlighter: {
                    // マウスオーバー時の数値表示
                    show: true,
                    // Y軸の値のみ
                    tooltipAxes: 'y'
                }
            }
    );




    $.jqplot('barchart', [
                           [[1, recordArray[0]],
                            [2, recordArray[1]],
                            [3, recordArray[2]],
                            [4, recordArray[3]],
                            [5, recordArray[4]],
                            [6, recordArray[5]],
                            [7, recordArray[6]],
                            [8, recordArray[7]],
                            [9, recordArray[8]],
                            [10,recordArray[9]],
                            [11,recordArray[10]],
                            [12,recordArray[11]]]
                           ],
                           {

                       seriesDefaults: {
                       renderer: jQuery.jqplot.BarRenderer,
                       rendererOptions: {
                           barPadding: 8,
                           barMargin: 10,
                           barWidth: 25,
                           shadowOffset: 2,
                           shadowDepth: 5,
                           shadowAlpha: 0.08
                       }
                   },
                           axes:{
                               // X軸
                               xaxis:{
                               label: "",
                               ticks: [[0,  ''],
                                   [1,  month1],
                                   [2,  month2],
                                   [3,  month3],
                                   [4,  month4],
                                   [5,  month5],
                                   [6,  month6],
                                   [7,  month7],
                                   [8,  month8],
                                   [9,  month9],
                                   [10, month10],
                                   [11, month11],
                                   [12, month12],
                                   [13, '']]
                           },
                               // Y軸
                               yaxis:{
                               label: ""
                               }
                           },
                               highlighter: {
                                   // マウスオーバー時の数値表示
                                   show: true,
                                   // Y軸の値のみ
                                   tooltipAxes: 'y'
                               }
                           }
                   );



}

//グラフクリア
function graphReset(){
  $('#graph_area').html("");
  $('#graph_area').html("<div id=\"linechart\"  class=\"ntp_graphArea\"></div><div id=\"barchart\" class=\"ntp_graphArea\"></div>");
}

//ボタン初期設定
function buttonInit() {
    $('#linechart').removeClass('display_n');
    $('#barchart').addClass('display_n');
    $("#changeLineGraph").removeClass('graph-btn-unactive bgC_lightGray');
    $("#changeLineGraph").addClass('graph-btn-active bgC_body borC_light menu_btn');
    $("#changeBarGraph").removeClass('graph-btn-active bgC_body');
    $("#changeBarGraph").addClass('graph-btn-unactive bgC_lightGray borC_light menu_btn');
    $("#changeLineGraph").parent().addClass("lh100");
    $('#line_title').removeClass('display_n');
    $('#bar_title').addClass('display_n');
}