    function getAllRowsData() {
        var mealTableBody = document.getElementById("mealTableBody");
        var rows = mealTableBody.getElementsByClassName("row");
        var rowDataMap = {};

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var nameInput = row.querySelector("input:nth-of-type(1)");
            var quantityInput = row.querySelector("input:nth-of-type(2)");

            if (nameInput && quantityInput) {
                rowDataMap[nameInput.value] = quantityInput.value;
            }
        }
        return rowDataMap;
    }

    function sendData(event) {
        event.preventDefault();

        const inputName = document.getElementById('inputMealName').value;
        var inputNotMonWed = 0;
        if (document.getElementById('notMonWed').checked) {
            inputNotMonWed = 1;
        } else {
            inputNotMonWed = 0;
        }
        const inputIngredients = getAllRowsData();
        const inputCategory = document.getElementById('inputCategory').value;

        const requestData = {
            name: inputName,
            notMonWed: inputNotMonWed,
            ingredients: inputIngredients,
            category: inputCategory
        };

        fetch('http://localhost:8080/api/addMeal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:63342/SpringMeals/meals/src/main/java/hajo/meals/frontend/main.html'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('backendResponse').innerHTML = data;
        })
        .catch(error => console.error('Error: ', error));
    }

    function fetchMeals() {
        removeAllRows();
        var mealModel = [];
        fetch('http://localhost:8080/api/allMeals')
            .then(response => response.json())
            .then(data => {
                // Daten erhalten, füge sie dem meal-Modell hinzu
                data.forEach(meal => {
                    const name = meal.name;
                    const notMonWed = meal.notMonWed;
                    const ingredients = meal.ingredients;
                    const category = meal.category;

                    // Zugriff auf die Zutaten
                    let ingredientsMap = new Map();
                    for (const [ingredient, quantity] of Object.entries(ingredients)) {
                        //ingredientsString += `${ingredient}: ${quantity}, `;
                        ingredientsMap.set(ingredient, quantity);
                    }
                    //alert("name: " + name + " notMonWed: " + notMonWed + " ingredients: " + ingredientsString + " category: " + category);
                    //alert(ingredientsMap);

                    tableAddMeal(name, notMonWed, ingredientsMap, category);
                });
            })
            .catch(error => {
                console.error("Fehler beim Abrufen der Mahlzeiten: ", error);
            });
    }

    function removeUncheckedRows() {
        var tbody = document.getElementById("shoppingListTableBody");
            for (var row of tbody.children) {
                    var checkBox = row.querySelector('.form-check-input');
                    var checked = checkBox.checked;
                    if (checked == false) {
                        alert("sus");
                    }
                }
        }


    function queryMealsByCategoryCount() {
        removeUncheckedRows();
        var categoryCountTable = document.getElementById("categoryCountTable");
        const category1 = document.getElementById('category1').value;
        const category2 = document.getElementById('category2').value;
        const category3 = document.getElementById('category3').value;
        const category4 = document.getElementById('category4').value;
        const category5 = document.getElementById('category5').value;
        const category6 = document.getElementById('category6').value;
        const category7 = document.getElementById('category7').value;

        fetch('http://localhost:8080/api/queryMealsByCategoryCount?category1Count='+category1+"&category2Count="+category2+"&category3Count="+category3+"&category4Count="+category4+"&category5Count="+category5+"&category6Count="+category6+"&category7Count="+category7)
                    .then(response => response.json())
                    .then(data => {
                        // Daten erhalten, füge sie dem meal-Modell hinzu
                        data.forEach(meal => {
                            const name = meal.name;
                            const notMonWed = meal.notMonWed;
                            const ingredients = meal.ingredients;
                            const category = meal.category;

                            // Zugriff auf die Zutaten
                            let ingredientsMap = new Map();
                            for (const [ingredient, quantity] of Object.entries(ingredients)) {
                                ingredientsMap.set(ingredient, quantity);
                            }

                            tableAddMeal(name, notMonWed, ingredientsMap, category);
                        });
                    })
    }