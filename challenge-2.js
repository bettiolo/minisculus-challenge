var request = require('request-json');
var challengeUrl = 'http://minisculuschallenge.com/2077f244def8a70e5ea758bd8352fcd8';
var client = request.newClient(challengeUrl);

client.get('', function(err, res, body) {
    console.log('Remote:', body);
    encodeWithMark2(body.question)
});

var alphabet = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    ".", ",", "?", "!", "'", "\"", " "
];

function encodeWithMark2(stringToEncode) {
    var dial = 9 - (3 * 2);

    var encodedString = '';
    for(var i = 0; i < stringToEncode.length; i++) {
        var currentLetter = stringToEncode[i];
        var shiftedLetter = shiftLetter(currentLetter, dial);
        console.log(currentLetter, '->', shiftedLetter);
        encodedString += shiftedLetter;
    }

    console.log('Input:', stringToEncode);
    console.log('Output:', encodedString);
    var answer = {
        answer : encodedString
    };
    postAnswer(answer);
}

function shiftLetter(currentLetter, dial) {
    var upperBound = alphabet.length - 1;
    var alphabetIndex = alphabet.indexOf(currentLetter);
    var shiftedIndex = alphabetIndex + dial;
    if (shiftedIndex > upperBound) {
        shiftedIndex = shiftedIndex - upperBound - 1;
    }
    var shiftedLetter = alphabet[shiftedIndex];
    return shiftedLetter;
}

function postAnswer(answer) {
    console.log('Solution:', JSON.stringify(answer));
    client.put('', answer, function(err, res, body) {
        if (err) { console.log('Error:', err )}
        console.log('Status:', res.statusCode);
        console.log('Remote:', body);
    });
}