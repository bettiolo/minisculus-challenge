var request = require('request-json');
var challengeUrl = 'http://minisculuschallenge.com/4baecf8ca3f98dc13eeecbac263cd3ed';
var client = request.newClient(challengeUrl);

var alphabet = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    ".", ",", "?", "!", "'", "\"", " "
];

decodeWithMark4("WZyDsL3u'0TfxP06RtSSF 'DbzhdyFIAu2 zF f5KE\"SOQTNA8A\"NCKPOKG5D9GSQE'M86IGFMKE6'K4pEVPK!bv83I");

function decodeWithMark4(stringToEncode) {
    var encodedString = '';
    var dial = -(7 - (2 * 2));
    console.log('Dial', dial);
    var previousIndex = 0;
    for(var i = 0; i < stringToEncode.length; i++) {
        var currentLetter = stringToEncode[i];
        var alphabetIndex = alphabet.indexOf(currentLetter);
        var shiftedIndex = shiftIndex(alphabetIndex, dial - (previousIndex * 2));
        console.log('Previous Index', previousIndex);
        console.log('Shifted Index', shiftedIndex);
        previousIndex = shiftedIndex;
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
        console.log('Remote:', body);
    });
}