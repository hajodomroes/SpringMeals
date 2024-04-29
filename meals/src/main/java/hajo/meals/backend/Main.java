package hajo.meals.backend;

import java.sql.*;


public class Main {

        public static void connect() {
            Connection conn = null;
            try {
                // db parameters
                String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";
                // create a connection to the database
                conn = DriverManager.getConnection(url);

                System.out.println("Connection to SQLite has been established.");

            } catch (SQLException e) {
                System.out.println(e.getMessage());
            } finally {
                try {
                    if (conn != null) {
                        conn.close();
                    }
                } catch (SQLException ex) {
                    System.out.println(ex.getMessage());
                }
            }
        }
    public static void createNewTable() {
        String url = "jdbc:sqlite:C:/Users/hajod/IdeaProjects/SpringMeals/meals.db";

        // SQL statement for creating a new table
        /*
        String sql = "CREATE TABLE IF NOT EXISTS meals (\n"
                + "	meal_id integer PRIMARY KEY,\n"
                + "	name text NOT NULL,\n"
                + "	onlyMonWed integer NOT NULL,\n"
                + "category text NOT NULL"
                + ");";

        String sql = "CREATE TABLE IF NOT EXISTS meals_ingredients (\n"
                + "	meal_id integer NOT NULL,\n"
                + " ingredient text NOT NULL, \n"
                + "FOREIGN KEY(meal_id) REFERENCES meals(male_id)"
                + ");";
        */
        String sql = "ALTER TABLE meals RENAME COLUMN onlyMonWed TO notMonWed";

        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement()) {
            // create a new table
            stmt.execute(sql);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }


        public static void main(String[] args) {
            //connect();
            InsertApp insertApp = new InsertApp();
            String sql = "DELETE FROM meals WHERE name = 'DummyMeal'";
            insertApp.executeSQL(sql);
        }
}