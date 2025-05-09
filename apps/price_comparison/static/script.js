
document.addEventListener('DOMContentLoaded', () => {

    window.onresize = (e) => {
        addWordTruncation();
    };

    addWordTruncation();

    console.log(searchResultsCollections)

    function addWordTruncation() {
        const elements = document.getElementsByClassName("prod-name");
        for (const element of elements) {
            const currVal = element.dataset.value;
            element.innerHTML = truncateWords(currVal, 8);
        };
    }


    function compareByPrice(prod1, prod2) {
        return (parseFloat(prod1.price) < parseFloat(prod2.price) ? -1 : 1);
    }

    function compareByRating(prod1, prod2) {
        return (parseFloat(prod1.rating) < parseFloat(prod2.rating) ? -1 : 1);
    }

    function sortByPrice() {
        return searchResultsCollections.sort(compareByPrice)
    }

    function sortByRating() {
        return searchResultsCollections.sort(compareByRating)
    }

    function updateTableContent(searchResultsCollections) {
        const t = document.getElementById("search-table-body");
        const rows = t.rows;

        for (let i = 1; i < rows.length; i++) {
            const product = searchResultsCollections[i - 1];
            rows[i].children[0].textContent = truncateWords(product.name, 8);
            rows[i].children[1].textContent = parseFloatCustom(product.price);
            rows[i].children[2].textContent = parseFloatCustom(product.rating);
            rows[i].children[3].textContent = product.platform;
            rows[i].children[4].children[0].href = product.product_url;
        }
    }

    function isPriceSorted(prodArray) {

        for (let i = 1; i < prodArray.length; i++) {
            if (prodArray[i].price < prodArray[i - 1].price) return false;
        }
        return true;
    }

    function isRatingSorted(prodArray) {

        for (let i = 1; i < prodArray.length; i++) {
            if (prodArray[i].rating < prodArray[i - 1].rating) return false;
        }
        return true;
    }

    document.getElementById("sort-price").addEventListener('click', () => {

        if (isPriceSorted(searchResultsCollections)) {
            updateTableContent(searchResultsCollections.reverse());
        } else {
            searchResultsCollections = sortByPrice();
            updateTableContent(searchResultsCollections);
        }

    });

    document.getElementById("sort-rating").addEventListener('click', () => {

        if (isRatingSorted(searchResultsCollections)) {
            updateTableContent(searchResultsCollections.reverse());
        } else {
            searchResultsCollections = sortByRating();
            console.log(searchResultsCollections);
            updateTableContent(searchResultsCollections);
        }

    });
})       