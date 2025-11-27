//開閉情報
var opnInf;

function TreeObj(src) {
    this.name = '';
    this.paths = new Array();
    this.open = false;
    this.label = '';
    this.class = '';

    if (src) {
        for (var prop in src) {
            this[prop] = src[prop];
        }
    }
    if(opnInf) {
        if (opnInf[this.name] && opnInf[this.name] == 'block') {
            this.open=true;
        }
        if (opnInf[this.name] && opnInf[this.name] == 'none') {
            this.open=false;
        }

    }

}

TreeObj.prototype.writeHtml = function() {

    var ret = '<li class="' + this.class;
    if (this.paths && this.paths.length > 0) {
        if (this.open) {
            ret += ' collapsable js_collapsable ';
        } else {
            ret += ' expandable js_expandable '
        }

    }
    ret += '" ';
    if (this.name) {
        ret += 'name="'+this.name+'"';
    }
    ret += ' >';
    if (this.paths && this.paths.length > 0) {
        ret += '<div class="hitarea js_hitarea" ></div>';
    }

    ret += this.label

    if (!this.paths || this.paths.length <= 0) {
        return ret;
    }

    ret += '<ul ';
    if (!this.open) {
        ret += 'style="display:none;"';
    }
    ret += '>';
    var i = 0;
    for (i = 0; i < this.paths.length; i++) {
        ret += new TreeObj(this.paths[i]).writeHtml();
    }
    ret += '</ul>';
    return ret;
}


//Workerスレッド
self.addEventListener('message'
, function(e) {
    function __writeHtml(tree) {
        var ret = "";
        if (!tree) {
            return ret;
        }
        ret += new TreeObj(tree).writeHtml();
        return ret;
    }

    if (e.data.opnInf) {
        try {
            opnInf = JSON.parse(e.data.opnInf);
        } catch (e) {
        }

    }
    var i;
    for(i = 0; i < e.data.trees.length; i++) {
        var ret = __writeHtml(e.data.trees[i]);
        //処理結果を送信
        self.postMessage({finish:false,
                          html:ret});
    }
    self.postMessage({finish:true,
                      html:''});

    //処理結果を送信
}, false);