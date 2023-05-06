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
        this.bindEvents(shadowRoot);
    }

    bindEvents(shadowRoot) {
        shadowRoot.querySelector('.simple-search-input').setAttribute('placeholder', this.getAttribute('placeholder'));

        const searchInput = shadowRoot.querySelector('.simple-search-input');
        const clearSearch = shadowRoot.querySelector('.clear-search');

        searchInput.addEventListener('keyup', event => {
            if (searchInput.value) {
                clearSearch.classList.remove('hidden');
            } else {
                clearSearch.classList.add('hidden');
            }
        });

        searchInput.addEventListener('change', event => {
            searchInput.dispatchEvent(new CustomEvent('custom-search', {
                bubbles: true,
                composed: true,
                detail: {searchTerm: searchInput.value, event}
            }));
        });

        clearSearch.addEventListener('click', event => {
            searchInput.value = '';
            event.currentTarget.classList.add('hidden');
            clearSearch.dispatchEvent(new CustomEvent('custom-search-clear', {
                bubbles: true,
                composed: true,
                detail: {event}
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
