function setParams() {
    setYmdParam($("input[name='enq010makeDateFrom']"),
        $("input[name='enq010makeDateFromYear']"),
        $("input[name='enq010makeDateFromMonth']"),
        $("input[name='enq010makeDateFromDay']"));
        
    setYmdParam($("input[name='enq010makeDateTo']"),
        $("input[name='enq010makeDateToYear']"),
        $("input[name='enq010makeDateToMonth']"),
        $("input[name='enq010makeDateToDay']"));
    
    setYmdParam($("input[name='enq010ansDateFrom']"),
        $("input[name='enq010ansDateFromYear']"),
        $("input[name='enq010ansDateFromMonth']"),
        $("input[name='enq010ansDateFromDay']"));
        
    setYmdParam($("input[name='enq010ansDateTo']"),
        $("input[name='enq010ansDateToYear']"),
        $("input[name='enq010ansDateToMonth']"),
        $("input[name='enq010ansDateToDay']"));
        
    setYmdParam($("input[name='enq010resPubDateFrom']"),
        $("input[name='enq010resPubDateFromYear']"),
        $("input[name='enq010resPubDateFromMonth']"),
        $("input[name='enq010resPubDateFromDay']"));
        
    setYmdParam($("input[name='enq010resPubDateTo']"),
        $("input[name='enq010resPubDateToYear']"),
        $("input[name='enq010resPubDateToMonth']"),
        $("input[name='enq010resPubDateToDay']"));
    
}

function enq010searchDetail() {
    var dspVal = document.forms[0].enq010searchDetailFlg.value;

    if (dspVal == 1) {
        $('#enq010searchDetailArea').show();
        $('#enq010searchDetailBtnArea').show();
        $('#simpleSearch').hide();
        changeHelpPrm(dspVal);
    } else {
        $('#enq010searchDetailArea').hide();
        $('#enq010searchDetailBtnArea').hide();
        $('#simpleSearch').show();
        changeHelpPrm(dspVal);
    }
}

function enq010changeSearch() {
    var dspVal = document.forms[0].enq010searchDetailFlg.value;

    if (dspVal == 0) {
        document.forms[0].enq010searchDetailFlg.value='1';
    } else {
        document.forms[0].enq010searchDetailFlg.value='0';
    }
    enq010searchDetail();
}

function changeHelpPrm(dspVal) {
    var wk = document.forms[0].helpPrm.value;
    var helpPrm = wk.substr(0, wk.length - 1);
    helpPrm += dspVal;
    document.forms[0].helpPrm.value=helpPrm;
}

function enq010chkSrhDate(dateType) {
    if (dateType == 1) {
        enq010ChangeDateArea('enq010makeDateKbn', 'enq010makeDateArea');
    } else if (dateType == 2) {
        enq010ChangeDateArea('enq010pubDateKbn', 'enq010pubDateArea');
    } else if (dateType == 3) {
        enq010ChangeDateArea('enq010ansDateKbn', 'enq010ansDateArea');
    } else if (dateType == 4) {
        enq010ChangeDateArea('enq010resPubDateKbn', 'enq010resPubDateArea');
    }
}

function enq010ChangeDateArea(paramName, areaId) {
    if ($('input[name="' + paramName + '"]:checked').val() == 1) {
        $('#' + areaId).removeClass("display_n");
        $('#' + areaId).addClass("display_flex");
    } else {
        $('#' + areaId).addClass("display_n");
        $('#' + areaId).removeClass("display_flex");
    }
}

