const allData = () =>{
    const searchText = document.getElementById('search-field').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayData(data.data))
}

const displayData = phones =>{
    const phoneContainer = document.getElementById('load-all-data');
    phoneContainer.textContent = '';
    const myPhone = phones.slice(1,20)
    for (const phone of myPhone) {
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 text-center w-75 mx-auto">
                <img src="${phone.image}" class="mx-auto d-block card-img-top img-fluid w-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title"> Brand : ${phone.brand ? phone.brand:'Not Found'}</h5>
                    <h6 class="card-title"> Phone Name : : ${phone.phone_name ? phone.phone_name:'Not Found'}</h6>
                </div>
                <button onclick="details('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
        `;
        phoneContainer.appendChild(div);
    }
}

const details = (slug) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then(res => res.json())
    .then(data => viewDetails(data.data))
}

const viewDetails = details =>{
    // for(const sensor of details.mainFeatures.sensors){
    //     console.log(sensor);
    // }
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
        div.classList.add('row','row-cols-1', 'row-cols-md-3');
        div.innerHTML = `
            <div class="col col-md-3">
                <img src="${details.image}" alt="">
                <h6>Brand : ${details.brand}</h6>
                <h6>Name : ${details.name}</h6>
                <h6>Release-Date : ${details.releaseDate ? details.releaseDate:'No release date here'}</h6>
            </div>
            <div class="col col-md-5">
                <h5>Main Features</h5>
                <p><span>Storage :</span> ${details.mainFeatures.storage} </p>
                <p><span>Ram :</span> ${details.mainFeatures.memory} </p>
                <p><span>Display :</span> ${details.mainFeatures.displaySize} </p>
                <p><span>Chip-Set :</span> ${details.mainFeatures.chipSet} </p>
                <h5>Main Features</h5>
                <p><span>Sensor :</span></p>
                
            </div>
            <div class="col col-md-4">
                <p><span>WLAN :</span> ${details.others.WLAN} </p>
                <p><span>Bluetooth :</span> ${details.others.Bluetooth} </p>
                <p><span>GPS :</span> ${details.others.GPS} </p>
                <p><span>NFC :</span> ${details.others.NFC} </p>
                <p><span>Radio :</span> ${details.others.Radio} </p>
                <p><span>USB :</span> ${details.others.USB} </p>
            </div>
        `
        detailsContainer.appendChild(div);
}