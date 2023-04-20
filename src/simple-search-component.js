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
        // const template = document.createElement('template');
        // template.innerHTML = templateHtml;
        const shadowRoot = this.attachShadow({ mode: "open" });
        // shadowRoot.appendChild(template.content.cloneNode(true));
        shadowRoot.innerHTML = templateHtml;
    }

    updateStyle(elem) {
        const shadow = elem.shadowRoot;
        shadow.querySelector("style").textContent = `
            input {
                box-sizing: border-box;
                width: 100%;
                padding: 6px;
            }
        `;
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

    createSearchInput() {
        const searchInput = document.createElement('INPUT');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search...');
        searchInput.classList.add('simple-search-input');

        return searchInput;
    }
}

customElements.define('simple-search-component', SimpleSearchComponent);
