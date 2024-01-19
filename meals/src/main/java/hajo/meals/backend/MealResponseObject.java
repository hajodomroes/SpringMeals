package hajo.meals.backend;

public class MealResponseObject {
    private String name;
    private boolean monWed;
    private String ingredients;
    private String category;

    public MealResponseObject(String name, boolean monWed, String ingredients, String category) {
        this.name = name;
        this.monWed = monWed;
        this.ingredients = ingredients;
        this.category = category;
    }
}