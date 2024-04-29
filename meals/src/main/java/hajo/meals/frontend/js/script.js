
    function showmealsGenerator() {
        // hide / show Generator and add to DB
        var mealsGenerator = document.getElementById("mealsGenerator");
        mealsGenerator.style.display = "block";

        var addMealsToDB = document.getElementById("addMealForm");
        addMealsToDB.style.display = "none";

        // highlight navbar buttons
        var mealsGeneratorButton = document.getElementById("mealsGeneratorButton");
        mealsGeneratorButton.classList.add('active');

        var addMealsToDBButton = document.getElementById("addMealsToDBButton");
        addMealsToDBButton.classList.remove('active');
        // background-color: #fbfbfb;

    }

    function showAddMealToDB() {
        var mealsGenerator = document.getElementById("mealsGenerator");
        mealsGenerator.style.display = "none";

        var addMealsToDB = document.getElementById("addMealForm");
        addMealsToDB.style.display = "block";

        // highlight navbar buttons
        var mealsGeneratorButton = document.getElementById("mealsGeneratorButton");
        mealsGeneratorButton.classList.remove('active');

        var addMealsToDBButton = document.getElementById("addMealsToDBButton");
        addMealsToDBButton.classList.add('active');

    }


    function addRow(event) {
        event.preventDefault();

        var tableBody = document.getElementById("mealTableBody");

        var newRow = document.createElement("div");
        newRow.className = "row";

        var nameInput = document.createElement("input");
        nameInput.className = "col form-control";
        newRow.appendChild(nameInput);

        var quantityInput = document.createElement("input");
        quantityInput.className = "col form-control";
        newRow.appendChild(quantityInput);

        var addButton = document.createElement("button");
        addButton.className = "col-1 btn btn-primary";
        addButton.innerHTML = '<i class="fa fa-plus"></i>';
        addButton.onclick = addRow;
        newRow.appendChild(addButton);

        var deleteButton = document.createElement("button");
        deleteButton.className = "col-1 btn btn-primary";
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.onclick = deleteRow;
        newRow.appendChild(deleteButton);

        tableBody.appendChild(newRow);
    }

    function deleteRow(event) {
           event.preventDefault();
           var row = event.target.parentNode;

           var mealTableBody = document.getElementById("mealTableBody");
           if (row.parentNode === mealTableBody) {
               if (row.rowIndex !== 0) {
                   mealTableBody.removeChild(row);
               } else {
                   console.log("Cannot delete the first row.");
               }
           } else {
               console.error("Row parent is not mealTableBody");
           }
        }

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



    function removeAllRows() {
        // Referenz auf das tbody-Element der Tabelle erhalten
        var tbody = document.getElementById("shoppingListTableBody");

        // Alle Zeilen aus dem tbody entfernen
        tbody.innerHTML = '';
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

    function tableAddMeal(name, notMonWed, ingredientsMap, category) {
                var tbody = document.getElementById("shoppingListTableBody");

                var row = document.createElement('tr');

                var nameCell = document.createElement('td');
                nameCell.textContent = name;
                row.appendChild(nameCell);

                var notMonWedCell = document.createElement('td');
                notMonWedCell.textContent = notMonWed;
                row.appendChild(notMonWedCell);

                var ingredientsCell = document.createElement('td');
                var ulIngredients = document.createElement('ul');

                var quantityCell = document.createElement('td');
                var ulQuantity = document.createElement('ul');

                var keyList = ingredientsMap.keys();
                for (const [key, value] of ingredientsMap) {

                  var liIngredients = document.createElement('li');
                  liIngredients.textContent = key;
                  ulIngredients.appendChild(liIngredients);

                  var liQuantity = document.createElement('li');
                  liQuantity.textContent = value;
                  ulQuantity.appendChild(liQuantity);
                }
                ingredientsCell.appendChild(ulIngredients);
                quantityCell.appendChild(ulQuantity);

                //alert(name, notMonWed, ingredients, category);
                /*
                ingredients.forEach(function(ingredient) {
                    var li = document.createElement('li');
                    li.textContent = ingredient;
                    ul.appendChild(li);
                });
                ingredientsCell.appendChild(ul);
                */
                row.appendChild(ingredientsCell);
                row.appendChild(quantityCell);
                var categoryCell = document.createElement('td');
                categoryCell.textContent = category;
                row.appendChild(categoryCell);

                tbody.appendChild(row);
    }

    function queryMealsByCategoryCount() {
        removeAllRows();
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

    function test() {
        fetch('http://localhost:8080/api/test', {
            method: 'POST',
            headers: {
                'Origin': 'http://localhost:63342/SpringMeals/meals/src/main/java/hajo/meals/frontend/main.html',
                'Content-Type': 'text/plain',
            },
            body: "Hello"
        })
        .then(response => response.text())
        .then(data => {
            //alert(data);
        })
        .catch(error => console.error('Error: ', error));
    }