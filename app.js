const searchButton = document.querySelector('#search-show');
const row = document.querySelector('.show-row')
searchButton.addEventListener('click', async function (e) {

    const input = document.querySelector('.search-show');
    const searchTerm = input.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
    addShows(res.data);
    input.value = '';
})
document.addEventListener('keypress', async function (event) {
    let keyPressed = event.key;
    if (keyPressed === "Enter") {
        const input = document.querySelector('.search-show');
        const searchTerm = input.value;
        const config = { params: { q: searchTerm } }
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
        addShows(res.data);
        input.value = '';
    }
})



function addShows(results) {
    let html = '';
    if (results) {
        for (result of results) {
            if (result.show.image.medium) {
                html +=
                    `<div class="col-sm-6 col-md-4 col-lg-3 result">
                        <div class="card" >
                            <img src="${result.show.image.medium}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${result.show.name}</h5>
                                <p class="card-text">
                                    <span class=tag>Type:</span > ${result.show.type}<br>
                                    <span class=tag>Ratings:</span > ${result.show.rating.average}<br>
                                </p>
                                <a href="${result.show.officialSite}" class="btn btn-outline-light">Official Site</a>
                            </div>
                        </div>
                    </div>`
            }
        }
    } else {
        html += `<h2 class="text-primary">No Results</h2>`;
    }
    row.innerHTML = html;
}