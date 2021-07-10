export const loadData = async (city, date) => {
    try {
        const woeid = await getWoied(city)
        const weatherInfo = await getWeatherInfo(woeid, date)
        return weatherInfo;
    } catch (error) {
        console.error('Error loading weather data', error);
        throw error;
    }

}

const getWoied = async city => {
    const response = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`)
    if (response.status !== 200) {
        throw "Error loading WOEID"
    }
    const jsonResponse = await response.json();
    return jsonResponse[0].woeid;
}
const getWeatherInfo = async (woeid,date) => {
    const dateStrings = date.split('-');
    const response = await fetch(`https://www.metaweather.com/api//location/${woeid}/${dateStrings[0]}/${dateStrings[1]}/${dateStrings[2]}`);
    if (response.status !== 200) {
        throw "Error loading weather info"
    }
    const jsonResponse = await response.json();
    return jsonResponse;
}