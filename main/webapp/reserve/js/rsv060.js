function buttonPush(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function changeGroupCombo(){
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}

function bodyLoad() {

    var admIdx = 0;
    for (i = 0; i < document.forms[0].rsv060GrpAdmKbn.length; i++) {
        if (document.forms[0].rsv060GrpAdmKbn[i].checked == true) {
            admIdx = i;
        }
    }
    var admVal = document.forms[0].rsv060GrpAdmKbn[admIdx].value;

    admChange(admVal);
}

function admChange(admKbn) {

    if (admKbn == '0') {
        $('fieldset[name="saveUserUI"]').prop('disabled', false);

        document.forms[0].rsv060apprKbn[0].disabled=false;
        document.forms[0].rsv060apprKbn[1].disabled=false;
    } else if (admKbn == '1') {
        $('fieldset[name="saveUserUI"]').prop('disabled', true);

        document.forms[0].rsv060apprKbn[0].disabled=true;
        document.forms[0].rsv060apprKbn[1].disabled=true;
        document.forms[0].rsv060apprKbn[0].checked=false;
        document.forms[0].rsv060apprKbn[1].checked=true;
    }
}

function showOrHide(){
  if (document.forms[0].rsv060AccessDspFlg.value == 'true') {
      showText();
  } else {
      hideText();
  }
}

function changeShowOrHide(){
  if (document.forms[0].rsv060AccessDspFlg.value == 'true') {
      hideText();
      document.forms[0].rsv060AccessDspFlg.value = false;
  } else {
      showText();
      document.forms[0].rsv060AccessDspFlg.value = true;
  }
}

function showText(){
    var item1 = $('#show0');
    var item2 = $('#text1');
    var item3 = $('#text2');
    item1.show();
    item2.show();
    item3.hide();
}

function hideText(){
    var item1 = $('#show0');
    var item2 = $('#text1');
    var item3 = $('#text2');
    item1.hide();
    item2.hide();
    item3.show();
}


$(function() {

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

  /* hover:click */
  $(document).on("click", ".js_listClick", function(){
    var sid = $(this).attr("id");
    openSisetuSyosai(sid);
  });
});
