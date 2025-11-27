function selectPage(id){
    if (id == 1) {
        document.forms[0].rng130pageTop.value=document.forms[0].rng130pageBottom.value;
    }

    document.forms[0].CMD.value='init';
    setDateParam();
    document.forms[0].submit();
    return false;
}

function changeGroupCombo(){
    document.forms[0].CMD.value='init';
    setDateParam();
    document.forms[0].submit();
    return false;
}

function clickRingi(cmd, cmdMode, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].rngCmdMode.value=cmdMode;
    document.forms[0].rngSid.value=sid;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function clickJyusinRingi(cmd, cmdMode, apprMode, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].rngSid.value=sid;
    document.forms[0].rngCmdMode.value=cmdMode;
    document.forms[0].rngApprMode.value=apprMode;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function clickTitle(sortKey, orderKey) {
    document.forms[0].CMD.value='init';
    document.forms[0].rng010sortKey.value=sortKey;
    document.forms[0].rng010orderKey.value=orderKey;
    document.forms[0].submit();
    return false;
}

function searchpush() {
    document.forms[0].CMD.value='search';
    document.forms[0].submit();
    return false;
}

function clickSortTitle(sortValue) {

    if (document.forms[0].sltSortKey1.value == sortValue) {

        if (document.forms[0].rng130orderKey1[0].checked == true) {
            document.forms[0].rng130orderKey1[0].checked = false;
            document.forms[0].rng130orderKey1[1].checked = true;
        } else {
            document.forms[0].rng130orderKey1[1].checked = false;
            document.forms[0].rng130orderKey1[0].checked = true;
        }
    } else {
        document.forms[0].sltSortKey1.value = sortValue;
    }

    return false;
}

function changeProcType(){
    controlInput();

    document.forms[0].CMD.value='changeType';
    setDateParam();
    document.forms[0].submit();
    return false;
}

function controlInput(){

    if (document.forms[0].rng130Type[0].checked == true) {
        document.forms[0].sltGroupSid.disabled=false;
        document.forms[0].sltUserSid.disabled=false;
        document.forms[0].rng130GroupBtn.disabled=false;

        document.forms[0].rng130ApplDateFr.disabled=false;
        document.forms[0].rng130ApplDateTo.disabled=false;

        document.forms[0].rng130LastManageDateFr.disabled=true;
        document.forms[0].rng130LastManageDateTo.disabled=true;

        document.forms[0].rng130Status.disabled = true;
        $('#status0').attr('disabled', true);
        $('#status1').attr('disabled', true);
        $('#status2').attr('disabled', true);
        $('#status3').attr('disabled', true);
        $('#status4').attr('disabled', true);
        $('#search_rngid').removeClass('display_none');

    } else if (document.forms[0].rng130Type[2].checked == true) {
        document.forms[0].sltGroupSid.disabled=false;
        document.forms[0].sltUserSid.disabled=false;
        document.forms[0].rng130GroupBtn.disabled=false;

        document.forms[0].rng130ApplDateFr.disabled=false;
        document.forms[0].rng130ApplDateTo.disabled=false;

        document.forms[0].rng130LastManageDateFr.disabled=false;
        document.forms[0].rng130LastManageDateTo.disabled=false;
        $('#status0').attr('disabled', false);
        $('#status1').attr('disabled', false);
        $('#status2').attr('disabled', false);
        $('#status3').attr('disabled', false);
        $('#status4').attr('disabled', false);

        $('#search_rngid').removeClass('display_none');
    } else if (document.forms[0].rng130Type[3].checked == true) {
        document.forms[0].sltGroupSid.disabled=true;
        document.forms[0].sltUserSid.disabled=true;
        document.forms[0].rng130GroupBtn.disabled=true;

        document.forms[0].rng130ApplDateFr.disabled=true;
        document.forms[0].rng130ApplDateTo.disabled=true;

        document.forms[0].rng130LastManageDateFr.disabled=true;
        document.forms[0].rng130LastManageDateTo.disabled=true;

        $('#status0').attr('disabled', true);
        $('#status1').attr('disabled', true);
        $('#status2').attr('disabled', true);
        $('#status3').attr('disabled', true);
        $('#status4').attr('disabled', true);
        $('#search_rngid').addClass('display_none');

    } else {
        document.forms[0].sltGroupSid.disabled=false;
        document.forms[0].sltUserSid.disabled=false;
        document.forms[0].rng130GroupBtn.disabled=false;

        document.forms[0].rng130ApplDateFr.disabled=false;
        document.forms[0].rng130ApplDateTo.disabled=false;

        document.forms[0].rng130LastManageDateFr.disabled=false;
        document.forms[0].rng130LastManageDateTo.disabled=false;
        document.forms[0].rng130Status.disabled = true;
        $('#status0').attr('disabled', true);
        $('#status1').attr('disabled', true);
        $('#status2').attr('disabled', true);
        $('#status3').attr('disabled', true);
        $('#status4').attr('disabled', true);
        $('#search_rngid').removeClass('display_none');
    }
}

