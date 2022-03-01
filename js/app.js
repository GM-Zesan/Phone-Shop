const allData = () =>{
    const searchText = document.getElementById('search-field').value;
    if (searchText.length > 0) {
        //remove validation text
        document.getElementById('validation').classList.add('d-none');
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayData(data.data))
        document.getElementById('search-field').value = '';
        document.getElementById('not-found').innerText = '';
    }else{
        document.getElementById('validation').classList.remove('d-none');
        document.getElementById('load-all-data').textContent = '';
    }
}

const displayData = phones =>{
    const phoneContainer = document.getElementById('load-all-data');
    phoneContainer.textContent = '';
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
    if (phones.length > 0) {
        const myPhone = phones.slice(0,20)
        for (const phone of myPhone) {
            const div = document.createElement('div')
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 text-center w-75 mx-auto">
                    <img src="${phone.image}" class="mx-auto d-block card-img-top img-fluid w-50" alt="...">
                    <div class="card-body">
                        <h5 class="card-title"> Brand : ${phone.brand ? phone.brand:'Not Found'}</h5>
                        <h6 class="card-title"> Phone Name : ${phone.phone_name ? phone.phone_name:'Not Found'}</h6>
                    </div>
                    <button onclick="details('${phone.slug}')" class="btn btn-primary">Details</button>
                </div>
            `;
            phoneContainer.appendChild(div);
        }
    } else {
        //data not found
        document.getElementById('not-found').innerText = 'No Result Found';
    }
}

const details = (slug) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then(res => res.json())
    .then(data => viewDetails(data.data))
}

function sen(detk){
    for(const sensor of detk){
        console.log(sensor);
        return sensor;
    }
}
const viewDetails = details =>{
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
        div.classList.add('row','row-cols-1', 'row-cols-md-3');
        div.innerHTML = `
            <div class="col col-md-3">
                <img src="${details.image}" alt="">
                <h6>Brand : ${details.brand}</h6>
                <h4>${details.name}</h4>
                <h6>Release-Date : ${details.releaseDate ? details.releaseDate:'No release date here'}</h6>
            </div>
            <div class="col col-md-5">
                <h5>Main Features</h5>
                <p><span>Storage :</span> ${details.mainFeatures.storage} </p>
                <p><span>Storage :</span> ${details.slug} </p>
                <p><span>Ram :</span> ${details.mainFeatures.memory} </p>
                <p><span>Display :</span> ${details.mainFeatures.displaySize} </p>
                <p><span>Chip-Set :</span> ${details.mainFeatures.chipSet} </p>
                <p><span>Sensor :</span> ${details.mainFeatures.sensors} </p>
            </div>
            <div class="col col-md-4">
                <h5>Others</h5>
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