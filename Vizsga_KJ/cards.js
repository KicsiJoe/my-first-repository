export const addCard = (country, terulet_1, adatok_1, terulet_2, adatok_2) => {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    adatok_1 = numberWithCommas(adatok_1);
    adatok_2 = numberWithCommas(adatok_2);
    const container = document.getElementById('container');
    const chartcontainer = document.getElementById('chartContainer');
 
    //ezt hasznalja:
    chartcontainer.insertAdjacentHTML('afterend', `
        <degulion-card title="" uj="">
        <h1 class="labelCountry" style="text-transform: capitalize;">${country}</h1>
        <div class="card-content">
            <div class="ter_1 ${terulet_1}">${terulet_1}: </div>
            <span class="ter_1">${adatok_1}</span>
            <div class="ter_2 ${terulet_2}">${terulet_2}: </div>
            <span class="ter_2">${adatok_2}</span>
           
            <button type="button" class="torles" >X</button>
        </div>
        </degulion-card>
    `)

   
}