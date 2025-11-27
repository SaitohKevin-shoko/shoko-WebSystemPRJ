function syubetsuChange(){

    var syubetsuList = document.getElementsByName('cir060syubetsu');
    var syubetu = 0;
    for (i = 0; i < syubetsuList.length; i++) {
        if (syubetsuList[i].checked == true) {
            syubetu = syubetsuList[i].value;
            break;
        }
    }

    if (syubetu == 0) {
        //jusin
        document.forms[0].selectBtn.disabled = true;
        $('.cir_send_sel_btn').addClass('btn_base_disabled baseBtn');
        $('#cir060GroupBtn').removeClass('btn_base_disabled');
        $("#cir060GroupBtn").prop("disabled", false);
        document.forms[0].clearBtn.disabled = true;
        document.forms[0].clearBtn.className = 'btn_base_disabled baseBtn';

        clearUserList();

        document.forms[0].cir060groupSid.disabled = false;
        document.forms[0].cir060userSid.disabled = false;

    } else if (syubetu == 1) {
        //sosin
        document.forms[0].cir060groupSid.value = -1;
        document.forms[0].cir060userSid.value = -1;
        document.forms[0].cir060groupSid.disabled = true;
        document.forms[0].cir060userSid.disabled = true;

        document.forms[0].selectBtn.disabled = false;
        $('.cir_send_sel_btn').addClass('baseBtn');
        $('.cir_send_sel_btn').removeClass('btn_base_disabled');
        $("#cir060GroupBtn").prop("disabled", true);
        document.forms[0].clearBtn.disabled = false;
        document.forms[0].clearBtn.className = 'baseBtn';

    } else {
        //gomi
        document.forms[0].cir060groupSid.disabled = false;
        document.forms[0].cir060userSid.disabled = false;
        document.forms[0].selectBtn.disabled = false;
        $('.cir_send_sel_btn').addClass('baseBtn');
        $('.cir_send_sel_btn').removeClass('btn_base_disabled');
        $("#cir060GroupBtn").prop("disabled", false);
        document.forms[0].clearBtn.disabled = false;
        document.forms[0].clearBtn.className = 'baseBtn';
    }

    return false;
}

function clearUserList(){
    $('#atesaki_to_area')[0].innerHTML = '';
    var userSid = document.getElementsByName('cir060selUserSid');
    for (i = 0; i < userSid.length; i++) {
        userSid[i].value = '';
        userSid[i].disabled = true;
    }
}

function hassinChange(cmd){
    document.forms[0].cir060userSid.value = -1;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        document.forms[0].cir060pageNum2.value = document.forms[0].cir060pageNum1.value;
    } else {
        document.forms[0].cir060pageNum1.value = document.forms[0].cir060pageNum2.value;
    }

    document.forms[0].CMD.value='searchAgain';
    document.forms[0].submit();
    return false;
}

function viewItem(cmd, id, kbn){
    document.forms[0].CMD.value=cmd;
    document.forms[0].cir010selectInfSid.value=id;
    document.forms[0].cir010sojuKbn.value=kbn;
    document.forms[0].submit();
    return false;
}

function clickSortTitle(sortValue) {

    if (document.forms[0].cir060sort1.value == sortValue) {

        if (document.forms[0].cir060order1[0].checked == true) {
            document.forms[0].cir060order1[0].checked = false;
            document.forms[0].cir060order1[1].checked = true;
        } else {
            document.forms[0].cir060order1[1].checked = false;
            document.forms[0].cir060order1[0].checked = true;
        }
    } else {
        document.forms[0].cir060sort1.value = sortValue;
    }
    return false;
}
/**
 * �e��ʂɖ߂�ۂɃA�N�V�����ɃR�}���h��n���ꍇ
 * cmd �R�}���h
 */
function openGroupWindowForCircular(formOj, selBoxName, myGpFlg, cmd) {

    document.forms[0].cir060userSid.value = -1;
    if (cmd != "") {
        document.forms[0].CMD.value=cmd;
    }
    openGroup(formOj, selBoxName, myGpFlg, "");
    return;
}



$(function() {

    /* hover */
    $(document).on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    }, '.js_listHover');

    /* hover:click */
    $(document).on("click", ".js_listClick", function(){
        var id = $(this).parent().attr("id");
        var result = id.split(',');
        var sid = result[0];
        var flg = result[1];
        viewItem('view',sid,flg);
    });

    //宛先選択ボタン
    $(document).on("click", ".cir_send_sel_btn", function(){
        $(this).ciratesaki('open');

    });

});

function getNowSelUsr() {

    var paramStr = "";

    $('input:hidden[name=cir060selUserSid]').each(function(){
        paramStr += "&cmn120userSid=" + $(this).val();
    });

    return paramStr;

}



function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function htmlEscape(s){
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
}