function buttonPush(cmd){
  document.forms[0].CMD.value=cmd;
  document.forms[0].submit();
  return false;
}

function buttonPushWrite(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].bbs060postSid.value=sid;
    document.forms[0].submit();
    return false;
}

function clickRsvThread(sid) {
    document.forms[0].CMD.value='moveRsvThreadList';
    document.forms[0].bbs010forumSid.value=sid;
    document.forms[0].threadSid.value=sid;
    document.forms[0].submit();
    return false;
}

// 全てのチェックを入れる（はずす）
function changeChk(){
   if (document.forms[0].allChk.checked) {
       checkAll('bbs060ChkInfSid');

   } else {
       nocheckAll('bbs060ChkInfSid');
   }
}

// 未読にします
function clickReadYet() {
    document.forms[0].CMD.value="unReadThread";
    document.forms[0].submit();
    return false;
}

function clickMoveBtn() {
    var cmdDef = document.forms[0].CMD.value;
      document.forms[0].CMD.value='chkMovePopup';
       var paramStr = $('form[name=bbs060Form]').serialize();
      $.ajax({
            async: true,
            url:"../bulletin/bbs060.do",
            type: "post",
            data:paramStr
          }).done(function( data ) {
              var chkStr =  '<!-- errMessages -->';
              var dataStr = data.trim();
              if (dataStr.length >= chkStr.length
                      && dataStr.substr(0 ,chkStr.length) == chkStr) {
                    $(".gs_errspace").children().remove();
                    $(".gs_errspace").html(data);
              } else {
                  alert(msglist_bbs060["bbs.bbs060.7"]);
              }
          }).fail(function(data){
              alert(msglist_bbs060["bbs.bbs060.8"]);
          });
      document.forms[0].CMD.value=cmdDef;

      return false;
}

/***
 * 移動ダイアログ表示
 * @returns
 */
function openMovePopup() {

    $('iframe[name="moveDlg"]')[0].contentDocument.location.replace('');

    $('div[name="moveDlg"]').dialog({
        modal : true,
        autoOpen : true,
        bgiframe : true,
        resizable : false,
        width: 700,
        height:500,
        overlay : {
            backgroundColor : '#000000',
            opacity : 0.5
        },
        buttons : {
            閉じる : function() {
                $(this).dialog('close');
            }
        },
        open : function() {
            $('iframe[name="moveDlg"]').css({'width':'100%'});
            $('iframe[name="moveDlg"]').css({'height':'100%'});

            window.setTimeout(function() {
                var targetDef = document.forms[0].target;
                var cmdDef = document.forms[0].CMD.value;
                document.forms[0].CMD.value="openMovePopup";
                document.forms[0].target = "moveDlg";
                document.forms[0].submit();

                document.forms[0].target = targetDef;
                document.forms[0].CMD.value = cmdDef;

            }, 0);
        },
        close : function(){
            var inDoc = $('iframe[name="moveDlg"]').contents();
            var flgObj = inDoc.find('input[name="bbs061Kanryo"]');
            if (flgObj.val() == 1) {
                var cmdDef2 = document.forms[0].CMD.value;
                document.forms[0].CMD.value="reload";
                document.forms[0].submit();
                document.forms[0].CMD.value = cmdDef2;
            }

        }
    });


}
function closeMovePopup() {
    $('div[name="moveDlg"]').dialog('close');
}


// エラーメッセージの削除
function clearErrMsg(){
  $(".js_errMsg").children().remove();
}


function buttonPushSearch() {
  $('input:hidden[name=bbs040dateNoKbn]').val("1");
  $('input:hidden[name=bbs040keyKbn]').val("0");
  $('input:hidden[name=bbs040readKbn]').val("0");
  $('input:hidden[name=bbs040taisyouThread]').val("1");
  $('input:hidden[name=bbs040taisyouNaiyou]').val("1");
  var bbs010forumSid = $('input:hidden[name=bbs010forumSid]').val();
  $('input:hidden[name=bbs040forumSid]').val(bbs010forumSid);
  $('input:hidden[name=searchDspID]').val("0601");
  buttonPush('searchThre');
}

function buttonPushSearchDtl() {
  $('input:hidden[name=bbs040dateNoKbn]').val("1");
  $('input:hidden[name=bbs040keyKbn]').val("0");
  $('input:hidden[name=bbs040readKbn]').val("0");
  $('input:hidden[name=bbs040taisyouThread]').val("1");
  $('input:hidden[name=bbs040taisyouNaiyou]').val("1");
  var bbs010forumSid = $('input:hidden[name=bbs010forumSid]').val();
  $('input:hidden[name=bbs040forumSid]').val(bbs010forumSid);
  $('input:hidden[name=searchDspID]').val("0602");
  buttonPush('searchThreDtl');
}

function changePage(id){
  clearErrMsg();
  var bbs060page = $('select[name=bbs060page1]').val();
  if (id == 1) {
    bbs060page = $('select[name=bbs060page2]').val();
  }
  $('input:hidden[name=bbs060page1]').val(bbs060page);

  getList($('input:hidden[name=bbs010forumSid]').val(), 0);
}

function changePageSingly(direction) {
  clearErrMsg();
  var intBbs060page = parseInt($('select[name=bbs060page1]').val());
  if (direction == 'prev') {
    if (intBbs060page - 1 < 1) {
      return;
    }
    $('input:hidden[name=bbs060page1]').val(intBbs060page - 1);

  } else {
    var pageSize = $('select[name=bbs060page1]').children().size();
    if (intBbs060page + 1 > pageSize)  {
      return;
    }
    $('input:hidden[name=bbs060page1]').val(intBbs060page + 1);
  }

  getList($('input:hidden[name=bbs010forumSid]').val(), 0);
}

function changePostPage(id){
  var bbs060postPage = $('select[name=bbs060postPage1]').val();
  if (id == 1) {
    bbs060postPage = $('select[name=bbs060postPage2]').val();
  }
  $('input:hidden[name=bbs060postPage1]').val(bbs060postPage);

  getList($('input:hidden[name=bbs010forumSid]').val(), $('input:hidden[name=threadSid]').val());
}

function changePostPageSingly(direction) {
  var intBbs060postPage = parseInt($('select[name=bbs060postPage1]').val());
  if (direction == 'prev') {
    if (intBbs060postPage - 1 < 1) {
      return;
    }
    $('input:hidden[name=bbs060postPage1]').val(intBbs060postPage - 1);
  } else {
    var pageSize = $('select[name=bbs060postPage1]').children().size();
    if (intBbs060postPage + 1 > pageSize) {
      return;
    }
    $('input:hidden[name=bbs060postPage1]').val(intBbs060postPage + 1);
  }

  getList($('input:hidden[name=bbs010forumSid]').val(), $('input:hidden[name=threadSid]').val());
}

function sortPostList(order) {
  $('input:hidden[name=bbs060postOrderKey]').val(order);
  // $('input:hidden[name=bbs060sortKey]').val(fid);
  // $('input:hidden[name=bbs060orderKey]').val(order);
  getList($('input:hidden[name=bbs010forumSid]').val(), $('input:hidden[name=threadSid]').val());
}

function sortThreadList(fid, order) {
  clearErrMsg();
  $('input:hidden[name=bbs060sortKey]').val(fid);
  $('input:hidden[name=bbs060orderKey]').val(order);

  getList($('input:hidden[name=bbs010forumSid]').val(), 0);
}

function getList(forumSid,threadSid) {

  $('#display_warn').addClass('display_n');

  if (threadSid > 0) {
    clearErrMsg();
    //Post list
    if (threadSid != $('input:hidden[name=threadSid]').val()) {
      //different post list
      $('input:hidden[name=bbs060postOrderKey]').val(-1);
      $('input:hidden[name=bbs060postPage1]').val(1);
    }
    $('#thread_list_block').empty();
    $('#thread_list_block').hide();

    if ($('#post_list_block').children('table').size() > 0) {
      $('#post_list_block').empty();
    }

    getPostListBlock(forumSid,threadSid);

    //scroll to page top
    $(window).scrollTop(0);

  } else {
    //Thread list
    if (forumSid != $('input:hidden[name=bbs010forumSid]').val()) {
      //different thread list
      $('input:hidden[name=bbs060page1]').val(1);
    }

    $('#post_list_block').empty();

    if ($('#thread_list_block').children('table').size() > 0) {
      $('#thread_list_block').empty();
    }

    var cmd = "getThreadData";
    getThreadListBlock(cmd, forumSid);

    //scroll to page top
    $(window).scrollTop(0);

    $('#thread_list_block').show();
  }

}


