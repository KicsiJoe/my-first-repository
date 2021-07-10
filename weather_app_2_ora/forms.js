import { addCard } from "./cards.js";
import { remove } from "./remove.js";
import { loadData } from "./weather.js";

export const initForm = () => {
    const datePicker = document.getElementById('date-input');
    const form = document.getElementById('form');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById("submit")
    const cardsCointainer = document.getElementById('cards-container');
    datePicker.max = `${year}-${month < 10 ? `0${month}` : month }-${day < 10 ? `0${day}` : day }`;
    
    
    


    form.addEventListener('submit',async e => {
         

        const city = document.getElementById('city-input').value;
        const date = document.getElementById('date-input').value;
        console.log(city,date);
        cardsCointainer.insertAdjacentHTML('afterbegin',"<div class='loader' id='loading-indicator' ></div>");
        //loading start
        
        //amíg tölt, addig ne lehessen a gombot nyomogatni újabb infóért..:
        submitButton.disabled = true;
        e.preventDefault();
        
        try {
            const weatherData=  await loadData(city, date)
            addCard(city, date, weatherData)
            //ezt tettem bele:
            remove();

            /* console.log(removeIcons); */
            form.reset()
        } catch  {
            errorMessage.style.display = 'block';
            setTimeout(()=> errorMessage.style.display = "none", 2000)
        }
        
        submitButton.disabled = false;
        cardsCointainer.removeChild(document.getElementById('loading-indicator'))
        
        //loading end
        
})
   
}