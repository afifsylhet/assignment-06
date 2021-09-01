// find html tag using id and variable declaration
const inputField = document.getElementById('input-field');
const button = document.getElementById('button');
const parentElement = document.getElementById('parent-element');
const parentElement2 = document.getElementById('parent-element-2');

// addEventListener Section
button.addEventListener('click', function () {
    loadData();
})

// main function for fetch
const loadData = () => {
    const searchText = inputField.value;
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(response => response.json())
        .then(data => loadDataDetails(data.docs))
    inputField.value = '';
};

const loadDataDetails = data => {
    parentElement2.textContent = '';
    parentElement.textContent = '';
    if (data.length === 0) {
        const h3 = document.createElement('h3');
        h3.classList.add('text-center');
        h3.innerText = "No Result Found";
        parentElement2.appendChild(h3);
    } else {
        const totalResults = data.length;
        const p = document.createElement('p');
        p.innerText = `About ${totalResults} search results`;
        p.classList.add('text-center');
        parentElement2.appendChild(p);
        var coverImageFinder = data;

        // foreach loop for find each elements 
        data.forEach(element => {
            // find author name
            if (element.author_name === undefined) {
                var author = 'No Author Found'
            } else {
                var author = element.author_name[0];
            };

            // find book title
            const bookTitle = element.title;

            // find book publisher
            if (element.publisher === undefined) {
                var publisher = 'No publisher Found'
            } else {
                var publisher = element.publisher[0];
            };

            // find first published year
            if (element.first_publish_year === undefined) {
                var firstPublish = 'No first publish data Found'
            } else {
                var firstPublish = element.first_publish_year;
            };

            // find cover_i
            if (element.cover_i === undefined) {
                var coverImage = '#'
            } else {
                var coverImage = element.cover_i;
            };
            const setCoverImage = `https://covers.openlibrary.org/b/id/${coverImage}-M.jpg`

            // create div for display loaded data
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
        <img height = "300px" src="${setCoverImage}" class="" alt="Sorry! the cover image of this book is not available now. Soon we will discover it. Thank you for your pitence.">
        <div class="card-body">
            <h5 class="card-title">${bookTitle}</h5>
            <p class="card-text"> <span class="fw-bold">Author</span> ${author}</p>
            <p class="card-text"> <span class="fw-bold">Publisher</span> ${publisher}</p>
            <p class="card-text"> <span class="fw-bold">First Published</span> ${firstPublish}</p>
        </div>
        </div>
        `
            parentElement.appendChild(div);
        });
    }
}