function changeListMenu(data, screenType) {

  //ディスク容量警告表示 リセット
  $('#diskWarnMessage').remove();

  //一覧メニューの切り替え
  if (screenType == 'thread') {
    //検索画面遷移元IDを初期化
    $('input:hidden[name=searchDspID]').val('');

      //スレッド一覧のメニュー
    $('#bbs060screenName').text(msglist["bbs.header.thread.list"]);

    //IE9で動作しない為コメントアウト
    //$('title').text(msglist["bbs.title.thread.list"]);

    //ヘルプ用パラメータを設定
    $('input:hidden[name=helpPrm]').val('0');

    $('#list_menu_post').hide();
    $('#list_menu_post-header').hide();
    $('#list_menu_post').empty();
    $('#list_menu_post-header').empty();

      //新規スレッドボタン
    if (data.bbs060createDspFlg) {
      $('#damy_add_thread_button').hide();
      $('#add_thread_button').show();
      $('#add_thread_footer_button').show();
    } else {
      $('#add_thread_button').hide();
      $('#add_thread_footer_button').hide();
      $('#damy_add_thread_button').show();
    }
    $('#list_menu_thread').show();
    $('#list_menu_thread_footer').show();
    $('#list_menu_thread-header').show();

    //ディスク容量警告表示
    if (data.bbs060forumWarnDisk > 0) {
      createDiskWarn(data);
    }

  } else if(screenType == 'post') {
    //投稿一覧のメニュー
    $('#bbs060screenName').text(msglist["bbs.header.post.list"]);

    //IE9で動作しない為コメントアウト
    //$('title').text(msglist["bbs.title.post.list"]);

    //ヘルプ用パラメータを設定
    $('input:hidden[name=helpPrm]').val('1');

    $('#list_menu_thread').hide();
    $('#list_menu_thread_footer').hide();
    $('#list_menu_thread-header').hide();

    $('#list_menu_post').empty();
    createPostListMenu(data);
    createPostHeaderMenu(data);
    $('#list_menu_post').show();
    $('#list_menu_post-header').show();
  }
}

function createDiskWarn(data) {
   $('#display_warn').removeClass('display_n');

  var html = '<div id="diskWarnMessage">'
  + '<div class="txt_c pl10 pr10 m10">'
  + '<img class="classic-display wp20hp20" src="../common/images/classic/icon_warn_2.gif" alt="' + msglist["warning"] + '" class="txt_m"><img class="original-display wp20hp20" src="../common/images/original/icon_warn_63.png" border="0" alt="' + msglist["warning"] + '" class="txt_m"><span class="cl_fontWarn fw_b fs_14">'
  + msglist["disk.usage.exceeded.1"] + data.bbs060forumWarnDisk + msglist["disk.usage.exceeded.2"] + '</span>'
  + '</div>'

  $('#display_warn').prepend(html);
}

function createPostListMenu(data) {
  var html = '';
  html += '<button type="button" value="'+ msglist["btn.pdf.export"] + '" class="baseBtn" onClick="buttonPush(\'pdf\');">'
  + '<img class="btn_classicImg-display" src="../common/images/classic/icon_pdf.png" alt="'+ msglist["btn.pdf.export"] + '">'
  + '<img class="btn_originalImg-display" src="../common/images/original/icon_pdf.png" alt="'+ msglist["btn.pdf.export"] + '">'+ msglist["btn.pdf.export"] + '</button>';

    html += '<button type="button" class="baseBtn pt5 ml8" value="' + msglist["bbs.soukou.list"] + '" onClick="buttonPush(\'soukou\');">' + msglist["bbs.soukou.list"] + '</button>';

    html += '</td>'

    $('#list_menu_post').append(html);
}

function createPostHeaderMenu(data) {

   $('#list_menu_post-header').empty();

  var html = '';

  if (data.bbs060reply == 0) {
      html += '<button type="button" class="baseBtn" value="' + msglist["reply"] + '" onClick="buttonPush(\'addPost\');">'
      + '<img class="btn_classicImg-display" src="../common/images/classic/icon_copy.png" alt="' + msglist["reply"] + '">'
      + '<img class="btn_originalImg-display" src="../bulletin/images/original/icon_thread_henshin.png" alt="' + msglist["reply"] + '">'
      + msglist["reply"] + '</button>';
    }

  if (data.bbs060showThreBtn == 1) {
      html += '<button type="button" class="baseBtn ml8" value="' + msglist["delete.thread"] + '" onClick="buttonPush(\'delThread\');">'
      + '<img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="' + msglist["delete.thread"] + '">'
      + '<img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="' + msglist["delete.thread"] + '">'
      + msglist["delete.thread"] + '</button>';
  }

  html += '<button type="button" value="' + msglist["back"] + '" class="baseBtn ml8" onClick="backFromPostList(' + data.bbs010forumSid + ');">'
  + '<img class="btn_classicImg-display" src="../common/images/classic/icon_back.png" alt="' + msglist["back"] + '">'
  + '<img class="btn_originalImg-display" src="../common/images/original/icon_back.png" alt="' + msglist["back"] + '">'
  + msglist["back"] + '</button>';

  $('#list_menu_post-header').append(html);

}

function getFormData(formObj) {

  var formData = "";
  formData = formObj.serialize();

  return formData;
}

