

function trimListMap(liste){
    let tab = liste.map(function(elem){
        //return elem.error.trim().toLowerCase();
        return capitalizeFirstLetter(elem.error.trim().toLowerCase());
    });
    return tab;
}



// program to convert first letter of a string to uppercase
function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}