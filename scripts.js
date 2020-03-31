const movies = [
    {
        title: 'Die Hard',
        times: [
              { time:'10:00',
              audience: [0, 12, 13, 14, 15, 88, 89, 90, 92, 93]},
              { time:'12:00',
              audience: [15, 32, 33, 34, 62, 88, 120, 121]},
              { time:'15:00',
              audience: [0, 1, 2, 12, 22, 33, 34, 35, 100, 101]},
              { time:'20:00',
              audience: [10, 11, 12, 23, 24, 40, 41, 89]}],
        rating: '18',
        ticketPrices: {
            premium: 12,
            standard: 10
        }
    },
    {
        title: 'Madagascar',
        times: [
            { time:'10:00',
            audience: [0, 12, 13, 14, 15, 88, 89, 90, 92, 93]},
            { time:'12:00',
            audience: [15, 32, 33, 34, 62, 88, 120, 121]},
            { time:'15:00',
            audience: [0, 1, 2, 12, 22, 33, 34, 35, 100, 101]},
            { time:'20:00',
            audience: [10, 11, 12, 23, 24, 40, 41, 89]}],
        rating: 'PG',
        ticketPrices: {
            premium: 10,
            standard: 6
        }
    },
    {
        title: 'The Avengers',
        times: [
            { time:'10:00',
            audience: [0, 12, 13, 14, 15, 88, 89, 90, 92, 93]},
            { time:'12:00',
            audience: [15, 32, 33, 34, 62, 88, 120, 121]},
            { time:'15:00',
            audience: [0, 1, 2, 12, 22, 33, 34, 35, 100, 101]},
            { time:'20:00',
            audience: [10, 11, 12, 23, 24, 40, 41, 89]}],
        rating: '15',
        ticketPrices: {
            premium: 12.5,
            standard: 10
        }
    }
];

const moviesUI = document.querySelector('#movie');
const screeningTimesUI = document.querySelector('#screening-times');
const regularPriceUI = document.querySelector('#regular-price');
const premiumPriceUI = document.querySelector('#premium-price');
const allSeats = document.querySelectorAll('.seats .seat');

const ratingUI = document.querySelector('#rating');
const regularSummary = document.querySelector('#regular-summary');
const regularQty = document.querySelector('#regular-qty');
const regularPriceTotal = document.querySelector('#regular-price-total');

const premiumSummary = document.querySelector('#premium-summary');
const premiumQty = document.querySelector('#premium-qty');
const premiumPriceTotal = document.querySelector('#premium-price-total');


const checkoutButtonUI = document.querySelector('#checkout');
const checkoutPriceUI = document.querySelector('#checkout-price');
const checkoutPriceWrapperUI = document.querySelector('#checkout-price-wrapper');

const populateUI = () => {

    // List the movies
    movies.forEach( (movie) => {
    const movieItem = document.createElement('option');
    movieItem.innerText = movie.title;
    moviesUI.appendChild(movieItem);
    });

    const selectedMovieID = movies.findIndex(x => x.title === moviesUI.value);
    const selectedMovie = movies[selectedMovieID];
    // Get the screening times
    updateScreeningTimes(selectedMovie);
    updatePrices(selectedMovie);
    updateRating(selectedMovie);
    updateOrderSummary();


}


const updateScreeningTimes = (selectedMovie) => {

    screeningTimesUI.innerHTML = "";
    selectedMovie.times.forEach( (time) => {

    const screeningTime = document.createElement('li');
    screeningTime.innerText = time.time;
    screeningTimesUI.appendChild(screeningTime);


})};

const updateRating = (selectedMovie) => {

    ratingUI.className = "";
    ratingUI.innerText = selectedMovie.rating;

    switch(selectedMovie.rating){

        case 'PG':
        ratingUI.className = "bg-green-500";
        break;

        case '18':
        ratingUI.className = "bg-red-500";
        break;

        case '15':
        ratingUI.className = "bg-orange-500";
        break;
    }

};

const updatePrices = (selectedMovie) => {

    // Find the screening times for current selected movie
    regularPriceUI.innerText = parseFloat(selectedMovie.ticketPrices.standard).toFixed(2);
    premiumPriceUI.innerText = parseFloat(selectedMovie.ticketPrices.premium).toFixed(2);    
}

