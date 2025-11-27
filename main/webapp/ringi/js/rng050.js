function changeGroupCombo(){
    document.forms[0].CMD.value='init';
    setDateParam();
    document.forms[0].submit();
    return false;
}

function changeUserCombo(){
    document.forms[0].submit();
    return false;
}
function changePage(id){
    if (id == 1) {
        document.forms[0].rngAdminPageTop.value=document.forms[0].rngAdminPageBottom.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}
function sorton(sortKey, orderKey){
    document.forms[0].CMD.value='init';
    document.forms[0].rngAdminOrderKey.value=orderKey;
    document.forms[0].rngAdminSortKey.value=sortKey;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function selectPage(id){
    if (id == 1) {
        document.forms[0].rngAdminPageTop.value=document.forms[0].rngAdminPageBottom.value;
    }

    document.forms[0].CMD.value='init';
    setDateParam();
    document.forms[0].submit();
    return false;
}

function clickRingi(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].rngSid.value=sid;
    setDateParam();
    document.forms[0].submit();
    return false;
}

var nowDate = "";
var outPutDirHash = "";
var distinctCount = 0;
var unloadFlg = false;

function pdfOutputButton() {
    $("#pdfErrorArea").hide();
    $("#outputCount").html("");
    document.forms[0].CMD.value='outputPdf';
    var paramStr = "";
    paramStr += getFormData($('#rngForm'));
    $.ajax({
        async: true,
        url:  "../ringi/rng050.do",
        type: "post",
        dataType: "json",
        processData: false,
        data: paramStr
    }).done(function( data ) {
        if (data.rtn == "true") {
            loadingPop(data.now, data.hash, data.cnt);
        } else {
            $("#pdfErrorArea").show();
            $("#pdfErrorText").html(data.err);
        }
    });
    return false;
}

function openPdfPop() {
    window.addEventListener('beforeunload', onBeforeunloadHandler, false);
    unloadFlg = true;
    distinctCount = 0;
    $("#pdfZip").hide();
    $("#pdfDownload").hide();
    $("#pdfError").hide();
    $("#pdfOutput").show();
    $('#loading_pop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 180,
        width: 280,
        modal: true,
        title: "出力中",
        closeOnEscape: false,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
        }
    });
}
function loadingPop(nowDate, hashKey, count) {
    openPdfPop();
    var data = {};
    data.nowDate = nowDate;
    data.hashKey = hashKey;
    data.count = count;
    document.forms[0].rng050rngNowDate.value = nowDate;
    document.forms[0].rng050outPutDirHash.value = hashKey;
    setTimeout(function() { pdfCheck(data, 0); }, 3000);
}

function pdfCheck(json, count) {
    document.forms[0].CMD.value='pdfCheck';
    nowDate = json.nowDate;
    outPutDirHash = json.hashKey;

    var paramStr = "";
    paramStr += getFormData($('#rngForm'));
    $.ajax({
        async: true,
        url:  "../ringi/rng050.do",
        type: "post",
        dataType: "json",
        processData: false,
        data: paramStr
    }).done(function( data ) {
        if (count != 0 && count == data.count) {
            distinctCount++
        } else {
            distinctCount = 1;
        }
        if (distinctCount == 5 || data.errorFlg == "true") {
            $("#pdfOutput").hide();
            $("#pdfZip").hide();
            $("#pdfDownload").hide();
            $("#pdfError").show();
            window.removeEventListener('beforeunload', onBeforeunloadHandler, false);
            nowDate = "";
            outPutDirHash = "";
            unloadFlg = false;
        } else if (data.cancelFlg != "true") {
            if (data.pdfComplateFlg == "true") {
                $("#pdfOutput").hide();
                $("#pdfZip").hide();
                $("#pdfError").hide();
                $("#pdfDownload").show();
                $("#zipName").html(json.nowDate + "_稟議一覧.zip  ( " + data.fileSize + " )");
                window.removeEventListener('beforeunload', onBeforeunloadHandler, false);
                unloadFlg = false;
            } else if (data.zipStartFlg == "true") {
                $("#pdfOutput").hide();
                $("#pdfDownload").hide();
                $("#pdfError").hide();
                $("#pdfZip").show();
                setTimeout(function() { pdfCheck(json, data.count); }, 3000);
            } else {
                $("#outputCount").html(data.count + msglist_rng050['cmn.number'] + " / " + json.count + msglist_rng050['cmn.number']);
                setTimeout(function() { pdfCheck(json, data.count); }, 3000);
            }
        }
    });
}

