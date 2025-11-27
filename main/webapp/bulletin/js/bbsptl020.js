$(function() {
  var createdForumList = $('input:hidden[name=bbsPtl020createdForum]');
  createdForumList.each(function(i, elem) {
    var sid = $(elem).val();
    $('#forum_link' + sid).children('span').addClass('disabled_link');
    $('#forum_link' + sid).removeAttr("onClick");
  });
})

function selectForum(forumSid) {
    document.forms[0].bbsptl020forumSid.value=forumSid;
    document.forms[0].CMD.value='selectForum';
    document.forms[0].submit();
    return false;
}

function closeWindow() {

    var closeFlg = document.forms[0].bbsptl020selectFlg.value;

    if (closeFlg == 'true') {
        var parentDocument = window.opener.document;
        parentDocument.forms[0].CMD.value = 'init';
        parentDocument.forms[0].submit();
        window.close();
    }

    return false;
}

$(function(){
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
        var sid = $(this).parent().data("sid");
        selectForum(sid);
    });
});
