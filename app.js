const loadCategory =()=>{
    fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    .then((res)=>res.json())
    .then((ctg)=>displayButton(ctg.data));
};
const displayButton=(data)=>{
    const btnn = document.getElementById("btn");
    
    data.forEach((singledata)=>{
    const button = document.createElement("div")
    button.classList.add("all-button")

    button.innerHTML=`
    <div>
    <button class="button-4" onclick="loadData('${singledata.category_id}')">${singledata.category }</button>
    </div>
    `
    btnn.appendChild(button);
    });
    
};

const sort_kept = document.getElementById("sort-1");
const loadData =(value)=>{
    let Data;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${value}`)
    .then((res)=> res.json())
    .then((dataa)=> {
        Data = dataa;
        if (Data.status) {
            displayData(Data.data); 
        }
        else{
            show_not()
        };
    });    
    
    sort_kept.addEventListener("click",()=>{const sort_data = sort_view(Data)
    displayData(sort_data)})

};
function show_not(){
    console.log("hudf");
    const n_show = document.getElementById("not-show")
    const all_container = document.getElementById("all-container");
    while(all_container.firstChild)
    {
        all_container.removeChild(all_container.firstChild);
    }
    const error_div = document.createElement("div");
    error_div.classList.add("e-deging");
    error_div.innerHTML = `
    <div class="sorry">
    <img class="sorry-icon" src="PHero-Tube-main/PHero-Tube-main/Icon.png" alt="">
    </div>
    <div class="oops">
    <h1  >Oops!! Sorry, There is no</h1>
    
    </div>
    <div class="oops-1">
    <h1 >content here</h1>
    </div>
    `
    n_show.appendChild(error_div);
};

const sort_view=(data)=>{
    if (data && data.data && Array.isArray(data.data)) {
        data.data = data.data.sort((a, b) => {
            const view_A = a.others && a.others.views ? parseViews(a.others.views) : 0;
            const view_B = b.others && b.others.views ? parseViews(b.others.views) : 0;
            return view_B - view_A;
        });
        return data.data;
    }
};

const parseViews = (viewsString) => {
    const multiplier = viewsString[viewsString.length - 1] === "K" ? 1000 : viewsString[viewsString.length - 1] === 'M' ? 1000000 : 1;
    return parseFloat(viewsString) * multiplier;
};


const displayData =(dataa)=>{
    const all_container = document.getElementById("all-container");
    const n_show = document.getElementById("not-show")
    while(n_show.firstChild){
        n_show.removeChild(n_show.firstChild);
    }
    while(all_container.firstChild)
    {
        all_container.removeChild(all_container.firstChild);
    }

    dataa.forEach((data) => {
        const card = document.createElement("div");
        card.classList.add('all-box');
        card.innerHTML = `
        <div class="img-pb ">
        <img class="all-box-img" src="${data.thumbnail}" alt="">
        <p class="posted-date">${time_convert(data.others.posted_date)}</p>
        </div>
        <div class="img-title d-flex ">
        <img class="icon-img" src=${data.authors[0].profile_picture} alt="">
        <p class="title">${data.title}</p>
        </div>
        <div class="name-view">
        <div class="icon">
        <p>${data.authors[0].profile_name}</p>
        <img class="verify-icon" src="${data.authors[0].verified ? 'PHero-Tube-main/PHero-Tube-main/check.png' : 'PHero-Tube-main/PHero-Tube-main/800px-HD_transparent_picture.png' }" alt="">
        </div>
        <p class="view">${data.others.views}</p>
        </div>
        `;
        all_container.appendChild(card);
    });
};
const time_convert=(times)=>{
    if (isNaN(times) || times == 0) {
        return "";
    }
    const ours = Math.floor(times/3600);
    const minutes = Math.floor((times%3600)/60);
    return `${ours} hours ${minutes} minutes ago`;
}
loadCategory()
loadData(1000)

