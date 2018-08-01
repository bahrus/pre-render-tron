import { XtallatX } from 'xtal-latx/xtal-latx.js';
const href = 'href';
const scale = 'scale';
const template = document.createElement('template');
template.innerHTML = `
    <style>
      :host {
        display: block;
      }
      a {
          pointer-events: none;
      }
    </style>
    <div id='target'></div>
`;
export class PreRenderTron extends XtallatX(HTMLElement) {
    constructor() {
        super();
        this._connected = false;
        this._fetchInProgress = false;
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
        this.attr(href, val);
    }
    get scale() {
        return this._scale;
    }
    set scale(val) {
        this.attr(scale, val);
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
    /**
     * @type {Object}
     * Error response as an object
     * ⚡ Fires event error-response-changed.
     */
    get errorResponse() {
        return this._errorResponse;
    }
    set errorResponse(val) {
        this._errorResponse = val;
        this.de('error-response', {
            value: val
        });
    }
    /**
     * @type {String}
     * Indicates the error text of the last request.
     * ⚡ Fires event error-text-changed.
     */
    get errorText() {
        return this._errorText;
    }
    set errorText(val) {
        this._errorText = val;
        const et = 'error-text';
        this.attr(et, val);
        this.de(et, {
            value: val
        });
    }
    /**
     * @type {Boolean}
     * Indicates Fetch is in progress
     * ⚡ Fires event fetch-in-progress-changed
     */
    get fetchInProgress() {
        return this._fetchInProgress;
    }
    set fetchInProgress(val) {
        this._fetchInProgress = val;
        const f = 'fetch-in-progress';
        this.attr(f, val, '');
        this.de(f, {
            value: val
        });
    }
    onPropsChange() {
        if (!this._connected || !this._href)
            return;
        if (this._href !== this._previousHref) {
            this._previousHref = this._href;
            this.fetchInProgress = true;
            if (this._errorText)
                this.errorText = '';
            if (this.errorResponse)
                this.errorResponse = null;
            fetch('https://cors-anywhere.herokuapp.com/https://render-tron.appspot.com/render/' + this._href, { credentials: 'same-origin' }).then(resp => {
                this.fetchInProgress = false;
                console.log(resp.status);
                if (resp.status !== 200) {
                    this.errorResponse = resp;
                    const respText = resp['text'];
                    if (respText)
                        respText().then(val => {
                            this.errorText = val;
                        });
                }
                else {
                    resp.text().then(content => {
                        this._html = content;
                        if (!this.disabled) {
                            this._target.innerHTML = this._html;
                            return;
                        }
                    });
                }
            }).catch(reason => {
                this.fetchInProgress = false;
            });
        }
        if (this._disabled) {
            this._target.innerHTML = '';
        }
        else if (this._html) {
            this._target.innerHTML = this._html;
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