// 編集ボタンクリック
function editButton(bskSid, bfiSid, btiSid, type) {
  document.forms[0].CMD.value = 'soukouEdit';
  document.forms[0].soukouSid.value = bskSid;
  document.forms[0].bbs220BackForumSid.value
    = document.forms[0].bbs010forumSid.value;
  document.forms[0].bbs010forumSid.value = bfiSid;
  document.forms[0].bbs220BackThreadSid.value
    = document.forms[0].threadSid.value;
  if(type == 1) {
    document.forms[0].threadSid.value = btiSid;
  } else {
    document.forms[0].threadSid.value = -1;
  }
  document.forms[0].bbs220SelectType.value = type;
  document.forms[0].submit();
    return false;
}

// 草稿一覧ダイアログ画面初期化
function dialogInit(){
  $(".js_naiyo").children().remove();
}

// 草稿一覧タイトルチェックボックスチェック
function changeChk(){
   if (document.forms[0].allChk.checked) {
       checkAll('bbs220delInfSid');

   } else {
       nocheckAll('bbs220delInfSid');
   }
}

//草稿一覧タイトルクリックソート
function clickTitle(sortKey, orderKey) {
    document.forms[0].CMD.value='init';
    document.forms[0].bbs220SortKey.value=sortKey;
    document.forms[0].bbs220OrderKey.value=orderKey;
    document.forms[0].submit();
    return false;
}

//草稿一覧吹き出しアイコンクリック
function soukou_info(sid) {
    var cmd = 'getSoukouInfo';
    paramStr = 'CMD=' + cmd;
    paramStr = paramStr +  '&soukouSid=' + sid;
    $.ajax({
      async: true,
      url:"../bulletin/bbs220.do",
      type: "post",
      data:paramStr
    }).done(function( data ) {
      if (data["success"]) {
        createData(data);
        soukou_dialog();
      } else {
        alert(msglist_bbs220["bbs.bbs220.7"]);
      }
    }).fail(function(data){
      alert(msglist_bbs220["bbs.bbs220.7"]);
    });
}

//草稿情報ダイアログ
function soukou_dialog() {
  var width =window.innerWidth-200;
  var height =window.innerHeight-200;
  $('#js_soukouInfo').dialog({
    modal : true,
    autoOpen : true,
    bgiframe : true,
    resizable : false,
    width: width,
    height:height,
    overlay : {
      backgroundColor : '#000000',
      opacity : 0.5
    },
    buttons : {
      閉じる : function() {
        dialogInit();
        $(this).dialog('close');
      }
    },
      close : function(){
        dialogInit();
      }
  });
}

