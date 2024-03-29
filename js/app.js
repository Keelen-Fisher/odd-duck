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


// ************** LOCAL STORAGE CONTINUES **************

// STEP 3: GET DATA OUT OF LOCAL STORAGE.

let retreivedProducts = localStorage.getItem('myProducts');

console.log('retrievedProducts', retreivedProducts);

// Data store thats similar to a javascript object.
// JSON parsing is the process of converting a JSON object in text format to a Javascript object that can be used inside a program.
let parsedProducts = JSON.parse(retreivedProducts);

console.log('parsed Products >>>', parsedProducts);



// ************** CONSTRUCT FUNCTION  ***************
// In the parameter, you have the unique variables and set default parameters with photoExtension = 'jpg', you don't want more than 1 default parameters.
function Product(name, photoExtension = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${photoExtension}`;
  this.views = 0;
  this.votes = 0;
//  PUSHES THE WHOLE OBJECT INTO THE ARRAY.
  allProducts.push(this);
}


//  Another way to include object. 
// ************** OBJECT CREATION **************
/* This code block checks if there is any data stored in the local storage with the key 'myProducts'.
If there is, it retrieves the data and parses it into a JavaScript object using `JSON.parse()`.
Then, it assigns the parsed object to the `allProducts` array. This is done to ensure that any
previously stored data is not overwritten when the page is reloaded or revisited. */
if (retreivedProducts){
  allProducts = parsedProducts;
}

else{

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
}


console.log('allproducts from the Constructor >>>', allProducts)


// ******* HELPER FUNCTIONS ***********

function randomIndexGenerator(){
  // generating a random number.
  return Math.floor(Math.random() * allProducts.length);


}
// you can treat this array as a certain data structure in the class replit
let productIndexArr = []; 

// round 1: a, b, c
// round 2: d, g, h

//  you need to include the array length of 6 because you have 2 rounds that need to be 

function renderImg(){
  while(productIndexArr.length < 6){
    let randomNum = randomIndexGenerator();
    if(!productIndexArr.includes(randomNum)){ // productIndexArr.includes() returns boolean
    productIndexArr.push(randomNum);
    }
  }


// you'll need three rounds
// shift: Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
//  So in this case, you're going to shift three elements out and shift in 3 new elements through the loop 
let imgOneIndex = productIndexArr.shift();
let imgTwoIndex = productIndexArr.shift();
let imgThreeIndex = productIndexArr.shift();

// How would it look with a stack or queue/

// let shiftedElement 

// ************ Creating a while loop with all three images in the website.***
// function renderImg(){

//   let imgOneIndex = randomIndexGenerator();
//   let imgTwoIndex = randomIndexGenerator();
//   let imgThreeIndex = randomIndexGenerator();

  // while(imgOneIndex === imgTwoIndex || imgTwoIndex === imgThreeIndex || imgOneIndex === imgThreeIndex){
  //   imgTwoIndex = randomIndexGenerator();
  //   imgThreeIndex = randomIndexGenerator();

// } 

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
  /* `let imgClicked = event.target.alt;` is assigning the value of the `alt` attribute of the image
  that was clicked to the variable `imgClicked`. This is used later in the `handleClick` function to
  determine which product was clicked and increment its vote count. */
  let imgClicked = event.target.name;
  for(let i = 0; i < allProducts.length; i++){
    if(imgClicked === allProducts[i].name){
      allProducts[i].votes++;
    }
  }
  totalVotes--;
  renderImg();

  console.log(imgClicked);





  if(totalVotes === 0){

    // ******* Local Storage *******
    // Whenever you insert local storage into your code, you want to place it in the area that makes the most sense. 

    // STEP 1: STRINGIFY THE DATA 
    let stringifiedProducts = JSON.stringify(allProducts)

    console.log('stringified products >>>', stringifiedProducts);

    // STEP 2: ADD TO LOCAL STORAGE 
    localStorage.setItem('myProducts', stringifiedProducts);



    imgContainer.removeEventListener('click', handleClick);
  }

}



function handleShowResults(){
  if(totalVotes === 0){
    renderChart();
    
    resultBtn.removeEventListener('click', handleShowResults);
  }
}

// *********** CHART DISPLAY ***************

// *** CANVAS ELEMENT TO RENDER THE CHART ***

let canvasElem = document.getElementById('my-chart');

function renderChart(){

  // *** CREATING EMPTY ARRAYS TO POPULATE WITH THE INFO ****

  let productNames = [];
  let productVotes = [];
  let productViews = [];

  //  ** Creating a loop that takes all the data after the voting rounds are completed and populates the arrays **

  for(let i = 0; i < allProducts.length; i++){
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productVotes.push(allProducts[i].votes);
  }

  // *** CONFIGURATION OBJECT THAT CHART.JS USES TO RENDER THE CHART ***
  //  Objects within other objects within arrays.
  let myObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // *** CONSTRUCTOR CALL TO RENDER THE CHART ***
  new Chart(canvasElem, myObj);

}


// **************** Event listeners **************

imgContainer.addEventListener('click', handleClick);

resultBtn.addEventListener('click', handleShowResults);
