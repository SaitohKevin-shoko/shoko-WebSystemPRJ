function deleteCmt(cmd, cmtSid){
    $('#CMD')[0].value = cmd;
    document.forms[0].commentSid.value=cmtSid;
    document.forms[0].submit();
    return false;
}

function deleteHistory(cmd, hisSid){
    $('#CMD')[0].value = cmd;
    document.forms[0].historySid.value=hisSid;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function fileDl(cmd, binSid){
    $('#CMD')[0].value = cmd;
    document.forms[0].binSid.value=binSid;
    document.forms[0].submit();
    return false;
}

function rateChange(rate) {

    if (rate==-1) {
        var idx = 0;
        for (i = 0; i < document.forms[0].prj060status.length; i++) {
            if (document.forms[0].prj060status[i].checked == true) {
                idx = i;
                break;
            }
        }
        rate = document.forms[0].prj060status[idx].value;
    }

    if (rate==2) {
        document.getElementById('zisseki_fr').style.display = 'block';
        document.getElementById('zisseki_to').style.display = 'block';
        document.getElementById('kosu').style.display = 'block';
    } else {
        document.getElementById('zisseki_fr').style.display = 'none';
        document.getElementById('zisseki_to').style.display = 'none';
        document.getElementById('kosu').style.display = 'none';
    }
}

function clearDate(date){
    date.val('');
}

function moveDay(elmDate, kbn) {

    systemDate = new Date();
    var year = convYear(systemDate.getFullYear());
    var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
    var day = ("0" + systemDate.getDate()).slice(-2);

    //「今日ボタン押下」
    if (kbn == 2) {
        $(elmDate).val(year + "/" + month + "/" + day);
        return;
    }

    //「前日」or 「翌日」ボタン押下
    if (kbn == 1 || kbn == 3) {

        var ymdf = escape($(elmDate).val());
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date($(elmDate).val())

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getFullYear());
            var systemYear = convYear(systemDate.getFullYear());

            if (newYear < systemYear - 10 || newYear > systemYear + 10) {
                return;
            } else {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elmDate).val(year + "/" + month + "/" + day);
            }

        } else {

            if ($(elmDate).val() == '') {
                $(elmDate).val(year + "/" + month + "/" + day);
            }
        }
    }
}

function convYear(yyyy) {

  if(yyyy < 1900) {
    yyyy = 1900 + yyyy;
  }
  return yyyy;
}

function setDateParam() {
    setYmdParam($("#selDatefr"),
                $("input[name='prj060SelectYearFr']"),
                $("input[name='prj060SelectMonthFr']"),
                $("input[name='prj060SelectDayFr']"));
    setYmdParam($("#selDateto"),
                $("input[name='prj060SelectYearTo']"),
                $("input[name='prj060SelectMonthTo']"),
                $("input[name='prj060SelectDayTo']"));
}

function moveComment() {
    var mvFlg = $('input:hidden[name="prjmvComment"]').val();
    if (mvFlg == 1) {
       $(window).scrollTop($('#prj060CmtPnt').offset().top);
       $('input:hidden[name="prjmvComment"]').val("0");
    }
}

//テキストエリア最小縦幅
var comment_textarea_min_height = 126;

function comment_textarea_resize() {
    var textarea = document.getElementById("inputstr");
    if( textarea.scrollHeight > textarea.offsetHeight ){
        textarea.style.height = textarea.scrollHeight+'px';
    } else if ( textarea.scrollHeight < textarea.offsetHeight
        && textarea.offsetHeight > comment_textarea_min_height ){
      textarea.style.height = comment_textarea_min_height + 'px';
        textarea.style.height = textarea.scrollHeight+'px';
    }
}

$(function(){
    $(document).on("input", "#inputstr", function(e){
      comment_textarea_resize();
    });
});