$(function(){
    var width = $('#csvTable').width();
    if(width != null) {
        $('#csvDiv').width(width - 140);
    }
    var selectsid = $('#account_comb_box').val();
    var sessionsid = $('#sessionSid').text();
    var disp = document.getElementById("type4").style;
    var dispmes = document.getElementById("type4mes").style;
    if ( selectsid != sessionsid) {
        disp.display = "none";
        dispmes.display = "none";
    }
    else {
        disp.display = "";
        dispmes.display = "";
    }
});

var timer = false;
$(window).resize(function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        var width = $('#csvTable').width();
        if(width != null) {
            $('#csvDiv').width(width - 140);
        }
    }, 150);
});

/* アカウント変更 */
$(document).on("change", '#account_comb_box', function(){
    var selectsid = $('#account_comb_box').val();
    var sessionsid = $('#sessionSid').text();
    var disp = document.getElementById("type4").style;
    var dispmes = document.getElementById("type4mes").style;
    var soukou = document.getElementById("type4").checked;
    if ( selectsid != sessionsid) {
        disp.display = "none";
        dispmes.display = "none";
        if (soukou) {
            document.forms[0].rng130Type[0].checked = true;
            changeProcType();
        }
    }
    else {
        disp.display = "";
        dispmes.display = "";
    }
});

var nowDate = "";
var outPutDirHash = "";
var distinctCount = 0;
var unloadFlg = false;

function pdfOutputButton() {
    $("#pdfErrorArea").hide();
    $("#outputCount").html("");
    document.forms[0].CMD.value='outputPdf';
    var paramStr = "";
    paramStr += getFormData($('#rmgForm'));
    $.ajax({
        async: true,
        url:  "../ringi/rng130.do",
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
        title: msglist_rng130['cmn.pdf'],
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
    document.forms[0].rng130rngNowDate.value = nowDate;
    document.forms[0].rng130outPutDirHash.value = hashKey;
        setTimeout(function() { pdfCheck(data, 0); }, 3000);
}


function pdfCheck(json, count) {
    document.forms[0].CMD.value='pdfCheck';
    nowDate = json.nowDate;
    outPutDirHash = json.hashKey;

    var paramStr = "";
    paramStr += getFormData($('#rmgForm'));
    $.ajax({
        async: true,
        url:  "../ringi/rng130.do",
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
                $("#outputCount").html(data.count + msglist_rng130['cmn.number'] + " / " + json.count + msglist_rng130['cmn.number']);
                setTimeout(function() { pdfCheck(json, data.count); }, 3000);
            }
        }
    });
}

function pdfCancel() {
    document.forms[0].CMD.value='pdfCancel';
    var paramStr = "";
    paramStr += getFormData($('#rmgForm'));
    $.ajax({
        async: true,
        url:  "../ringi/rng130.do",
        type: "post",
        dataType: "json",
        processData: false,
        data: paramStr
    }).done(function( data ) {
        unloadFlg = false;
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
        paramStr += getFormData($('#rmgForm'));
        $.ajax({
            async: true,
            url:  "../ringi/rng130.do",
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
    document.forms[0].rng130rngNowDate.value = nowDate;
    document.forms[0].rng130outPutDirHash.value = outPutDirHash;
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
    paramStr += getFormData($('#rmgForm'));
    $.ajax({
        async: false,
        url:  "../ringi/rng130.do",
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


// イベントを登録
$(function(){

    // Enterキーを押下した際の処理
   $(window).keydown(function(e){
        if (e.which == 13
                && $('input:hidden[name="CMD"]').val() != "search"
                && $('input[name="rngKeyword"]').is(":focus")) {
            document.forms[0].CMD.value='search';
            document.forms[0].submit();
            return false;
        }
    });

    window.onunload = function() {
        if (unloadFlg) {
            menu_evt();
        }
    }
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

    /*hover:click
     * rng_mode
     * 0:受信 1:申請 2:完了 3:草稿 4:後閲
     */
    $(document).on("click", ".js_listClick", function(){
        var sid = $(this).parent().find(':hidden[name="rngData_sid"]').val();
        var rng_mode = $(this).parent().find(':hidden[name="rng_mode"]').val();
        if(rng_mode == 0 || rng_mode == 4) {
            var appr_mode = $(this).parent().find(':hidden[name="rngData_ApprMode"]').val();
            clickJyusinRingi("rngDetail", 0, appr_mode, sid);
        } else if(rng_mode == 1 || rng_mode == 2) {
            clickRingi("rngDetail", 0, sid);
        } else if(rng_mode == 3) {
            clickRingi("rngEdit", 1, sid);
        }
    });

});
