package hajo.meals.backend;

import java.util.*;

public class Meals {
    private static List<Meal> mealList = List.of(
            new Meal("Bolognese", "low", List.of("Spaghetti 500g", "gehackte Tomaten", "Paprika", "Fertigtüte Bolognese", "Hackfleisch 500g"), "Nudeln"),
            new Meal("Wraps", "low", List.of("Putengeschnetzeltes 500g", "Feta", "Paprika", "Mais", "Wraps"), "Sonstiges"),
            new Meal("Monte-Auflauf", "hard", List.of("Nudeln 500g", "Paprika", "Mais", "Feta", "Hackfleisch 500g", "Streukäse", "Sahne", "Fertigtüte Auflauf"), "Nudeln")
    );
    public static List<Meal> getMealList() {
        return mealList;
    }
    public static Meal getRandomMeal (List<Integer> usedMealsIndex) {
        Random r = new Random();
        int random = r.nextInt(getMealList().size());
        if (usedMealsIndex.contains(random)) {
            getRandomMeal(usedMealsIndex);
        }
        return mealList.get(random);
    }
}
