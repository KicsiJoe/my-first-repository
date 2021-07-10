

export const addCard = (city, date, weatherData) => {
    const container = document.getElementById('cards-container');
    const weatherState = weatherData[0].weather_state_abbr;
    const minTemp = weatherData[0].min_temp;
    const maxTemp = weatherData[0].max_temp;
    
    //ezt hasznalja:
    container.insertAdjacentHTML('afterbegin', `
        <degulion-card title="" uj="">
        <h1 style="text-transform: capitalize;">${city} - ${date}</h1>
        <div class="card-content">
            <div>${Math.floor(minTemp)}°C</div>
            <div>
                <img height="200px" src="https://www.metaweather.com/static/img/weather/${weatherState}.svg">
            </div>
            <div>${Math.floor(maxTemp)}°C</div>
            <button type="button" class="torles" >Törlés</button>
        </div>
        </degulion-card>
    `)

   
}