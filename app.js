window.addEventListener("load", () => {
    // Variables
    const location = document.querySelector(".type-location");
    const submitBtn = document.querySelector(".search-location");
    const myLocation = document.querySelector(".my-location");
    const apiKey = "d282e88b20d686ff191fd8d8285a8184";
    const city = document.querySelector(".city");
    const degree = document.querySelector(".degree");
    const description = document.querySelector(".description-temperature h3");
    const img = document.querySelector(".position-image img");
    const goBackBtn = document.querySelector(".btn");
    const sunImg = document.querySelector(".sun-img")
    let lat;
    let long;


    // Functions
    const changeNames = (weather, temperature, yourLocation, icon) => {
        document.querySelector("form").classList.toggle("hide");
        document.querySelector(".show-section").classList.toggle("hide");
        document.querySelector("header").classList.toggle("hide");
        
        //Change names
        city.textContent = yourLocation;
        degree.textContent = temperature;
        description.textContent = weather;
        img.src = `img/${icon}.png`;
    }

    const otherSearch = () => {
        document.querySelector("form").classList.toggle("hide");
        document.querySelector(".show-section").classList.toggle("hide");
        document.querySelector("header").classList.toggle("hide");
        location.value = "";
    }

    const fetchFunction = (api) => {
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const weather = data.weather[0].description;
            const temperature = Math.floor((data.main.temp - 272));
            const yourLocation = data.name;
            const icon = data.weather[0].icon;

            changeNames(weather, temperature, yourLocation, icon);
        });
    }

    const currentLocationBtn = (event) => {
        event.preventDefault();
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                lat = position.coords.latitude;
                long = position.coords.longitude;

                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
            
                fetchFunction(api);
            });
        }
    }

    const showCity = (event) => {
        event.preventDefault();

        const api = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}`;

        fetchFunction(api);
    }


    //Event Listeners
    myLocation.addEventListener("click", currentLocationBtn);
    submitBtn.addEventListener("click", showCity);
    goBackBtn.addEventListener("click", otherSearch);
    
});