function enq010changePage(id){
    if (id == 0) {
        document.forms[0].enq010pageBottom.value=document.forms[0].enq010pageTop.value;
    } else {
        document.forms[0].enq010pageTop.value=document.forms[0].enq010pageBottom.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function addEnquete() {

	setParams();
    document.forms[0].CMD.value='enq010Add';
    document.forms[0].enqEditMode.value='0';
    document.forms[0].submit();
}

function editEnquete(enqSid) {
	setParams();
    document.forms[0].CMD.value='enq010Edit';
    document.forms[0].enqEditMode.value='1';
    document.forms[0].editEnqSid.value=enqSid;
    document.forms[0].submit();
}

function linkCopyEnquete(toastId, path) {
	const pre = document.createElement('pre');
	pre.style.webkitUserSelect = 'auto';
	pre.style.userSelect = 'auto';
	pre.textContent = path;
	document.body.appendChild(pre);
	document.getSelection().selectAllChildren(pre);
	const result = document.execCommand('copy');
	document.body.removeChild(pre);
	displayToast(toastId);
	return result;
}

function changeFolder(folder, subFolder) {
    document.forms[0].CMD.value='enq010ChangeFolder';
    document.forms[0].enq010folder.value=folder;
    document.forms[0].enq010subFolder.value=subFolder;
    document.forms[0].enq010initFlg.value='0';
    document.forms[0].enq010searchDetailFlg.value='0';
    document.forms[0].submit();
}

function ansEnquete(enqSid) {
	setParams();
    document.forms[0].CMD.value='enq010Answer';
    document.forms[0].ansEnqSid.value=enqSid;
    document.forms[0].submit();
}

function ansdEnquete(enqSid) {
	setParams();
    document.forms[0].CMD.value='enq010Answered';
    document.forms[0].ansEnqSid.value=enqSid;
    document.forms[0].submit();
}


function enqueteResult(enqSid) {
	setParams();
    document.forms[0].CMD.value='enq010Result';
    document.forms[0].ansEnqSid.value=enqSid;
    document.forms[0].submit();
}

function editTemplate(enqSid) {
	setParams();
    document.forms[0].CMD.value='selectTemplate';
    document.forms[0].enq210templateId.value=enqSid;
    document.forms[0].submit();
}

$(function() {
//    $('#enq010searchDetailArea').hide();
    enq010chkSrhDate(1);
    enq010chkSrhDate(2);
    enq010chkSrhDate(3);
    enq010chkSrhDate(4);
});

function enq010Smail(enqId, sendKbn) {
    document.forms['enq010Form'].CMD.value='enq010SendSmail';
    document.forms['enq010Form'].enq010smailEnquate.value=enqId;
    document.forms['enq010Form'].enq010ansedSendKbn.value=sendKbn;
    document.forms['enq010Form'].submit();
    return false;
}

function callSmailWindowClose() {
    $('#smlPop').dialog().dialog('close');
}

function enq010ClickTitle(sortKey, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].enq010sortKey.value=sortKey;
    document.forms[0].enq010order.value=order;
    document.forms[0].submit();
    return false;
}

function changeSelImg(id) {
    if (id.hasClass("side_header-close")) {
        id.removeClass("side_header-close");
        id.addClass("side_header-open");
    } else {
        id.removeClass("side_header-open");
        id.addClass("side_header-close");
    }
}

function changeLeftMenu(mode) {

    if (mode == 0) {
        if ($("#enq_folder_area").children().hasClass("side_header-close")) {
            $("#enq_folder_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($('#enq_folder_area').children());
        }

        if ($("#enq_template_area").children().hasClass("side_header-open")) {
            $("#enq_template_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($('#enq_template_area').children());
        }
    }
}
function chkAnsOverSimple() {
    document.forms[0].CMD.value='enq010chkAnsOverSimple';
    document.forms[0].submit();
    return false;
}

function chgCheckAll(allChkName, chkName) {
    if (document.getElementsByName(allChkName)[0].checked) {
        checkAll(chkName);
    } else {
        nocheckAll(chkName);
    }
  }

function checkAll(chkName){
   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = true;
   }
}

  function nocheckAll(chkName){
   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = false;
   }
}
$(function(){
//    if (document.forms[0].enq010searchDetailFlg.value == '1') {
//        enq010searchDetail();
//    }

    /* アンケートフォルダ hover */
    $(".menu_head_area").on({
        mouseenter:function (e) {
          $(this).addClass("menu_head_area_on");
        },
        mouseleave:function (e) {
          $(this).removeClass("menu_head_area_on");
        }
    });

    /* テンプレート 追加 hover */
    $("#template_add").on({
        mouseenter:function (e) {
          $(this).addClass("template_add");
        },
        mouseleave:function (e) {
          $(this).removeClass("template_add");
        }
    });

    $('.js_tableTopCheck-header').on("change", function() {
        chgCheckAll('enq010allCheck', 'enq010selectEnqSid');
    });

    /* テンプレート ホバークリック */
    $(".js_listClick").on("click", function(){
        var id = $(this).parent().attr("id");
        editTemplate(id);
    });


    /* アンケートフォルダエリア クリック */
    $("#enq_folder_area").on("click", function(){
        $("#enq_folder_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });

    /* テンプレートエリア クリック */
    $("#enq_template_area").on("click", function(){
        $("#enq_template_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });

    //ひな形ツールチップ
    $(".template_sel_txt").mouseover(function(e){

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

    $("label").inFieldLabels();

    // ショートメール通知ボタン
    $("[name='smlNotice']").click(function(){

        var thisObj = $(this);
        var enqId = $(this).attr("id");
        var dialogName = "dialogSmlNotice";
        var _buttons = {};

        // ボタンイベント
        _buttons["OK"] = function() {
            var sendKbn = $("input:radio[name='enq010ansedSendKbn']:checked").val();
            $(this).dialog('close');
            enq010Smail(enqId, sendKbn);
        };
        _buttons[msglist["cancel"]] = function() {
            $(this).dialog('close');
        };

        $('#enq010ansedSendKbn').attr("checked", false);
        $('#' + dialogName).dialog({
            autoOpen: true,   // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 210,
            width: 370,
            modal: true,
            closeOnEscape: false,
            overlay: {
                backgroundColor: '#000000',
                opacity: 0.5
            },
            buttons: _buttons
        });
    });

});