package hajo.meals.backend;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

class GUI{

    private DBConnection conn = new DBConnection();

    public GUI() {
        // FRAME
        JFrame frame = new JFrame("backend.Meals backend.GUI");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(900, 900);

        // BUTTON
        JButton button = new JButton("Show backend.Meals");
        button.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                onPressButtonAddTest();
            }
        } );

        // TABLE
        String[] colums = {"name", "complexLevel", "ingrediants", "category"};
        String[][] data = {};
        JTable table = new JTable(data, colums);
        table.setBounds(50, 50, 700, 200);



        frame.getContentPane().setLayout(new BorderLayout());
        frame.getContentPane().add(button, BorderLayout.SOUTH);
        frame.getContentPane().add(table, BorderLayout.NORTH);


        frame.setVisible(true);
    }

    public void onPressButtonAddTest() {
        String exampleQuery = "INSERT INTO `mealsdatabase`.`mealslist` (`name`, `complexlevel`, `ingrediants`, `category`) VALUES ('Button', 'Button', 'Button', 'Button');";
        conn.addMeal("Button", "Button", "Button", "Button");
    }
}