package hajo.meals.backend;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.sql.Array;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from Spring Web!";
    }

    @PostMapping("/addMeal")
    public String processData(@RequestBody String mealString) {
        JSONObject jsonObject = new JSONObject(mealString);
        String name = jsonObject.getString("name");
        boolean monWed = jsonObject.getBoolean("monWed");
        JSONArray ingredients = jsonObject.getJSONArray("ingredients");
        String category = jsonObject.getString("category");

        String[] array = extractIngredients(ingredients);
        /**
        Object currentIngredient;
        String currentName;
        String currentQuantity;
        for(int i = 0; i<ingredients.length(); i++) {
            currentIngredient = ingredients.get(i);
            currentName = currentIngredient[0];

        }
        **/

        return "Successfully added following meal to database: " + mealString;
    }

    public static String[] extractIngredients(String[][] ingredients) {
        Array<String> listArray = new Array<List<String>>;
        for (String[] ingredient : ingredients) {
            String name = ingredient[0];
            String quantity = ingredient[1];

        }
    }

    @PostMapping("/test")
    public String test(@RequestBody String string) {
        // Process the received data on the backend
        // You can perform business logic here

        return "Natz, was machen Sachen? | Body: " + string;
    }
}
