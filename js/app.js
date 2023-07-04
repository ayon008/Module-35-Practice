document.getElementById('button-addon2').addEventListener('click', function () {
    spinner(true);
    const searchText = document.getElementById('search-field').value;
    loadData(searchText);
    document.getElementById('search-field').value = '';
})
const loadData = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, false);
    document.getElementById('more').addEventListener('click', function () {
        displayData(data.data, true);
        document.getElementById('btn-div').classList.add('d-none');
        document.getElementById('btn-div-less').classList.remove('d-none');
    })
    document.getElementById('less').addEventListener('click', function () {
        displayData(data.data, false);
        document.getElementById('btn-div').classList.remove('d-none');
        document.getElementById('btn-div-less').classList.add('d-none');
    })
}
const displayData = (phones, isTrue) => {
    if (isTrue === false) {
        phones = phones.slice(0, 12);
    }
    if (phones.length === 0) {
        const warning = document.getElementById('warning');
        warning.classList.remove('d-none');
        document.getElementById('btn-div').classList.add('d-none');
    }
    else {
        warning.classList.add('d-none');
        document.getElementById('btn-div').classList.remove('d-none');
    }
    spinner(false);
    const parentContainer = document.getElementById('container');
    parentContainer.innerHTML = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
            </div>
            <button onclick="loadDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                See Details
            </button>
        </div>
        `
        parentContainer.appendChild(div);
    })

}

const loadDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetail(data.data);
}
function displayDetail(phoneDetails) {
    console.log(phoneDetails);
    const title = document.getElementById('exampleModalLabel');
    title.innerText = phoneDetails.name;
    const body = document.getElementById('body');
    const allSensor = document.getElementById('sensor');
    const sensors = phoneDetails.mainFeatures.sensors;
    sensors.forEach(sensor => {
        const p = document.createElement('p');
        p.innerText = sensor;
        allSensor.appendChild(p);
    })
    body.innerHTML = `
    <p>storage : ${phoneDetails.mainFeatures.storage}</p>
    <p>display size : ${phoneDetails.mainFeatures.displaySize}</p>
    <p>memory : ${phoneDetails.mainFeatures.memory}</p>
    <p>chipset : ${phoneDetails.mainFeatures.chipSet}</p>
    <p>${phoneDetails.releaseDate}</p>
    `

}


const spinner = isLoading => {
    const spinning = document.getElementById('spinner');
    if (isLoading === true) {
        spinning.classList.remove('d-none');
    }
    else {
        spinning.classList.add('d-none');
    }
    document.getElementById('search-field').addEventListener('keypress', function (e) {
        const searchText = document.getElementById('search-field').value;
        if (e.key === 'Enter') {
            loadData(searchText);
        }
    })
}
spinner(true);

loadData('apple');