package com.highradius;

import java.sql.*;
import java.util.ArrayList;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

/**
 * Servlet implementation class AdvSearch
 */
@WebServlet("/AdvSearch")
public class AdvSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdvSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String cust_number =request.getParameter("cust_number");
		String buisness_year = request.getParameter("buisness_year");
		String doc_id = request.getParameter("doc_id");
		String invoice_id =request.getParameter("invoice_id");
		ArrayList<Pojo> backend= new ArrayList<>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","root");
			String query = "SELECT * FROM winter_internship WHERE invoice_id = ? and cust_number= ? and doc_id = ? and buisness_year = ?;";
			PreparedStatement ps = connection.prepareStatement(query);
			ps.setInt(4,Integer.parseInt(buisness_year));
			ps.setString(3,doc_id);
			if (invoice_id=="" || invoice_id==null) 
			{
				ps.setNull(1,Types.INTEGER);
				
			}
			else
			{
				ps.setInt(1,Integer.parseInt(invoice_id));
			}
			if (cust_number=="" || cust_number==null) 
			{
				ps.setNull(2,Types.INTEGER);
			}
			else
			{
				ps.setInt(2,Integer.parseInt(cust_number));
			}
		    ResultSet rs=ps.executeQuery();   
		    while(rs.next()) {
		    	Pojo pojo = new Pojo();
				pojo.setSl_no(rs.getInt("sl_no"));
				pojo.setBusiness_code(rs.getString("business_code"));
				pojo.setCust_number(rs.getInt("cust_number"));
				pojo.setClear_date(rs.getDate("clear_date"));
				pojo.setBuisness_year(rs.getInt("buisness_year"));
				pojo.setDoc_id(rs.getString("doc_id"));
				pojo.setPosting_date(rs.getDate("posting_date"));
				pojo.setDocument_create_date(rs.getDate("document_create_date"));
				pojo.setDue_in_date(rs.getDate("due_in_date"));
				pojo.setInvoice_currency(rs.getString("invoice_currency"));
				pojo.setDocument_type(rs.getString("document_type"));
				pojo.setPosting_id(rs.getInt("posting_id"));
				pojo.setTotal_open_amount(rs.getDouble("total_open_amount"));
				pojo.setBaseline_create_date(rs.getDate("baseline_create_date"));
				pojo.setCust_payment_terms(rs.getString("cust_payment_terms"));
				pojo.setInvoice_id(rs.getInt("invoice_id"));
				pojo.setAging_bucket(rs.getString("aging_bucket"));
				backend.add(pojo);	
		}
		    rs.close();
			Gson gson = new Gson();
            String jsonResponse = gson.toJson(backend);
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.getWriter().append(jsonResponse);            
		}catch(Exception e) {
			e.printStackTrace();
		}
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
}
