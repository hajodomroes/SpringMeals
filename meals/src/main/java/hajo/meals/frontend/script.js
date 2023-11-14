function submitFunction( s ){
    let meal = '{"Gericht", "lvl", "ingrediants", "category"}';
	alert('Gericht "' + s + '" wurde gespeichert!' + meal);
}
function openInputDialog() {
  document.getElementById("inputDialog").open = true;
}