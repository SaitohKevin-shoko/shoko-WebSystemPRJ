function enq970searchDetail() {
    var dspVal = document.forms[0].enq970searchDetailFlg.value;

    if (dspVal == 1) {
        $('#enq970searchDetailArea').show();
    } else {
        $('#enq970searchDetailArea').hide();
    }
}

function enq970changeSearch() {
    var dspVal = document.forms[0].enq970searchDetailFlg.value;

    if (dspVal == 0) {
        document.forms[0].enq970searchDetailFlg.value='1';
        document.forms[0].helpPrm.value='1';
    } else {
        document.forms[0].enq970searchDetailFlg.value='0';
        document.forms[0].helpPrm.value='0';
    }
    enq970searchDetail();
}

function enq970chkSrhDate(dateType) {
    if (dateType == 1) {
        enq970ChangeDateArea('enq970makeDateKbn', 'enq970makeDateArea');
    } else if (dateType == 2) {
        enq970ChangeDateArea('enq970pubDateKbn', 'enq970pubDateArea');
    } else if (dateType == 3) {
        enq970ChangeDateArea('enq970ansDateKbn', 'enq970ansDateArea');
    } else if (dateType == 4) {
        enq970ChangeDateArea('enq970resPubDateKbn', 'enq970resPubDateArea');
    }
}

function enq970ChangeDateArea(paramName, areaId) {
    if ($('input[name="' + paramName + '"]:checked').val() == 1) {
        $('#' + areaId).show();
    } else {
        $('#' + areaId).hide();
    }
}

function enq970changePage(id){
    if (id == 0) {
        document.forms[0].enq970pageBottom.value=document.forms[0].enq970pageTop.value;
    } else {
        document.forms[0].enq970pageTop.value=document.forms[0].enq970pageBottom.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function enq970ClickTitle(sortKey, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].enq970sortKey.value=sortKey;
    document.forms[0].enq970order.value=order;
    document.forms[0].submit();
    return false;
}

function enq970viewDetail(enqSid) {
    document.forms[0].CMD.value='enq970detail';
    document.forms[0].enqEditMode.value='1';
    document.forms[0].editEnqSid.value=enqSid;
    document.forms[0].submit();
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

function enq970EnqResult(enqSid) {
    document.forms[0].CMD.value='enq970result';
    document.forms[0].ansEnqSid.value=enqSid;
    document.forms[0].enq970BackPage.value='1';
    document.forms[0].submit();
}

function setParams() {
	setYmdParam($("input[name='enq970makeDateFrom']"),
	    $("input[name='enq970makeDateFromYear']"),
	    $("input[name='enq970makeDateFromMonth']"),
	    $("input[name='enq970makeDateFromDay']"));

	setYmdParam($("input[name='enq970makeDateTo']"),
	    $("input[name='enq970makeDateToYear']"),
	    $("input[name='enq970makeDateToMonth']"),
	    $("input[name='enq970makeDateToDay']"));
	    
    setYmdParam($("input[name='enq970ansDateFrom']"),
	    $("input[name='enq970ansDateFromYear']"),
	    $("input[name='enq970ansDateFromMonth']"),
	    $("input[name='enq970ansDateFromDay']"));

	setYmdParam($("input[name='enq970ansDateTo']"),
	    $("input[name='enq970ansDateToYear']"),
	    $("input[name='enq970ansDateToMonth']"),
	    $("input[name='enq970ansDateToDay']"));
	    
	setYmdParam($("input[name='enq970resPubDateFrom']"),
	    $("input[name='enq970resPubDateFromYear']"),
	    $("input[name='enq970resPubDateFromMonth']"),
	    $("input[name='enq970resPubDateFromDay']"));

	setYmdParam($("input[name='enq970resPubDateTo']"),
	    $("input[name='enq970resPubDateToYear']"),
	    $("input[name='enq970resPubDateToMonth']"),
	    $("input[name='enq970resPubDateToDay']"));
}

$(function() {
    $('#enq970searchDetailArea').hide();
    enq970chkSrhDate(1);
    enq970chkSrhDate(2);
    enq970chkSrhDate(3);
    enq970chkSrhDate(4);

    if (document.forms[0].enq970searchDetailFlg.value == '1') {
        enq970searchDetail();
    }

    $("label").inFieldLabels();

    $('.js_tableTopCheck-header').on("change", function() {
        chgCheckAll('enq970allCheck', 'enq970selectEnqSid');
    });
});
