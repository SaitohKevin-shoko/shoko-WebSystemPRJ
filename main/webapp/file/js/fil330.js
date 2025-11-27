var fil330DirListReload;

/**
 * ファンクションレディ
 */
$(function(){
    //モードボタン
    $(".js_tabHeader").on("click", function(){
        var showId = $(this).data('selectid');
        if (showId == "single") {
            document.forms[0].fil300insertMode.value='0';
        } else if (showId == "multiple") {
            document.forms[0].fil300insertMode.value='1';
        }
        document.forms[0].CMD.value='fil330to300';
        $(".js_treeText").empty();
        document.forms[0].submit();

        return false;
    });

    //全選択チェック
    $(document).on("change" ,'.js_fil330selectDelAll', function() {
      $('.js_tableTopCheck input[name="fil330SelectDel"]').prop("checked",$(this).prop("checked"));
    });

    //削除ボタン
    $(document).on("click" ,'.js_fil330_deleteBtn', function() {
      buttonPush('fil330del');
    });

    //ページINCボタン
    $(document).on("click" ,'.js_pagingInc', function() {
      var page = Number($('.js_pagingSel').val());
      page++;
      $('.js_pagingSel > option').attr('value', page);
      fil330DirListReload();
    });
    //ページDECボタン
    $(document).on("click" ,'.js_pagingDec', function() {
      var page = Number($('.js_pagingSel').val());
      page--;
      $('.js_pagingSel > option').attr('value', page);
      fil330DirListReload();
    });
    //ページ選択
    $(document).on("change" ,'.js_pagingSel', function() {
      $('.js_pagingSel > option').attr('value', $(this).val());
      fil330DirListReload();
    });
    //ダウンロード
    $(document).on("click", ".js_dlLink", function() {
      var feaSid = $(this).data("feasid");
      var url = "../file/fil330.do?CMD=fil330downloadImage&fil300SelectFile=" + feaSid;
      document.location = url;
    });

    //画面左 フォルダツリー表示
    var initFolderPath;
    var setFolderPathTree;

    // ツリー表示初期化
    initFolderPath = function(){
      $("#tree").treeview({
        name : 'fil330Tree',
        allOpen : $('#sidetreecontrol a').eq(1),
        allClose : $('#sidetreecontrol a').eq(0),
        duration : 'fast'
      });
    }

    function __makeTree(kbn) {
        if (kbn == 0) {
            return createTreesValueArray('treeFormLv', 0, 11);
        } else {
            return createTreesValueArray('treeSavePathLv', 0, 11);
        }
    }

    setFolderPathTree = function() {

      $('#tree').treeworker_ctrl().run({
          tree:__makeTree(0),
          sepKey:document.getElementsByName('sepKey')[0].value,
          treeClass:function (sp) {

              this.name = sp[0];
              this.paths = new Array();
              this.open = false;
              this.label =  '';
              var clickEvent = "";
              var insertMode = sp[4];
              var selectedCls = "";
              if (sp.length > 7 && sp[7] == 1) {
                selectedCls = "cl_linkSelected fw_bold";
              }
              //一括登録の場合
              clickEvent = "fil330FileTreeClickFolder('" + sp[5] + "', '" + sp[0] + "', this);";
              var dirSid = sp[0];

              if (dirSid != -1 && dirSid != -2) {
                  this.label += "<a href=\"#!\" class=\"js_folder"
                   + sp[0]
                   + " js_folderLink display_inline-block "
                   + selectedCls
                   + "\" onClick=\""
                   + clickEvent
                   + "\">";
              }

              this.label += '<img class="classic-display mr5" src="../common/images/classic/icon_folder.png" border="0" alt="">'
                             + '<img class="original-display mr5" src="../common/images/original/icon_folder_box.png" border="0" alt="">'
                             + sp[2];
              if (dirSid != -1 && dirSid != -2) {
                  this.label +=  " "+ "(<span class='js_countText'>" +  sp[3] + "</span>)"
              }

              if (sp[0] == -3) {
                  this.label += "<span class='ml5'><img class='btn_classicImg-display' src='../common/images/classic/icon_warn.png'>"
                                 + "<img class='btn_originalImg-display' src='../common/images/original/icon_warn.png'></span>";
              }
              if (dirSid != -1 && dirSid != -2) {
                  this.label += "</a>";
              }
              this.label += "<div class='pos_absolute w100'></div>";
              this.label += "<input type='hidden' name='fileCount' class='js_fileCount' value='" + sp[3] + "'>";


              return this;
           }.toString()
      });
    }
    initFolderPath();
    setFolderPathTree();

});
//ロード状態
var fil330_loadingTimer;
function loadingStart() {
  clearTimeout(fil330_loadingTimer);
  $('.js_loading').removeClass('opacity6');
  $('.js_loading').addClass('opacity0');
  $('.js_loading').removeClass('display_n');
  fil330_loadingTimer = setTimeout(function() {
    $('.js_loading').removeClass('opacity0');
    $('.js_loading').eq(0).addClass('opacity6');
  }, 500)
}

//ロード状態解除
function loadingFinish() {
  $('.js_loading').addClass('display_n');
}
fil330DirListReload = function() {
    document.forms[0].CMD.value = "fil330folderSel";
    document.forms[0].escapeCmd.value = "fil330folderSel";

    var param = $(document.forms[0]).serialize();

    $.ajax({
        async: true,
        url:  "../file/fil330.do",
        type: "post",
        data: param
    }).done(function( data ) {
        //返ってきたHTMLの構造で表示設定範囲を変更する
        try {
            //cmn999エラー の場合は画面全体を描画変更
            if ($(data).find('[name=errCause]').length > 0) {
                 //画面内のHTMLをエラー画面のHTMLで置き換え
                 $('html').html('');
                 $('body').append($(data));
                 return;
            //body全体
            } else if ($(data).find('.js_dirTable').length > 0) {
                 $('html').html('');
                 $('body').append($(data));
            } else {
            //仮ファイルリスト部のみ
              $('.js_file_tradeMain').html('');
              $('.js_file_tradeMain').append($(data));
            }

            $('.js_file_tradeMain').find(".js_nlTooltips").each(function() {
                $(this).css("display","none");
            });
            $('.js_file_tradeMain').find(".js_nlTooltips").parent().mouseover(function(e){
                $("form").append("<div id=\"ttp\">"+ ($(this).children(".js_nlTooltips").html()) +"</div>");
                setTooltipMouseOver(e);
            }).mousemove(function(e){
                setTooltipPosition(e);
            }).mouseout(function(){
                $("#ttp").remove();
            });
        } catch (ee) {
            //正常登録時のjsonをjqueryObjとして扱うとjavascript例外になる
        }
    }).fail(function(data){
    });
}


function fil330FileTreeClickFolder(fcbSid, dirSid, clicked) {

    document.forms[0].fil330SelectCabinet.value = fcbSid;
    document.forms[0].fil330SelectDsp.value = dirSid;

    $(clicked).closest('.js_treeSideList').find('.js_folderLink')
      .removeClass([
        'cl_linkSelected',
        'fw_bold']);
    $(clicked).addClass([
        'cl_linkSelected',
        'fw_bold']);

    $('[name="fil330FileListPageNo"]').val(1);
    fil330DirListReload();


}
