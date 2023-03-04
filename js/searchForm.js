class FormElement {
    constructor(tag, className, className2, selector, text = "") {
        this.tag = tag;
        this.className = className;
        this.className2 = className2;
        this.selector = selector;
        this.text = text;
        this.elem = this.createElement(tag);
        this.addClass(className, className2)
        this.write(text)
        this.appendTo(selector)
    }
    createElement(tag) {
        const elem = document.createElement(tag);
        return elem;
    }

    addClass(...classNames) {
        this.elem.classList.add(...classNames);
    }

    write(text) {
        this.elem.innerHTML = text;
    }

    appendTo(selector) {
        selector.append(this.elem);
    }
}

class SearchForm {
    constructor(container) {
        this.container = container
        const newFormElementInput = new FormElement("input", "searchInputBox", "form-control", container)
        const newFormElementBtn = new FormElement("button", "btn", "btn-outline-secondary", container, "Search")
    }
}

const form = new SearchForm(document.querySelector(".form"));