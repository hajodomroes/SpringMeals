function submitFunction(s){
    let meal = '{"Gericht", "lvl", "ingrediants", "category"}';
	alert('Gericht "' + s + '" wurde gespeichert!' + meal);
}
function openInputDialog(){
    if (document.getElementById("inputDialog").hasAttribute("open")) {
        closeInputDialog();
    }
    else {document.getElementById("inputDialog").showModal();}
}
function closeInputDialog(){
    document.getElementById("inputDialog").close();
}
function test(){
    document.getElementById("inputDialog").open = false;
}
function submitMeal() {
    name = document.getElementById("name").value;
    lvl = document.getElementById("lvl").value;
    ingrediants = document.getElementById("ingrediants").value;
    category = document.getElementById("category").value;
}