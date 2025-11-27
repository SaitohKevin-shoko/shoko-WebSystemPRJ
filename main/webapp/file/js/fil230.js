function file230TreeClick(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].fil230DeleteDirSid.value=sid;
    document.forms[0].submit();
    return false;
}

//イベントを登録
$(function(){
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

                    this.label = "<a href=\"javascript:(file230TreeClick(\'fil230selectDir\', '" + sp[0] + "'))\">"
                                 + '<img class="classic-display mr5" src="../common/images/classic/icon_folder.png" border="0" alt="">'
                                 + '<img class="original-display mr5" src="../common/images/original/icon_folder_box.png" border="0" alt="">'
                                 + sp[2] + "</a>";
                    return this;
                }
                return false;
           }.toString()
       });
  $(".js_cabinetKbn").live("change", function () {
      document.forms[0].fil230SltCabinetSid.value = -1;
      document.forms[0].fil230DeleteDirSid.value = "";
      buttonPush('fil230ChangeCabType')
      document.forms[0].submit();  
  });
});