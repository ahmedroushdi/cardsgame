var cards = Array.from(document.querySelectorAll(".card-toFlip"));

let cardOne, cardTwo, cardThree;

cards.forEach(card =>{
    card.addEventListener('click',flipCard);
});


let orderRange = Array.from(Array(cards.length).keys());

shuffle(orderRange);

cards.forEach((card, index) => {
    card.style.order = orderRange[index];
})

function shuffle(array){   
    
    let current,
        temp,
        random;
        for (current=array.length-1 ; current > 0; current--){
        random = Math.floor(Math.random()*current);
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
        }
    return array;
};

function flipCard(event){
    clickedCard = event.composedPath()[1];
   
    if(clickedCard != cardOne){
        clickedCard.classList.add('is-flipped');
    
        if(!cardOne){
            cardOne = clickedCard;
            let cardOneImg = cardOne.querySelector('.card-front').getAttribute('alt');
            if(cardOneImg != "ace"){
                setTimeout(()=> {
                    cardOne.classList.toggle('vibration');
                }, 1000);
                setTimeout(()=>{
                    cardOne.classList.remove('is-flipped');
                }, 2000);  
                setTimeout(()=>{
                    cardOne.classList.remove('is-flipped','vibration');
                }, 2000);
                setTimeout(()=>{
                    cardOne = undefined;
                    flipCard;
                },2050);     
                setTimeout(()=> {
                    shuffle(orderRange);
                    cards.forEach((card, index) => {
                        card.style.order = orderRange[index];
                    })
                },2100);
            } 
            return
        }            
                       
        if(!cardTwo){
            cardTwo = clickedCard;
            let cardOneImg = cardOne.querySelector('.card-front').getAttribute('alt');
            let cardTwoImg = cardTwo.querySelector('.card-front').getAttribute('alt');

            if(cardOneImg === "ace" && cardTwoImg != "ace"){
                setTimeout(()=> {
                    cardOne.classList.add('vibration');
                    cardTwo.classList.add('vibration');
                }, 1000);
               setTimeout(()=>{
                    cardOne.classList.remove('is-flipped');
                    cardTwo.classList.remove('is-flipped');
                }, 2000);
              
                setTimeout(()=>{
                    cardOne.classList.remove('is-flipped','vibration');
                    cardTwo.classList.remove('is-flipped','vibration');
                }, 2000);
                
                setTimeout(()=>{
                    cardOne = undefined;
                    cardTwo = undefined;
                    flipCard;
                }, 2050);

                setTimeout(()=>{
                    shuffle(orderRange);
                    cards.forEach((card, index) => {
                        card.style.order = orderRange[index];
                    });
                },2100);
            }     
            return
            
        } else {
            cardThree = clickedCard;            
        }

        let cardOneImg = cardOne.querySelector('.card-front').getAttribute('alt');
        let cardTwoImg = cardTwo.querySelector('.card-front').getAttribute('alt');
        let cardThreeImg = cardThree.querySelector('.card-front').getAttribute('alt');
        matchCards(cardOneImg,cardTwoImg,cardThreeImg);
    }
};

function matchCards(img1,img2,img3){ 

    if(img1 === "ace" && img2 === "ace" & img3 != "ace"){
        console.log("Try Again");
        setTimeout(()=> {
             cardOne.classList.add('vibration');
             cardTwo.classList.add('vibration');
             cardThree.classList.add('vibration');
        }, 1000);
        setTimeout(()=>{
             cardOne.classList.remove('is-flipped','vibration');
             cardTwo.classList.remove('is-flipped','vibration');
             cardThree.classList.remove('is-flipped','vibration');
        }, 2000);

        setTimeout(()=>{
            cardOne = undefined;
            cardTwo = undefined;
            cardThree = undefined;
            flipCard;
        },2050);
        
        setTimeout(()=>{
            shuffle(orderRange);
            cards.forEach((card, index) => {
                card.style.order = orderRange[index];
            })
        },2100);
        return
 
    }  else if(img1 === "ace" && img2 === "ace" && img3 === "ace"){
        
        const congratz = document.createElement('div');
        congratz.setAttribute('style','color:white');
        congratz.setAttribute('class','congratulations text-center');
        congratz.innerHTML="<p>Congratulations</p>";
        document.body.appendChild(congratz);
        
        setTimeout(()=>{
            cardOne.classList.remove('is-flipped','vibration');
            cardTwo.classList.remove('is-flipped','vibration');
            cardThree.classList.remove('is-flipped','vibration');
            document.body.removeChild(congratz);
        }, 2000);

        setTimeout(()=>{
            cardOne = undefined;
            cardTwo = undefined;
            cardThree = undefined;
            flipCard;
        },2050);

        setTimeout(()=>{
            shuffle(orderRange);
            cards.forEach((card, index) => {
                card.style.order = orderRange[index];
            })
        },2100);

    }
}
