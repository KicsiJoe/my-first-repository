import { addCard } from "./cards.js";
import { makeChart } from "./chart.js";
import { loadData } from "./load.js";
import { remove } from "./remove.js";


export const initForm = () => {
    
    const cardsCointainer = document.getElementById('container');
    const submit = document.getElementById('submit');
    const reset = document.getElementById("reset");
   

    submit.addEventListener("click", async (e)=> {
       
        const country = document.getElementById('country').value;
        const terulet_1 = document.getElementById('terulet_1').value;
        const terulet_2 = document.getElementById('terulet_2').value;
        
        e.preventDefault();

        
        const chartLathatoE = document.getElementById("chartContainer");
        
        chartLathatoE.style.display = "none";
        if (country===""  || terulet_1===""  || terulet_2 ==="" ){
           return alert("Töltsd ki az összes mezőt!")

        }
        cardsCointainer.insertAdjacentHTML('afterbegin',"<div class='loader' id='loading-indicator' ></div>");

      //amíg tölt, addig ne lehessen a gombot nyomogatni újabb infóért..:
        submit.disabled = true;
      
        try {
            const adatok = await loadData(country, terulet_1, terulet_2);
           
            addCard(country,terulet_1,adatok[0], terulet_2, adatok[1]);
            remove();
            const cardsNumber = document.querySelectorAll('degulion-card').length;
            const gomb = document.querySelector('.gomb'); 
            
           

            if(cardsNumber >= 2){
                gomb.style.display = "block";
                
            } 
            reset.click();
        } catch  {
            cardsCointainer.insertAdjacentHTML('afterbegin',`<div id="error-message" class="error-message" 
            >
               Hiba történt az adatbetöltésnél!
           </div>`);
           
            setTimeout(()=> cardsCointainer.removeChild(document.getElementById('error-message')), 2000)
        }
        cardsCointainer.removeChild(document.getElementById('loading-indicator'))
        submit.disabled = false;
        
       
    })
    
    const chart = document.getElementById("chart")
    
    chart.addEventListener("click", () => {
        
        const osszesites = [];
        
        const terulet_ter_1_cim = document.querySelectorAll("div.ter_1");
        const terulet_ter_1_ertek = document.querySelectorAll("span.ter_1");
        const terulet_ter_2_cim = document.querySelectorAll("div.ter_2");
        const terulet_ter_2_ertek = document.querySelectorAll("span.ter_2");
        const terulet_osszes_1 = document.querySelectorAll(".labelCountry");
       
        
    
        //ORSZÁG:

        let labelData_cim = []; 
        terulet_osszes_1.forEach((item) => {
            let teruletCountry= item.innerText;
            labelData_cim.push(teruletCountry)
            
        } )
        osszesites.push(labelData_cim)
        
    // 1. TERULET címe   
        let labelData_1_cim = []; 
        terulet_ter_1_cim.forEach((item) => {
            let ter_1_cim= item.innerText;

            labelData_1_cim.push(ter_1_cim)
        } )
        osszesites.push(labelData_1_cim)
       
// 1. TERULET értéke 
        let labelData_1_ertek = []; 
        terulet_ter_1_ertek.forEach((item) => {
            let ter_1_ertek= parseInt((item.innerText).replace(/,/g, ''));

            labelData_1_ertek.push(ter_1_ertek)
            
        } )
        osszesites.push(labelData_1_ertek)

 // 2. TERULET címe        
        let labelData_2_cim = []; 
        terulet_ter_2_cim.forEach((item) => {
            let ter_2_cim= item.innerText;

            labelData_2_cim.push(ter_2_cim)
           
        } )
        osszesites.push(labelData_2_cim)
       
    // 2. TERULET értéke 
        let labelData_2_ertek = []; 
        terulet_ter_2_ertek.forEach((item) => {
            let ter_2_ertek= parseInt((item.innerText).replace(/,/g, ''));

            labelData_2_ertek.push(ter_2_ertek)
            
        } )
        osszesites.push(labelData_2_ertek)
     
  
        //Összehasonlítja a sorban lévő elemeket, hogy van-e egyező -> TRUE ha nincs! - úgy teszi, hogy minden elem csak egyszer szerepel az array-ban így ha az eredeti length = az új array length-el, vagyis nincs duplikáció, akkor minden elem új!

        const checkContains = (mit, hibakod, egyezoseg) => {
            let filtered = mit.filter((item,index) => mit.indexOf(item) === index)
        
            
            const hibaKod = (hibakod) => {
                if (hibakod === 1){
                  return alert("A lekérdezett adatok - első szűrési feltétel- nem egyeznek országonként, így nem lehet CHART-ot indítani!");  
                } else if (hibakod === 0){
                    return alert("Van olyan ország amely többször szerepel, így nem lehet CHART-ot indítani!");  

                } else if (hibakod === 2){
                    return alert("A lekérdezett adatok - második szűrési feltétel- nem egyeznek országonként, így nem lehet CHART-ot indítani!")
                }
            }

            if(egyezoseg === "kulonbozo"){
              if(mit.length === filtered.length){
               
                return true;
                } else {
                   hibaKod(hibakod);
                   return false;
                }
            } else { 
                if(filtered.length === 1){
                    
                   
                    return true;

                    } else {
                       hibaKod(hibakod);
                       return false;
                    }    
            }

        }
       
        const ellenorzesFull = () => {
            
            if(
            (checkContains(labelData_cim, 0, "kulonbozo") &&
            checkContains(labelData_1_cim, 1,"egyenlo" ) &&   
            checkContains(labelData_2_cim, 2, "egyenlo") ) === true ) {
              
                makeChart(osszesites)
              
            }
        }
        ellenorzesFull();

        
       
    })


}