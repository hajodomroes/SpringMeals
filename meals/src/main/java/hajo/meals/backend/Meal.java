package hajo.meals.backend;

import java.util.List;

public class Meal {
    private String name;
    private String complexLevel;
    private List<String> ingredients;
    private String category;

    public Meal(String name, String complexLevel, List<String> ingredients, String category) {
        this.name = name;
        this.complexLevel = complexLevel;
        this.ingredients = ingredients;
        this.category = category;
    }
    public String getName () {
        return name;
    }
    public String getComplexLevel () {
        return complexLevel;
    }
    public List<String> getIngredients () {
        return ingredients;
    }
    public String getCategory () {
        return category;
    }
}

/*

Gericht nicht 2 Woche nacheinander --> PrioritätenArrayListe

*/