//スレッド一覧部分取得
function getThreadListBlock(cmd, forumSid) {
  loadingPop(msglist["nowLoading"]);

  //フォームの情報でDBから値を取得
  $('input:hidden[name=CMD]').val(cmd);
  $('input:hidden[name=bbs010forumSid]').val(forumSid);

  var formData = getFormData($('#bbs060Form'));

  $.ajax({
    async: true,
    url:"../bulletin/bbs060.do",
    type: "post",
    data:formData
  }).done(function( data ) {
  if (data["success"]) {

    changeListMenu(data, 'thread');

    getForumList(data);
    getNotReadThreadList(data.notReadThreadList);
    getMarkAllReadBlock(data);

    var threadList = $(data.threadList);

    var list = '';

    list += '<table class="w100 mt10">'
    + '<tr>';

    //フォーラムアイコン
    var binSid = data.bbs060BinSid;
    var forumSid = data.bbs010forumSid;
    list += '<td class="txt_l w100"><span class="verAlignMid">'
    if (binSid > 0) {
      list += '<img class="wp30hp30" src="../bulletin/bbs060.do?CMD=getImageFile&bbs010BinSid=' + binSid + '&bbs010forumSid=' + forumSid + '" alt="' + msglist["forum"] + '">';
    } else {
      list += '<img class="classic-display" src="../bulletin/images/classic/icon_forum.gif" alt=' + msglist["forum"] + '">'
      +'<img class="wp30hp30 original-display" src="../bulletin/images/original/icon_forum_32.png" alt=' + msglist["forum"] + '">';
    }

    //フォーラム名
    var forumName = data.bbs060forumName;
    list += '<span class="ml5 fs_17 fw_b">'
    + forumName
    + '</span>'
    + '</span></td>';



  //掲示予定数
    if (data.bbs060scheduledPostNum > 0 && data.bbs060createDspFlg) {
      list += '<td class="txt_r txt_m no_w">'
      + '<a href="javascript:clickRsvThread(' + forumSid + ');">'
      + '<span class="textLink">' + msglist["bbs.scheduled.post.number.1"] + data.bbs060scheduledPostNum + msglist["bbs.scheduled.post.number.2"] + '</span>'
      + '</a>'
      + '</td>';
    }
    //ページコンボ 上
    var bbsPageLabel1 = $(data.bbsPageLabel);
    if (threadList.size() > 0 && bbsPageLabel1.size() > 1) {
      list += '<td><div class="paging flo_r">';
      list += '<button type="button" class="webIconBtn" onClick="changePageSingly(\'prev\');" alt="' + msglist["prevPage"] + '">'
        +'<img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png">'
        +'<i class="icon-paging_left"></i>'
        +'</button>'
        + '<select name="bbs060page1" onchange="changePage(0);" class="paging_combo">';

      for (var i = 0;i < bbsPageLabel1.size();++i) {
        list += '<option value="' + bbsPageLabel1[i].value + '" ';
        if (data.bbs060page1 == bbsPageLabel1[i].value) {
          list += 'selected';
        }
        list += '>' + bbsPageLabel1[i].label + '</option>';
      }
      list += '</select>\n'
      + '<button type="button" class="webIconBtn" onClick="changePageSingly(\'next\');" alt="' + msglist["nextPage"] + '">'
      +'<img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png">'
      +'<i class="icon-paging_right"></i>'
      +'</button></div></td></td>';
    }

    list += '</tr>'
    + '</table>';

    list += '<table class="table-top mt0 mb0">';

    //スレッド一覧 ヘッダー
    list = createThreadListHeader(data, list);

    //スレッド一覧 内容
    if (threadList.size() > 0) {
      list = createThreadListContent(data, list);
    }

    list += '</table>';

    list += '<td class="txt_r txt_b w20 no_w">';

    //ページコンボ 下
    var bbsPageLabel2 = $(data.bbsPageLabel);
    if (threadList.size() > 0 && bbsPageLabel2.size() > 1) {
      list += '<table class="w100 mt5 mb20">'
      + '<tr>'
      + '<td><div class="paging">'
      + '<button type="button" class="webIconBtn" onClick="changePageSingly(\'prev\');" alt="' + msglist["prevPage"] + '">'
      + '<img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png">'
      + '<i class="icon-paging_left"></i>'
      + '</button>'
      + '<select name="bbs060page2" onchange="changePage(1);" class="paging_combo" value="' + data.bbs060page1 + '">';

      for (var i = 0;i < bbsPageLabel2.size();++i) {
        list += '<option value="' + bbsPageLabel2[i].value + '" ';
        if (data.bbs060page2 == bbsPageLabel2[i].value) {
          list += 'selected';
        }
        list += '>' + bbsPageLabel2[i].label + '</option>';
      }

      list += '</select>\n'
      + '<button type="button" class="webIconBtn" onClick="changePageSingly(\'next\');" alt="' + msglist["nextPage"] + '">'
      + '<img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png">'
      + '<i class="icon-paging_right"></i>'
      + '</button>'
      + '</div></td>'
      + '</tr>'
      + '</table>';
    }
    list += '</td>';

    list += '</tr>'
    + '</table>';

    $('#thread_list_block').append(list);

    closeloadingPop();
  } else {
        document.forms[0].CMD.value="delMsg";
        document.forms[0].submit();
        return false;
    }

  }).fail(function(data){
    closeloadingPop();
    alert(msglist["failedGetThreadData"]);
  });
}

