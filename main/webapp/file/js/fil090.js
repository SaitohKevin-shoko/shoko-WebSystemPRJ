//イベントを登録
$(function(){

    // ツリー表示初期化
    $("#tree").treeview({
      name : 'file090tree',
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
        selectDir:document.getElementsByName('selectDir')[0].value,
        treeClass:function (sp, selectDir) {
            this.name = sp[0];
            this.paths = new Array();
            this.open = false;
            this.label =  '';
            this.class = '';
            this.open = (selectDir != '-1' && selectDir == sp[0]);


            var folderIcon = '<img class="classic-display mr5" src="../common/images/classic/icon_folder.png" border="0" alt="">'
              + '<img class="original-display mr5" src="../common/images/original/icon_folder_box.png" border="0" alt="">';
            if (sp.length == 4) {
                    if (parseInt(sp[3]) > 0) {
                          this.label =
                               "<a href=\"javascript:(fileTreeClick(\'changeDir\', '" + sp[0] + "'))\">" + folderIcon + sp[2] + "</a>";
                    } else {
                          this.label =
                               '<span class="cl_fontWeek">' + folderIcon + sp[2] + '</span>';
                    }
              return this;
            }
            return false;
        }.toString()
    });
});
