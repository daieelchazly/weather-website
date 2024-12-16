const apiKey = "e02d36ba5d8c4d47abc164237241612"; 

const fetchWeather = async () => {
    const city = document.getElementById("cityInput").value;
    const errorElement = document.getElementById("error");
    const weatherCards = document.getElementById("weatherCards");

    if (!city) {
        errorElement.textContent = "Please enter a city name.";
        return;
    }

    errorElement.textContent = "";
    weatherCards.innerHTML = "";

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data.forecast.forecastday);
        } else {
            throw new Error("City not found or API error.");
        }
    } catch (error) {
        errorElement.textContent = error.message;
    }
};

const displayWeather = (forecastDays) => {
    const weatherCards = document.getElementById("weatherCards");
    weatherCards.innerHTML = forecastDays.map(day => {
        const dayName = new Date(day.date).toLocaleDateString("en-US", { weekday: "long" });
        return `
            <div class="col-md-4">
                <div class="card card-custom text-center p-3">
                    <h5>${dayName}</h5>
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" class="img-fluid mx-auto mb-3" style="width: 70px;" />
                    <p>${day.day.condition.text}</p>
                    <h3 class="text-white">${day.day.avgtemp_c}&deg;C</h3>
                    <p>Max: ${day.day.maxtemp_c}&deg;C | Min: ${day.day.mintemp_c}&deg;C</p>
                </div>
            </div>`;}).join('');
};
