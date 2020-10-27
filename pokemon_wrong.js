//input list of Pokemon names
const fs = require('fs');


var pokemon;

async function getInput(fileName){
    //await 
    fs.readFile(fileName, function (err, data) {
    if (err) {
        return console.error(err);
    }
    pokemon = data.toString();
    console.log(pokemon);
    return pokemon;
    });

}

//let readPromise = new Promise(func => func('input.txt'))
let readPromise = new Promise(resolve => resolve("input.txt"));

let inputPromise = readPromise.then(filename => {
    var x = getInput(filename);
    console.log("We got here" + pokemon);
    return x;
})

inputPromise.then(input => {
        console.log(inputPromise); 
        var output = input.split('\n');

    })

//output list of Pokemon names & types


//pokemon = pokemon.split('\n');
//console.log(pokemon);
