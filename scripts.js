const movies = [
    {
        title: 'Die Hard',
        times: [
              { time:'10:00',
              audience: ''},
              { time:'12:00',
              audience: ''},
              { time:'15:00',
              audience: ''},
              { time:'20:00',
              audience: ''}],
        rating: '18',
        ticketPrices: {
            premium: 12,
            standard: 10
        }
    },
    {
        title: 'Madagascar',
        times: [
              { time:'12:00',
              audience: ''},
              { time:'13:15',
              audience: ''},
              { time:'14:00',
              audience: ''},
              { time:'16:00',
              audience: ''}],
        rating: 'PG',
        ticketPrices: {
            premium: 10,
            standard: 6
        }
    },
    {
        title: 'The Avengers',
        times: [
              { time:'09:00',
              audience: ''},
              { time:'12:30',
              audience: ''},
              { time:'13:20',
              audience: ''},
              { time:'23:00',
              audience: ''}],
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
const allSeats = document.querySelector('.seats');

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

    const selectedSeats = allSeats.querySelectorAll('.seat.selected');
    const premiumSeats = allSeats.querySelectorAll('.seat.premium.selected');
    const premiumSelectedSeats = premiumSeats.length;
    const regularSelectedSeats = selectedSeats.length - premiumSelectedSeats;
    console.log(selectedSeats);

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

allSeats.addEventListener('click', (e) => {

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