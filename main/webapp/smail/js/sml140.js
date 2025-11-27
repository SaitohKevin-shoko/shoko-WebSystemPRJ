function changeEnableDisable() {

    var jbatchKbn = 0;
    var jbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml140JdelKbn.length; i++) {
        if (document.forms[0].sml140JdelKbn[i].checked == true) {
            jbatchKbn = i;
        }
    }
    jbatchKbnVal = document.forms[0].sml140JdelKbn[jbatchKbn].value;

    if (jbatchKbnVal == 0) {
        document.forms[0].sml140JYear.disabled = true;
        document.forms[0].sml140JYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml140JMonth.disabled = true;
        document.forms[0].sml140JMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml140JYear.disabled = false;
        document.forms[0].sml140JYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml140JMonth.disabled = false;
        document.forms[0].sml140JMonth.style.backgroundColor = '#ffffff';
    }

    var sbatchKbn = 0;
    var sbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml140SdelKbn.length; i++) {
        if (document.forms[0].sml140SdelKbn[i].checked == true) {
            sbatchKbn = i;
        }
    }
    sbatchKbnVal = document.forms[0].sml140SdelKbn[sbatchKbn].value;

    if (sbatchKbnVal == 0) {
        document.forms[0].sml140SYear.disabled = true;
        document.forms[0].sml140SYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml140SMonth.disabled = true;
        document.forms[0].sml140SMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml140SYear.disabled = false;
        document.forms[0].sml140SYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml140SMonth.disabled = false;
        document.forms[0].sml140SMonth.style.backgroundColor = '#ffffff';
    }

    var wbatchKbn = 0;
    var wbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml140WdelKbn.length; i++) {
        if (document.forms[0].sml140WdelKbn[i].checked == true) {
            wbatchKbn = i;
        }
    }
    wbatchKbnVal = document.forms[0].sml140WdelKbn[wbatchKbn].value;

    if (wbatchKbnVal == 0) {
        document.forms[0].sml140WYear.disabled = true;
        document.forms[0].sml140WYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml140WMonth.disabled = true;
        document.forms[0].sml140WMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml140WYear.disabled = false;
        document.forms[0].sml140WYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml140WMonth.disabled = false;
        document.forms[0].sml140WMonth.style.backgroundColor = '#ffffff';
    }

    var dbatchKbn = 0;
    var dbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml140DdelKbn.length; i++) {
        if (document.forms[0].sml140DdelKbn[i].checked == true) {
            dbatchKbn = i;
        }
    }
    dbatchKbnVal = document.forms[0].sml140DdelKbn[dbatchKbn].value;

    if (dbatchKbnVal == 0) {
        document.forms[0].sml140DYear.disabled = true;
        document.forms[0].sml140DYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml140DMonth.disabled = true;
        document.forms[0].sml140DMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml140DYear.disabled = false;
        document.forms[0].sml140DYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml140DMonth.disabled = false;
        document.forms[0].sml140DMonth.style.backgroundColor = '#ffffff';
    }
}

function submitStyleChange() {
    document.forms[0].sml140JYear.disabled=false;
    document.forms[0].sml140JMonth.disabled=false;
    document.forms[0].sml140SYear.disabled=false;
    document.forms[0].sml140SMonth.disabled=false;
    document.forms[0].sml140WYear.disabled=false;
    document.forms[0].sml140WMonth.disabled=false;
    document.forms[0].sml140DYear.disabled=false;
    document.forms[0].sml140DMonth.disabled=false;
}

function setDispState(kbnElem, yearElem, monthElem) {

    for (i = 0; i < kbnElem.length; i++) {
        if (kbnElem[i].checked == true) {
            batchKbn = i;
        }
    }
    batchKbnVal = kbnElem[batchKbn].value;

    if (batchKbnVal == 0) {
        yearElem.disabled = true;
        yearElem.style.backgroundColor = '#e0e0e0';
        monthElem.disabled = true;
        monthElem.style.backgroundColor = '#e0e0e0';
    } else {
        yearElem.disabled = false;
        yearElem.style.backgroundColor = '#ffffff';
        monthElem.disabled = false;
        monthElem.style.backgroundColor = '#ffffff';
    }
}

$(function() {

    //アカウント選択ボタン
    $("#accountSelBtn").live("click", function(){

        /* アカウント選択ポップアップ */
        $('#accountSelPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 600,
            width: 800,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              閉じる: function() {
                  $(this).dialog('close');
              }
            }
        });
    });

    //対象アカウントラジオボタン
    $(".accountSelKbn").live("change", function(){
        $('#accountSelArea').toggle();
    });

    if ($('input[name=sml140SelKbn]:checked').val() == 0) {
        $('#accountSelArea').removeClass('display_none');
    } else {
        $('#accountSelArea').addClass('display_none');
    }

});

