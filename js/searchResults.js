const userInput = document.querySelector(".searchInputBox");
const searchBtn = document.querySelector(".btn");
const list = document.querySelector(".resultList");
const loadingSpinner = document.querySelector(".loadingSpinner");

class ResultListItem {
    constructor(tag) {
        this.tag = tag
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

    write(text, query) {
        const highlightedText = text.replace(new RegExp(query, "gi"), match => `<mark>${match}</mark>`);
        this.elem.innerHTML = highlightedText;
    }

    addClass(...classNames) {
        this.elem.classList.add(...classNames);
    }
}

class SearchResult {
    constructor(selector) {
        this.wrapper = selector;
        this.getSearchList();
    }

    getSearchList() {
        list.innerHTML = "";
        const query = userInput.value;
        if (!query) {
            return;
        }
        enableSpinner(loadingSpinner)
        fetch(`${baseURL}search?query=${query}&limit=10&exchange=NASDAQ`)
            .then(response => response.json())
            .then(data => {

                for (let i = 0; i < data.length; i++) {
                    const companyName = data[i].name;
                    const companySymbol = data[i].symbol;
                    // Fetch the company profile information
                    fetch(`${baseURL}company/profile/${companySymbol}`)
                        .then(response => response.json())
                        .then(companyProfile => {
                            const image = companyProfile.profile.image;
                            const changePercent = companyProfile.profile.changes;
                            const itemText = `<div><img src="${image}"><a href= "./company.html?symbol=${companySymbol}"><b>${companyName}(${companySymbol})</b></a></div><div>${changePercent}%</div>`
                            //create result list items
                            const listElement = new ResultListItem("li")
                            listElement.appendTo(".resultList")
                            listElement.write(itemText, query);
                            listElement.addClass("list-group-item", "list-group-item-action", "d-flex", "justify-content-between");
                        });
                }
                disableSpinner(loadingSpinner)
            });
    }
}

const result = new SearchResult(document.querySelector(".resultList"));
searchBtn.addEventListener('click', result.getSearchList)


