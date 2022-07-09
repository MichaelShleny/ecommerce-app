let books;

async function renderBooks(filter){
  const booksWrapper = document.querySelector('.books');

  booksWrapper.classList += ' books__loading'
    //following if statemnt makes sure that when there are already books loaded, 
    //there is no loading state.
    if (!books){
    books = await getBooks();
    }
    
  booksWrapper.classList.remove('books__loading')
  
  if (filter === "LOW_TO_HIGH"){
    //books is the array
    //.sort returns a sorted array based on what conditions we give it
    //we use the OR operator to see if we need to compare sale prices w origional prices
    //The sale price has priority, see it? take it. thats why its first
    books.sort((a,b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
  }
  else if (filter === "HIGH_TO_LOW"){
    books.sort((a,b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
  }
  else if (filter === "RATING"){
    books.sort((a,b) => b.rating - a.rating);
  }

  //map through the array - map doesnt change your array it gives you a new one
  //so we create a new constant while will now have access to the new array
  //toFixed(2) adds 2 decimal points making it look like real pricing
  const booksHtml = books.map((book) => {
    return `<div class = "book">
    <figure class = "book__img--wrapper">
        <img class = "book__img" src = "${book.url}" alt="">
    </figure>
    <div class = "book__title">${book.title}</div>
    <div class = "book__ratings">
        ${ratingsHTML(book.rating)}
    </div>
    <div class = "book__price">
      ${priceHTML(book.originalPrice,book.salePrice)}
    </div>
</div>`;
  })
  //this version of .join makes connected strings
  .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice,salePrice){
  //if there is no sale price involved in the book in the array, return only original price
  //of books
  if (!salePrice){
  return `$${originalPrice.toFixed(2)}`
  }
  else{
    return `<span class = "book__price--normal" >$${originalPrice.toFixed(2)}</span>$${salePrice.toFixed(2)}`
  }
}

function ratingsHTML(rating){

  let ratingHTML = '';

  for (let i = 0; i < Math.floor(rating); i++){
    ratingHTML += '<i class= "fas fa-star"></i>\n'
  }

  if (!Number.isInteger(rating)){
    ratingHTML += '<i class= "fas fa-star-half-alt"></i>\n'
  }
  return ratingHTML
}

function filterBooks(event){

    renderBooks(event.target.value)
  }
  

//will call this function at the end/we want that
setTimeout (() => {
  renderBooks();
});
// FAKE DATA
function getBooks() {
  //making an API which is a loading state of the books
  //API is needed because fetching data from the database takes time, 
  //and therefore we set the timeout for 1 second
  return new Promise((resolve) => {
    //going to call the set timeout after 1 second (1000), then display (resolve)
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 2,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    },1000);
  });
}
    
