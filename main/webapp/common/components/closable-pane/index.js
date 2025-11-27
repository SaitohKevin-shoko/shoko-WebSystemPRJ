
/**
 * 開閉要素
 * 上下左右の開閉コンポーネント
 *
 * 開閉要素の設定方法
 *  ボディにslot属性=bodyの要素を設定する
 *
 * 開閉方向の設定方法
 *  attribute['data-mode']に（left |  top | right | bottom）を設定する
 *
 * 開閉ボタンの見た目設定方法
 *  1.attribute['data-toggle-replace']にtrueを設定
 *  2.ボディにslot属性=icon-openの要素を設定する
 *  3.ボディにslot属性=icon-closeの要素を設定する
 *
 * 開閉クリックのイベント取得方法
 *  開いた場合にイベント pane-open を発行
 *  閉じた場合にイベント pane-close を発行
 *  eventListnerでキャッチする
 * @class ClosablePane
 * @extends {HTMLElement}
 */
class ClosablePane extends HTMLElement {
    static EnumMode = {
        left:'left',
        top:'top',
        right:'right',
        bottom:'bottom'
      };
    static EnumDefaultOpen = {
        open:'open',
        close:'close',
      };

    static templateLeft;
    static templateTop;
    static templateRight;
    static templateBottom;
    static {
        //テンプレート初期化
        const html = `
        <style>
            .closablePane {
                padding: 0px;
                display:flex;
                align-items:strech;
                width: 100%;
                height: 100%;
            }
            .closablePane_toggle {
                flex:0;
            }
            slot[name="icon-open"] {
                display:none;
            }
            slot[name="icon-close"] {
                display:none;
            }
            .closablePane_toggle[data-open="open"] > slot[name="icon-open"] {
                display:flex;
                width: 100%;
                height: 100%;
            }
            .closablePane_toggle[data-open="close"] > slot[name="icon-close"] {
                display:flex;
                width: 100%;
                height: 100%;
            }
        </style>
        <ul class="closablePane">
          <ud class="closablePane_toggle js_closablePane_toggle" ><slot name="icon-open"></slot><slot name="icon-close"></slot></ud>
          <ud class="closablePane_body"><slot name="body"></slot></ud>
        </ul>
                `;

        this.templateLeft = document.createElement('template');
        this.templateLeft.innerHTML = `
        <style>
            .closablePane {
                flex-direction: row;
                margin-left   : 5px;
                margin-top    : 0px;
                margin-right  : 0px;
                margin-bottom : 0px;
            }
        </style>
        ${html}
        `;
        this.templateTop = document.createElement('template');
        this.templateTop.innerHTML = `
        <style>
            .closablePane {
                flex-direction: column;
                margin-left   : 0px;
                margin-top    : 5px;
                margin-right  : 0px;
                margin-bottom : 0px;
            }
        </style>
        ${html}
        `;
        this.templateRight = document.createElement('template');
        this.templateRight.innerHTML = `
        <style>
            .closablePane {
                flex-direction: row-reverse;
                margin-left   : 0px;
                margin-top    : 0px;
                margin-right  : 5px;
                margin-bottom : 0px;
            }
        </style>
        ${html}
        `;
        this.templateTop = document.createElement('template');
        this.templateTop.innerHTML = `
        <style>
            .closablePane {
                flex-direction: column-reverse;
                margin-left   : 0px;
                margin-top    : 0px;
                margin-right  : 0px;
                margin-bottom : 5px;
            }
        </style>
        ${html}
        `;
    }

    constructor() {
        super();
        this.mode = ClosablePane.EnumMode.left;
        this.defaultOpen = ClosablePane.EnumDefaultOpen.open;
        this.toggleReplace = false;

    }
    // コンポーネントの属性を宣言
    static get observedAttributes() {
        return ['data-mode', 'data-default-open', 'data-toggle-replace'];
    }

