var request = require('request-json');
var challengeUrl = 'http://minisculuschallenge.com/36d80eb0c50b49a509b49f2424e8c805';
var client = request.newClient(challengeUrl);

var alphabet = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    ".", ",", "?", "!", "'", "\"", " "
];

encodeWithMark4('The white cliffs of Alghero are visible at night');

function encodeWithMark4(stringToEncode) {
    var encodedString = '';
    var dial = 4 - (7 * 2);
    var previousIndex = 0;
    for(var i = 0; i < stringToEncode.length; i++) {
        var currentLetter = stringToEncode[i];
        var alphabetIndex = alphabet.indexOf(currentLetter);
        var shiftedIndex = shiftIndex(alphabetIndex, dial + (previousIndex * 2));
        previousIndex = alphabetIndex;
        var shiftedLetter = alphabet[shiftedIndex];
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

function shiftIndex(alphabetIndex, dial) {
    var upperBound = alphabet.length - 1;
    var shiftedIndex = alphabetIndex + dial;
    while(shiftedIndex > upperBound) {
        shiftedIndex = shiftedIndex - upperBound - 1;
    }
    return shiftedIndex;
}

function postAnswer(answer) {
    console.log('Solution:', JSON.stringify(answer));
    client.put('', answer, function(err, res, body) {
        if (err) { console.log('Error:', err )}
        console.log('Status:', res.statusCode);
        console.log('Remote:', body);
    });
}