let changedBreakpoints = {};  // This object contains the mapping of nodeKey and breakpoints String format --> {2:11 : sm:bg-red-blue lg:font-bold}...
let addedCustomClasses = {};
let addedTagName = {};

// Global Variables;



export const setBreakPoints = (key, breakpoints) => {
    if(breakpoints === null){return '';}
    let breakPointString = '';
    Object.keys(breakpoints).map(val => {       //Mapping through all the keys from input breakpoints entered by the User
        if(breakpoints[val].length > 0){        // Checking if there is a value for a key (i.e. to ignore the key, whose value is empty)
            breakPointString  = breakPointString + val.toString()+":" + breakpoints[val].toString() + " ";  //Constructing the String format -->{sm:bg-red-blue lg:font-bold}..
        }
    });
    changedBreakpoints[key] = breakPointString;
    return changedBreakpoints;
}

export const checkForAlreadyBreakPointIds = (keyVal) => {
    let breakPointsArray = [];
    let arrayToObjects = {
        'sm': '',
        'md': '',
        'lg': '',
        'xl': '',
        '2xl': '',
    };
    if(keyVal in changedBreakpoints){
        breakPointsArray = changedBreakpoints[keyVal].split(" ");
    }

    breakPointsArray.map(v => {
        let bpIdentifier, bpValue;
        if(v.length != 0){
            bpIdentifier = v.slice(0, v.indexOf(':'));
            bpValue = v.slice(v.indexOf(':')+1, v.length-1);
            arrayToObjects[bpIdentifier] = bpValue;
        }
    });

    return arrayToObjects;
}