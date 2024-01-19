package hajo.meals.backend;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.List;

public class Meal {
    private String name;
    private boolean mondayToWednesday;
    private List<String> ingredients;
    private String category;

    public Meal(String name, boolean complexLevel, List<String> ingredients, String category) {
        this.name = name;
        this.mondayToWednesday = complexLevel;
        this.ingredients = ingredients;
        this.category = category;
    }
    public String getName () {
        return name;
    }
    public boolean getComplexLevel () {
        return mondayToWednesday;
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