function pdfCancel() {
    document.forms[0].CMD.value='pdfCancel';
    var paramStr = "";
    paramStr += getFormData($('#rngForm'));
    $.ajax({
        async: true,
        url:  "../ringi/rng050.do",
        type: "post",
        dataType: "json",
        processData: false,
        data: paramStr
    }).done(function( data ) {
        window.removeEventListener('beforeunload', onBeforeunloadHandler, false);
        $('#loading_pop').dialog('close');
        $("#pdfOutput").hide();
        $("#pdfZip").hide();
        $("#pdfDownload").hide();
        $("#pdfError").hide();
        nowDate = "";
        outPutDirHash = "";
        unloadFlg = false;
    });
    return false;
}

function pdfDialogClose(delFlg) {
    if (delFlg) {
        document.forms[0].CMD.value='pdfDelete';
        var paramStr = "";
        paramStr += getFormData($('#rngForm'));
        $.ajax({
            async: true,
            url:  "../ringi/rng050.do",
            type: "post",
            dataType: "json",
            processData: false,
            data: paramStr
        }).done(function( data ) {
            if (data.rtn) {
                nowDate = "";
                outPutDirHash = "";
                $('#loading_pop').dialog('close');
            }
        });
    } else {
        nowDate = "";
        outPutDirHash = "";
        $('#loading_pop').dialog('close');
    }
    return false;
}

function pdfDownload() {
    document.forms[0].CMD.value = 'pdf';
    document.forms[0].rng050rngNowDate.value = nowDate;
    document.forms[0].rng050outPutDirHash.value = outPutDirHash;
    nowDate = "";
    outPutDirHash = "";
    document.forms[0].submit();
    $('#loading_pop').dialog('close');
    return false;
}

function getFormData(formObj) {
    var formData = "";
    formData = formObj.serialize();
    return formData;
}

function menu_evt() {
    document.forms[0].CMD.value='pdfCancel';
    var paramStr = "";
    paramStr += getFormData($('#rngForm'));
    $.ajax({
        async: false,
        url:  "../ringi/rng050.do",
        type: "post",
        dataType: "json",
        processData: false,
        data: paramStr
    }).done(function( data ) {
    });
}


function setDateParam() {
    setYmdParam($("#selDateaf"),
                $("input[name='sltApplYearFr']"),
                $("input[name='sltApplMonthFr']"),
                $("input[name='sltApplDayFr']"));
    setYmdParam($("#selDateat"),
                $("input[name='sltApplYearTo']"),
                $("input[name='sltApplMonthTo']"),
                $("input[name='sltApplDayTo']"));
    setYmdParam($("#selDatelf"),
                $("input[name='sltLastManageYearFr']"),
                $("input[name='sltLastManageMonthFr']"),
                $("input[name='sltLastManageDayFr']"));
    setYmdParam($("#selDatelt"),
                $("input[name='sltLastManageYearTo']"),
                $("input[name='sltLastManageMonthTo']"),
                $("input[name='sltLastManageDayTo']"));
}

var onBeforeunloadHandler = function(e) {
    e.returnValue = "PDF出力中です。";
};

//イベントを登録
$(function(){
 window.onunload = function() {
     if (unloadFlg) {
         menu_evt();
     }
 }

 /*hover */
 $('.js_listHover')
     .mouseenter(function (e) {
         $(this).children().addClass("list_content-on");
         $(this).prev().children().addClass("list_content-topBorder");
     })
     .mouseleave(function (e) {
         $(this).children().removeClass("list_content-on");
         $(this).prev().children().removeClass("list_content-topBorder");
     });

 /*hover:click */
 $(document).on("click", ".js_listClick", function(){
     var sid = $(this).parent().attr("id");
     clickRingi('rng030', sid);
 });

});
