function mozgasUp(){

    /*   megnyomottGomb.forEach(gomb => {
          for (liftSzint=1; liftSzint <= gomb; liftSzint++) {
          
              liftMozgas()
          } }) */
  
     
      if (liftSzint <= maxEmelet && felmegy === true && megnyomottGomb.length !== 0 && leszallitott === false){   
      liftSzint++
      liftMozgas()
      // ha a megnyomott gomb nem nulla, akkor, hogy kozlekedjen:
           if (liftSzint === maxEmelet){
               felmegy = false
           }
       
    }  else if (megnyomottGomb.length == 0 && leszallitott === false){
          felmegy = false;    
          return liftSzint === 1;
      }
           
      else { 
      console.log("itt");
      liftSzint--
      liftMozgas()
      if (liftSzint === 1 ){
          felmegy = false
          leszallitott = true
          clearInterval(idozites)
      }
  } 
      
      console.log(liftSzint);
  }
  
  


  if (liftSzint < item.hova && felmegy === true && leszallitott === false){   
    liftSzint++
    liftMozgas_()
    // ha a megnyomott gomb nem nulla, akkor, hogy kozlekedjen:
         if (liftSzint === item.hova){
             felmegy = false
         }
     
  }  else if (leszallitott === false){
        felmegy = false;    
        return liftSzint === 1;
    }
         
    else { 
    console.log("itt");
    liftSzint--
    liftMozgas()
    if (liftSzint === 1 ){
        felmegy = false
        leszallitott = true
        clearInterval(idozites)
    }
} 

zoldVillanas = setTimeout(function() {emeletek[maxEmelet- liftSzint].classList.remove('zold')},2000)
                    
                
function beszallas(mennyien) {
    if (mennyien > 0) {
        clearInterval(idozites)
        liftSebesseg = 500 * (mennyien);

        idozites = setInterval(mozgas_, liftSebesseg)  
        emeletek[maxEmelet- liftSzint].classList.add('zold')

        let ajtoNyitas = (mennyien) * 450;

        zoldVillanas = setTimeout(function() {emeletek[maxEmelet- liftSzint].classList.remove('zold')},ajtoNyitas)
    } else {
        clearInterval(idozites)
        liftSebesseg = 500;
        idozites = setInterval(mozgas_, liftSebesseg)  
    }
    
}