package hajo.meals.backend;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;

public class MealResponseObject {
    @JsonProperty("meal_id")
    private Integer meal_id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("notMonWed")
    private String notMonWed;
    @JsonProperty("ingredients")
    private HashMap<String, String> ingredients;
    @JsonProperty("category")
    private String category;

    public MealResponseObject(Integer meal_id, String name, String notMonWed, HashMap<String, String> ingredients, String category) {
        this.meal_id = meal_id;
        this.name = name;
        this.notMonWed = notMonWed;
        this.ingredients = ingredients;
        this.category = category;
    }

    public String getName() {
        return name;
    }
}