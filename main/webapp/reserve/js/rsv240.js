function changeChk() {
   var chkFlg;
   if (document.forms[0].rsv240AllCheck.checked) {
       checkAll('rsv240RsgSids');
   } else {
       nocheckAll('rsv240RsgSids');
   }
}

function lmtEnableDisable() {
    var ctext = $('#lmtinput')[0];
    var allCheckFlg = document.getElementsByName("rsv240AllCheck");
    var rsgSidFlg = document.getElementsByName("rsv240RsgSids");
    var dspRsgSidFlg = false;

    for(i = 0; i < rsgSidFlg.length; i++) {
        dspRsgSidFlg = rsgSidFlg[i].checked;
        if (dspRsgSidFlg) {
            break;
        }
    }

    if (allCheckFlg[0].checked || dspRsgSidFlg) {
        ctext.setAttribute('class', 'txt_l');
    } else {
        ctext.setAttribute('class', 'txt_l display_n');
    }
}

$(function() {

  $('.js_tableTopCheck-header').live("change",function() {
    changeChk();
    lmtEnableDisable();
  });
    /* hover */
    $('.js_listHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    $('.js_radio').live("click", function(e){
      if (!$(e.target).is('.js_check')) {
        var check = $(this).parent().find('.js_check');
        if (check.attr('checked')) {
            check.attr('checked',false);
        } else {
            check.attr('checked',true);
        }
      }
      lmtEnableDisable();
    });
});