class Cht010FilterInput extends HTMLElement {


    connectedCallback() {
    }

    constructor() {
        super();
    }

    drawBody() {
        return `
        <input name="${this.name}" class="cht010FilterInput_input" type="text" />
        <div class="settingForm_separator" />        
        <template class="nutral">
          <div class="verAlignMid">
            <span class="verAlignMid hp18 fs_10 fw_bold mr5">ab</span>
            ${document.msglist_cht010['cmn.keyword']}
          </div>
          <div class="verAlignMid">
            <span class="verAlignMid hp18 fs_10 fw_bold mr5">
              <img />
            </span>
            ${document.msglist_cht010['cmn.form.temp']}
          </div>
          <div class="verAlignMid">
            <span class="verAlignMid hp18 fs_10 fw_bold mr5">
            </span>
            ${document.msglist_cht010['cmn.form.temp']}
          </div>
        </template>
        

        `;
    }
        


}
// 独自タグ「currency-input」に独自定義したDomElement「CurrencyInput 」を紐づけている
//  以後 document内でcurrency-inputタグを追加、編集すると
//  CurrencyInput 内の初期化イベントが追加、編集したタグに対して実行されるようになる

customElements.define( 'cht010-filterinput', Cht010FilterInput );