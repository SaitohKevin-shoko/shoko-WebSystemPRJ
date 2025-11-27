$(function(){
    $('.js_tableTopCheck-header').live("change",function() {
        changeChk();
    });
});



function editButton(date){
    document.forms[0].CMD.value='single_edit';
    document.forms[0].editDay.value=date;
    document.forms[0].submit();
    return false;
}
function multiEditButton(){
    document.forms[0].CMD.value='multi_edit';
    document.forms[0].editDay.value='';
    document.forms[0].submit();
    return false;
}

function editStrDakokuButton(date){
    document.forms[0].CMD.value='dakoku_edit';
    document.forms[0].editDay.value=date;
    document.forms[0].dakokuStrSetFlg.value=1;
    document.forms[0].submit();
    return false;
}

function editEndDakokuButton(date){
    document.forms[0].CMD.value='dakoku_edit';
    document.forms[0].editDay.value=date;
    document.forms[0].dakokuEndSetFlg.value=1;
    document.forms[0].submit();
    return false;
}

function changeGroupCombo(){
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function changeUserCombo(){
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function changeChk(){

    var chkFlg;
    if (document.forms[0].allChk.checked) {
        checkWeekDayAll('selectDay');
    } else {
        nocheckAll('selectDay');
    }
}

function checkWeekDayAll(chkName){

    chkAry = document.getElementsByName(chkName);
    for (i = 0; i < chkAry.length; i++) {
        var trElem = chkAry[i].parentNode.parentNode;
        var oElements = trElem.childNodes;
        for (j = 0; j < oElements.length; j++) {
            var oElem = oElements[j];
            if (oElem.tagName == "TD") {
                var cElements = oElem.childNodes;
                for (k = 0; k < cElements.length; k++) {
                    if (cElements[k].tagName == "SPAN") {
                        var spanElem = cElements[k];
                        if (spanElem.className.substr(0, 8) != 'cl_fontS') {
                            chkAry[i].checked = true;
                        }
                    }
                }
            }
        }
    }
}
