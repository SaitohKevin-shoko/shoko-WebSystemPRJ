function setDisabled(value) {
    if (document.forms[0].man080Interval[2].checked == true) {
        document.forms[0].man080dow.disabled=false;
        document.forms[0].man080weekmonth.disabled=true;
        document.forms[0].man080monthdow.disabled=true;

    } else if (document.forms[0].man080Interval[3].checked == true) {
        document.forms[0].man080dow.disabled=true;
        document.forms[0].man080weekmonth.disabled=false;
        document.forms[0].man080monthdow.disabled=false;

    } else {
        document.forms[0].man080dow.disabled=true;
        document.forms[0].man080weekmonth.disabled=true;
        document.forms[0].man080monthdow.disabled=true;

    }
}

function clickFile(fileName) {
    document.forms[0].CMD.value = 'download';
    document.forms[0].man080backupFile.value = fileName;
    document.forms[0].submit();
    return false;
}

$(function() {
    /*hover */
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
    	clickFile($(this).parent().data('name'));
    });
});
