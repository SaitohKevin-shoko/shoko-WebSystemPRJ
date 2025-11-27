function changePage(id){
    if (id == 1) {
      $('select[name=bbs170page1]').val($('select[name=bbs170page2]').val());
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

function clickThread(sid) {
    document.forms[0].CMD.value='moveThreadDtl';
    document.forms[0].threadSid.value=sid;
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].bbs170sortKey.value = fid;
    document.forms[0].bbs170orderKey.value = order;
    document.forms[0].submit();
    return false;
}

function buttnPushWrite(cmd, bfiSid, btiSid) {
    $('input:hidden[name=CMD]').val(cmd);
    $('input:hidden[name=bbs010forumSid]').val(bfiSid);
    $('input:hidden[name=threadSid]').val(btiSid);
    document.forms[0].submit();
    return false;
}

function buttonPushDelete(btiSid) {
    document.forms[0].CMD.value='delThread';
    document.forms[0].threadSid.value=btiSid;
    document.forms[0].submit();
    return false;
}

function changeForum() {
  document.forms[0].CMD.value='changeForum';
  $('input:hidden[name=bbs010forumSid]').val($('select[name=bbs010forumSid]').val());
  document.forms[0].submit();
}

function backToThreadList() {
  $('input:hidden[name=bbs010forumSid]').val($('input:hidden[name=bbs170backForumSid]').val());
  $('input:hidden[name=threadSid]').val("");
}