    // コンポーネントの属性の値変更時のイベント処理
    attributeChangedCallback(property, oldValue, newValue) {

        if (oldValue === newValue) return;

        if (property == 'data-mode') {
            if (!ClosablePane.EnumMode[newValue]) {
                return;
            }
            this.mode = ClosablePane.EnumMode[newValue];
            return;
        }
        if (property == 'data-default-open') {
            if (!ClosablePane.EnumDefaultOpen[newValue]) {
                return;
            }
            this.defaultOpen = ClosablePane.EnumDefaultOpen[newValue];
            return;
        }
        if (property == 'data-toggle-replace') {
            this.toggleReplace = newValue;
        }
    }
    // オブジェクト初期化イベント処理
    connectedCallback() {
        const element = this;
        const shadow = this.attachShadow({mode: 'open'});

        let template;
        switch (this.mode) {
            case ClosablePane.EnumMode.left:
                template = ClosablePane.templateLeft;
                break;
            case ClosablePane.EnumMode.top:
                template = ClosablePane.templateTop;
                break;
            case ClosablePane.EnumMode.right:
                template = ClosablePane.templateRight;
                break;
            case ClosablePane.EnumMode.bottom:
                template = ClosablePane.templateBottom;
                break;
        }

        shadow.appendChild(template.content.cloneNode(true));


        if (!this.toggleReplace) {
            let toggleBlock = document.createElement('div');
            toggleBlock.setAttribute("style", `
                display: flex;
                align-items: stretch;
                width: 100%;
                height: 100%;
            `);
            toggleBlock.classList.add('bgC_selectable');
            toggleBlock.classList.add('cursor_pointer');

            let toggleIcon = document.createElement('i');
            toggleIcon.classList.add('display_inline');
            toggleBlock.appendChild(toggleIcon);

            let toggleBlockOpen = toggleBlock.cloneNode(true);
            toggleBlockOpen.setAttribute('slot', 'icon-open');
            let toggleBlockClose = toggleBlock.cloneNode(true);
            toggleBlockClose.setAttribute('slot', 'icon-close');
            toggleBlockClose.classList.add('bgC_lightGray');

            let toggleIconOpen = toggleBlockOpen.querySelector('i');
            let toggleIconClose = toggleBlockClose.querySelector('i');
            this.append(toggleBlockClose);
            this.append(toggleBlockOpen);

            this.appendChild(toggleBlock);
                switch (this.mode) {
                case ClosablePane.EnumMode.left:
                    toggleIconClose.classList.add('icon-left');
                    toggleIconOpen.classList.add('icon-right');
                    break;
                case ClosablePane.EnumMode.top:
                    toggleIconClose.classList.add('icon-up');
                    toggleIconOpen.classList.add('icon-down');
                    template = ClosablePane.templateTop;
                    break;
                case ClosablePane.EnumMode.right:
                    toggleIconClose.classList.add('icon-right');
                    toggleIconOpen.classList.add('icon-left');
                    break;
                case ClosablePane.EnumMode.bottom:
                    toggleIconClose.classList.add('icon-down');
                    toggleIconOpen.classList.add('icon-up');
                    break;
            }

        }
        const toggleArea = shadow.querySelector('.js_closablePane_toggle')


        function toggleChangeDraw(duration) {

            if (toggleArea.getAttribute('data-open') == ClosablePane.EnumDefaultOpen.open) {
                toggleArea.setAttribute('data-open', ClosablePane.EnumDefaultOpen.close);

            } else {
                toggleArea.setAttribute('data-open', ClosablePane.EnumDefaultOpen.open);
            }
            $(shadow.querySelector('.closablePane_body'))
                .animate( { width: 'toggle', opacity: 'toggle' }, duration );

        }

        shadow.querySelector('.js_closablePane_toggle')
            .addEventListener('click', (e) => {
                toggleChangeDraw('middle');
                if (toggleArea.getAttribute('data-open') == ClosablePane.EnumDefaultOpen.open) {
                    let selectEv = new Event("pane-open", { bubbles: true, cancelable: false });
                    this.dispatchEvent(selectEv);

                } else {
                    let selectEv = new Event("pane-close", { bubbles: true, cancelable: false });
                    this.dispatchEvent(selectEv);
                }

            });
        toggleArea.setAttribute('data-open', ClosablePane.EnumDefaultOpen.open);
        if (this.defaultOpen == ClosablePane.EnumDefaultOpen.open) {
            toggleChangeDraw(0);
        }
        toggleChangeDraw(0);


    }

}
customElements.define( 'closable-pane', ClosablePane );