//投稿一覧部分取得
function getPostListBlock(forumSid,threadSid) {
  loadingPop(msglist["nowLoading"]);

  //フォームの情報でDBから値を取得
  $('input:hidden[name=CMD]').val("getPostData");
  $('input:hidden[name=bbs010forumSid]').val(forumSid);
  $('input:hidden[name=threadSid]').val(threadSid);

  var formData = getFormData($('#bbs060Form'));

  $.ajax({
    async: true,
    url:"../bulletin/bbs060.do",
    type: "post",
    data:formData
  }).done(function( data ) {
    if (data["success"]) {

        changeListMenu(data, 'post');

        getForumList(data);
        getNotReadThreadList(data.notReadThreadList);
        getMarkAllReadBlock(data);

    var threadList = $(data.threadList);

    var list = '';

    list += '<div class="w100">'
    if (data.bbs060BinSid == 0) {
      list += '<img class="wp30hp30 classic-display" src="../bulletin/images/classic/icon_forum.gif" alt="' + msglist["forum"] + '"><img class="wp30hp30 original-display" src="../bulletin/images/original/icon_forum_32.png" alt="' + msglist["forum"] + '"></td>';
    } else {
      list += '<img class="wp30hp30" src="../bulletin/bbs060.do?CMD=getImageFile&bbs010BinSid='
      + data.bbs060BinSid
      + '&bbs010forumSid='
      + data.bbs010forumSid
      + '" alt="' + msglist["forum"] + '"></td>'
    }

    list +=  '<a href="javascript: toThreadList(' + data.bbs010forumSid + ')""><span class="fs_16 fw_bold">'
      + data.bbs060forumName
      + '</span></a>'
        + '</div>'

    + '</tr>'

    + '<tr id="selectionSearchArea">'
    + '<td class="no_w">'

    + '<div class="mt5 mb5"></div><div class="verAlignMid"><img class="classic-display" src="../bulletin/images/classic/icon_thread.gif" alt="' + msglist["thread"] + '">'

    if (data.bbs060ThreImportance == '1') {
      list += '<img class="classic-display" src="../common/images/classic/icon_zyuu.png" alt="' + msglist["bbs.importance"] + '"><img class="original-display" src="../common/images/original/icon_zyuu.png" alt="' + msglist["bbs.importance"] + '">';
    }
    list += '<span class="fs_17 ml5 fw_b">'
    + data.bbs060threadTitle
    + '</span></div><div></div></td>'
    + '</tr>'

    + '<tr>'
    + '<td class="txt_l w100">'

    + '<table class="w100">'
    + '<tr>'
    + '<td class="verAlignMid mt10">'
    + '<span>' + msglist["bbs.order.of.posttime"] + '</span>&nbsp;'
    + '<span class="verAlignMid"><input type="radio" name="bbs060postOrderKeyRadio" id="wrtOrder_01" value="0" onclick="sortPostList(0);" ';
    if (data.bbs060postOrderKey == 0) {
      list += 'checked="checked"';
    }
    list += '/>'
    + '<label class="mr10" for="wrtOrder_01"><span>' + msglist["order.asc"] + '</span></label>'
    + '<input type="radio" name="bbs060postOrderKeyRadio" id="wrtOrder_02" value="1" onclick="sortPostList(1);" ';
    if (data.bbs060postOrderKey == 1) {
      list += 'checked="checked"';
    }
    list += '/>'
    + '<label for="wrtOrder_02"><span>' + msglist["order.desc"] + '</span></label></span>'

    + '&nbsp;&nbsp;<span>' + msglist["numView"] + '</span>&nbsp;'
    + '<span><a href="javascript:openComWindow('
    + data.bbs010forumSid + ', '
    + data.threadSid + ');">' +
    + data.readedCnt + '&nbsp;/&nbsp;'
    + data.forumMemberCount + '</a></span>'
    + '</td>';
    var bbsPageLabel = $(data.bbsPageLabel);
    if (bbsPageLabel.size() > 0) {
      list += '<td class="no_w">'
      + '<table class="w100 txt_c">'
      + '<tr><td class="txt_r" colspan="2">'
      + '<table class="w100">'
      + '<tr><td class="txt_r"><div class="paging">'
      + '<button type="button" class="webIconBtn" onClick="changePostPageSingly(\'prev\');" alt="' + msglist["prevPage"] + '">'
      + '<img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png">'
      + '<i class="icon-paging_left"></i>'
      + '</button>'
      + '<select name="bbs060postPage1" onchange="changePostPage(0);" class="paging_combo text_i">';
      for (var i = 0;i < bbsPageLabel.size();++i) {
        list += '<option value="' + bbsPageLabel[i].value + '" ';
        if (data.bbs060postPage1 == bbsPageLabel[i].value) {
          list += 'selected';
        }
        list += '>' + bbsPageLabel[i].label + '</option>';
      }
      list += '</select>\n'
      + '<button type="button" class="webIconBtn" onClick="changePostPageSingly(\'next\');" alt="' + msglist["nextPage"] + '">'
      + '<img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png">'
      + '<i class="icon-paging_right"></i>'
      + '</button>'
      + '</div></td></tr>'
      + '</table>'
      + '</td>'
      + '</tr>'
      + '</table>'
      + '</td>'
    }
    list += '</tr>'
    + '</table>'
    + '</td>'
    + '</tr>'
    + '</table>';

    //掲示期間
    if ($(data.bbs060limitDate).size() > 0) {
      list += '<span>' + msglist["bbs.posting.period"] + ':&nbsp;' + data.bbs060limitDate + '</span>';
    }

    list += '<table class="w100" id="post_list">'
    + '<tr>'
    + '<td class="w100 txt_t" id="selectionSearchArea2">';

    var postList = $(data.postList);
    if (postList.size() > 0) {
      //投稿一覧
      list = createPostList(data, list);
    }
    //ページコンボ 下
    list += '<tr>'
    + '<td colspan="2" class="txt_r">';
    if (bbsPageLabel.size() > 0) {
      list += '<table class="w100">'
      + '<tr>'
      + '<td class="txt_r"><div class="paging">'
      + '<button type="button" class="webIconBtn" onclick="changePostPageSingly(\'prev\');" alt="' + msglist["prevPage"] + '">'
      + '<img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png">'
      + '<i class="icon-paging_left"></i>'
      + '</button>'
      + '<select name="bbs060postPage2" onchange="changePostPage(1);" class="paging_combo text_i">';
      for (var i = 0;i < bbsPageLabel.size();++i) {
        list += '<option value="' + bbsPageLabel[i].value + '" ';
        if (data.bbs060postPage2 == bbsPageLabel[i].value) {
          list += 'selected';
        }
        list += '>' + bbsPageLabel[i].label + '</option>';
      }
      list += '</select>\n'
      + '<button type="button" class="webIconBtn" onClick="changePostPageSingly(\'nextPage\');" alt="' + msglist["nextPage"] + '">'
      + '<img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png">'
      + '<i class="icon-paging_right"></i>'
      + '</button>'
      + '</div></td>'
      + '</tr>'
      + '</table>';
    } else {
      list += '&nbsp';
    }

    list += '</td>'
    + '</tr>'
    + '<tr><td class="txt_r no_w pt5"><div class="footerBtn_block">'

    if (data.bbs060reply == 0) {
      list += '<button type="button" class="baseBtn" value="' + msglist["reply"] + '" onClick="buttonPush(\'addPost\');">'
      + '<img class="btn_classicImg-display" src="../common/images/classic/icon_copy.png" alt="' + msglist["reply"] + '">'
      + '<img class="btn_originalImg-display" src="../bulletin/images/original/icon_thread_henshin.png" alt="' + msglist["reply"] + '">'
      + msglist["reply"] + '</button>';
    }
    if (data.bbs060showThreBtn == 1) {
      list += '<button type="button" class="baseBtn ml8" value="' + msglist["delete.thread"] + '" onClick="buttonPush(\'delThread\');">'
      + '<img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="' + msglist["delete.thread"] + '">'
      + '<img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="' + msglist["delete.thread"] + '">'
      + msglist["delete.thread"] + '</button>';
    }
    list += '<button type="button" value="' + msglist["back"] + '" class="baseBtn ml8" onClick="backFromPostList(' + data.bbs010forumSid + ');">'
    + '<img class="btn_classicImg-display" src="../common/images/classic/icon_back.png" alt="' + msglist["back"] + '">'
    + '<img class="btn_originalImg-display" src="../common/images/original/icon_back.png" alt="' + msglist["back"] + '">'
    + msglist["back"] + '</button>';
    + '</td>'
    + '</tr>'

    + '</table>'
    + '</td>'
    + '</td>'
    + '</tr>'
    + '</table>';

    //掲示板本文をhtmlframeに変換
    list = changeBodyToHtmlFrame(list);
    $('#post_list_block').append(list);

    closeloadingPop();
    } else {
        document.forms[0].CMD.value="delMsg";
        document.forms[0].submit();
        return false;
    }

  }).fail(function(data){
    closeloadingPop();
    alert(msglist["failedGetPostData"]);
  });
}
//投稿一覧HTMLの本文部をhtmlframeに変換
function changeBodyToHtmlFrame(list) {
  var ret = $(list);
  var htmlframe_temp = $('.js_htmlframe_template > iframe');
  ret.find('span.js_bwiBody').each(function () {
      var htmlframe = htmlframe_temp.clone(true);
      htmlframe.attr('data-htmlbody', $(this).html());
      $(this).replaceWith(htmlframe);
  });
  return ret;
}
// スレッド一覧 ヘッダー 昇順降順記号を付ける
function createThreadListHeader(data, list) {

  var sort_key = data.bbs060sortKey;
  var sort_key_thred_id = 1;
  var sort_key_toukou_id = 2;
  var sort_key_etsuran_id =3;
  var sort_key_user_id = 4;
  var sort_key_saishin_id = 5;
  var sort_key_size_id = 6;
  var sort_key_thred_name = msglist["thread"];
  var sort_key_toukou_name = msglist["numPost"];
  var sort_key_etsuran_name = msglist["numView"];
  var sort_key_user_name = msglist["bbs.poster"];
  var sort_key_saishin_name = msglist["bbs.newest.post"];
  var sort_key_size_name = msglist["txtSize"];

  var order_key = data.bbs060orderKey;
  //昇順
  var sort_direction_name = "<span class=\"classic-display\">" + msglist["asc.mark"] +"</span><i class=\"icon-sort_up original-display\"></i>";
  if ((order_key == 1 && sort_key != sort_key_saishin_id)
  || (order_key == 0 && sort_key == sort_key_saishin_id)) {
    //降順
    sort_direction_name ="<span class=\"classic-display\">" + msglist["desc.mark"] + "</span><i class=\"icon-sort_down original-display\"></i>";
  }

  if (sort_key == sort_key_thred_id) {
    sort_key_thred_name += sort_direction_name;
  } else if (sort_key == sort_key_toukou_id) {
    sort_key_toukou_name += sort_direction_name;
  } else if (sort_key == sort_key_etsuran_id) {
    sort_key_etsuran_name += sort_direction_name;
  } else if (sort_key == sort_key_user_id) {
    sort_key_user_name += sort_direction_name;
  } else if (sort_key == sort_key_saishin_id) {
    sort_key_saishin_name += sort_direction_name;
  } else if (sort_key == sort_key_size_id) {
    sort_key_size_name += sort_direction_name;
  }

  list += '<tr id="thread_list_header">';

  //チェックボックス
  list += '<th class="w3 cursor_p js_tableTopCheck js_tableTopCheck-header table_header-evt js_table_header-evt no_w">'
  + '<input class=\"soukou_pointer\" type=\"checkbox\" name=\"allChk\" onClick=\"changeChk();\">'
  + '</th>';

  //スレッド名 SORT_KEY_THRED
  list += '<th class="w50 cursor_p table_header-evt js_table_header-evt no_w">'
  + '<a href="#!" onClick="return sortThreadList(';
  if (sort_key == sort_key_thred_id && order_key == 0) {
    list += sort_key_thred_id + ',1);">';
  } else {
    list += sort_key_thred_id + ',0);">';
  }
  list += '<span>' + sort_key_thred_name + '</span></a>'
  + '</th>';

  //投稿数
  list += '<th class="cursor_p table_header-evt js_table_header-evt no_w w5">'
  + '<a href="#!" onClick="return sortThreadList(';
  if (sort_key == sort_key_toukou_id && order_key == 0) {
    list += sort_key_toukou_id + ',1);">';
  } else {
    list += sort_key_toukou_id + ',0);">';
  }
  list += '<span>' + sort_key_toukou_name + '</span></a>'
  + '</th>';

  //閲覧数
  list += '<th class="cursor_p table_header-evt js_table_header-evt w5 no_w">'
  + '<a href="#!" onClick="return sortThreadList(';
  if (sort_key == sort_key_etsuran_id && order_key == 0) {
    list += sort_key_etsuran_id + ',1);">';
  } else {
    list += sort_key_etsuran_id + ',0);">';
  }
  list += '<span>' + sort_key_etsuran_name + '</span></a>'
  + '</th>';

  //投稿者
  list +=  '<th class="cursor_p table_header-evt js_table_header-evt w15 no_w">'
  + '<a href="#!" onClick="return sortThreadList(';
  if (sort_key == sort_key_user_id && order_key == 0) {
    list += sort_key_user_id + ',1);">';
  } else {
    list += sort_key_user_id + ',0);">';
  }
  list += '<span>' + sort_key_user_name + '</span></a>'
  + '</th>';

  //最新書き込み
  list += '<th class="cursor_p table_header-evt js_table_header-evt w20 no_w">'
  + '<a href="#!" onClick="return sortThreadList(';
  if (sort_key == sort_key_saishin_id && order_key == 0) {
    list += sort_key_saishin_id + ',1);">';
  } else {
    list += sort_key_saishin_id + ',0);">';
  }
  list += '<span>' + sort_key_saishin_name + '</span></a>'
  + '</th>';

  //サイズ
  list += '<th class="w5 cursor_p table_header-evt js_table_header-evt no_w">'
  + '<a href="#!" onClick="return sortThreadList(';
  if (sort_key == sort_key_size_id && order_key == 0) {
    list += sort_key_size_id + ',1);">';
  } else {
    list += sort_key_size_id + ',0);">';
  }
  list += '<span>' + sort_key_size_name + '</span></a>'
  + '</th>';

  list += '</tr>';

  return list;
}

