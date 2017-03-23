"# Rating"

How to use -

let config = {
     noOfStar: 10, // optional
     rating: 5, // optional, initial rating
     onChange: function(){} // optional, onchange function
     // for other configuration option check source code (lib/main.js)
};
let ratingComponent = Rating.getRatingObj(config);
ratingComponent.render('main');

console.log(ratingComponent.rating); // it will return the current rating
ratingComponent.setRating(num); // it will set the rating


Visit : https://invos.github.io/Rating/  to see the demo
