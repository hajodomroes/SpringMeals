package hajo.meals.backend;

public class Main {
    public static void main(String[] args) {

        new GUI();
        /*
        backend.DBConnection connection = new backend.DBConnection();
        connection.addMeal("Spaghetti", "low", "dinge", "nudeln");
        connection.getData("select * from mealsList");
        /*

        String query = "INSERT INTO `mealsdatabase`.`mealslist` (`name`, `complexlevel`, `ingrediants`, `category`) VALUES ('Test', 'Test', 'Test', 'Test');";
        //connection.updateData(query);
        connection.getData("select * from mealsList");
        System.out.println("-------------");

        query = "DELETE FROM `mealsdatabase`.`mealslist` WHERE (`name` = 'Test');";
        connection.updateData(query);

        connection.getData("select * from mealsList");
        /*
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
        */
    }
}