/* ホバーの処理 */
$(function() {
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
    $(".js_listMenuClick").live("click", function(){
        var cmd = $(this).parent().data('cmd');
        buttonPush(cmd);
    });
});

function clickCanUsePlugin() {
   if ($('#man120ViewMenuCombo')[0] && $('#man120ViewMenuCombo')[0].length > 0) {
       var idx;
       var menuArray = $.makeArray($('#man120ViewMenuCombo')[0].getElementsByTagName('option'));

       for (idx = 0; idx < menuArray.length; idx++) {
           if (menuArray[idx].selected) {
               document.forms['man120Form'].CMD.value = 'init';
               document.forms['man120Form'].man120pluginId.value = menuArray[idx].value;
               document.forms['man120Form'].submit();
               return false;
           }
       }
   }
}

function defaultImg(imgName) {
    document.getElementById(imgName).src="../common/images/spacer.gif";
}

function addUseKbn(pluginid) {
    document.forms['man120Form'].man120pluginId.value = pluginid;
    document.forms['man120Form'].CMD.value = '120_pluginAdd';
    document.forms['man120Form'].submit();
    return false;
}

function delUseKbn(pluginid) {
    document.forms['man120Form'].man120pluginId.value = pluginid;
    document.forms['man120Form'].CMD.value = '120_pluginDelete';
    document.forms['man120Form'].submit();
    return false;
}

function editClick(pluginid) {
    document.forms['man120Form'].man120pluginId.value = pluginid;
    document.forms['man120Form'].CMD.value = 'pluginUseEdit';
    document.forms['man120Form'].submit();
    return false;
}
function addUplgClick() {
    document.forms['man120Form'].man120pluginId.value = '';
    document.forms['man120Form'].CMD.value = 'addPluginMenu';
    document.forms['man120Form'].submit();
    return false;
}

function editUplgClick(pluginid) {
    document.forms['man120Form'].man120pluginId.value = pluginid;
    document.forms['man120Form'].CMD.value = 'editPluginMenu';
    document.forms['man120Form'].submit();
    return false;
}