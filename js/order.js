// function buyTicket(e) {
//   console.log(e);
//   var ticketNum = e.children[1].innerText;
//   if (ticketNum > 0) {
//     e.children[1].innerText--;
//   } else {
//     alert("Ticket Sold Out");
//   }
// }

// $('.ticket-btn').click(function() {
//   var ticketNum = $($(this).find('span')).html();
//   // get number of ticket from button span
//   if (ticketNum > 1) {
//     $($(this).find('span')).html(ticketNum - 1);
//     // set number of ticket left
//   } else {
//     $(this).addClass('alert-btn').html('Sold Out');
//     // change text to sold out and add alert button class when ticket number equals zero
//   }
// });

var movieData = new Firebase('https://llf9qvcffk4.firebaseio-demo.com/');

movieData.on('child_added', function(snapshot) {
  movies = snapshot;
  var movie = snapshot.val();
  var movieRow = $('<tr>').attr('id', snapshot.key()).appendTo('table');
  var movieName = $('<td>').addClass('column1').text(movie.name).appendTo(movieRow);
  var movieDate = $('<td>').text(movie.release_date).appendTo(movieRow);
  var movieDirector = $('<td>').text(movie.director).appendTo(movieRow);
  var movieTicket = $('<td>').addClass('center-icon').appendTo(movieRow);
  
  if (movie.ticket > 0) {
    var movieButton = $('<button>').addClass('ticket-btn').appendTo(movieTicket);
    $('<p><i class="fa fa-ticket fa-2x"></i><span>' + movie.ticket + '</span> Left</p>').appendTo(movieButton);
  } else {
    $('<p>').text('Sold Out').appendTo(movieTicket);
  }
  
});

$('body').on('click', '.ticket-btn', function() {
  var ticketNum = $($(this).find('span')).html();
  // get number of ticket from button span
  if (ticketNum > 0) {
    var currentTicketNum = ticketNum - 1;
    $($(this).find('span')).html(currentTicketNum);
    // set number of ticket left
    var currentMovieId = $(this).parent().parent().attr('id');
    var currentMovie = new Firebase('https://llf9qvcffk4.firebaseio-demo.com/' + currentMovieId);
    // Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
    currentMovie.update({ ticket: currentTicketNum });
  } else {
    $(this).addClass('alert-btn').html('Sold Out');
    // change text to sold out and add alert button class when ticket number equals zero
  }
});