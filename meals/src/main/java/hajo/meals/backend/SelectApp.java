package hajo.meals.backend;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

/**
 *
 * @author sqlitetutorial.net
 */
public class SelectApp {

    /**
     * Connect to the test.db database
     * @return the Connection object
     */
    private Connection connect() {
        String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }


    /**
     * select all rows in the warehouses table
     */
    public void printAllMeals(){
        String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";
        String sql = "SELECT * FROM meals";

        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)){

            // loop through the result set
            while (rs.next()) {
                System.out.println(
                        rs.getInt("meal_id") +  "\t" +
                                rs.getString("name") + "\t" +
                                rs.getInt("notMonWed") + "\t" +
                                rs.getString("category")
                );
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
    public ArrayList<MealResponseObject> SelectAllMeals(){
        String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";
        String sql = "SELECT * FROM meals";

        Integer meal_id;
        String name;
        String notMonWed;
        HashMap<String, String> ingredients;
        String category;
        ArrayList<MealResponseObject> mealResponseObjectArrayList = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)){

            // loop through the result set
            while (rs.next()) {
                meal_id = rs.getInt("meal_id");
                name = rs.getString("name");
                notMonWed = rs.getString("notMonWed");
                ingredients = getAllIngredientsForMeal(meal_id);
                category = rs.getString("category");
                mealResponseObjectArrayList.add(new MealResponseObject(meal_id, name, notMonWed,ingredients, category));
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return mealResponseObjectArrayList;
    }
    public HashMap<String, String> getAllIngredientsForMeal(Integer meal_id) {
        String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";
        String sql = "SELECT ingredient, quantity FROM meals_ingredients WHERE meal_id = " + meal_id;
        String ingredient;
        String quantity;
        HashMap<String, String> ingredientMap = new HashMap<>();

        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)){

            // loop through the result set
            while (rs.next()) {
                ingredient = rs.getString("ingredient");
                quantity = rs.getString("quantity");
                ingredientMap.put(ingredient, quantity);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return ingredientMap;
    }
    public void printAllIngredients(){
        String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";
        String sql = "SELECT * FROM meals_ingredients";

        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)){

            // loop through the result set
            while (rs.next()) {
                System.out.println(
                        rs.getInt("meal_id") +  "\t" +
                        rs.getString("ingredient") + "\t" +
                        rs.getString("quantity")
                );
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public ArrayList<MealResponseObject> queryMealsByCategoryCount(Integer category1Count, Integer category2Count, Integer category3Count, Integer category4Count, Integer category5Count, Integer category6Count, Integer category7Count) {
        String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";

        Integer meal_id;
        String name;
        String notMonWed;
        HashMap<String, String> ingredients;
        String category;
        ArrayList<MealResponseObject> mealResponseObjectArrayList = new ArrayList<>();

        HashMap<String, Integer> loopMap = new HashMap<>();
        loopMap.put("Fleisch", category1Count);
        loopMap.put("Auflauf", category2Count);
        loopMap.put("Reis", category3Count);
        loopMap.put("Nudeln", category4Count);
        loopMap.put("Kartoffeln", category5Count);
        loopMap.put("Suppen/Eintopf", category6Count);
        loopMap.put("Divers", category7Count);

        Set<String> keySet = loopMap.keySet();

        for (String key : keySet) {
            Integer count = loopMap.get(key);
            if (count == 0) {
                continue;
            }
            String sql = "SELECT * FROM meals WHERE category = '"+key+"' ORDER BY RANDOM() LIMIT "+count.toString()+";";

            try (Connection conn = DriverManager.getConnection(url);
                 Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(sql)){

                // loop through the result set
                while (rs.next()) {
                    meal_id = rs.getInt("meal_id");
                    name = rs.getString("name");
                    notMonWed = rs.getString("notMonWed");
                    ingredients = getAllIngredientsForMeal(meal_id);
                    category = rs.getString("category");
                    mealResponseObjectArrayList.add(new MealResponseObject(meal_id, name, notMonWed,ingredients, category));
                }
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }



        return mealResponseObjectArrayList;
    }

    public ArrayList<MealResponseObject> getRandomMealFromCategory(String searchCategory, Integer count) {
        String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";
        String sql = "SELECT * FROM meals ORDER BY RANDOM() LIMIT 0;";
        Integer meal_id;
        String name;
        String notMonWed;
        HashMap<String, String> ingredients;
        String category;
        ArrayList<MealResponseObject> mealResponseObjectArrayList = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)){

            // loop through the result set
            while (rs.next()) {
                meal_id = rs.getInt("meal_id");
                name = rs.getString("name");
                notMonWed = rs.getString("notMonWed");
                ingredients = getAllIngredientsForMeal(meal_id);
                category = rs.getString("category");
                mealResponseObjectArrayList.add(new MealResponseObject(meal_id, name, notMonWed,ingredients, category));
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return mealResponseObjectArrayList;
    }

    public Integer getIdFromName(String name){
        String sql = "SELECT meal_id FROM meals WHERE name = ?";

        try (Connection conn = this.connect();
             PreparedStatement pstmt  = conn.prepareStatement(sql)){

            // set the value
            pstmt.setString(1,name);
            //
            ResultSet rs  = pstmt.executeQuery();
            return rs.getInt("meal_id");
            // loop through the result set

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return null;
        }

    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        SelectApp app = new SelectApp();
        System.out.println("-------------------------");
        /*
        ArrayList<MealResponseObject> meals = app.getRandomMealFromCategory("Fleisch", 1);
        for (MealResponseObject meal: meals) {
            System.out.println("meal = " + meal.getName());
        }
        */


        System.out.println("\n All Meals");
        app.printAllMeals();

        System.out.println("-------------------------");

        System.out.println("\n All Ingredients");
        app.printAllIngredients();

        /*
        ArrayList<MealResponseObject> meals = app.getRandomMealFromCategory("Fleisch", 1);
        for (MealResponseObject meal: meals) {
            System.out.println("meal = " + meal.getName());
        }

        Integer category1 = 1;
        Integer category2 = 1;
        Integer category3 = 1;
        Integer category4 = 1;
        Integer category5 = 1;
        Integer category6 = 1;
        Integer category7 = 1;

        SelectApp selectApp = new SelectApp();
        ArrayList<MealResponseObject> meals = selectApp.queryMealsByCategoryCount(category1, category2, category3, category4, category5, category6, category7);
        System.out.println("-------------------------");
        for (MealResponseObject meal: meals) {
            System.out.println("meal = " + meal.getName());
        }
        */
        System.out.println("-------------------------");

    }
}