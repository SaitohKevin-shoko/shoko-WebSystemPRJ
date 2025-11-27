function buttonPush(cmd){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function changeGroupCombo(){
    document.forms[0].cmd.value='';
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}

function addNippou(cmd, ymd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectDate.value=ymd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}

function editNippou(cmd, ymd, sid, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectDate.value=ymd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].ntp010NipSid.value=sid;
    document.forms[0].submit();
    return false;
}

function moveMonthNippou(cmd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}

function moveCreateMsg(cmd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}

function setZaiseki(uid){
    document.forms[0].CMD.value='ntp030Zaiseki';
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].submit();
    return false;
}

function setFuzai(uid){
    document.forms[0].CMD.value='ntp030Fuzai';
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].submit();
    return false;
}

function setSonota(uid){
    document.forms[0].CMD.value='ntp030Sonota';
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].submit();
    return false;
}
function moveListNippou(cmd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}
function keyPress(keycode) {
    if (keycode == 13) {
        document.forms[0].CMD.value='search';
        document.forms[0].submit();
        return false;
    }
}

munuLinkStr = new Array(3);
munuLinkStr[0] = "nippou";
munuLinkStr[1] = "anken";
munuLinkStr[2] = "bunseki";
munuLinkStr[3] = "mente";


function buttonPush(cmd){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

$(function() {

    /* タブ変更 */
    $(".kojinarea").live("click", function(){
        $("#ankentab").addClass("ntpBunseki_none");
        $("#kojintab").removeClass("ntpBunseki_none");
        $("#ankenbunseki").addClass("ntpBunseki_none");
        $("#kojinbunseki").removeClass("ntpBunseki_none");
    });

    $(".ankenarea").live("click", function(){
        $("#kojintab").addClass("ntpBunseki_none");
        $("#ankentab").removeClass("ntpBunseki_none");
        $("#kojinbunseki").addClass("ntpBunseki_none");
        $("#ankenbunseki").removeClass("ntpBunseki_none");
    });

});

/* メニュー表示変更 */
function changeMenu(classname) {
    for (i = 0; i < munuLinkStr.length; i++) {
        if (classname == munuLinkStr[i]) {
            $("." + classname + "Link_img_td").removeClass("timeline_menu_td");
            $("." + classname + "Link_txt_td").removeClass("timeline_menu_td2");
            $("." + classname + "Link_img_td").addClass("timeline_menu_td1");
            $("." + classname + "Link_txt_td").addClass("timeline_menu_td3");
            $("#" + classname + "Area").removeClass("areanone");
            $("#" + classname + "Area").addClass("areablock");
        } else {
            $("." + munuLinkStr[i] + "Link_img_td").addClass("timeline_menu_td");
            $("." + munuLinkStr[i] + "Link_txt_td").addClass("timeline_menu_td2");
            $("." + munuLinkStr[i] + "Link_img_td").removeClass("timeline_menu_td1");
            $("." + munuLinkStr[i] + "Link_txt_td").removeClass("timeline_menu_td3");
            $("#" + munuLinkStr[i] + "Area").addClass("areanone");
            $("#" + munuLinkStr[i] + "Area").removeClass("areablock");
        }
    }
}