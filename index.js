var cards = Array.from(document.querySelectorAll(".card-toFlip"));

var cardOne;
var cardTwo;
var cardThree;


function startGame(){
    var done = false;
    cards.forEach(card =>{
        card.removeEventListener('click',flipCard);
    });
    var button = document.querySelector('#startGame');
    var mySpan = document.createElement('span');
    mySpan.innerHTML = button.innerHTML;
    var bodyStyle = document.querySelector('.cards-background');
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
            var cardOneImg = cardOne.querySelector('.card-front').getAttribute('src');
            var cardTwoImg = cardTwo.querySelector('.card-front').getAttribute('src');
            var match = matchTwoCards(cardOneImg,cardTwoImg);
            console.log(match)
            return
        } 
            cardThree = clickedCard;
            var cardTwoImg = cardTwo.querySelector('.card-front').getAttribute('src');
            var cardOneImg = cardOne.querySelector('.card-front').getAttribute('src');
            var cardThreeImg = cardThree.querySelector('.card-front').getAttribute('src');
            var match = matchTwoCards(cardOneImg,cardTwoImg);
            matchCards(match,cardOneImg,cardThreeImg);
    } 
};

function matchTwoCards(img1,img2){
    if(img1 != img2){
        console.log("Try Again");
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
            console.log("Try Again");
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



