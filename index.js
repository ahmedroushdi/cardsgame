const cards = Array.from(document.querySelectorAll(".card-toFlip"));

let cardOne;
let cardTwo;
let cardThree;


function startGame(){
    let done = false;
    cards.forEach(card =>{
        card.removeEventListener('click',flipCard);
    });
    const button = document.querySelector('#startGame');
    const mySpan = document.createElement('span');
    mySpan.innerHTML = button.innerHTML;
    const bodyStyle = document.querySelector('.cards-background');
    button.addEventListener('click',()=>{
        done = true;
        bodyStyle.classList.remove('startGame');
        button.parentNode.replaceChild(mySpan,button);
        mySpan.innerHTML = "";
        if (done){
            cards.forEach(card =>{
                card.addEventListener('click',flipCard);
            });
        }        
    });
};


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
            return
        }
         if(!cardTwo){
            cardTwo = clickedCard;
            let cardOneImg = cardOne.querySelector('.card-front').getAttribute('src');
            let cardTwoImg = cardTwo.querySelector('.card-front').getAttribute('src');
            let match = matchTwoCards(cardOneImg,cardTwoImg);
            return
        } 
            cardThree = clickedCard;
            let cardTwoImg = cardTwo.querySelector('.card-front').getAttribute('src');
            let cardOneImg = cardOne.querySelector('.card-front').getAttribute('src');
            let cardThreeImg = cardThree.querySelector('.card-front').getAttribute('src');
            const match = matchTwoCards(cardOneImg,cardTwoImg);
            matchCards(match,cardOneImg,cardThreeImg);
    } 
};

function matchTwoCards(img1,img2){
    if(img1 != img2){
        
        const result = document.createElement('div');
        result.setAttribute('style','color:white');
        result.setAttribute('class','result text-center');
        result.innerHTML="<p>Try Again</p>";
        document.body.appendChild(result);

        setTimeout(()=>{
            cards.forEach(card =>{
                card.removeEventListener('click',flipCard);
            });
        },50);
        setTimeout(()=> {
             cardOne.classList.add('vibration');
             cardTwo.classList.add('vibration');
        }, 1000);
        setTimeout(()=>{
             cardOne.classList.remove('is-flipped','vibration');
             cardTwo.classList.remove('is-flipped','vibration');
             document.body.removeChild(result);
        }, 1400);

        setTimeout(()=>{
            cardOne = undefined;
            cardTwo = undefined;
            flipCard;
        },1500);
        
        setTimeout(()=>{
            shuffle(orderRange);
            cards.forEach((card, index) => {
                card.style.order = orderRange[index];
            })
        },1500);
        setTimeout(()=>{
            cards.forEach(card =>{
                card.addEventListener('click',flipCard);
            });
        },2000);
        return match = false;
        
    } else {
        return match = true;
    }
};

function matchCards(boolean,img1,img3){ 
    if(boolean){
        if(img1 == img3){    
            const result = document.createElement('div');
            result.setAttribute('style','color:white');
            result.setAttribute('class','result text-center');
            result.innerHTML="<p>result</p>";
            document.body.appendChild(result);
            
            setTimeout(()=>{
                cardOne.classList.remove('is-flipped','vibration');
                cardTwo.classList.remove('is-flipped','vibration');
                cardThree.classList.remove('is-flipped','vibration');
                document.body.removeChild(result);
            }, 1400);

            setTimeout(()=>{
                cardOne = undefined;
                cardTwo = undefined;
                cardThree = undefined;
                flipCard;
            },1500);

            setTimeout(()=>{
                shuffle(orderRange);
                cards.forEach((card, index) => {
                    card.style.order = orderRange[index];
                })
            },1500);
        } else {
            const result = document.createElement('div');
            result.setAttribute('style','color:white');
            result.setAttribute('class','result text-center');
            result.innerHTML="<p>Try Again</p>";
            document.body.appendChild(result);

            setTimeout(()=>{
                cards.forEach(card =>{
                    card.removeEventListener('click',flipCard);
                });
            },50);
            setTimeout(()=> {
                cardOne.classList.add('vibration');
                cardTwo.classList.add('vibration');
                cardThree.classList.add('vibration');
            }, 1000);
            setTimeout(()=>{
                cardOne.classList.remove('is-flipped','vibration');
                cardTwo.classList.remove('is-flipped','vibration');
                cardThree.classList.remove('is-flipped','vibration');
                document.body.removeChild(result);
            }, 1400);

            setTimeout(()=>{
                cardOne = undefined;
                cardTwo = undefined;
                cardThree = undefined;
                flipCard;
            },1500);
            
            setTimeout(()=>{
                shuffle(orderRange);
                cards.forEach((card, index) => {
                    card.style.order = orderRange[index];
                })
            },1500);
        
        setTimeout(()=>{
            cards.forEach(card =>{
                card.addEventListener('click',flipCard);
                });
            },2000);
            return
        }
    }
}



