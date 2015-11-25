document.addEventListener("DOMContentLoaded", function () {
    loadFood();
});

function loadFood() {
    FoodModule.getFood(setupFoodTable);
}

function setupFoodTable(FoodList) {
    var FoodTable = document.getElementById("FoodList");
    console.log(FoodList);

    for (i = 0; i < FoodList.length; i++) {

        // Create row 
        var row = document.createElement('tr');

        // Add the columns in the row (td / data cells)
        var FoodNamecol = document.createElement('td');
        FoodNamecol.innerHTML = FoodList[i].FoodNme;
        row.appendChild(FoodNamecol);

        var FoodPricecol = document.createElement('td');
        FoodPricecol.innerHTML = FoodList[i].FoodPrice;
        row.appendChild(FoodPricecol);

        var FoodDesccol = document.createElement('td');
        FoodDesccol.innerHTML = FoodList[i].FoodDesc;
        row.appendChild(FoodDesccol);

        // Append the row to the end of the table
        FoodTable.appendChild(row);
    }

}