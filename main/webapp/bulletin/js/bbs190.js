function checkedForum() {
    //親フォーラムを取得
    document.forms[0].forumSid.value = parent.document.forms[0].bbs030ParentForumSid.value;
    var psid = parent.$('input:hidden[name="bbs030ParentForumSid"]').val();
    $('input:radio[name=forumSid]').val([psid]);
}

function doScrollForumFrame(){
    window.scroll(0, parent.document.forms[0].bbs190ScrollPosition.value);
}

function onParentForumSubmit(fsid) {
    //スクロール位置を設定
    var bbs030ScrollPosition = $(parent.window).scrollTop();
    parent.document.forms[0].bbs030ScrollPosition.value = bbs030ScrollPosition;
    var bbs190ScrollPosition = $(window).scrollTop();
    parent.document.forms[0].bbs190ScrollPosition.value = bbs190ScrollPosition;

    //親フォーラムを設定
    parent.document.forms[0].bbs030ParentForumSid.value = fsid;
    parent.document.forms[0].CMD.value = 'selectForum';
    parent.document.forms[0].submit();
    return false;
}

function setParentForumDisabled(){
    //選択不可のフォーラムSIDを取得
    parent.$('input:hidden[name=bbs030DisabledForumSid]').each(
            function(i, elem) {
                $('input:radio[id=parentForumSid' + $(elem).val() + ']').attr("disabled", "disabled");
    });
}