//スレッド一覧 内容
function createThreadListContent(data, list) {
  var threadList = $(data.threadList);

  for (var i = 0; i < threadList.size(); ++i) {
    var threadMdl = threadList[i];

    var titleClass = 'cl_linkDef fw_bold';
    var valueClass = 'cl_linkDef fw_bold';
    var mukoClass = 'mukoUser';
    if (threadMdl.readFlg == 1) {
      titleClass = 'cl_linkVisit';
      valueClass = 'cl_linkVisit';
    }

    list += '<tr id="thread_list_content">'
    +'<td class="txt_c cursor_p js_tableTopCheck">'
    + '<input type="checkbox" name="bbs060ChkInfSid" value="'+ threadMdl.btiSid+ '">';
    + '</td>';

    list += '<td class="txt_m word_b-all"><span class="verAlignMid">'
    + '<img class="classic-display" src="../bulletin/images/classic/icon_thread.gif" alt="' + msglist["thread"] + '">'
    + '<div><a href="javascript:getList(' + data.bbs010forumSid + ',' + threadMdl.btiSid + ');">';
    if (threadMdl.bfiThreImportance == '1') {
      list += '<img class="classic-display" src="../common/images/classic/icon_zyuu.png" alt="' + msglist["bbs.importance"] + '"><img class="original-display" src="../common/images/original/icon_zyuu.png" alt="' + msglist["bbs.importance"] + '">';
    }
    if (threadMdl.btsTempflg == 1) {
        list += '<img class="classic-display mr5" src="../common/images/classic/icon_temp_file_2.png" alt="' + msglist["attachFile"] + '"><img class="original-display mr5" src="../common/images/original/icon_attach.png" alt="' + msglist["attachFile"] + '">';
    }

    list += '<span class="'+ titleClass +' cl_linkHoverChange fs_16">' + threadMdl.btiTitle + '</span></a>';

    if (threadMdl.newFlg == 1) {
      list += '<img class="classic-display ml5" src="../bulletin/images/classic/icon_new.gif" alt="'+ msglist["bbs.new.icon"] + '"><span class="no_w labelNew original-display">NEW</span></span>';
    }

    list += '<td class="txt_r"><span class="'+ titleClass +'">' + threadMdl.writeCnt + '</span>'
    + '<td class="txt_r">'
    + '<span class="' + valueClass + '">'
    + '<a href="javascript:openComWindow(' + data.bbs010forumSid + ', ' + threadMdl.btiSid + ');">'
    + '<span class="' + valueClass + ' cl_linkHoverChange">' + threadMdl.readedCnt + '&nbsp;/&nbsp;' + data.forumMemberCount
    + '</a></span>'
    + '</td>';

    list += '<td class="txt_l">';

    var cbGrpSid = threadMdl.grpSid;
    if (cbGrpSid > 0) {
      if (threadMdl.grpJkbn == 9) {
        list += '<span class="'+ titleClass +'">' + threadMdl.grpName + '</span>';
      } else {
        list += '<span class="'+ titleClass +'">' + threadMdl.grpName + '</span>';
      }

    } else {
      if (threadMdl.userJkbn == 9) {
        list += '<s><span class="'+ titleClass +'">' + threadMdl.userName + '</span></s>';
      } else {
          if(threadMdl.userYukoKbn == 1) {
              list += '<span class="' + valueClass + ' ' + mukoClass + '">' + threadMdl.userName + '</span>';
          } else {
            list += '<span class="'+ titleClass +'">' + threadMdl.userName + '</span>';
          }
      }
    }

    list += '</td>'
    + '<td class="txt_c"><span class="'+ titleClass +'">' + threadMdl.strWriteDate + '</span></td>'
    + '<td class="txt_r"><span class="'+ titleClass +'">' + threadMdl.viewBtsSize + '</span></td>'
    + '</tr>';
  }

  return list;
}

