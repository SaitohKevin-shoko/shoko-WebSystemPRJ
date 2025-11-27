function buttonPush(cmd){

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}


$(function() {
  setMemberDisp();
})

function setMemberDisp() {
  var parentSid = $('input:hidden[name=bbs030ParentForumSid]').val();
  var followParentFlg = $('input:hidden[name=bbs030FollowParentMemFlg]').val();

  if (parentSid != 0 && followParentFlg == 1) {
    $('#selectMemberArea').hide();
    $('#selectFollowParentMemArea').show();
  } else {
    $('#selectMemberArea').show();
    $('#selectFollowParentMemArea').hide();
  }
}