//投稿
function createData(data) {
    var list ="<table class=\"table-left\" cellpadding=\"5\">";
        // 投稿者
        list += "<tr>";
        list += " <th  class=\"w20 no_w\"><span>"+  msglist_bbs220["cmn.contributor"] + "</span></th>";
        list += " <td class=\"w80\">";
        list += "  <span>" + data.bbs220SelectSoukoInfo.postName +"</span>";
        list += "</tr>";
        // フォーラム
        list += "<tr>";
        list += " <th  class=\"w20 no_w\"><span>"+  msglist_bbs220["bbs.3"] + "</span></th>";
        list += " <td class=\"w80\">";
        list += "  <span>" + data.bbs220SelectSoukoInfo.forumName +"</span>";
        list += "</tr>";
        // タイトル
        list += "<tr>";
        list += " <th  class=\"w20 no_w\"><span>"+  msglist_bbs220["cmn.title"] + "</span></th>";
        list += " <td class=\"w80\">";
        list += "  <span>" + data.bbs220SelectSoukoInfo.threadName +"</span>";
        list += "</tr>";
        if(data.bbs220SelectSoukoInfo.bskSoukouType == 0) {
          // 重要度
          list += "<tr>";
          list += " <th  class=\"w20 no_w\"><span>"+  msglist_bbs220["enq.24"] + "</span></th>";
          list += " <td class=\"w80\">";
          if(data.bbs220SelectSoukoInfo.juyoKbn == 1) {
            list += "<img class=\"classic-display\" src=\"../common/images/classic/icon_zyuu.png\"  alt=\"" + msglist_bbs220["sml.61"] + "\"><img class=\"original-display\" src=\"../common/images/original/icon_zyuu.png\"  alt=\"" + msglist_bbs220["sml.61"] + "\">";
          }
          list += "</tr>";
        }
        // 内容
        list += "<tr>";
        list += " <th  class=\"w20 no_w\"><span>"+  msglist_bbs220["cmn.content"] + "</span></th>";
        list += " <td class=\"w80\">";
        list += "  <span class=\"js_body\">" + data.bbs220SelectSoukoInfo.content +"</span>";
        list += "</tr>";

        // 添付
        list += "<tr>";
        list += " <th  class=\"w20 no_w\"><span>"+  msglist_bbs220["cmn.attached"] + "</span></th>";
        list += " <td class=\"w80\">";
        if ($(data.bbs220SelectSoukoInfo.filesInfo).size() > 0) {
          list = createAttachedImage(data, list);
        }
        list += "</tr>";
        if(data.bbs220SelectSoukoInfo.bskSoukouType == 0) {
          // 掲示期間
          list += "<tr>";
          list += " <th  class=\"w20 no_w\"><span>"+  msglist_bbs220["bbs.12"] + "</span></th>";
          list += " <td class=\"w80\">";
          if(data.bbs220SelectSoukoInfo.bskLimit == 1) {
            list += " <div><span>";
            list += msglist_bbs220["bbs.bbs220.4"] + " &nbsp;" + data.bbs220SelectSoukoInfo.limitFrDate;
            list += " </span></div>";
            list += " <div><span>";
            list += msglist_bbs220["bbs.bbs220.5"] + " &nbsp;" + data.bbs220SelectSoukoInfo.limitToDate;
            list += " </span></div>";
          }
          list += "</tr>";
        }

      //掲示板本文をhtmlframeに変換
      list = changeBodyToHtmlFrame(list);

      $(".js_naiyo").children().remove();
      $(".js_naiyo").append(list);
}

//投稿一覧HTMLの本文部をhtmlframeに変換
function changeBodyToHtmlFrame(list) {
  var ret = $(list);
  var htmlframe_temp = $('.js_htmlframe_template > iframe');
  ret.find('span.js_body').each(function () {
      var htmlframe = htmlframe_temp.clone(true);
      htmlframe.attr('data-htmlbody', $(this).html());
      $(this).replaceWith(htmlframe);
  });
  return ret;
}

//添付情報
function createAttachedImage(data, list) {

  list += '<div>';
  var tmpFileList = $(data.bbs220SelectSoukoInfo.filesInfo);
  for (var i = 0;i < tmpFileList.size(); ++i) {
    var fileMdl = tmpFileList[i];
    var fext = fileMdl.binFileExtension.toLowerCase();
    list += '<file-preview url="../bulletin/bbs220.do?CMD=fileDownload&bbs220SelectBinSid=' + fileMdl.binSid + '&soukouSid=' + data.soukouSid + '" filename="' + fileMdl.binFileName + '">'
    + '<div><img class="classic-display" src="../common/images/classic/icon_temp_file_2.png" alt="' + msglist_bbs220["cmn.file"] + '"><img class="original-display" src="../common/images/original/icon_attach.png" alt="' + msglist_bbs220["cmn.file"] + '">'
    + '<a href="../bulletin/bbs220.do?CMD=fileDownload&bbs220SelectBinSid=' + fileMdl.binSid + '&soukouSid=' + data.soukouSid + '">'
    + '<span class="ml5">' + fileMdl.binFileName + fileMdl.binFileSizeDsp + '</span>'
    + '</a></div>'
    + '</file-preview>';
  }
  list += '</div>';

  return list;
}

$('.js_tableTopCheck-header').live("change",function() {
  changeChk();
     });
