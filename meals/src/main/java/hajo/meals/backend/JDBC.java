package hajo.meals.backend;

import java.sql.*;
import java.util.Arrays;

public class JDBC {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mealsdatabase";
        String username = "root";
        String password = "N7v8fEHHnZCr3X";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection connection = DriverManager.getConnection(url, username, password);


            //Statement statement = connection.createStatement();
            //PreparedStatement preparedStatement = connection.createStatement();

            String querry = "INSERT INTO mealslist VALUES ('GerichtZwei')";
            PreparedStatement preparedStatement = connection.prepareStatement(querry);

            //preparedStatement.executeUpdate(sqlStatementInsert);
            ResultSet resultSet = preparedStatement.executeQuery("SELECT * FROM mealslist");

            while (resultSet.next()) {
                System.out.println(resultSet.getString(1) + resultSet.getString(2) + resultSet.getString(3) + resultSet.getString(4));
            }

            connection.close();

        } catch (Exception e){
            System.out.println("Error in Connection: " + e);
        }
    }
}
