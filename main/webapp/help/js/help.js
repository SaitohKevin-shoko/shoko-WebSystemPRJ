function linkClick(url) {
  location.href = url;
}
//プラグイン一覧画面用
function ajaxPluginList(url) {
  $('#right-content').load(url,
    function (responseText, textStatus, req) {
      if (textStatus == "error") {
        alert('読み込みに失敗しました');
      }
      menuBgChange();
  });
}
//プラグイン機能詳細画面用
function ajaxLeftFuncIn(url) {
  $('#help-left-func-in').load(url,
    function (responseText, textStatus, req) {
      if (textStatus == "error") {
        alert('読み込みに失敗しました');
      }
      menuBgChange();
  });
}


//プラグイン汎用
function ajaxGetContents(contentsId, url) {
  $('#' + contentsId).load(url+ '?cache=' + (new Date()).getTime(),
    function (responseText, textStatus, req) {
      if (textStatus == "error") {
        alert('読み込みに失敗しました');
      }
      menuBgChange();
  });
}
//help_search.html
function ajaxSearchFuncIn(url) {
  $('#help-search-func').load(url,
    function (responseText, textStatus, req) {
      if (textStatus == "error") {
        alert('読み込みに失敗しました');
      }
      menuBgChange();
  });
}
function movePage(page) {
    document.forms['hlp020Form'].hlp020DispPage.value=page;
    document.forms['hlp020Form'].submit();
    return false;
}
function changeSelected(id) {
    var idname = 'box' + id;
    var linkName = 'link' + id;
    document.getElementById(idname).style.backgroundColor='#0000ff';
    document.getElementById(linkName).style.color='#ffffff';
    document.getElementById(idname).style.cursor='pointer';
}

function changeUnSelected(id) {

    var idname = 'box' + id;
    var linkName = 'link' + id;
    document.getElementById(idname).style.backgroundColor='#ffffff';
    document.getElementById(linkName).style.color='#0000ff';
    document.getElementById(idname).style.cursor='auto';
}
//ヘルプ機能ページ遷移時汎用メソッド
function commonHelpLocationChange(nextLocation) {
    location.href=nextLocation;
    return false;
}
//function commonHelpLocationChange(nextLocation){
//    switch( arguments.length ){
//        case 0 : default : return false;
//        case 1 :
//             chengeHeaderText(headerText);
//        case 2 :
//             chengeHeaderText(headerText);
//             location.href=nextLocation;
//    }
//}

//ヘッダーテキストチェンジ
function chengeHeaderText(value) {
    parent.menu.document.getElementById('header_text').innerHTML = value;
}

function doLocationChange() {
    var headerText   = '[ プラグイン 一覧 ]';
    var nextLocation = '../help/index.html';

    commonHelpLocationChange(headerText, nextLocation);
}


function menuBgChange() {
    $('.menu_bg_help').hover(
      function(){
          $(this).addClass("menu_hover");
      },function(){
          $(this).removeClass("menu_hover");
      });
}
