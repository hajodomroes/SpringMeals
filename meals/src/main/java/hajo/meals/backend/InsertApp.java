package hajo.meals.backend;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

public class InsertApp {

    private Connection connect() {
        // SQLite connection string
        String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }

    public void insertMeal(String name, String notMonWed, String category) {
        String sql = "INSERT INTO meals(name, notMonWed, category) VALUES(?,?,?)";

        try (Connection conn = this.connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            //  pstmt.setInt(1, meal_id);
            pstmt.setString(1, name);
            pstmt.setString(2, notMonWed);
            pstmt.setString(3, category);
            pstmt.executeUpdate();
            System.out.println("Added to db: name = " + name + ", notMonWed = " + notMonWed + ", category = " + category);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public void insertIngredients(String name, HashMap<String, String> ingredients) {
            String sql = "INSERT INTO meals_ingredients(meal_id, ingredient, quantity) VALUES(?,?,?)";
            SelectApp selectApp = new SelectApp();
            Integer meal_id = selectApp.getIdFromName(name);
            System.out.println(ingredients);
            ArrayList<String> keyList = new ArrayList<String>(ingredients.keySet());
            Integer i = 0;
            while (i < ingredients.size()) {
                String ingredient = keyList.get(i);
                String quantity = ingredients.get(ingredient);
                try (Connection conn = this.connect();
                     PreparedStatement pstmt = conn.prepareStatement(sql)) {
                    pstmt.setInt(1, meal_id);
                    pstmt.setString(2, ingredient);
                    pstmt.setString(3, quantity);

                    pstmt.executeUpdate();
                    System.out.println("Added to db: meal_id = " + meal_id + ", ingredient = " + ingredient + ", quantity = " + quantity);
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
                i++;
            }
    }


    public void deleteMealById(Integer meal_id) {
        String sql = "DELETE FROM meals WHERE meal_id = ?";
        try (Connection conn = this.connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, meal_id);
            int rowsAffected = pstmt.executeUpdate();
            conn.commit();
            System.out.println("meals Rows affected: " + rowsAffected);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        sql = "DELETE FROM meals_ingredients WHERE meal_id = ?";
        try (Connection conn = this.connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, meal_id);
            int rowsAffected = pstmt.executeUpdate();
            conn.commit();
            System.out.println("meals_ingredients Rows affected: " + rowsAffected);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public void executeSQL(String sql) {
        try (Connection conn = this.connect(); Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void main(String[] args) {

        InsertApp app = new InsertApp();
        HashMap<String, String> ingredients = new HashMap<>();
        ingredients.put("Baguette Brot", "2");
        //app.insertIngredients("Chili Con Carne", ingredients);
        /*
        app.insertMeal("DummyMeal", "1", "Fleisch");

        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Dummy", "1");
        hashMap.put("Dummy", "2");
        app.insertIngredients("DummyMeal", hashMap);
         */
        app.executeSQL("UPDATE meals_ingredients SET quantity = '800g' WHERE meal_id = 9 AND ingredient = 'Hackfleisch'");
    }

}