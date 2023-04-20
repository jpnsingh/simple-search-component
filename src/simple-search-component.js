export class SimpleSearchComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('SimpleSearchComponent added to page.');
        fetch("simple-search-component.html")
            .then(stream => stream.text())
            .then(template => this.render(template))
            .catch((error) => console.log(error));
    }

    render(templateHtml) {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = templateHtml;
        this.bindSearchEvent(shadowRoot.querySelector('.simple-search-input'));
    }

    bindSearchEvent(searchElem) {
        document.addEventListener('custom-search-change', event => {
            console.log(`Captured custom-search-change : ${event.target}`);
            console.log(event.target.value);
        });
        searchElem.addEventListener('change', event => {
            console.log(event);
            searchElem.dispatchEvent(new CustomEvent('custom-search-change', {
                bubbles: true,
                composed: true,
                detail: "composed"
            }));
        });
    }

    disconnectedCallback() {
        console.log('SimpleSearchComponent removed from the page.');
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    adoptedCallback() {

    }
}

customElements.define('simple-search-component', SimpleSearchComponent);
