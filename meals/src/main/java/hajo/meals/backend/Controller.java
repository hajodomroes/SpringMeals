package hajo.meals.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class Controller {

    @PostMapping("/addMeal")
    public String processData(@RequestBody Map<String, Object> meal) {
        String name = meal.get("name").toString();
        //String notMonWed = (String) meal.get("notMonWed");
        HashMap<String, String> ingredients = (HashMap<String, String>) meal.get("ingredients");
        String category = meal.get("category").toString();


        System.out.println(name.length());
        InsertApp insertApp = new InsertApp();

        insertApp.insertMeal(name, "0", category);
        insertApp.insertIngredients(name, ingredients);


        SelectApp selectApp = new SelectApp();
        System.out.println("\nMeals:");
        selectApp.printAllMeals();
        System.out.println("\nIngredients:");
        selectApp.printAllIngredients();

        return "Success: " + meal.toString();
    }

    @GetMapping("/allMeals")
    public ResponseEntity<ArrayList<MealResponseObject>> getAllMeals() {
        SelectApp selectApp = new SelectApp();
        ArrayList<MealResponseObject> meals = selectApp.SelectAllMeals();
        return ResponseEntity.ok().body(meals);
    }

    @GetMapping("/queryMealsByCategoryCount")
    public ResponseEntity<ArrayList<MealResponseObject>> queryMealsByCategoryCount(@RequestParam String category1Count, @RequestParam String category2Count,
                                                                                   @RequestParam String category3Count, @RequestParam String category4Count,
                                                                                   @RequestParam String category5Count, @RequestParam String category6Count,
                                                                                   @RequestParam String category7Count)
    {
        Integer category1 = Integer.parseInt(category1Count);
        Integer category2 = Integer.parseInt(category2Count);
        Integer category3 = Integer.parseInt(category3Count);
        Integer category4 = Integer.parseInt(category4Count);
        Integer category5 = Integer.parseInt(category5Count);
        Integer category6 = Integer.parseInt(category6Count);
        Integer category7 = Integer.parseInt(category7Count);

        SelectApp selectApp = new SelectApp();
        ArrayList<MealResponseObject> meals = selectApp.queryMealsByCategoryCount(category1, category2, category3, category4, category5, category6, category7);
        return ResponseEntity.ok().body(meals);
    }

    @PostMapping("/test")
    public String test(@RequestBody String string) {
        // Process the received data on the backend
        // You can perform business logic here

        return "Natz, was machen Sachen? | Body: " + string;
    }
}