const updateOrderSummary = () => {

    const selectedSeats = document.querySelectorAll('.seats .seat.selected');
    const premiumSeats = document.querySelectorAll('.seats .seat.premium.selected');
    const premiumSelectedSeats = premiumSeats.length;
    const regularSelectedSeats = selectedSeats.length - premiumSelectedSeats;

    // If no seats selected, hide order summary
    premiumSelectedSeats === 0 ? premiumSummary.classList.add('hidden') : premiumSummary.classList.remove('hidden');
    regularSelectedSeats === 0 ? regularSummary.classList.add('hidden') : regularSummary.classList.remove('hidden');
    
    regularQty.innerHTML = regularSelectedSeats;
    premiumQty.innerHTML = premiumSelectedSeats;
    regularPriceTotal.innerHTML = parseInt(+regularPriceUI.innerHTML * regularSelectedSeats).toFixed(2);
    premiumPriceTotal.innerHTML = parseInt(+premiumPriceUI.innerHTML * premiumSelectedSeats).toFixed(2);

    checkoutPriceUI.innerHTML = parseInt(+regularPriceTotal.innerHTML + +premiumPriceTotal.innerHTML).toFixed(2);
    if(+checkoutPriceUI.innerHTML === 0) {

        checkoutPriceWrapperUI.classList.add('hidden')
        checkoutButtonUI.disabled = true;
        checkoutButtonUI.classList.add('is-disabled');
        checkoutButtonUI.classList.remove('is-available');

    } else {
        checkoutPriceWrapperUI.classList.remove('hidden')
        checkoutButtonUI.disabled = false;
        checkoutButtonUI.classList.remove('is-disabled');
        !checkoutButtonUI.classList.contains('is-available') ? checkoutButtonUI.classList.add('is-available') : "";

    } 
};





populateUI();

document.querySelector('.seats').addEventListener('click', (e) => {

    if(!e.target.classList.contains('unavailable')) {
        e.target.classList.toggle('selected');

        updateOrderSummary();
    }
});

moviesUI.addEventListener('change', () => {

    const selectedMovieID = movies.findIndex(x => x.title === moviesUI.value);
    const selectedMovie = movies[selectedMovieID];
    // Get the screening times
    updateScreeningTimes(selectedMovie);
    updatePrices(selectedMovie);
    updateOrderSummary();
    updateRating(selectedMovie);

})

const updateSeats = () => {
    const selectedMovieID = movies.findIndex(x => x.title === moviesUI.value);
    const selectedMovie = movies[selectedMovieID];
    const movieTime = document.querySelector('#screening-times li.is-active');
    const selectedMovieTimeID = selectedMovie.times.findIndex(x => x.time === movieTime.innerHTML)
    const selectedMovieAudience = selectedMovie.times[selectedMovieTimeID].audience;


    // Clear seats

    allSeats.forEach((seat) => {
        seat.classList.remove('selected');
        seat.classList.remove('unavailable');
    })

    // Add unavailable seats
    selectedMovieAudience.forEach( (seat) => {

        allSeats[seat].classList.add('unavailable');

    })
}


// Click a time

screeningTimesUI.addEventListener('click', (e) => {

    if(e.target.tagName == 'LI') {
        
        screeningTimesUI.querySelectorAll('li').forEach((li) => {
            li.classList.contains('is-active') ? li.classList.remove('is-active') : "";
        });

        e.target.classList.add('is-active');    
        
        document.querySelector('.selector').classList.remove('opacity-50', 'cursor-not-allowed');

        updateSeats();

    }

});


// Checkout function

// If user clicks checkout
// Update object for that time to make those seats unavailable

checkoutButtonUI.addEventListener('click', () => {

    console.log('click');

    const selectedMovieID = movies.findIndex(x => x.title === moviesUI.value);
    const selectedMovie = movies[selectedMovieID];
    const movieTime = document.querySelector('#screening-times li.is-active');    
    const selectedMovieTimeID = selectedMovie.times.findIndex(x => x.time === movieTime.innerHTML)
    const selectedMovieAudience = selectedMovie.times[selectedMovieTimeID].audience;
    const selectedSeats = document.querySelectorAll('.seats .seat.selected');
    const seatsIndex = [...selectedSeats].map((seat) =>([...allSeats].indexOf(seat)));
    
    
    Array.prototype.push.apply(selectedMovieAudience, seatsIndex);

    selectedSeats.forEach((seat) => {
        seat.classList.remove('selected');
    });
    
    updateOrderSummary();
    updateSeats();


        

})