import { XtallatX } from 'xtal-latx/xtal-latx.js';
const href = 'href';
export class PreRenderTron extends XtallatX(HTMLElement) {
    constructor() {
        super();
        this._connected = false;
        this.attachShadow({ mode: 'open' });
    }
    static get is() { return 'pre-render-tron'; }
    static get observedAttributes() {
        return super.observedAttributes.concat([href]);
    }
    get href() {
        return this._href;
    }
    connectedCallbck() {
        this._connected = true;
        this._upgradeProperties(['disabled', href]);
        this.onPropsChange();
    }
    attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        switch (name) {
            case href:
                this['_' + name] = newVal;
                break;
        }
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._upgradeProperties || this._disabled || !this._href)
            return;
        this.shadowRoot.innerHTML = '';
        fetch('https://cors-anywhere.herokuapp.com/https://render-tron.appspot.com/render/' + this._href, { credentials: 'same-origin' }).then(resp => {
            resp.text().then(content => {
                this.shadowRoot.innerHTML = content;
            });
        });
    }
}
customElements.define(PreRenderTron.is, PreRenderTron);
//# sourceMappingURL=pre-render-tron.js.map