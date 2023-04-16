export class SimpleSearchElement extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        const searchInput = document.createElement('INPUT');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search...');
        searchInput.classList.add('simple-search-input');
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        shadow.appendChild(style);
        shadow.appendChild(searchInput);
        
        // const searchInput = document.getElementById('search-template');
        // shadow.appendChild(searchInput.content.cloneNode(true));
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

    connectedCallback() {
        console.log('SimpleSearchElement added to page.');
        this.render();
        this.updateStyle(this);
        // if (!this.rendered) {
        //     this.render();
        //     this.rendered = true;
        //   }
    }

    disconnectedCallback() {
        console.log('SimpleSearchElement removed from the page.');
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    adoptedCallback() {

    }
}
