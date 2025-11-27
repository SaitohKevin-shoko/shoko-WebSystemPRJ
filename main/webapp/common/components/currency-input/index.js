class CurrencyInput extends HTMLElement{
    constructor() {
        super();
        this.name = '';
        this.value = '';
        this.maxlength = 21;
        this.maxNumberCount = 17;
        this[ 'max-seisu-length' ] = 12;
        this[ 'max-fraction-length' ] = 4;
        this.caretPosition = 0;

    }

    // コンポーネントの属性を宣言
    static get observedAttributes() {
        return ['name', 'class', 'style', 'value', 'maxlength','max-seisu-length', 'max-fraction-length'];
    }
    // コンポーネントの属性の値変更時のイベント処理
    attributeChangedCallback(property, oldValue, newValue) {

        if (oldValue === newValue) return;
        this[ property ] = newValue;
        
    }    

    // 描画前イベント処理   
    connectedCallback() {
        const element = this;
        //const shadow = this.attachShadow({mode: 'open'});
        const content = document.createElement('input');
        content.type = 'text';
        content.name = this.name;
        content.value = this.value;
        content.style.userSelect = 'none';
        content.autocomplete='off';
        var maxNumberCount = this.maxNumberCount;

        if (this[ 'max-seisu-length' ] > 0) {
            var maxlength = this.maxlength;
            maxNumberCount = this[ 'max-seisu-length' ]
            if (this[ 'max-fraction-length' ] > 0) {
                maxNumberCount += Number(this[ 'max-fraction-length' ]);
                maxNumberCount ++;//少数点分
                maxlength = maxNumberCount;
            }
            maxlength += parseInt(this[ 'max-seisu-length' ] / 3 - 1);
            maxlength++; //符号分

            this.maxlength = maxlength;
            this.maxNumberCount = maxNumberCount;
        }

        content.setAttribute('size', this.maxlength);

        var rmCls = [];
        element.classList.forEach(function (cls) {
            rmCls.push(cls);
        });
        rmCls.forEach(function (cls) {
            element.classList.remove(cls);
            content.classList.add(cls);
        });

        content.classList.add('txt_r');

        if (this.maxlength > 0) {
            content.setAttribute('size', this.maxlength);
        }
        
        function caretSkipCumma(e, mv) {
            var carPos = e.target.selectionStart;
            if (e.target.value.charAt(carPos - 1).match( /[,]/g)) {
                carPos += mv;
                e.target.focus();
                e.target.setSelectionRange(carPos, carPos);
            }
        }

        function caretSkipCummaForDelete(e, mv) {
            var carPos = e.target.selectionStart;
            if (e.target.value.charAt(carPos).match( /[,]/g)) {
                carPos += mv;
            }
            e.target.focus();
            e.target.setSelectionRange(carPos, carPos);
        }

        content.addEventListener('mouseup', function(e) {
            caretSkipCumma(e, -1);
        });

        content.addEventListener('keydown', function(e) {
//            console.log({key:e.key, shift:e.shiftKey});
            var mv = 0;
            if (e.key == 'ArrowLeft') {
                mv = -1;
            }
            if (e.key == 'ArrowRight') {
                mv = 1;
            }
            if (e.key == 'Delete') {
                caretSkipCummaForDelete(e, 1);
            }
            var carPos = e.target.selectionStart + mv;
            if (carPos < 0) {
                carPos = 0;
                mv = 0;
            }
            if (carPos > e.target.value.length) {
                carPos = e.target.value.length;
                mv = 0;
            }
 
            if (mv != 0
                  && e.shiftKey == false) {
                e.target.focus();
                e.target.setSelectionRange(carPos, carPos);
                caretSkipCumma(e, mv);
                e.preventDefault();
            } else {
            }
        });

        content.addEventListener('blur', function(e) {
            __seikeiText(e.target);
        });
        //文字変換確定
        content.addEventListener('compositionend', function(e) {
//            console.log('compositionend value + ' + e.target.value);
            //文字数制限による文字列のカット
            __seikeiText(e.target);
        });

        /** 入力された文字を成型 */
        function __seikeiText(content) {
            var value = content.value;
            //キャレット位置を取得
            var caretPos = content.selectionStart;
            var carBeforeText = value.substring(0, caretPos);
            var carAfterText = value.substring(caretPos);

            //先頭の不正な文字を除外
            var startIdx = value.search(/[0-9.-]/);
            carBeforeText = carBeforeText.substring(startIdx);
            caretPos -= startIdx;


            var isHugou = false;
            var hugou = '';
            if (carBeforeText[0] == '-') {
                isHugou = true;
                hugou = '-';
                if (caretPos > 0) {
                    caretPos--; 
                }
            }

            //不正な文字の除去
            carBeforeText = carBeforeText.replace(/[^0-9.]/g, '');

            var carAfterNumberCount = carAfterText.replace(/[^0-9.]/g, '').length;

            var catLength = parseInt(element.maxNumberCount) - carAfterNumberCount;
            if (catLength > carBeforeText.length) {
                catLength = carBeforeText.length;
            }
            if (catLength <= 0) {
                catLength = 0;
            }
            //文字数制限をオーバした文字を削除
            carBeforeText = carBeforeText.substring(0, catLength);


            if (isHugou) {
                catLength++;
            }

            value = hugou + carBeforeText + carAfterText;

            caretPos = catLength;

            //キャレット位置までの数値を取得
            var leftToCaretNum = value.substring(0, caretPos).replace(/[^0-9.]/g, '');
            //カンマを除いたキャレット位置を取得
            var leftToCaretPos = leftToCaretNum.replace(/,/g, '').length;

            //マイナスおよびカンマを除去
            var minusFlg = false; 
            if (value.startsWith('-')) {
                minusFlg =true;
            }
            var plainText = value.replace(/,|-/g, '');

            //入力された数値の長さを取得
            var numLength = plainText.length;

            //小数点の位置を取得
            var periodPos = plainText.indexOf('.');
            if (periodPos < 0) {
                periodPos = plainText.length;
            }

            //小数部を生成
            var syosuText = '';
            if (periodPos != numLength) {
                syosuText = plainText.substring(periodPos, numLength);
            }

            //整数部を取得
            var seisuText = '';
            seisuText = plainText.substring(0, periodPos).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            //表示するテキストを生成
            var numText = '';
            if (String(seisuText) != null && minusFlg) {
                numText = '-' + String(seisuText);
            } else {
                numText = String(seisuText);
            }
            if (syosuText != null) {
                numText += String(syosuText);
            }

            //キャレット位置を設定
            var newCaretPos = 0;
            while (leftToCaretPos > 0) {
                leftToCaretPos--;
                newCaretPos++;
                if (numText.charAt(newCaretPos).match(/,/g)) {
                    newCaretPos++;
                }
            }
            if (minusFlg) {
                newCaretPos++;
            }

            value = numText;
            if (value != content.value) {
                if (newCaretPos > 0 &&value.charAt(newCaretPos-1).match(/,/g)) {
                    newCaretPos--;
                }
                element.value = value
                content.value = element.value;
                content.setSelectionRange(newCaretPos, newCaretPos);
            }
        }

        content.addEventListener('input', function(e) {
            // console.log('value + ' + e.target.value);
            // console.log('inputType + ' + e.inputType);
            // console.log('data + ' + e.data);
            if (e.inputType == 'insertCompositionText') {
                return;
            }
            //文字数制限による文字列のカット
            __seikeiText(e.target);
            
            element.dispatchEvent(new Event('input'));
        });
        //shadow.appendChild(content);  // <-- Shadow Domにする場合
        element.appendChild(content); // <-- Shadow Domにしない場合
    }
}

//コンポーネントタグを定義
customElements.define( 'currency-input', CurrencyInput );