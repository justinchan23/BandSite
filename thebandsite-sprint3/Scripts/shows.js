
const url = "https://project-1-api.herokuapp.com/showdates";
const apiKey = "?api_key=b23f4ee5-c3bf-4eea-8b67-01d39c9c407e";

function getShows() {
  // fetch the shows from the api and load to page
  axios.get(`${url}${apiKey}`)
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
  // button for going to top of page
  $(window).scroll(function () { toTopButtonDisplay() })
  $('#toTopButton').click(scrollUp)
})

// function that adds the comments to the page
function addConcerts(concertDate, concertVenue, concertLocation, concertId) {

  // create a table row and place concert listing inside
  var tr =
    $('<tr></tr')
      .attr('id', concertId)
      .html(`
  <td class="table__padding table__date" data-label="DATE">${concertDate}</td>
  <td class="table__padding" data-label="VENUE">${concertVenue}</td>
  <td class="table__padding" data-label="LOCATION">${concertLocation}</td>
  `)

  // buy tickets button
  var button1 =
    $('<td></td>')
      .addClass('table__button')

  var button2 =
    $('<button></button>')
      .addClass('table__ticketButton')
      .attr('id', `ticketButton ${concertId}`)
      .html('BUY TICKETS')

  $(button1).append(button2)
    .click(soldOut)

  // add button to the table row
  $(tr).append(button1);

  //write the concerts to the page
  $('#concert__listings').append(tr)

};


// alert that tickets are sold out
function soldOut() {
  alert('Sold Out! =(')
};


// function to display button that goes to top of page
function toTopButtonDisplay() {
  if ($('body,html').scrollTop() > 50 || $(document.documentElement).scrollTop > 50) {
    $('#toTopButton').show()
  } else {
    $('#toTopButton').hide()
  }
}

// function to go to the top of the page
function scrollUp() {
  $('body,html').scrollTop(0);
  $(document.documentElement).scrollTop = 0;
}