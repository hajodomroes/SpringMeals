package hajo.meals.backend;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DBConnection {
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    Statement statement = null;
    ResultSet resultSet = null;
    String url = "jdbc:mysql://localhost:3306/mealsdatabase";
    String username = "root";
    String password = "N7v8fEHHnZCr3X";
    public DBConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(url, username, password);

        } catch (Exception e){
            System.out.println("Error in Connection: " + e);
        }
    }
    public void getData(String query) {
        try {
            preparedStatement = connection.prepareStatement(query);

            resultSet=preparedStatement.executeQuery();
            while(resultSet.next())
            {
                System.out.println(resultSet.getString(1));
            }
        }
        catch(Exception e) {
            System.out.println("Error in getData: " + e);
        }
    }
    /*
    public ArrayList<String> getDataAsArrayList(String query) {
        String[][] ArrayofArrays = {};
        try {
            preparedStatement = connection.prepareStatement(query);

            resultSet=preparedStatement.executeQuery();

            while(resultSet.next())
            {
                String[] meal = {};
                String name = resultSet.getString("name");
                String complexLevel = resultSet.getString("complexLevel");
                String ingredients = resultSet.getString("ingredients");
                String category = resultSet.getString("category");
                Arrays.stream(meal).toList().add(name);
                Arrays.stream(meal).toList().add(complexLevel);
                Arrays.stream(meal).toList().add(ingredients);
                Arrays.stream(meal).toList().add(category);

                Arrays.stream(ArrayofArrays).toList().add(meal);
            }
        }
        catch(Exception e) {
            System.out.println("Error in getData: " + e);
        }
        return ArrayofArrays;
    }*/

    public void updateData(String query) {
        try {
            statement = connection.createStatement();
            statement.executeUpdate(query);

        } catch(Exception e) {
            System.out.println("Error in postData: " + e);
        }
    }
    public void addMeal(String name, String lvl, String ingrediants, String category) {
        String query = "INSERT INTO `mealsdatabase`.`mealslist` (`name`, `complexlevel`, `ingrediants`, `category`) VALUES ('" + name + "', '" + lvl + "', '" + ingrediants + "', '" + category + "');";
        updateData(query);
    }
}
