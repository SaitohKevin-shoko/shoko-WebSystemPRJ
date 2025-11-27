function changePage(id){
    if (id == 1) {
        document.forms[0].fil100pageNum2.value = document.forms[0].fil100pageNum1.value;
    } else {
        document.forms[0].fil100pageNum1.value = document.forms[0].fil100pageNum2.value;
    }

    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
    return false;
}

function sort(sortKey, orderKey) {
    document.forms[0].fil100sortKey.value = sortKey;
    document.forms[0].fil100orderKey.value = orderKey;
    buttonPush('init');
}

function downLoad(cmd, binSid){

    document.forms[0].CMD.value = cmd;
    document.forms[0].binSid.value = binSid;
    document.forms[0].submit();

    return false;
}

function MoveToFolderDetail(dirSid, fcbSid, fdrParentSid, delKbn) {
    document.forms[0].CMD.value='fil100folderDetail';
    document.forms[0].backDspLow.value='fil100';
    document.forms[0].fil050DirSid.value=dirSid;
    document.forms[0].fil050ParentDirSid.value=fdrParentSid;
    if (!delKbn || delKbn != 1) {
      document.forms[0].fil010SelectCabinet.value=fcbSid;
    }
    setParams();
    document.forms[0].submit();
    return false;
}

function MoveToFileDetail(dirSid, fcbSid, fdrParentSid, delKbn) {
    document.forms[0].CMD.value='fil100fileDetail';
    document.forms[0].backDspLow.value='fil100';
    document.forms[0].fil070DirSid.value=dirSid;
    document.forms[0].fil070ParentDirSid.value=fdrParentSid;
    if (!delKbn || delKbn != 1) {
      document.forms[0].fil010SelectCabinet.value=fcbSid;
    }
    setParams();
    document.forms[0].submit();
    return false;
}

function filedateNoKbn() {
    if (document.forms[0].fileSearchdateNoKbn.checked == true) {
        document.forms[0].fileSearchfromDate.disabled=true;
        document.forms[0].fileSearchtoDate.disabled=true;
    } else {
        document.forms[0].fileSearchfromDate.disabled=false;
        document.forms[0].fileSearchtoDate.disabled=false;
    }
}


function tradeMoneyInit() {
    tradeMoneyNoSet();
    tradeMoneyNoKbn();
}

function tradeMoneyNoSet() {
    if (!document.forms[0].fil100SearchTradeMoneyNoset
    || !document.getElementById('search_tradeMoney0')) {
        return;
    }

    const trageMoneyNoset = document.forms[0].fil100SearchTradeMoneyNoset.checked;

    document.getElementById('search_tradeMoney0').disabled = trageMoneyNoset;
    document.getElementById('search_tradeMoney1').disabled = trageMoneyNoset;

    if (trageMoneyNoset) {
        $('#search_tradeMoney_input').hide();
    } else {
        tradeMoneyNoKbn();
    }
}

function tradeMoneyNoKbn() {
    if (!document.forms[0].fil100SearchTradeMoneyKbn) {
        return;
    }

    if (document.forms[0].fil100SearchTradeMoneyKbn.value == 1) {
        $('#search_tradeMoney_input').show();

    } else {
        $('#search_tradeMoney_input').hide();
    }
}

function tradeDateNoKbn() {

  if (document.forms[0].fil100SltCabinetKbn.value != 2) {
    return false;
  }

    if (document.forms[0].fil100SearchTradeDateKbn.checked == true) {
        document.forms[0].fil100SearchTradeDateFrom.disabled=true;
        document.forms[0].fil100SearchTradeDateTo.disabled=true;
    } else {
        document.forms[0].fil100SearchTradeDateFrom.disabled=false;
        document.forms[0].fil100SearchTradeDateTo.disabled=false;
    }
}

function displayMoneyTo() {
  $("input[name='fil100SearchTradeMoneyTo']").removeClass("display_n");
  if ($("select[name='fil100SearchTradeMoneyJudge']").val() == 3) {
      $("input[name='fil100SearchTradeMoneyTo']").removeClass("display_n");
    } else {
    $("input[name='fil100SearchTradeMoneyTo']").addClass("display_n");
  }
}


function showWarnDialog(count) {

    var widthStr = 500;
    var heightStr = 300;
    $('#delMailMsgArea').html("");
    $('#delMailMsgArea').append(msglist['fil.fil100.1'] + count + msglist['fil.fil100.2']);
    $('#delMailMsgPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: heightStr,
        width: widthStr,
        modal: true,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          はい: function() {
              $(this).dialog('close');
              document.forms[0].fil100WarnOk.value=1;
              document.forms[0].submit();
          },
          いいえ: function() {
              $(this).dialog('close');
          }
        }
    });
}

function setParams() {
  setYmdParam($("input[name='fileSearchfromDate']"),
        $("input[name='fileSearchfromYear']"),
        $("input[name='fileSearchfromMonth']"),
        $("input[name='fileSearchfromDay']"));

  setYmdParam($("input[name='fileSearchtoDate']"),
        $("input[name='fileSearchtoYear']"),
        $("input[name='fileSearchtoMonth']"),
        $("input[name='fileSearchtoDay']"));
}


function fil100SelectCabinet() {
   if ($("#selectCabinetCombo option:selected").data("delkbn")) {
     $('.js_delTarget').hide()
   } else {
     $('.js_delTarget').show();
   }
}

$(function(){
    $('.js_listHover').on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    /* hover:click */
    $(document).on("click", ".js_listClick", function(e){
        //プレビューアイコン押下時、ダウンロードを実行しない
        if (e.target.className == 'btn_classicImg-display' || e.target.className == 'btn_originalImg-display') {
            return;
        }

        var fdrSid = $(this).parent().data("fdrsid");
        var fcbSid = $(this).parent().data("fcbsid");
        var parentSid = $(this).parent().data("parentsid");
        if ($(this).parent().data("listtype") == "folder") {
            MoveToFolderDetail(fdrSid, fcbSid, parentSid, $(this).parent().data("delkbn"));
        } else {
            downLoad('fileNameClick', $(this).parent().data("binsid"));
        }
    });

    $(document).on("change", ".js_cabinetKbn", function(){
        buttonPush('fil100cabinetKbnChange');
    });

    $("select[name='fil100SearchTradeMoneyJudge'").on("change", function(){
      displayMoneyTo();
    });


    $(".js_resultName").mouseover(function(e){
        var txtVal = $(this).children("span.tooltips").html();
        txtVal = txtVal.replace(/\r\n/g, "<br />");
        txtVal = txtVal.replace(/(\n|\r)/g, "<br />");

         $("#tooltip_area").append("<div id=\"ttp\">"+ (txtVal) +"</div>");
         $("#ttp")
          .css("position","absolute")
          .css("top",(e.pageY) + -10 + "px")
          .css("left",(e.pageX) + 20 + "px")
          .removeClass('display_none')
          .css("filter","alpha(opacity=85)")
          .fadeIn("fast");
     }).mousemove(function(e){
         $("#ttp")
          .css("top",(e.pageY) + -10 + "px")
          .css("left",(e.pageX) + 20 + "px");
     }).mouseout(function(){
         $("#ttp").remove();
     });

     fil100SelectCabinet();
});