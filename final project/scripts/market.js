document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.getElementById('items-container');
    const vendorsList = document.getElementById('vendors-list');    
    const hamButton = document.getElementById('ham-btn');
    const navMenu = document.getElementById('nav-menu');
    

    // Hamburger menu toggle
    hamButton.addEventListener('click', () => {
      hamButton.classList.toggle('show');
      navMenu.classList.toggle('show');
    });
    
    
    
    
    const seasonalItems = [
        {
            name: "Fresh Strawberries",
            img: "images/strawberries.jpg",
            description: "Sweet and juicy, picked this morning."
        },
        {
            name: "Organic Lettuce",
            img: "images/lettuce.jpg",
            description: "Crisp and perfect for salads."
        },
        {
            name: "Honey Jars",
            img: "images/honey.jpg",
            description: "Raw, unfiltered, and locally produced."
        }
    ];

    if (itemsContainer){
        seasonalItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            itemsContainer.appendChild(itemDiv);
        });
    }


    async function fetchVendors() {
        const response = await fetch('data/vendors.json');
        const data = await response.json();
        displayVendors(data);
            
    }   

    function displayVendors(vendors) {
        vendors.forEach(vendor => {
            const card = document.createElement('div');
            card.classList.add('vendor-card');

            card.innerHTML = `
                <h3>${vendor.name}</h3>
                <img src="${vendor.image}" alt="${vendor.name}" loading="lazy" width="300" height="250">
                <p><strong>Product:</strong> ${vendor.type}</p>
                <p><strong>Phone:</strong> ${vendor.phone}</p>
                <p><strong>Hours:</strong> ${vendor.hours}</p>
            `;

            vendorsList.appendChild(card);
        });
    }

    fetchVendors();

});

