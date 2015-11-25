var FoodModule = (function () {
    // Return anything that you want to expose outside the closure
    return {
        getFood: function (callback) {

            $.ajax({
                type: "GET",
                dataType: "json",
                url: "http://finalnandoso.azurewebsites.net/api/foods",
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });

        }
    };
}());