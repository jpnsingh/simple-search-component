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
        this.dispatchCustomSearchEvent(shadowRoot.querySelector('.simple-search-input'));
    }

    dispatchCustomSearchEvent(searchElem) {
        searchElem.addEventListener('change', event => {
            searchElem.dispatchEvent(new CustomEvent('custom-search', {
                bubbles: true,
                composed: true,
                detail: {searchTerm: searchElem.value, event}
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
