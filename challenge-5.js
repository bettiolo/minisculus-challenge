var request = require('request-json');
var challengeUrl = 'http://minisculuschallenge.com/50763edaa9d9bd2a9516280e9044d885';
var client = request.newClient(challengeUrl);

var alphabet = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    ".", ",", "?", "!", "'", "\"", " "
];

multiDecodeWithMark4("QT4e8MJYVhkls.27BL9,.MSqYSi'IUpAJKWg9Ul9p4o8oUoGy'ITd4d0AJVsLQp4kKJB2rz4dxfahwUa\"Wa.MS!k4hs2yY3k8ymnla.MOTxJ6wBM7sC0srXmyAAMl9t\"Wk4hs2yYTtH0vwUZp4a\"WhB2u,o6.!8Zt\"Wf,,eh5tk8WXv9UoM99w2Vr4!.xqA,5MSpWl9p4kJ2oUg'6evkEiQhC'd5d4k0qA'24nEqhtAQmy37il9p4o8vdoVr!xWSkEDn?,iZpw24kF\"fhGJZMI8nkI");

function multiDecodeWithMark4(code) {
    for (var i = 0; i <= 9; i++) {
        for (var j = 0; j <= 9; j++) {
            decodeWithMark4(code, i, j);
        }
    }
}

function decodeWithMark4(stringToEncode, firstDial, secondDial) {
    var encodedString = '';
    var dial = -(firstDial - (secondDial * 2));
    // console.log('Dial', dial);
    var previousIndex = 0;
    for(var i = 0; i < stringToEncode.length; i++) {
        var currentLetter = stringToEncode[i];
        var alphabetIndex = alphabet.indexOf(currentLetter);
        var shiftedIndex = shiftIndex(alphabetIndex, dial - (previousIndex * 2));
        previousIndex = shiftedIndex;
        var shiftedLetter = alphabet[shiftedIndex];
        // console.log(currentLetter, '->', shiftedLetter);
        encodedString += shiftedLetter;
    }

    if (encodedString.indexOf('BUNKER') > 0 || encodedString.indexOf('FURLIN') > 0) {
        console.log('Dials:', firstDial, secondDial);
        console.log('Input:', stringToEncode);
        console.log('Output:', encodedString);
        console.log();
        //var answer = {
        //    answer : encodedString
        //};
    }
}

function shiftIndex(alphabetIndex, dial) {
    var upperBound = alphabet.length - 1;
    var shiftedIndex = alphabetIndex + dial;
    while(shiftedIndex > upperBound) {
        shiftedIndex = shiftedIndex - upperBound - 1;
    }
    while(shiftedIndex < 0) {
        shiftedIndex = shiftedIndex + upperBound + 1;
    }
    return shiftedIndex;
}

function postAnswer(answer) {
    console.log('Solution:', JSON.stringify(answer));
    client.put('', answer, function(err, res, body) {
        if (err) { console.log('Error:', err )}
        console.log('Status:', res.statusCode);
        // console.log('Remote:', body);
    });
}