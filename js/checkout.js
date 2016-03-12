var movieData = new Firebase('https://intense-torch-9843.firebaseio.com/');

$('#add-movie').click(function() {
  var name = $('#name').val();
  var date = $('#date').val();
  var director = $('#director').val();
  var ticket = $('#ticket').val();
  if (name !== "" && date !== "" && director !== "" && ticket !== "") {
    movieData.push({name: name, release_date: date, director: director, ticket: ticket});
  } else {
    alert("please complete form");
  }
  $('#name').val('');
  $('#date').val('');
  $('#director').val('');
  $('#ticket').val('');
});

$('body').on('click', '.remove-movie', function() {
  var currentMovieId = $(this).parent().attr('id')
  var currentMovie = new Firebase('https://llf9qvcffk4.firebaseio-demo.com/' + currentMovieId);
  currentMovie.remove();
  $('#' + currentMovieId).remove();
});

movieData.on('child_added', function(snapshot) {
  movies = snapshot;
  var movie = snapshot.val();
  var movieRow = $('<tr>').attr('id', snapshot.key()).appendTo('table');
  var movieName = $('<td>').addClass('column1').text(movie.name).appendTo(movieRow);
  var movieDate = $('<td>').text(movie.release_date).appendTo(movieRow);
  var movieDirector = $('<td>').text(movie.director).appendTo(movieRow);
  var movieTicket = $('<td>').addClass('center-icon').appendTo(movieRow);
  if (movie.ticket > 0) {
    var movieButton = $('<p>').addClass('ticket-btn').attr('id', snapshot.key()).appendTo(movieTicket);
    $('<p><i class="fa fa-ticket fa-2x"></i><span>' + movie.ticket + '</span> Left</p>').appendTo(movieButton);
  } else {
    $('<p>').text('Sold Out').appendTo(movieTicket);
  }
  var movieRemove = $('<td>').addClass('remove-movie text-center').appendTo(movieRow);
  $('<i>').addClass('fa fa-trash fa-3x').appendTo(movieRemove);
});