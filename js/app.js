const allData = () =>{
    const searchText = document.getElementById('search-field').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayData(data.data))
}

const displayData = phones =>{
    const phoneContainer = document.getElementById('load-all-data');
    phoneContainer.textContent = '';
    const myPhone = phones.slice(0,20)
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
    console.log(slug);
}