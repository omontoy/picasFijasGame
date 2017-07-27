var randomNumber = generateRandom();

$('input').on('keypress', function(e) {
   if(e.which === 13){
      var userNumber = $(this).val();
      $(this).val("");
      
      var len = userNumber.length
      var number = parseInt(userNumber);
      if (repeated(userNumber) || len < 4 || len > 4 || number < 1000){
        $('span').addClass('error');
        $('input').addClass('has-error');
      } else {
        
        var juego = game(userNumber, randomNumber )
        var template = Handlebars.compile($('#game-template').html());
        $('tbody').prepend(template({ juego }));

        $('span').removeClass('error');
        $('input').removeClass('has-error');
      }
      finishGame(userNumber, randomNumber);
   }
});

function generateRandom() {
  var floatNumber = Math.random() * (9999 - 1000) + 1000;
  var integer = parseInt( floatNumber )
  var random = integer.toString();

  var counter = 0;
  var str = random;
  for( var i = 0; i < str.length; i++) {
    for( var j = i+1; j < str.length; j++) {
      str[j] == str[i] ? counter++ : "";
    }
  }
  counter > 0 ? random = generateRandom() : "";
  return random;
}

function game(userNumber, randomNumber) {
  var len = userNumber.length;
  
  var fijas = 0;
  var picas = 0;
  for( var i = 0; i < len; i++ ) {
    var pos = randomNumber.indexOf(userNumber[i])
    if ( i == pos) {
      fijas++;
    } else if (pos > -1){
      picas++;
    }
  }
  return { userNumber: userNumber, picas: picas, fijas: fijas } 
}

function finishGame(n1, n2){
  if (n1 == n2) {
    $('tbody tr').first().addClass('won');
    $("input").prop('disabled', true);
    $('.bloquear').show();
  }
}

function repeated(n1){
  var count = 0;
  var len = n1.length;
  for(var i = 0; i < len; i++) {
    for(var j = i+1; j < len; j++) {
      n1[j] == n1[i] ? count++ : "";
    }
  }
  return count > 0  
}