//投稿一覧
function createPostList(data, list) {
  var postList = $(data.postList);
  var tdColors = ['bgC_tableCell', 'bgC_tableCellEvn'];
  for (var i = 0;i < postList.size();++i) {
    var postMdl = postList[i];

    var tdColor = tdColors[i % 2];

    list += '<table class="table-left mt0"><tr>'
    + '<td class="table_title-color wp150"><span>' + msglist["bbs.poster"] + '</span></td>'
    + '<td class="txt_r table_title-color"><span class="flo_l">' + msglist["bbs.post.body"] + '</span><span>'
    + msglist["bbs.posttime"]
    + '&nbsp;:&nbsp;'
    + postMdl.strBwiAdate
    + '</span></td>'
    + '</tr>'
    + '<tr class="txt_t '+ tdColor + '">'
    + '<td class="wp150">';

    //投稿者画像を設定する
    var photoFileDsp = data.photoFileDsp;
    var registGrpSid = postMdl.grpSid;

    if (photoFileDsp == 0 && registGrpSid <= 0) {
      //「投稿者画像を表示する」 かつ 投稿者がグループではない
      list += '<table class="border_none">'
      + '<tr class="border_none">';

      if (postMdl.userJkbn == 9) {
        list += '<td class="txt_t txt_c border_none ' + tdColor + '"><del>'
        + postMdl.userName
        + '</del>&nbsp;</td>';

      } else {
        list += '<td class="txt_t txt_c border_none '+ tdColor + '">'
        + '<a href="#!" onClick="openUserInfoWindow(' + postMdl.userSid + ');">';
        if (postMdl.userYukoKbn == 1) {
            list += '<span class="mukoUser">' + postMdl.userName +'</span>';
        } else {
            list += postMdl.userName;
        }
        list += '</a>&nbsp;</td>';
      }

      list += '</tr>'
      + '<tr class="border_none">';

      if (postMdl.userPictKf == 1) {
        //個人情報公開 しない
        list += '<td class="wp140 txt_c border_none"><div class="userImg-hikokai wp130 hp150 mrl_auto">'
        +'<span class="cl_fontWarn fs_24 fw_b hikokai_lh">非公開</span>'
          + '</div></td>';
      } else {
        if (postMdl.photoFileName) {
          list += '<td class="border_none">'
          + '<a href="#!" onClick="openUserInfoWindow(' + postMdl.userSid + ');">'
          + '<img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=' + postMdl.photoFileSid
          + '" name="userPhoto" alt="' + msglist["photo"]
          + '" class="wp130" onload="initImageView130(\'userPhoto\');"></a></td>';
        } else {
          list += '<td class="wp130 border_none">'
          + '<a href="#!" onClick="openUserInfoWindow(' + postMdl.userSid + ');">'
          + '<img class="classic-display wp130 hp150" src="../common/images/classic/icon_photo.gif" alt="' + msglist["photo"] + '">'
          + '<img class="original-display wp130 hp150" src="../common/images/original/photo.png" alt="' + msglist["photo"] + '">'
          + '</a></td>';
        }
      }
      list += '</tr>'
      + '</table>';

    } else {
      if (postMdl.userJkbn == 9) {
        list += '<del>' + postMdl.userName + '</del>&nbsp;';
      } else if (registGrpSid > 0) {
        list += '<span class="fw_b">' + postMdl.grpName + '</span>'
      } else {
          list += '<a href="#!" onClick="openUserInfoWindow(' + postMdl.userSid + ');">';
          if (postMdl.userYukoKbn == 1) {
             list += '<span class="mukoUser"> ' + postMdl.userName + '</a></span>&nbsp';
          } else {
             list += postMdl.userName + '</a>&nbsp';
          }
      }
    }


    list += '</td>'
    + '<td class="txt_t txt_l ' + tdColor + ' table_newLine">';

    if (postMdl.newFlg == 1) {
      list += '<span class="verAlignMid"><div class="verAlignMid"><img class="classic-display" src="../bulletin/images/classic/icon_new.gif" class="forum_icon" alt="' + msglist["bbs.new.icon"] + '"><div class="mr5"><span class="labelNew original-display ml0 mr0">NEW</span></div></div>';
      if (postMdl.writeUpdateFlg != 1) {
        list += '</span><br>';
      }
    }
    if (postMdl.writeUpdateFlg == 1) {
      var edate = postMdl.strBwiEdate;
      list += '<span class="cl_fontWarn">' + edate + msglist["edit.to"] + '</span></span>'
      + '<br>';
    }
    if (postMdl.bwiType == 0) {
      list += postMdl.bwiValueView + '</td></tr>'
    } else {
      list += '<span class="tinymce-inherit js_bwiBody display_none" >'+postMdl.bwiValue+'</span></td></tr>'
    }

    if ($(postMdl.tmpFileList).size() > 0) {
      list += '<tr>'
      + '<td class="no_w"><span>' + msglist["attach"] + '</span></td>'
      + '<td class="txt_l ' + tdColor + '">';
      list = createAttachedImage(data, postMdl, list);
    }
    list+= '</td>'
    + '</tr>';

    if (data.bbs060btnDspFlg == true) {
      list+= '<tr>'
      + '<td colspan="2" class="txt_r ' + tdColor + '">'

      //複写して新規作成
      if (postMdl.thdWriteFlg == 1) {
        list += '<button type="button" value="複写登録" class="baseBtn" onclick="buttonPushWrite(\'copyThread\',' + postMdl.bwiSid + ');">'
             +' <img class="btn_classicImg-display" src="../common/images/classic/icon_copy_add.png" alt="複写登録">'
             +' <img class="btn_originalImg-display" src="../common/images/original/icon_copy.png" alt="複写登録">'
             + "複写登録"
             +'</button>';

      }

      if (postMdl.showBtnFlg == 1) {
        if (postMdl.thdWriteFlg == 1) {
          if (data.bbs060showThreBtn == 1) {
            list += '<button type="button" class="baseBtn" value="' + msglist["mailEdit"] + '" onclick="buttonPushWrite(\'editThreOrPost\',' + postMdl.bwiSid + ');">'
            +' <img class="btn_classicImg-display" src="../common/images/classic/icon_edit_2.png" alt="'+ msglist["mailEdit"] + '">'
            +' <img class="btn_originalImg-display" src="../common/images/original/icon_edit.png" alt="'+ msglist["mailEdit"] + '">'
            + msglist["mailEdit"]
            +'</button>';
          }
        } else {
          list += '<button type="button" class="baseBtn" value="' + msglist["delet"] + '" onclick="buttonPushWrite(\'delPost\',' + postMdl.bwiSid + ');">'
          +' <img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="'+ msglist["delet"] + '">'
          +' <img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="'+ msglist["delet"] + '">'
          + msglist["delet"]
          +'</button>';
          if (data.bbs060reply == 0) {
            list += '<button type="button" class="baseBtn" value="' + msglist["mailEdit"] + '" onclick="buttonPushWrite(\'editThreOrPost\',' + postMdl.bwiSid + ');">'
            +' <img class="btn_classicImg-display" src="../common/images/classic/icon_edit_2.png" alt="'+ msglist["mailEdit"] + '">'
            +' <img class="btn_originalImg-display" src="../common/images/original/icon_edit.png" alt="'+ msglist["mailEdit"] + '">'
            + msglist["mailEdit"]
            +'</button>';
          }
        }
      }
      if (data.bbs060reply == 0) {
        list += '<button type="button" class="baseBtn" value="' + msglist["quote.reply"] + '" onclick="buttonPushWrite(\'inyouWrite\', ' + postMdl.bwiSid + ');">'
        +' <img class="btn_classicImg-display" src="../common/images/classic/icon_copy.png" alt="'+ msglist["mailEdit"] + '">'
        +' <img class="btn_originalImg-display" src="../bulletin/images/original/icon_thread_henshin.png" alt="'+ msglist["mailEdit"] + '">'
        + msglist["quote.reply"]
        +'</button>';
      }
      list += '</td>'
      + '</tr>';
    }
  }

  list += '<table class="w100">'
  + '<tr>'
  + '<td class="txt_l">';
  if (data.threadUrl) {
    list += '<table class="w100">'
    + '<tr class="txt_l">'
    + '<td>'
    + '<span class="fs_13">' + msglist["thread"] + 'URL:</span> '
    + '<input type="text" value="' + data.threadUrl + '" class="wp500" readOnly="true"/>'
    + '</td>'
    + '</tr>'
    + '</table>';
  }
  list += '</td>'
  + '</tr>'
  + '<tr>'


  return list;
}

//添付ファイル画像を用意
function createAttachedImage(data, postMdl, list) {

  list += '<div>';

  var bwiSid = postMdl.bwiSid;

  var tmpFileList = $(postMdl.tmpFileList);
  for (var i = 0;i < tmpFileList.size();++i) {
    var fileMdl = tmpFileList[i];
    var fext = fileMdl.binFileExtension.toLowerCase();

    if (data.tempImageFileDsp == 0 && fileMdl.binFileExtension) {
      //拡張子判断
      if (fext.lastIndexOf('.gif') != -1 || fext.lastIndexOf('.jpeg') != -1
      || fext.lastIndexOf('.jpg') != -1 || fext.lastIndexOf('.png') != -1) {
        if (i != 0) {
          list += '&nbsp;<br><br>';
        }
        list += '<div><img src="../bulletin/bbs060.do?CMD=tempview&bbs010forumSid=' + data.bbs010forumSid + '&threadSid=' + data.threadSid + '&bbs060postBinSid=' + fileMdl.binSid + '&bbs060postSid=' + bwiSid + '" name="pictImage' + fileMdl.binSid + '" onload="initImageView(\'pictImage' + fileMdl.binSid + '\');"></div>'
      }
    }

    list += '<file-preview url="../bulletin/bbs060.do?CMD=fileDownload&bbs010forumSid=' + data.bbs010forumSid + '&threadSid=' + data.threadSid + '&bbs060postBinSid=' + fileMdl.binSid + '&bbs060postSid=' + bwiSid + '" filename="' + fileMdl.binFileName + '">'
    + '<div><img class="classic-display" src="../common/images/classic/icon_temp_file_2.png" alt="' + msglist["attachFile"] + '"><img class="original-display" src="../common/images/original/icon_attach.png" alt="' + msglist["attachFile"] + '">'
    + '<a href="../bulletin/bbs060.do?CMD=fileDownload&bbs010forumSid=' + data.bbs010forumSid + '&threadSid=' + data.threadSid + '&bbs060postBinSid=' + fileMdl.binSid + '&bbs060postSid=' + bwiSid + '">'
    + '<span class="textLink ml5">' + fileMdl.binFileName + fileMdl.binFileSizeDsp + '</span>'
    + '</a>'
    + '</div>'
    + '</file-preview>';

  }
  list += '</div>';

  return list;
}

function toThreadList(forumSid) {
  clearErrMsg();
  $('input:hidden[name=threadSid]').val("");
  getList(forumSid,0);
}

function backFromPostList(forumSid) {
  if ($('input:hidden[name=bbsmainFlg]').val() == '1'
  || ($('input:hidden[name=searchDspID]').val() != void 0
  && $('input:hidden[name=searchDspID]').val() != '')) {
    buttonPush('backThreadList');
  } else {
    toThreadList(forumSid);
  }
}

