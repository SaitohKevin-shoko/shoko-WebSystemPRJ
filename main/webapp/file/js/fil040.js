function fil040TitleClick(sortKey, orderKey) {

    document.forms[0].fil040OrderKey.value=orderKey;
    document.forms[0].fil040SortKey.value=sortKey;
    document.forms[0].CMD.value='titleClick';
    document.forms[0].submit();
    return false;
}

function CreateFolder() {
    document.forms[0].backDspLow.value='fil040';
    document.forms[0].CMD.value='fil040createFolder';
    document.forms[0].fil050ParentDirSid.value = document.forms[0].fil010SelectDirSid.value;
    document.forms[0].submit();
    return false;
}

function CreateFile() {
    document.forms[0].backDspLow.value='fil040';
    document.forms[0].CMD.value='fil040addFile';
    document.forms[0].fil070ParentDirSid.value = document.forms[0].fil010SelectDirSid.value;
    document.forms[0].submit();
    return false;
}

function DeleteDirectory() {
    if (fil040CheckSelect(msglist_fil040['cmn.cmn310.06'])) {
        let fil040CommentFlg = false;
        let fil040FileNameList = new Array();
        $('input[name=fil040SelectDel]:checked').each(function() {
            fil040FileNameList.push($('input:hidden[name="fil040List_dirName' + $(this).val() + '"]').val());
            if (fil040CommentFlg == false) {
                fil040CommentFlg = $('input:hidden[name="fil040List_dirKbn' + $(this).val() + '"]').val() == 1;
            }
        })

        showFileDeleteDialog('fil040Form', 'fil040delete', fil040FileNameList, 0, fil040CommentFlg);
    }
}

function MovePlural() {
    if (fil040CheckSelect(msglist_fil040['fil.fil040.12'])) {
        document.forms[0].fil090SelectPluralKbn.value=1;
        document.forms[0].CMD.value='fil040movePlural';
        document.forms[0].moveToDir.value="";
        document.forms[0].submit();
    }
    return false;
}

function FileRockOn() {
    if (fil040CheckSelect(msglist_fil040['fil.fil040.9'])) {
        document.forms[0].CMD.value='fil040lockPlural';
        document.forms[0].submit();
    }
    return false;
}

function FileRockOff() {
    if (fil040CheckSelect(msglist_fil040['fil.fil040.10'])) {
        document.forms[0].CMD.value='fil040unlockPlural';
        document.forms[0].submit();
    }
    return false;
}

function MoveToSearch() {
    document.forms[0].CMD.value='fil040search';
    document.forms[0].backDsp.value='fil040';
    document.forms[0].submit();
    return false;
}

function MoveToFolderDetail(dirSid,fdrParentSid) {
    document.forms[0].CMD.value='fil040folderDetail';
    document.forms[0].backDspLow.value='fil040';
    document.forms[0].fil050DirSid.value=dirSid;
    document.forms[0].fil050ParentDirSid.value=fdrParentSid;
    document.forms[0].submit();
    return false;
}

function MoveToFileDetail(dirSid) {
    document.forms[0].CMD.value='fil040fileDetail';
    document.forms[0].backDspLow.value='fil040';
    document.forms[0].fil070DirSid.value=dirSid;
    document.forms[0].submit();
    return false;
}

function MoveToFileMove(dirSid) {
    document.forms[0].CMD.value='fil040move';
    document.forms[0].fil090DirSid.value=dirSid;
    document.forms[0].moveToDir.value="";
    document.forms[0].fil090SelectPluralKbn.value=0;
    document.forms[0].submit();
    return false;
}

function MoveToAconf() {
    document.forms[0].CMD.value='fil040aconf';
    document.forms[0].backDsp.value='fil040';
    document.forms[0].submit();
    return false;
}

function MoveToPconf() {
    document.forms[0].CMD.value='fil040pconf';
    document.forms[0].backDsp.value='fil040';
    document.forms[0].submit();
    return false;
}

function UnLock(dirSid,verSid) {
    document.forms[0].CMD.value='fil040unlock';
    document.forms[0].fil040SelectUnlock.value=dirSid;
    document.forms[0].fil040SelectUnlockVer.value=verSid;
    document.forms[0].submit();
    return false;
}

function changeChk() {
   var chkFlg;

   if (document.forms[0].fil040SelectDelAll.checked) {

       chkFlg = true;

   } else {

       chkFlg = false;

   }
   delAry = document.getElementsByName("fil040SelectDel");

   for(i = 0; i < delAry.length; i++) {

       delAry[i].checked = chkFlg;

   }
}

