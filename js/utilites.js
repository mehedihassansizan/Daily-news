const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagories(data.data.news_category))
    .catch(error => console.log(error))
}

const displayCatagories = (data) => {
    // console.log(data);
    const catagoriesDiv = document.getElementById('catagories');
    data.forEach(element => {
        // console.log(element);
        const newDiv = document.createElement('div');
        newDiv.classList.add('col')
        newDiv.innerHTML = `
            <h6 onclick="catagoriesItems('${element.category_id}','${element.category_name}')" class="catagories rounded fw-bold">${element.category_name}</h6>
        `;
        catagoriesDiv.appendChild(newDiv)
    });
}

const catagoriesItems = (id, name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => howManyItems(data.data, name))
    .catch(error => console.log(error))
}

const howManyItems = (items, name) => {
    // console.log(items);
    const catagoriesLength = items.length;
    // console.log(catagoriesLength);
    const catagoriesLengthDiv = document.getElementById('news-items')
    catagoriesLengthDiv.innerHTML =`
    <h6 class="pt-2 fw-bold"><span>${catagoriesLength}</span> items found for category <span>${name}</span></h6>
    `

    // show news !
    const showNewsSection = document.getElementById('show-news-section')
    const showNews = document.getElementById('show-news')
    showNews.innerHTML ='';
    if (catagoriesLength !== 0) {
        showNewsSection.classList.remove('d-none')
        items.forEach(element => {
            console.log(element);
            const showDiv = document.createElement('div')
            showDiv.className = 'card mb-3 gap-4'
            // showDiv.classList.add()
            showDiv.innerHTML =`
            <div class="row g-0">
                <div class="col-md-4 p-4">
                    <img src="${element.thumbnail_url}"  class=" img-fluid rounded-start" alt="...">
                </div>
            <div class="col-md-8 border">
                <div class="card-body mx-5 text-left">
                        <h2 class="card-title fw-bold">${element.title ? element.title: 'NO TITLE FOUND'} </h2>
                        <p class="card-text ">${element.details.slice(0, 200)}...</p>
                    </div>
                </div>
            </div>
            ` ;
            showNews.appendChild(showDiv)

    });
    } 
    else {
        showNewsSection.classList.add('d-none')
    }
}
loadCatagories();