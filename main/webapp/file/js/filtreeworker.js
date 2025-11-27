
//Workerスレッド
self.addEventListener('message'
, function(e) {
    var data = JSON.parse(e.data);
    var TreeObj;
    //ツリー生成
    function __makeTree(data) {
        var sepKey = data.sepKey;
        var icon = data.icon;
        var trees = new Array();
        var indexes = new Array();
        var t = 0;
        for (t=0; t <= data.tree.length; t++) {
            var i = 0;
            if (!data.tree[t]) {
                return trees;
            }
            for (i =0; i < data.tree[t].length; i++) {
                var sp = data.tree[t][i].split(sepKey);
                var path = new TreeObj(sp, data.selectDir);

                if (path) {
                    indexes[sp[0]] = path;
                    if (t == 0) {
                        trees.push(path);
                    } else if (indexes[sp[1]]) {
                        indexes[sp[1]].paths.push(path);
                    }
                }
            }

        }
        return trees;
    }
    var data = JSON.parse(e.data);
    var TreeObj = Function('return (' + data.treeClass + ')')();
    var trees = __makeTree(data);

    //処理結果を送信
    self.postMessage(trees);
}, false);