//input.txt is the list of Pokemon names
const fs = require('fs');
var fetch = require('node-fetch');

//returns a promise resolved with the input file as a string
async function getInput(filename) {
    return new Promise((resolve,reject) => {
        fs.readFile(filename,(err,buffer) => {
            if (err){
                reject(err);
            }
            else{
                resolve(buffer.toString())
            }
        })
    })
}

//returns an array of pokemon that has been parsed from each new line
function inputToArray(input){
    //To see the array of pokemon read from the list.
    //console.log(input.split('\n'));
    return input.split('\n')
}

//gets the information for the given pokemon "name" parameter
//returns an array of json objects representing each pokemon
async function getInfo(nameArray){
    let info = [];
    for(name of nameArray){
        let fetched = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        info.push(await fetched.json());
    }
    return info
}

//prints the info in the format 'Name: types,[...]
function printInfo(infoArray){
    for(data of infoArray){
       let formalName = data.name[0].toUpperCase()+data.name.slice(1);
        let types = data.types.map(slot => slot.type.name);
        let typesString = types.join(', ');
        let output = `${formalName}: ${typesString}` 
        console.log(output)
    }
}


//When resolved, this holds the string value of the input.txt file
let promiseForInput = 
    getInput('input.txt');

//When resolved, this holds an array of pokemon    
let promiseForArray = 
    promiseForInput.then(
                        data=>inputToArray(data),
                        err=>console.error(err)
                        );

//When resolved, this holds an array of json'd pokemon objects
let promiseToFetchInfo = 
    promiseForArray.then(
                        array=>{
                            return getInfo(array)
                        },
                        err=>console.error(err)
                        );

// when resolved this console.logs the formatted pokemon objects.                        
let promiseToPrintInfo = promiseToFetchInfo.then(
    infoArray=> {
        printInfo(infoArray)
    })
        

