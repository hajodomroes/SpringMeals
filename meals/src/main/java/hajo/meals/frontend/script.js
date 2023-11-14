function submitFunction(s){
    let meal = '{"Gericht", "lvl", "ingrediants", "category"}';
	alert('Gericht "' + s + '" wurde gespeichert!' + meal);
}
function openInputDialog(){
    if (document.getElementById("inputDialog").hasAttribute("open")) {
        closeInputDialog();
    }
    else {document.getElementById("inputDialog").show();}
}
function closeInputDialog(){
    document.getElementById("inputDialog").close();
}