//const hamButton = document.getElementById('ham-btn');
//const navMenu = document.getElementById('nav-menu'); 
//const gridButton = document.getElementById('grid');
//const listButton = document.getElementById('list'); 
//const directoryContainer = document.getElementById('directory-container');
//const events = document.getElementById('events');


document.addEventListener('DOMContentLoaded', () => {
  const hamButton = document.getElementById('ham-btn');
  const navMenu = document.getElementById('nav-menu'); 
  const gridButton = document.getElementById('grid');
  const listButton = document.getElementById('list'); 
  const directoryContainer = document.getElementById('directory-container');
  const events = document.getElementById('events');
  const lastModified = document.lastModified;
  const modalButtons = document.querySelectorAll("[data-modal]");


  document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

  // Hamburger menu toggle
  hamButton.addEventListener('click', () => {
      hamButton.classList.toggle('show');
      navMenu.classList.toggle('show');
  });


  if (directoryContainer) {
    directoryContainer.classList.add('grid-view');

    gridButton.addEventListener('click', () => {
        directoryContainer.classList.add('grid-view');
        directoryContainer.classList.remove('list-view');
    });

    listButton.addEventListener('click', () => {
        directoryContainer.classList.add('list-view');
        directoryContainer.classList.remove('grid-view');
    });

    memberDirectory(); // Only run when directory page exists
  }



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

  // api call for current weather
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=c43b55f2de2ad07d3ced4f619ea3a80b&units=imperial';

  async function apiFetch() {
      try {
          const response = await fetch(url);
          if (response.ok) {
              const data = await response.json();
              console.log(data);
              displayResults(data);
          } else {
              throw Error(await response.text());
          }
      } catch (error) {
          console.log(error);
      }
  }

  //api call for weather forecast
  const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&appid=c43b55f2de2ad07d3ced4f619ea3a80b&units=imperial';

  async function getForecast (){
    try {
      const response = await fetch(forecastUrl);
      if(response.ok) {
        const data = await response.json();
        displayForecast(data);
      } else {
        throw Error(await response.text())
      }
    } catch(error) {
      console.log(error);
    }
  }

  function formatTime(unixTime) {
    // Convert UNIX timestamp (seconds) to Date object
    const date = new Date(unixTime * 1000); 
    // Return hours:minutes in local time
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }


  function displayResults(data) {
    const card1 = document.createElement('div');

    // Create temp element
    const temp = document.createElement('span');
    temp.innerHTML = `${data.main.temp.toFixed(0)}°F`;

    // Icon
    const icon = document.createElement('img');
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;
    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', desc);

    // Description
    const description = document.createElement('p');
    description.textContent = desc;

    // Humidity
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    // High & Low
    const high = document.createElement('p');
    high.textContent = `High: ${data.main.temp_max.toFixed(0)}°F`;

    const low = document.createElement('p');
    low.textContent = `Low: ${data.main.temp_min.toFixed(0)}°F`;

    // Sunrise & Sunset (convert UNIX time → readable)
    const sunrise = document.createElement('p');
    sunrise.textContent = `Sunrise: ${formatTime(data.sys.sunrise)}`;

    const sunset = document.createElement('p');
    sunset.textContent = `Sunset: ${formatTime(data.sys.sunset)}`;

    // Build card1
    card1.appendChild(temp);
    card1.appendChild(icon);
    card1.appendChild(description);
    card1.appendChild(humidity);
    card1.appendChild(high);
    card1.appendChild(low);
    card1.appendChild(sunrise);
    card1.appendChild(sunset);

    // Add card1 to the page somewhere
    document.getElementById("current-weather").appendChild(card1);
  }

  function displayForecast(data) {
    /* ========== CARD 2 (3-day forecast) ========== */
    const card2 = document.createElement('div');
  

    // Filter the forecast so we take ONE reading per day at 12:00
    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    daily.forEach(day => {
      const dayCard = document.createElement("p"); // just one paragraph per day
      const options = { weekday: 'long' };
      const dayName = new Date(day.dt_txt).toLocaleDateString("en-US", options);
      const temp = day.main.temp.toFixed(0);

      dayCard.textContent = `${dayName}: ${temp}°F`; // e.g., Monday: 89°F
      card2.appendChild(dayCard);
      });

    document.getElementById("forecast").appendChild(card2);
  }



 
  apiFetch();
  getForecast();
  

  document.querySelectorAll(".open-modal").forEach(btn => {
      btn.addEventListener("click", () => {
          const dialog = btn.nextElementSibling;
          dialog.showModal();
      });
  });

  // Close the dialog when clicking the close button
  document.querySelectorAll("dialog .close").forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
          closeBtn.closest("dialog").close();
      });
  });



});


