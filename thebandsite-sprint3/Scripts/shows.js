
const url = "https://project-1-api.herokuapp.com/showdates";
const apiKey = "?api_key=b23f4ee5-c3bf-4eea-8b67-01d39c9c407e";

function getShows() {
  // fetch the shows from the api and load to page
  axios.get(url + apiKey)
    .then(response => {
      var concert = response.data
      concert.forEach(value => {
        addConcerts(value.date, value.place, value.location, value.id);
      })
    })
    .catch(error => console.log(error));
}

// get the shows and load to page after page has loaded
$(function () {
  getShows()
})

// function that adds the comments to the page
function addConcerts(concertDate, concertVenue, concertLocation, concertId) {

  // create a table row and place 
  var tr = document.createElement("tr");
  tr.id = concertId

  // concert date
  var date1 = document.createElement("td");
  var dateText = document.createTextNode(concertDate);
  date1.className = "table__padding table__date";
  date1.setAttribute("data-label", "DATE")
  date1.appendChild(dateText);

  // venue
  var venue1 = document.createElement("td");
  var venueText = document.createTextNode(concertVenue);
  venue1.className = "table__padding";
  venue1.setAttribute("data-label", "VENUE")
  venue1.appendChild(venueText);

  // location
  var location1 = document.createElement("td");
  var locationText = document.createTextNode(concertLocation);
  location1.className = "table__padding";
  location1.setAttribute("data-label", "LOCATION")
  location1.appendChild(locationText);

  // button
  var button1 = document.createElement("td");
  var button2 = document.createElement("button");
  button1.className = "table__button";
  button2.className = "table__ticketButton";
  button2.id = "ticketButton " + concertId;
  button2.innerHTML = "BUY TICKETS";
  button1.appendChild(button2);
  button1.addEventListener('click', soldOut);

  //add the concert listing to a table row
  tr.appendChild(date1);
  tr.appendChild(venue1);
  tr.appendChild(location1);
  tr.appendChild(button1);

  //write the concerts to the page
  $('#concert__listings').append(tr)

};


// alert that tickets are sold out
function soldOut() {
  alert('Sold Out! =(')
};