function fil040CheckSelect(elName) {
    let checkResult = $('input[name=fil040SelectDel]:checked').length > 0;
    if (checkResult == false) {
        var warnMsg = msglist_fil040['cmn.select.4'];
        warnMsg = warnMsg.replace('elName', elName);
        alert(warnMsg);
    }
    return checkResult;
}

function fil040FileLinkClick(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].moveToDir.value=sid;
    document.forms[0].submit();
}

function fil040FileTreeClick(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].moveToDir.value=sid;
    document.forms[0].submit();
}

//イベントを登録
$(function(){
    //画面左 フォルダツリー表示
    $.getScript("../common/js/treeview.js", function(){
        $.getScript("../file/js/treeworker_ctrl.js", function(){
            // ツリー表示初期化
            $("#tree").treeview({
              name : 'fileTree',
              allOpen : $('#sidetreecontrol a').eq(1),
              allClose : $('#sidetreecontrol a').eq(0),
              duration : 'fast'
            });

            function __makeTree() {
                return createTreesValueArray();
            }

            $('#tree').treeworker_ctrl().run({
                tree:__makeTree(),
                sepKey:document.getElementsByName('sepKey')[0].value,
                treeClass:function (sp) {
                    this.name = sp[0];
                    this.paths = new Array();
                    this.open = false;
                    this.label =  '';

                    if (sp.length == 3) {

                        this.label = "<a href=\"#!\" onClick=\"fil040FileTreeClick(\'detailDir\', '" + sp[0] + "');\">"
                                         + '<img class="classic-display mr5" src="../common/images/classic/icon_folder.png" border="0" alt="">'
                                         + '<img class="original-display mr5" src="../common/images/original/icon_folder_box.png" border="0" alt="">'
                                         + sp[2] + "</a>";
                        return this;
                    }
                    return false;
                 }.toString()
            });

        });
    });


  $('.js_tableTopCheck-header').live("change",function() {
    changeChk();
  });


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

  $(".js_listClick").live("click", function(){
      var kbn = $(this).parent().data("dirkbn");
      if (kbn == '0') {
          var fdrSid = $(this).parent().data("fdrSid");
          fileLinkClick('detailDir', fdrSid);
      } else {
          var binSid = $(this).parent().data("binsid");
          fileDl('fileDownload', binSid);
      }
  });

  $(".js_directoryHover").mouseenter(function(){
      $(this).removeClass("cl_fontOutlineLink");
  });

  $(".js_directoryHover").mouseleave(function(){
      $(this).addClass("cl_fontOutlineLink");
  });

  /* メニュー 格納用縦線 click*/
  $(".js_cabineList").live("click", function(){
      if ($("#cabinetList").hasClass("display_none")) {
          $('#cabinetList').removeClass('display_none');
          $('.js_listCloseArea').addClass('display_none');
          $('.js_main').removeClass('w100');
          $('input[name="fil040SideMenuFlg"]').val(1);
      } else {
          $('#cabinetList').addClass('display_none');
          $('.js_listCloseArea').removeClass('display_none');
          $('.js_main').addClass('w100');
          $('input[name="fil040SideMenuFlg"]').val(0);
      }
  });

  $("body").live("click", function() {
      $("#tools").addClass("display_n");
  });

  var fdrSid;
  var parentSid;
  var dirkbn;
  $(".js_fileMenu").live("click", function(e) {

      $(".js_moveClick").removeClass("display_n");
      if ($(this).closest(".js_listHover").data("accessKbn") != '1') {
          $(".js_moveClick").addClass("display_n");
      }

      $("#tools").removeClass("display_n");
      $("#tools").offset({ top:e.pageY, left:e.pageX -50});
      e.stopPropagation();

      fdrSid = $(this).closest(".js_listHover").data("fdrSid");
      parentSid = $(this).closest(".js_listHover").data("parentSid");
      dirkbn = $(this).closest(".js_listHover").data("dirkbn");
  });

  $(".js_syosaiClick").live("click", function() {
    if (dirkbn == 0) {
      MoveToFolderDetail(fdrSid, parentSid);
    } else {
      MoveToFileDetail(fdrSid);
    }
  });

  $(".js_moveClick").live("click", function() {
    MoveToFileMove(fdrSid);
  });

  $(".js_tradeTouroku").live("click", function() {
    document.forms[0].CMD.value='tradeTouroku';
    document.forms[0].backDsp.value='fil040';
    document.forms[0].submit();
  });


});
