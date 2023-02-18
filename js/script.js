
const userInput = document.querySelector("#exampleDataList");
const searchBtn = document.querySelector("#button-addon2");
const searchBox = document.querySelector(".searchInputBox")
const list = document.querySelector(".resultList");
const loadingSpinner = document.querySelector(".loadingSpinner");
const marqueeDiv = document.querySelector(".marqueeTextContainer");
const marqueeLoading = document.querySelector(".loadingMarquee");
let image;

searchBtn.addEventListener('click', generateSearchList)

function generateSearchList() {
    list.innerHTML = "";
    const query = userInput.value;
    if (!query) {
        return;
    }
    enableSpinner(loadingSpinner)
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {
                const companyName = data[i].name;
                const companySymbol = data[i].symbol;
                // Fetch the company profile information
                fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`)
                    .then(response => response.json())
                    .then(companyProfile => {
                        const image = companyProfile.profile.image;
                        const changePercent = companyProfile.profile.changes;
                        li = document.createElement("li")
                        li.innerHTML = `<div><img src="${image}" alt="${companySymbol}"><a href= "./company.html?symbol=${companySymbol}"><b>${companyName}(${companySymbol})</b></a></div><div>${changePercent}%</div>`;
                        li.classList.add("list-group-item", "list-group-item-action", "d-flex", "justify-content-between")
                        list.appendChild(li)
                    });
            }
            disableSpinner(loadingSpinner)
        });

}

function enableSpinner(element) {
    element.classList.remove("d-none")
}
function disableSpinner(element) {
    element.classList.add("d-none")
}

function getMarqueeInfo() {
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 50; i++) {
                const companyMarqueeSymbol = data[i].symbol;
                const companyMarqueePrice = data[i].price;
                div = document.createElement("div")
                div.innerHTML = `<b>${companyMarqueeSymbol}</b> <span>${companyMarqueePrice}</span>`;
                div.classList.add("marqueeItem", "d-flex",)
                marqueeDiv.appendChild(div)
            }
            disableSpinner(marqueeLoading)
        });
}



