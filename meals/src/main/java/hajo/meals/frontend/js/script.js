function submitMeal() {
    name = document.getElementById("name").value;
    lvl = document.getElementById("lvl").value;
    ingredients = document.getElementById("ingredients").value;
    category = document.getElementById("category").value;
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

        var rowDataArray = [];

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var nameInput = row.querySelector("input:nth-of-type(1)");
            var quantityInput = row.querySelector("input:nth-of-type(2)");

            var rowData = {
                name: nameInput.value,
                quantity: quantityInput.value
            };

            rowDataArray.push(rowData);
        }

        return rowDataArray;
    }

function sendData() {
            const inputName = document.getElementById('inputMealName').value;
            const inputMonWed = document.getElementById('selectComplexLvl').checked;
            const inputIngredients = getAllRowsData();
            const inputIngredients = document.getElementById('inputIngredients').value;
            const inputCategory = document.getElementById('inputCategory').value;

            const requestData = {
                    name: inputName,
                    monWed: inputMonWed,
                    ingredients: inputIngredients,
                    category: inputCategory
                };
            const jsonString = JSON.stringify(requestData);

            document.getElementById('testDisplay').innerHTML = jsonString;

            fetch('http://localhost:8080/api/addMeal', {
                method: 'POST',
                headers: {
                    'Origin': 'http://localhost:63342/SpringMeals/meals/src/main/java/hajo/meals/frontend/main.html',
                    //'Content-Type': 'application/json',
                    'Content-Type': 'text/plain',
                },
                body: jsonString
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById('backendResponse').innerHTML = data;
            })
            .catch(error => console.error('Error: ', error));

            event.preventDefault();
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
                            alert(data);
                        })
                        .catch(error => console.error('Error: ', error));
            }