document.addEventListener('DOMContentLoaded', () => {
    
    let pacak = 0;
    let myVar = setInterval(myTimer ,1000);
    function myTimer() {    
    const d = new Date();
    document.getElementById("ora").innerHTML = d.toLocaleTimeString();
}
    
    const maxKapacitas = 4
    const folyosoMaxKapacitas = 8 

    function createFfN(ezt){
      let iKepzesN = document.createElement('i');
      
     iKepzesN.className = 'fa' + ezt;
     return iKepzesN
    }

    let osszesVarakozo = (document.querySelectorAll("i.fa"))
    const emeletek = document.querySelectorAll('.lift div')
    const emeletSzint = document.querySelectorAll('.emelet')


    const liftben = document.querySelectorAll('.liftben')
    const folyosok = document.querySelectorAll('.folyoso')
    let emeletekSora = []

    const szabadEmeletek = () => {
        emeletekSora= [];
      for (i=0 ; i <folyosok.length; i++ ){
            if(folyosok[i].children.length < folyosoMaxKapacitas){
                emeletekSora.push(i)
               
            } else {
                //ide is pusholnom kellett a mar meglevo emelet szintjet, ami tele lett, mert onnan tudom torolni majd!!
                emeletekSora.push(i)
            
                indexOfTeleEmelet = emeletekSora.indexOf(i)
             
                emeletekSora.splice(indexOfTeleEmelet,1)
            }
                
            }
            if (emeletekSora.length === 0){
                clearInterval(utasKell) 
            }
            return emeletekSora;
            
    }
    
    function utasRan() {
        szabadEmeletek();
    
        let folyosora = emeletekSora[Math.floor(Math.random()* emeletekSora.length)]

        let ran = Math.floor(Math.random()* 367)
        let ffiVno;

        if (ran % 2 === 0){
            ffiVno = ' fa-female'
        } else {
            ffiVno = ' fa-male'
        }

        // kreal ha nincs tele a folyoso
        
            folyosok[folyosora].appendChild(createFfN(ffiVno));
            osszesVarakozo = (document.querySelectorAll("i.fa"))
            console.log("osszes varakozo: "+osszesVarakozo.length); 
            
        // ha tele van, akkor jon ez:
        if (osszesVarakozo.length === (folyosok.length*folyosoMaxKapacitas)){
            clearInterval(utasKell) 
        } 

    } 

    utasRanSeb = 1500;
    utasKell = setInterval(utasRan, utasRanSeb) 

    liftSzint = 1;
    let felmegy = true
    let leszallitott = false;
    let maxEmelet = emeletek.length

    const megnyomottGombTomb = []
    const megnyomottGomb = []

    // ide még kellene egy mikor szamlalo, amikor megnyomta, illetve amikor felvette a lift gomb..
    function MegnyomottGomb(honnan, hova) {
        this.honnan = honnan,
        this.hova= hova
    }

    function megnyomottGombokTombbe(honn, hov){
        let ezt = new MegnyomottGomb(honn,hov)
        megnyomottGombTomb.push(ezt)
        
    }

    function beKiszallas(mennyien) {
        // Amennyien be- és kiszállnak, lassul a lift
        if (mennyien > 0) {
            clearInterval(idozites)
            liftSebesseg = 500 * (mennyien);
    
            idozites = setInterval(mozgas_, liftSebesseg)  
            emeletek[maxEmelet- liftSzint].classList.add('zold')
    
            let ajtoNyitas = (mennyien) * 450;
    
            zoldVillanas = setTimeout(function() {emeletek[maxEmelet- liftSzint].classList.remove('zold')},ajtoNyitas)
        } else {
            // csak mozgásnál a lift sebessége állandó
            clearInterval(idozites)
            liftSebesseg = 500;
            idozites = setInterval(mozgas_, liftSebesseg)  
        }
        
    }

    let aktualisEmeletIndex = maxEmelet - liftSzint
    emeletek[aktualisEmeletIndex].classList.add("liftEz")
    liftSebesseg = 500;

    let idozites = setInterval(mozgas_, liftSebesseg)

    function liftMozgas_(){
        
        emeletek.forEach((emelet, index) => {
            emelet.classList.remove("liftEz")
             
            liftben[index].textContent = '';
        })
        liftben[maxEmelet- liftSzint].textContent = liftSzint; 
        emeletek[maxEmelet- liftSzint].classList.add('liftEz')
        check()
    }

    function mozgas_(){
        
        if (megnyomottGombTomb.length !== 0 ){

            let aktualis = megnyomottGombTomb[0]

            if (liftSzint < aktualis.hova) {
                liftSzint++
                beKiszallas(0)
                liftMozgas_()
                
            } else if ( liftSzint === aktualis.hova) {
                beKiszallas(3)
                megnyomottGombTomb.shift()
                
                if (megnyomottGombTomb.length === 0 && liftSzint === 1){
                    console.log("mindenkit leszallitott");
                    clearInterval(idozites)
                }
               
                liftMozgas_()

            } else if (liftSzint > aktualis.hova){
                liftSzint--
                beKiszallas(0)
                liftMozgas_()
                
            } else {
                clearInterval(idozites)
            }  
               
        } else {
      /*           console.log("nincs megnyomott gomb, így 1 emelet jön/földszint!"); */
                megnyomottGombokTombbe(1, 1)
                mozgas_();       
        }
        
    }

    let csekk = 0
    function check(){

     /*    console.log("csekk"); */
        csekk++
/*         console.log(liftSzint);
        console.log(csekk); */
    }


    megnyomottGombokTombbe(1, 2)
    megnyomottGombokTombbe(3, 6) 
    megnyomottGombokTombbe(6, 3) 
    megnyomottGombokTombbe(5, 1) 

})