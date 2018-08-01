import { XtallatX } from 'xtal-latx/xtal-latx.js';
const href = 'href';
const scale = 'scale';
const template = document.createElement('template');
template.innerHTML = `
    <style>
      :host {
        display: block;
    </style>
    <div id='target'></div>
`;
export class PreRenderTron extends XtallatX(HTMLElement) {
    constructor() {
        super();
        this._connected = false;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._target = this.shadowRoot.querySelector('#target');
    }
    static get is() { return 'pre-render-tron'; }
    static get observedAttributes() {
        return super.observedAttributes.concat([href, scale]);
    }
    get href() {
        return this._href;
    }
    set href(val) {
        this.setAttribute(href, val);
    }
    get scale() {
        return this._scale;
    }
    set scale(val) {
        this.setAttribute(scale, val);
    }
    connectedCallback() {
        this.addEventListener('click', this.handleClick);
        this._upgradeProperties(['disabled', href, scale]);
        this._connected = true;
        this.onPropsChange();
    }
    handleClick(e) {
        window.open(this._href);
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        switch (name) {
            case href:
            case scale:
                this['_' + name] = newVal;
                break;
        }
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._upgradeProperties || this._disabled || !this._href)
            return;
        if (this._href !== this._previousHref) {
            fetch('https://cors-anywhere.herokuapp.com/https://render-tron.appspot.com/render/' + this._href, { credentials: 'same-origin' }).then(resp => {
                resp.text().then(content => {
                    this._target.innerHTML = content;
                });
            });
        }
        if (this._scale) {
            const style = this._target.style;
            style.transform = `scale(${this._scale}`;
            style.transformOrigin = '0% 0%';
        }
    }
}
customElements.define(PreRenderTron.is, PreRenderTron);
//# sourceMappingURL=pre-render-tron.js.map