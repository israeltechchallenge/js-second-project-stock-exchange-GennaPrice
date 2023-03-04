
const websiteTitle = document.querySelector(".card-title")
const websiteDescription = document.querySelector(".card-text")
const websiteLink = document.querySelector(".companyLink")
const websiteImage = document.querySelector(".card-img-left")
const stockPrice = document.querySelector(".stockPrice")
const stockPriceChange = document.querySelector(".stockPriceChange")
const ctx = document.getElementById('myChart');
const loadingSpinner2 = document.querySelector(".loadingSpinner");

const companySymbol = new URLSearchParams(window.location.search).get("symbol");

function generatePage() {
    enableSpinner(loadingSpinner2)
    setTimeout(() => {
        getCompanyProfile()
        getStockHistory();
    }, 500);
}

function getCompanyProfile() {
    fetch(`${baseURL}company/profile/${companySymbol}`).then(response => response.json())
        .then(data => {

            let companyImage = data.profile.image;
            websiteImage.src = companyImage;
            let companyName = data.profile.companyName;
            websiteTitle.innerHTML = companyName
            let companyDescription = data.profile.description
            websiteDescription.innerHTML = companyDescription
            let companyLink = data.profile.website
            websiteLink.href = companyLink;
            websiteLink.classList.remove("d-none")
            websiteLink.innerHTML = "See our Website"
            let companyPrice = data.profile.price;
            let companyCurrency = data.profile.currency
            stockPrice.innerHTML = `Stock Price: ${companyPrice} ${companyCurrency}`;
            let companyPriceChange = data.profile.changes
            stockPriceChange.innerHTML = `(${companyPriceChange}%)`;

            if (companyPriceChange > 1) {
                stockPriceChange.style.color = "green"
            } else {
                stockPriceChange.style.color = "red"
            }
            disableSpinner(loadingSpinner2)
        });
}

function getStockHistory() {
    fetch(`${baseURL}historical-price-full/${companySymbol}?serietype=line`).then(response => response.json())
        .then(data => {
            let length = 30
            let dateArray = []
            let closeArray = []
            for (let i = 0; i < length; i++) {
                dateArray.push(data.historical[i].date)
                closeArray.push(data.historical[i].close)
            }
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dateArray,
                    datasets: [{
                        label: 'History of Stock',
                        data: closeArray,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });

        });
}

window.onload = generatePage;