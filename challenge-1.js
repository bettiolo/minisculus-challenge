var request = require('request-json');
var challengeUrl = 'http://minisculuschallenge.com/14f7ca5f6ff1a5afb9032aa5e533ad95';
var client = request.newClient(challengeUrl);

client.get('', function(err, res, body) {
    console.log('Remote:', body);
    encodeWithMark1(body.question)
});

function encodeWithMark1(stringToEncode) {
    var alphabet = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        ".", ",", "?", "!", "'", "\"", " "
    ];

    var dial = 6;
    var encodedString = '';

    var upperBound = alphabet.length - 1;
    for(var i = 0; i < stringToEncode.length; i++) {
        var currentLetter = stringToEncode[i];
        var alphabetIndex = alphabet.indexOf(currentLetter);
        var shiftedIndex = alphabetIndex + dial;
        if (shiftedIndex > upperBound) {
            shiftedIndex = shiftedIndex - upperBound - 1;
        }
        var shiftedLetter = alphabet[shiftedIndex];
        console.log(currentLetter, '->', alphabetIndex, '->', shiftedIndex, '->', shiftedLetter);
        encodedString += shiftedLetter;
    }
    console.log('Input:', stringToEncode);
    console.log('Output:', encodedString);
    var answer = {
        "answer": encodedString
    };
    console.log('Solution:', JSON.stringify(answer));
    client.put('', answer, function(err, res, body) {
        if (err) { console.log('Error:', err )}
        console.log('Status:', res.statusCode);
        console.log('Remote:', body);
    });
}