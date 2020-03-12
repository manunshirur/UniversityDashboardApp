package com.example.models;

public class Student {
	private int student_id;
	private String first_name;
	private String last_name;
	private int missed_count;
	private String major;

	
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public int getMissed_count() {
		return missed_count;
	}
	public void setMissed_count(int missed_count) {
		this.missed_count = missed_count;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	
	
}