//フォーラム一覧を取得
function getForumList(data) {

  var forumList = data.forumList;
  //フォーラム一覧の有効/無効と件数チェック
  if (data.bbs060forumDspFlg == 1 || $(forumList).size() < 1) {
    $('#subForumList').hide();
    $('#subForumList').empty();
    return;
  }
  $('#subForumList').show();

  if($('#side_forum_list').children().size() > 0) {
    //list content exists 未読既読情報のみ更新
    updateForumLink(forumList);
  } else {
    //list content not exists
    var html = createForumList(forumList);
    $('#side_forum_list').append(html);

    //自身の子フォーラムを開く
    var target = $('#forum_list_side_' + data.bbs010forumSid);
    var child_forum_block = target.next('.child_forum_block_side');
    openForum(target.find('span.forum_button_side'), child_forum_block);
    //自身までの親フォーラムまで開く
    while (target.parent('.child_forum_block_side').size() > 0) {
      var parent_forum_block = target.parent('.child_forum_block_side');
      openForum(parent_forum_block.prev().find('span.forum_button_side'), parent_forum_block);
      target = parent_forum_block;
    }

    //tooltips設定
    $("a:has(span.tooltips)").mouseover(function(e){
      $("form").append("<div id=\"ttp\">"+ ($(this).children("span.tooltips").html()) +"</div>");
      $("#ttp")
      .css("position","absolute")
      .css("text-align","left")
      .css("font-size","12px")
      .css("top",(e.pageY) + 15 + "px")
      .css("left",(e.pageX) + 15 + "px")
      .css("display","none")
      .css("filter","alpha(opacity=85)")
      .fadeIn("fast")
    }).mousemove(function(e){
      $("#ttp")
      .css("top",(e.pageY) + 15 + "px")
      .css("left",(e.pageX) + 15 + "px")
    }).mouseout(function(){

      $("#ttp").remove();
    });
  }

  //選択中フォーラムを強調
  $('#side_forum_list_content').find('span.forum_list_title_side').removeClass('fw_b');
  $('#forum_list_side_' + data.bbs010forumSid).find('span.forum_list_title_side').addClass('fw_b');
}

//フォーラムリンクを更新
function updateForumLink(forumList) {
  var listSize = $(forumList).size();
  for (var i=0;i<listSize;++i) {
    var forumMdl = forumList[i];
    var forumNameSpan = $('#forum_list_side_' + forumMdl.bfiSid).find('span.forum_list_title_side');

    if (forumMdl.readFlg == 1
    && $(forumNameSpan).hasClass('cl_linkDef fw_bold')) {
      $(forumNameSpan).removeClass('cl_linkDef fw_bold');
      $(forumNameSpan).addClass('cl_linkVisit');
    } else if (forumMdl.readFlg != 1
    && $(forumNameSpan).hasClass('cl_linkVisit fw_bold')) {
      $(forumNameSpan).removeClass('cl_linkVisit');
      $(forumNameSpan).addClass('cl_linkDef fw_bold');
    }
  }
}

//フォーラム一覧を生成
function createForumList(forumList) {
  var html = '';
  html += '<div id="side_forum_list_all_opener">'
  + '<span class="cursor_p"><img class="classic-display wp12" src="../common/images/classic/icon_arrow_d.png"><i class="original-display icon-down"></i><span onClick="openAllForum(\'show\')">' + msglist["open.all"] + '</span></span>&nbsp;&nbsp;'
  + '<span class="cursor_p"><img class="classic-display wp12" src="../common/images/classic/icon_arrow_u.png"><i class="original-display icon-up"></i><span onClick="openAllForum(\'hide\')">' + msglist["close.all"] + '</span></span>'
  + '</div>'
  + '<ul class="main_bbsList-none" id="side_forum_list_content">';
  var listSize = $(forumList).size();
  var titleClass = '';
  var valueClass = '';
  var saveParentSid = 0;
  var saveLevel = 1;
  var parentForumList = [];
  var initFlg = true;
  for (var i=0;i<listSize;++i) {

    var forumMdl = forumList[i];
    titleClass = 'cl_linkDef fw_bold';
    valueClass = 'cl_linkDef';
    if (forumMdl.readFlg == 1) {
      titleClass = 'cl_linkVisit';
      valueClass = 'cl_linkVisit';
    }

    var intLevel = parseInt(forumMdl.forumLevel);

    //最初期表示では飛ばす
    if (initFlg) {
      initFlg = false;
    } else {
      //リスト項目END、ブロックEND
      if (saveLevel > intLevel) {
        var levelReminder = saveLevel - intLevel;
        for (var j=0;j<levelReminder;++j) {
          html += '</li>'
          + '</ul>';
        }
      } else if (saveLevel == intLevel && saveParentSid != forumMdl.parentForumSid) {
        html += '</li>'
        + '</ul>';
      } else {
        html += '</li>';
      }
    }

    if (forumMdl.parentForumSid != 0
      && $.inArray(forumMdl.parentForumSid, parentForumList) < 0) {
        //ブロックSTART
        html += '<ul class="main_bbsList-none child_forum_block_side" id="' + forumMdl.parentForumSid + '_child">';
      }

    //リスト項目START
    html = createForumListItem(forumMdl, titleClass, valueClass, html);

    parentForumList.push(forumMdl.parentForumSid);
    saveParentSid = forumMdl.parentForumSid;
    saveLevel = intLevel;
  }
  html += '</li>';
  html += '</ul>';
  return html;
}

//フォーラム項目を生成
function createForumListItem(forumMdl, titleClass, valueClass, html) {
  html += '<li class="forum_list_side mb0 display_inline" id="forum_list_side_' + forumMdl.bfiSid + '" >';

  //開閉ボタン
  if (forumMdl.numberOfChild > 0) {
    html += '<div><span href="#" class="forum_button_side forum_closeIcon-side original-display cl_webIcon js_forumBtn_original cursor_p" id="open_button_' + forumMdl.bfiSid + '" ></span><span href="#" class="forum_button_side wp18hp18 m0 m3 line_hp15 forum_button forum_closeIcon-side classic-display js_forumBtn_classic" id="open_button_' + forumMdl.bfiSid + '" ></span></div>';
  } else {
    html += '<div><span class="classic-display level_indent_side forum_indent">-</span><span class="original-display level_indent_side forum_indent opacity6">-</span></div>';
  }

  //フォーラム画像
  if (forumMdl.imgBinSid == 0) {
    //フォーラム画像default
    html += '<img src="../bulletin/images/original/icon_forum_32.png" class="cursor_p wp18hp18 flx_shrink m3 original-display" alt="' + msglist["forum"] + '" onclick="toThreadList(' + forumMdl.bfiSid + ');">';
    html += '<img src="../bulletin/images/classic/icon_forum.gif" class="cursor_p wp18hp18 flx_shrink m3 classic-display" alt="' + msglist["forum"] + '" onclick="toThreadList(' + forumMdl.bfiSid + ');">';
  } else {
    //フォーラム画像original
    html += '<img src="../bulletin/bbs010.do?CMD=getImageFile&bbs010BinSid=' + forumMdl.imgBinSid + '&bbs010ForSid=' + forumMdl.bfiSid + '" class="forum_icon-list cursor_p wp18hp18" alt="' + msglist["forum"] + '" onclick="toThreadList(' + forumMdl.bfiSid + ');">';
  }

  //フォーラムタイトル
   html += '<span id="forum_'+ forumMdl.bfiSid +'"><div class="fs_14 cursor_p word_b-all wp200 no_w" onclick="toThreadList(' + forumMdl.bfiSid + ');"><span class="' + titleClass +' cl_linkHoverChange forum_list_title_side">' + forumMdl.bfiName +'</span>';

  //掲示予定あり
  if (forumMdl.rsvThreCnt > 0) {
    html += '<a class="ml5"><span class="tooltips display_n">' + msglist["bbs.post.schedule"] + ':' + forumMdl.rsvThreCnt + '</span><img class="classic-display wp16hp16" src="../bulletin/images/classic/icon_scheduled_post.png" alt="' + msglist["bbs.post.schedule"] + '"><i class="original-display icon-time line_hp0"></i></a>';
  }

  //フォーラムnew画像
  if (forumMdl.newFlg == 1) {
    html += '<div class="display_inline-block"><img class="classic-display ml5" src="../bulletin/images/classic/icon_new.gif" class="forum_icon" alt="' + msglist["bbs.new.icon"] + '"><span class="labelNew original-display">NEW</span></div>';
  }

  html += '</div></span>';
  return html;
}

