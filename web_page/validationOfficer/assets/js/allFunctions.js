const nice = $data.requestResponse.rules;
function isClean(obj) {
    return Object.keys(obj).forEach(k => obj[k] = obj[k].trim());
}

let tab = nice.map(function(elem){
     //return elem.trim();
     
     //return elem.error.trim().toLowerCase();
     return elem['error'].trim().toLowerCase();
});

return tab;