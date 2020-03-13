package com.example.services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import com.example.models.Student;
import java.util.ArrayList;
import java.util.List;


public class DAO {
	Connection c = null;
	
	public static List<Student> QueryExecutor() {
        Connection c = null;
        String query = "SELECT student_id, first_name, last_name, major, days_missed_consecutively, date_yyyy_mm_dd as missed_count_on  FROM ( " + 
        		"select  mst.student_id, mst.id, mst.first_name, mst.last_name, mst_dates.date_yyyy_mm_dd as date_yyyy_mm_dd ,  " + 
        		"case when dine.dining_date_id is null then 1 else 0 end as NotEaten, major,  " + 
        		"case when dine.dining_date_id is not null then @running_total:=0 " + 
        		"	 when dine.dining_date_id is null and @prev_sid <> mst.id then @running_total:= 1 " + 
        		"	 else @running_total:= @running_total + 1 end as days_missed_consecutively, " + 
        		"@prev_sid:= mst.id " + 
        		"FROM " + 
        		"	(select distinct ms.student_id, ms.id, first_name, last_name , major " + 
        		"	FROM master_students ms " + 
        		"	join dining d on d.student_id = ms.id  " + 
        		"	) mst " + 
        		"cross join( " + 
        		"	SELECT id as date_id, date_yyyy_mm_dd  " + 
        		"	from master_dates  " + 
        		"    where  " + 
        		"    id >= REPLACE(DATE_SUB(date(now()), INTERVAL 45 DAY),'-','') " +
        		"    and  " + 
        		"    id <=  REPLACE(DATE_SUB(date(now()), INTERVAL 30 DAY),'-','')  " +
        		"    order by id " + 
        		"    ) mst_dates " + 
        		"left join ( " + 
        		"	select distinct student_id, dining_date_id " + 
        		"    FROM dining  " + 
        		"    ) dine " + 
        		"on dine.dining_date_id = mst_dates.date_id and dine.student_id = mst.id " + 
        		" order by mst.id, date_id " + 
        		" ) a " + 
        		"  WHERE days_missed_consecutively = 7 " + 
        		"order by student_id, date_yyyy_mm_dd;";
		System.out.println("HERE IN QUERY EXE ");

    	try {
    		c = DatabaseConnection.getInstance().getConnection();
    		Statement s = c.createStatement();
    		ResultSet rs = s.executeQuery(query);
    		List<Student> studList = new ArrayList<Student>();
    		
    		while(rs.next()) {
    			Student stud = new Student();
    			stud.setStudent_id(rs.getInt(1));
    			stud.setFirst_name(rs.getString(2));
    			stud.setLast_name(rs.getString(3));
    			stud.setMissed_count(rs.getInt(5));
    			stud.setMajor(rs.getString(4));
    			studList.add(stud);
    			System.out.println("HERE IN WHILE ");
    		}
    		return studList;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally {
        	try {
				c.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
    	 
    }
	
//	public static void main(String[] argv) {
//		try {
//			QueryExecutor("SELECT first_name,last_name FROM master_students");
//		} catch (Exception e) {
//			// TODO: handle exception
//			System.out.println(e);
//		}
//	}

}
