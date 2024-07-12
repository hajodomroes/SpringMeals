
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
                nameCell.classList.add("name");
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
                  liIngredients.classList.add("ingredient");
                  ulIngredients.appendChild(liIngredients);
                  var liQuantity = document.createElement('li');
                  liQuantity.textContent = value;
                  liQuantity.classList.add("quantity");
                  ulQuantity.appendChild(liQuantity);
                }
                ingredientsCell.appendChild(ulIngredients);
                quantityCell.appendChild(ulQuantity);
                row.appendChild(ingredientsCell);
                row.appendChild(quantityCell);

                var categoryCell = document.createElement('td');
                categoryCell.textContent = category;
                row.appendChild(categoryCell);

                var checkBoxCell = document.createElement("td");
                var checkBox = document.createElement("input");
                checkBox.classList.add("form-check-input");
                checkBox.type = "checkbox";
                checkBoxCell.appendChild(checkBox);
                row.appendChild(checkBoxCell);

                tbody.appendChild(row);
    }

    function keepCheckedMeals() {
        var tbody = document.getElementById("shoppingListTableBody");
        var allRows = tbody.getElementsByTagName("tr");

        for (var i = 0; i < allRows.length; i++) {
            var currentRow = allRows[i];
            console.log(currentRow);
            var checkBox = currentRow.getElementsByClassName("form-check-input");
            console.log(checkBox);
        }
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

    function closeLoginForm() {
        document.getElementById("loginForm").style.display = "none";
    }

    function changeLoginStatus() {
        var profileIcon = document.getElementById("loginStatus");
        profileIcon.classList.toggle("bi-person-fill-lock");
        profileIcon.classList.toggle("bi-person-check-fill");

        document.getElementById("loginForm").style.display = "block";

        var loginAlert = $("#login-alert");
        var loginText = document.getElementById("login-text");
        if (profileIcon.classList.contains("bi-person-fill-lock")) {
            loginText.innerHTML = "logout successful";
            loginAlert.fadeIn(1000);
            loginAlert.fadeOut(3000);
        } else if (profileIcon.classList.contains("bi-person-check-fill")) {
            loginText.innerHTML = "login successful";
            loginAlert.fadeIn(1000);
            loginAlert.fadeOut(3000);
        }

    }

    function closeLoginAlert() {
        var loginAlert = document.getElementById("login-alert");
        loginAlert.style.display = "none";
    }


    function toggleBlur() {
        var shoppingList = document.getElementById("shoppingList");
        shoppingList.classList.toggle("fullscreen-container");
        var shoppingList = document.getElementById("shoppingList");
        if (shoppingList.style.display = "block") {
        shoppingList.style.display = "none";
        }
    }

    function showShoppingList() {
        toggleBlur();
        var shoppingList = document.getElementById("shoppingList");
        shoppingList.style.display = "block";
        var ingredientQuantityMap = extractShoppingList();
        var tableBody = document.getElementById("shoppingListTableBody2");

        ingredientQuantityMap.forEach(function(value, key) {
            var row = tableBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            var checkBoxCell = document.createElement("input");
            checkBoxCell.type = "checkbox";

            cell1.textContent = key;
            cell2.textContent = value;
            cell3.appendChild(checkBoxCell);
        });
    }

    function extractShoppingList() {
        var allIngredients = document.getElementsByClassName("ingredient");
        var ingredientsArray = [];
        // Ingredients Array
        Array.prototype.forEach.call(allIngredients, function(ingredient) {
            ingredientsArray.push(ingredient.textContent);
        });
        // Quantity Array
        var allQuantities = document.getElementsByClassName("quantity");
        var quantitiesArray = [];
        Array.prototype.forEach.call(allQuantities, function(quantity) {
            quantitiesArray.push(quantity.textContent);
        });
        // Ingredient-Quantity Map
        var ingredientQuantityMap = new Map();
        Array.prototype.forEach.call(allIngredients, function(ingredient, index) {
            var quantity = allQuantities[index].textContent;
            /*
            if (ingredientQuantityMap.has(ingredient.textContent)) {
                var currentQuantity = ingredientQuantityMap.get(ingredient.textContent);
                var cleanCurrentQuantity = parseInt(currentQuantity.replace(/[^0-9]/g, ''));
                var cleanQuantity = parseInt(quantity.replace(/[^0-9]/g, ''));

                var newQuantity = cleanCurrentQuantity + cleanQuantity;
                ingredientQuantityMap.set(ingredient.textContent, quantity);

            }
            */
           ingredientQuantityMap.set(ingredient.textContent, quantity);
        });
        return ingredientQuantityMap;
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