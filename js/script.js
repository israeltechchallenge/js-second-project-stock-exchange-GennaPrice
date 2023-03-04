
const userInput = document.querySelector(".searchInputBox");
const searchBtn = document.querySelector(".btn");
const list = document.querySelector(".resultList");
const loadingSpinner = document.querySelector(".loadingSpinner");


function generateSearchList() {
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
                        itemText = `<div><img src="${image}" alt="${companySymbol}"><a href= "./company.html?symbol=${companySymbol}"><b>${companyName}(${companySymbol})</b></a></div><div>${changePercent}%</div>`

                        const listElement = new ResultListItem("li")
                        listElement.appendTo(".resultList")
                        listElement.write(itemText);
                        listElement.addClass("list-group-item", "list-group-item-action", "d-flex", "justify-content-between");
                    });
            }
            disableSpinner(loadingSpinner)
        });
}

searchBtn.addEventListener('click', generateSearchList)


