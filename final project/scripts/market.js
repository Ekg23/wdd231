document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.getElementById('items-container');
    const vendorsList = document.getElementById('vendors-list');    
    const hamButton = document.getElementById('ham-btn');
    const navMenu = document.getElementById('nav-menu');
    
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

    // Hamburger menu toggle
    hamButton.addEventListener('click', () => {
      hamButton.classList.toggle('show');
      navMenu.classList.toggle('show');
    });
      

    const API_KEY = "pub_0f6253bbefb540ceaa6dad1cb7c1bbe5";
    const url = `https://newsdata.io/api/1/news?apikey=pub_0f6253bbefb540ceaa6dad1cb7c1bbe5&q=agriculture,farming&language=en`;

    async function fetchNews() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayNews(data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }

    }

    function displayNews(data) {
        const newsContainer = document.querySelector('.news');
        if (!newsContainer) return;
        data.results.slice(0, 3).forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('news-article');
            articleDiv.innerHTML = `
                <h3><a href="${article.link}" target="_blank" rel="noopener">${article.title}</a></h3>
                <p>${article.description || ''}</p>
            `;
            newsContainer.appendChild(articleDiv);
        });
    }

    fetchNews();
    
    
    const seasonalItems = [
        {
            name: "Fresh Strawberries",
            img: "images/strawberry.webp",
            description: "Sweet and juicy, picked this morning."
        },
        {
            name: "Organic Lettuce",
            img: "images/lettuce.webp",
            description: "Crisp and perfect for salads."
        },
        {
            name: "Honey Jars",
            img: "images/honey.webp",
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
        setupModal(data);
            
    }   

    function displayVendors(vendors) {
        vendors.forEach(vendor => {
            const card = document.createElement('div');
            card.classList.add('vendor-card');

            card.innerHTML = `
                <h3>${vendor.name}</h3>
                <img src="${vendor.image}" alt="${vendor.name}" loading="lazy" width="300" height="250">
                <p><strong>Product:</strong> ${vendor.type}</p>
                <button class="button open-button" data-id="${vendor.id}">View Details</button>
            `;

            vendorsList.appendChild(card);
        });
        
    }

    fetchVendors();

    // Modal functionality

    // Modal logic AFTER vendors and vendor cards exist
    function setupModal(vendors) {
        const modal = document.getElementById('vendor-modal');
        const closeModal = document.querySelector("#close-button");
        const modalContent = document.getElementById('modal-content');
        const openButtons = document.querySelectorAll(".open-button");

        if (!modal || !closeModal || !modalContent) return;

        openButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const vendorId = parseInt(btn.dataset.id);
                const vendor = vendors.find(v => v.id === vendorId);

                if (!vendor) return;

                modalContent.innerHTML = `
                    <img src="${vendor.image}" alt="${vendor.name}">
                    <h2>${vendor.name}</h2>
                    <p><strong>Type:</strong> ${vendor.type}</p>
                    <p><strong>Description:</strong> ${vendor.description}</p>
                    <p><strong>Phone:</strong> ${vendor.phone}</p>
                    <p><strong>Hours:</strong> ${vendor.hours}</p>
                `;

                modal.showModal();
            });
        });

        closeModal.addEventListener("click", () => modal.close());
    }


    //form validation
    const form = document.querySelector('.contact-form');
    const params = new URLSearchParams(window.location.search);
    document.querySelector('#result').innerHTML = `
    Thank you, ${params.get('name')}, for reaching out to us.
    We have received your message and will get back to you at ${params.get('email')} soon.
    `


});

