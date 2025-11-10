const hamButton = document.getElementById('ham-btn');
const navMenu = document.getElementById('nav-menu'); 
const gridButton = document.getElementById('grid');
const listButton = document.getElementById('list'); 
const directoryContainer = document.getElementById('directory-container');
const lastModified = document.lastModified;


document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

// Hamburger menu toggle
hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('show');
    navMenu.classList.toggle('show');
});



// Default to grid view
directoryContainer.classList.add('grid-view');

// Event listeners for buttons
gridButton.addEventListener('click', () => {
  directoryContainer.classList.add('grid-view');
  directoryContainer.classList.remove('list-view');
});

listButton.addEventListener('click', () => {
  directoryContainer.classList.add('list-view');
  directoryContainer.classList.remove('grid-view');
});

async function memberDirectory() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    members.forEach((member) => {
        let card = document.createElement('div');
        let name = document.createElement('h2');
        let logo = document.createElement('img');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');


        name.textContent = member.name;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        website.textContent = member.website;
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        logo.setAttribute('src',`images/${member.image}`);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '200');
        logo.setAttribute('height', '100');

        
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        directoryContainer.appendChild(card);
        
    });
}

memberDirectory();

