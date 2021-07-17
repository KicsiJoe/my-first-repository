export const remove = () => {
    const removeIcons = document.querySelectorAll('.torles');
    const deguCard = document.querySelectorAll('degulion-card');

    

    removeIcons[0].addEventListener('click', () => {deguCard[0].remove();
        const cardsNumber = document.querySelectorAll('degulion-card').length;
        const gombi = document.querySelector('.gomb'); 
        const chartLathatoE = document.getElementById("chartContainer");
        chartLathatoE.style.display = "none";
        if(cardsNumber < 2){
            gombi.style.display = "none";
            
        } 
    });
    
}
