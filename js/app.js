'use strict';

// ******** Global Variables ***********

let totalVotes = 25;
let allProducts = [];

// ************* DOM REFERENCES ************************
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list')


// ************** CONSTRUCT FUNCTION  ***************

function Product(name, photoExtension = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${photoExtension}`;
  this.views = 0;
  this.votes = 0;

  allProducts.push(this);
}

// ************** OBJECT CREATION **************

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

// ******* HELPER FUNCTIONS ***********

function randomIndexGenerator(){
  return Math.floor(Math.random() * allProducts.length);


}

// ************ Creating a while loop with all three images in the website.***
function renderImg(){

  let imgOneIndex = randomIndexGenerator();
  let imgTwoIndex = randomIndexGenerator();
  let imgThreeIndex = randomIndexGenerator();

  while(imgOneIndex === imgTwoIndex || imgTwoIndex === imgThreeIndex || imgOneIndex === imgThreeIndex){
    imgTwoIndex = randomIndexGenerator();
    imgThreeIndex = randomIndexGenerator();

} 

imgOne.src = allProducts[imgOneIndex].photo;
imgOne.alt = allProducts[imgOneIndex].name;
imgOne.name = allProducts[imgOneIndex].name;
allProducts[imgOneIndex].views++;

imgTwo.src = allProducts[imgTwoIndex].photo;
imgTwo.alt = allProducts[imgTwoIndex].name;
imgTwo.name = allProducts[imgTwoIndex].name;
allProducts[imgTwoIndex].views++;

imgThree.src = allProducts[imgThreeIndex].photo;
imgThree.alt = allProducts[imgThreeIndex].name;
imgThree.name = allProducts[imgThreeIndex].name;
allProducts[imgThreeIndex].views++

}

// *********** INVOKE *************
renderImg();



// ************** Event Handlers *************

function handleClick(event){
  let imgClicked = event.target.alt;
  for(let i = 0; i < allProducts.length; i++){
    if(imgClicked === allProducts[i].name){
      allProducts[i].votes++;
    }
  }
  totalVotes--;
  renderImg();

  console.log(imgClicked);

  if(totalVotes === 0){
    imgContainer.removeEventListener('click', handleClick);
  }

}



function handleShowResults(){
  if(totalVotes === 0){
    for(let i = 0; i < allProducts.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${allProducts[i].name} had ${allProducts[i].votes}, and was seen ${allProducts[i].views} times.`;
      resultsList.appendChild(liElem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
  }
}




// **************** Event listeners **************

imgContainer.addEventListener('click', handleClick);

resultBtn.addEventListener('click', handleShowResults);