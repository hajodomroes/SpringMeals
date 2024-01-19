package hajo.meals.backend;

import org.springframework.web.bind.annotation.*;

import org.json.JSONObject;

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
        String ingredients = jsonObject.getString("ingredients");
        String category = jsonObject.getString("category");


        return "Successfully added following meal to database: " + mealString;
    }
    @PostMapping("/test")
    public String test(@RequestBody String string) {
        // Process the received data on the backend
        // You can perform business logic here

        return "Natz, was machen Sachen? | Body: " + string;
    }
}
