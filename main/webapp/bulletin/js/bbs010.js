function changePage(id){
    if (id == 1) {
        document.forms[0].bbs010page1.value=document.forms[0].bbs010page2.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function buttonPush(cmd){

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function clickForum(sid) {
    document.forms[0].CMD.value='moveThreadList';
    document.forms[0].bbs010forumSid.value=sid;
    document.forms[0].submit();
    return false;
}

function clickMemBtn(sid) {
    document.forms[0].CMD.value='moveMemList';
    document.forms[0].bbs010forumSid.value=sid;
    document.forms[0].submit();
    return false;
}

$('.js_forumBtn_original, .js_forumBtn_classic').live('click', function() {
  var child_ul = $(this).parents('li.forumList_content').next();

  if (child_ul.css('display') == 'none') {
    openForum($(this), child_ul);
  } else {
    closeForum($(this), child_ul);
  }

  return false;
})

function openForum(button, target) {
  target.animate({height: 'show', opacity: 'show'}, "fast");
  button.removeClass('forum_closeIcon');
  button.addClass('forum_openIcon');
}

function closeForum(button, target) {
  target.animate({height: 'hide', opacity: 'hide'}, "fast");
  button.removeClass('forum_openIcon');
  button.addClass('forum_closeIcon');
}
