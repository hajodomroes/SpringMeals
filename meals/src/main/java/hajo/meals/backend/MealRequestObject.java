package hajo.meals.backend;

public class MealRequestObject {
    private String name;
    private boolean monWed;
    private String ingredients;
    private String category;

    public MealRequestObject(String name, boolean monWed, String ingredients, String category) {
        this.name = name;
        this.monWed = monWed;
        this.ingredients = ingredients;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public boolean monWed() {
        return monWed;
    }

    public String ingredients() {
        return ingredients;
    }

    public String category() {
        return category;
    }
}