//未読スレッド一覧を取得
function getNotReadThreadList(notReadThreadList) {
  //未読スレッドの有無チェック
  if ($(notReadThreadList).size() < 1) {
    $('#notReadThreadListTable').hide();
    $('#notReadThreadListTable').empty();
    return;
  }

  var html = createNotReadThreadList(notReadThreadList);
  $('#notReadThreadListTable').empty();
  $('#notReadThreadListTable').append(html);
  $('#notReadThreadListTable').show();
}

//「全て既読にする」ボタン取得
function getMarkAllReadBlock(data) {
  //ボタンの有効/無効と未読件数チェック
  if (!data.bbs060mreadFlg
  || data.bbs060unreadCnt < 1) {
    $('#markAllReadBlock').hide();
    $('#markAllReadBlock').empty();
    return;
  }

  var html = createMarkAllReadBlock(data);
  $('#markAllReadBlock').empty();
  $('#markAllReadBlock').append(html);
  $('#markAllReadBlock').show();
}

//未読スレッド一覧生成
function createNotReadThreadList(notReadThreadList) {
  var html = '';
  html += '<tr>'
  + '<td class="w100 txt_l txt_m m0 p0 table_title-color">'
  + '<div class="w100 fs_14 verAlignMid m0 p0 hp40">'
  + '<img class="classic-display ml5" src="../bulletin/images/classic/icon_thread.gif" alt="' + msglist["thread"] + '">'
  + '<span class="ml5">' + msglist["unread.thread.list"] + '</span></div>'
  + '</td></tr>'

  var sidMap = {};
  var listSize = $(notReadThreadList).size();
  var forumName = '';
  var forumSid = '';
  var forumMdl;
  var headerFlg = false;
  for (var i=0;i<listSize;++i) {
    forumMdl = notReadThreadList[i];
    forumName = forumMdl.bfiName;
    forumSid = forumMdl.bfiSid;

    if (sidMap[forumSid] == void 0) {
      html += '<tr><td class="p0"><div class="w100 m0">'
      + '<div class="txt_l p5 bgC_header2">';
      if (forumMdl.binSid == 0) {
        html += '<img src="../bulletin/images/classic/icon_forum.gif" class="wp20hp20 classic-display" alt="' + msglist["forum"] + '"><img class="wp20hp20 original-display" src="../bulletin/images/original/icon_forum_32.png" alt="' + msglist["forum"] + '">';
      } else {
        html += '<img class="wp20hp20" src="../bulletin/bbs060.do?CMD=getImageFile&bbs010BinSid=' + forumMdl.binSid + '&bbs010forumSid=' + forumMdl.bfiSid + '" alt="' + msglist["forum"] + '">';
      }
      html += '<span class="ml5 fw_b fs_13">' + forumMdl.bfiName + '</span></td></tr>'
      + '</div>';
      sidMap[forumSid] = forumName;
    }

    var titleClass = "cl_linkDef cl_linkHoverChange fw_bold";
    html += '<tr><td class="p0"><div class="pl5 pr5 pt0">'
    + '<a href="javascript: getList(' + forumMdl.bfiSid + ',' + forumMdl.btiSid + ')">';
    if (forumMdl.bfiThreImportance == 1) {
      html += '<img class="classic-display" src="../common/images/classic/icon_zyuu.png" alt="' + msglist["bbs.importance"] + '"><img class="original-display" src="../common/images/original/icon_zyuu.png" alt="' + msglist["bbs.importance"] + '">';
    }
    if (forumMdl.btsTempflg == 1) {
        html += '<img class="classic-display" src="../common/images/classic/icon_temp_file_2.png" alt="' + msglist["attachFile"] + '"><img class="original-display" src="../common/images/original/icon_attach.png" alt="' + msglist["attachFile"] + '">';
    }
    html += '<span class="' + titleClass + ' fs_13">' + forumMdl.btiTitle + '</span></a>'
    + '<div class="txt_r fs_10">' + forumMdl.strWriteDate + '</div>'
    + '</div></td></tr>';

  }
  html += '</div></div>'
  return html;
}

//「全て既読にする」ボタン生成
function createMarkAllReadBlock(data) {
  var html = '';

  html = '<div class="bor1 mt10">'
  if (data.bbs060BinSid == 0) {
    html += '<div class="txt_l table_title-color fs_14 p5"><img class="classic-display wp30hp30" src="../bulletin/images/classic/icon_forum.gif" alt="' + msglist["forum"] + '"><img class="original-display wp30hp30" src="../bulletin/images/original/menu_icon_single.png" alt="' + msglist["forum"] + '">';
  } else {
    html += '<div class="txt_l table_title-color fs_14 p5"><img class="wp30hp30" src="../bulletin/bbs060.do?CMD=getImageFile&bbs010BinSid=' + data.bbs060BinSid + '&bbs010forumSid=' + data.bbs010forumSid + '" alt="' + msglist["forum"] + '">'
  }

  html += '<span class="ml5">' + data.bbs060forumName + '</span></div>'
  + '</tr>'
  + '<div class="txt_c p10 bgC_body">'
  + '<span>' + msglist["unread.thread.count"] +  ':&nbsp;' + data.bbs060unreadCnt + '</span>'
  + '<div class="w100 txt_c mt15">'
  + '<button type="button" name="btn_allread" class="baseBtn" value="' + msglist["markRead"] + '" onClick="buttonPush(\'bbs060allRead\');">' + msglist["markRead"] + '</button>'
  + '</div>'
  + '</div>'
  + '</div>'


  return html;
}

//フォーラム一覧の全て開く・閉じる機能
function openAllForum(act) {
  var child_block = $('#side_forum_list_content').find('.child_forum_block_side');
  var buttons = $('#side_forum_list_content').find('.forum_button_side');

  if (act == 'hide') {
    closeForum(buttons, child_block);
  } else {
    openForum(buttons, child_block);
  }

  return false;
}

//フォーラム一覧の開閉機能
$('.js_forumBtn_original, .js_forumBtn_classic').live('click', function() {

  var child_ul = $(this).parents('li').next();

  if (child_ul.css('display') == 'none') {
    openForum($(this), child_ul);
  } else {
    closeForum($(this), child_ul);
  }

  return false;
});

function openForum(button, target) {
  target.animate({opacity: 'show'}, "fast");
  button.removeClass('forum_closeIcon-side');
  button.addClass('forum_openIcon-side');
}

function closeForum(button, target) {
  target.animate({opacity: 'hide'}, "fast");
  button.removeClass('forum_openIcon-side');
  button.addClass('forum_closeIcon-side');
}

function loadingPop(popTxt) {

  $('#loading_pop').dialog({
    dialogClass:"fs_13",
    autoOpen: true,  // hide dialog
    bgiframe: true,   // for IE6
    resizable: false,
    height: 130,
    width: 250,
    modal: true,
    title: popTxt,
    overlay: {
      backgroundColor: '#000000',
      opacity: 0.5
    },
    buttons: {
      hideBtn: function() {
      }
    }
  });

  $('.ui-button-text').each(function() {
    if ($(this).text() == 'hideBtn') {
      $(this).parent().parent().parent().addClass('border_top_none');
      $(this).parent().parent().parent().addClass('border_bottom_none');
      $(this).parent().after("<div style=\"border-top:0px;line-height:10px\" class=\"\">&nbsp;&nbsp;&nbsp;&nbsp;</div>");
      $(this).parent().remove();
    }
  })
}

$('.js_tableTopCheck-header').live("change",function() {
    changeChk();
     });

function closeloadingPop() {
    if ($('#loading_pop') != null) {
        setTimeout('closeloading();',150)
    }
}

function closeloading() {
    if ($('#loading_pop') != null) {
        $('#loading_pop').dialog('close');
    }
}
