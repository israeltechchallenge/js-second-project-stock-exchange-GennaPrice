
const marqueeDiv = document.querySelector(".marqueeTextContainer");
//const marqueeLoading = document.querySelector(".loadingMarquee");

class MarqueeDiv {
    constructor(tag) {
        this.tag = tag;
        this.elem = this.createElement(tag);
    }
    createElement(tag) {
        const elem = document.createElement(tag);
        return elem;
    }
    appendTo(selector) {
        const wrap = document.querySelector(selector);
        wrap.append(this.elem);
    }
    write(text) {
        this.elem.innerHTML = text;
    }
    addClass(className) {
        this.elem.classList.add(className);
    }
}

class Marquee {
    constructor(element) {
        this.element = element;
        //this.renderMarqueeItems();
    }
    renderMarqueeItems() {
        fetch(`${baseURL}stock/list`)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < 50; i++) {
                    const companyMarqueeSymbol = data[i].symbol;
                    const companyMarqueePrice = data[i].price;
                    const item = `<b>${companyMarqueeSymbol}</b> <span>${companyMarqueePrice}</span>`;
                    const marqueeElement = new MarqueeDiv('div');

                    marqueeElement.write(item);
                    marqueeElement.addClass("d-flex");
                    marqueeElement.addClass("marqueeItem");
                    marqueeElement.appendTo('#marquee');
                }
            });
    }
}
//const newMarquee = new Marquee(document.getElementById('marquee'));




