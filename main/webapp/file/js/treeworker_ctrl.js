/**
 * jqueryプラグイン初期化処理
 * ここに書いた処理はDOM読み込みと並行処理になる
 */
;(function($) {
    if ($.fn.treeworker_ctrl) {
        //読み込み済みの場合何もしない
        return;
    }
    /**
     * プラグインコントローラ
     *
     *
     * */
    function Plugin() {

    }
    /**
     * ツリービューワーカー初期化プラグイン
     * 引数option指定でツリービューの初期化
     * optionなしでプラグインコントローラの取得
     *
     */
    $.fn.treeworker_ctrl = function (option) {
        var ret =   new Plugin();
        ret.caller = this;
        return ret;
    };
    /**
      ツリービューHTML生成バックグラウンド実行
      data :{
        tree:Array{
          Array {objdata...}
          ...
        },
        sepKey：ツリーデータ分割キー
      }
     */
    Plugin.prototype.run = function (data) {
        var caller= this.caller;
            var worker = new Worker('../file/js/filtreeworker.js');
            caller.data('treeworker', worker);
            worker.addEventListener('message', function(e) {
                this.terminate();
                caller.data('treeworker', null);
                var data = e.data;
                var callback = function(e) {
                  // ツリー表示初期化
                  caller.next().addClass('display_none');

                  removeEventListener('message', callback);

                }
                caller.treeview().addTree(data, callback);

            });
            worker.postMessage(JSON.stringify(data));


    }


    $(function() {
        if ($('body').attr('data-treeworker_ctrl_init') != 'true') {
            $('body').attr('treeworker_ctrl_init', 'true');
        }
    });

})(jQuery);

//フォルダツリー構成要素取得
//各画面の"__makeTree()"関数で使用する
//paramNameには「構成要素のパラメータ名(通常: treeFormLv)」を設定
//minLvには「フォルダ階層の下限(通常: 1)」を指定
//maxLvには「フォルダ階層の上限(通常: 10)」を指定
function createTreesValueArray(paramName, minLv, maxLv) {
  var trees = new Array();

  if (!paramName) {
    paramName = 'treeFormLv';
  }
  var t = 1;
  if (minLv >= 0) {
    t = minLv;
  }
  if (!maxLv) {
    maxLv = 10;
  }
  for (; t <= maxLv; t++) {
    var pathdata = document.getElementsByName(paramName + t);
      if (!pathdata) {

        return trees;
      }
      var paths = new Array();
      trees.push(paths);

      var i = 0;
      for (i = 0; i < pathdata.length; i++) {
          paths.push(pathdata[i].dataset.treevalue);
      }

  }
  return trees;
}