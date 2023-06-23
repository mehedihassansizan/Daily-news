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
            <ul onclick="catagoriesItems('${element.category_id}','${element.category_name}'); trogolFuntion('true');" class="navbar nav nav-underline catagories rounded fw-bold d-flex justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link news" href="#">${element.category_name}</a>
                    </li>
                  </ul>
            </div>
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
            // console.log(element);
            const showDiv = document.createElement('div')
            showDiv.className = 'card mb-3'
            // showDiv.classList.add()
            showDiv.innerHTML =`
            <div class="row g-0">
                <div class="col-md-3 d-flex p-2">
                    <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8" style="margin-left: 40px;">
                    <div class="card-body mt-5 ">
                            <h2 class="card-title fw-bold">${element.title ? element.title: 'NO TITLE FOUND'} </h2>
                            <p class="card-text ">${element.details.slice(0, 200)}...</p>
                    </div>
                    <div class="d-inline-flex pt-5">
                        <div class=" d-flex align-items-center">
                            <a class="navbar-brand p-3" href="#"><img src="${element.author ? element.author.img: 'NO TITLE FOUND'}" alt="Bootstrap" width="40" height="40"></a>
                            <h6 class="fw-bold mt-2">${element.author ? element.author.name: 'NO TITLE FOUND'} <br> <span class="fw-normal">${element.author ? element.author. published_date: 'NO TITLE FOUND'}</span></h6>
                        </div>   
                    </div>
                    <div class="d-inline-flex px-5">
                        <div class="">
                            <i class="fa-solid fa-eye">${element.total_view ? element.total_view: 'NO TITLE FOUND'}</i>
                        </div>   
                    </div>
                    <div class="d-inline-flex px-5">
                        <div class="">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>   
                    </div>
                    <div class="d-inline-flex justify-content-end navbar nav nav-underline" style="margin-left: 120px;">
                        <div  class="nav-item">
                            <button onclick="newsDetails('${element._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="nav-link"><i class="fa-solid fa-arrow-right fa-2xl" style="color: #1266f8;"></i></button>
                        </div>   
                    </div>
                </div>
            </div>
                    
            ` ;
            showNews.appendChild(showDiv)
            trogolFuntion(false)
    });
    } 
    else {
        showNewsSection.classList.add('d-none')
    }
}

const newsDetails = (id) => {
    const detailsUrl = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(detailsUrl)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
    .catch(error => console.log(error))
}
const displayDetails = data => {
    // console.log(data);
    const dataLength = data.length;
    data.forEach(element => {
        console.log(element);
        const detailstittle = document.getElementById('staticBackdropLabel')
        detailstittle.innerText =`${element.title}`
        const detailsBody = document.getElementById('details-body')
        detailsBody.innerHTML=`
            <p>${element.details}</p>
        `
    });
}

const trogolFuntion = (data) => {
    const spinner = document.getElementById('spinner')
    if(data){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}

loadCatagories();