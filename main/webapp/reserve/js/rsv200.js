function buttonPush(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function changeChk(){

   var chkFlg;
   if (document.forms[0].allCheck.checked) {
       chkFlg = true;
   } else {
       chkFlg = false;
   }

   targetArray = document.getElementsByName("rsv200TargetSisetu");
   for(i = 0; i < targetArray.length; i++) {
       targetArray[i].checked = chkFlg;
   }
}

$(function(){

  $('.js_tableTopCheck-header').live("change",function() {
    changeChk();
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
  /* hover:click */
  $(".js_listClick").live("click", function(){
        var sid = $(this).parent().attr("id");
        openSisetuSyosai(sid);
  });
  function changeProp() {
    var checked = $(this).is(':checked');
    if (checked == true) {
        $(this).parents('tr').children('td').addClass('bgC_select');
    } else {
        $(this).parents('tr').children('td').removeClass('bgC_select');
    }
  };

  $('.js_rsv200Prop_check').live({
    change:function (e) {
        changeProp.call(this);
    }
  });
  $.each($('.js_rsv200Prop_check'), function() {
        changeProp.call(this);
  });

  $('.js_rsv200Prop_th').live({
    click:function(e) {
      if (e.target != this) {
        return ;
      }
      var box = $(this).find('input[type=checkbox]');
      var checked = box.is(':checked');
      if (checked) {
        box.removeAttr('checked');
      } else {
        box.attr('checked', 'checked');
      }
      box.change();
    }
  });


});