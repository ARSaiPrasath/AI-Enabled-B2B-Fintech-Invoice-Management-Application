package com.highradius;
import java.sql.*;
import java.util.*;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.*;
/**
 * Servlet implementation class Dataloading
 */
@WebServlet("/Dataloading")
public class Dataloading extends HttpServlet {
	private static final long serialVersionUID = 1L;       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Dataloading() {
        super();
        // TODO Auto-generated constructor stub
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	//@SuppressWarnings("unchecked")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String orderBy = request.getParameter("orderby");
        String order = request.getParameter("order");
        if(orderBy == null) {
        	orderBy = "sl_no";
        }
        if(order == null) {
        	order = "ASC";
        }
        String start = request.getParameter("start");
        String limit = request.getParameter("limit");
//        if(start == null) {
//        	start = 0;
//        }
		HashMap<Object, Object> Response = new HashMap<Object, Object>();
		ArrayList<Pojo> backend = new ArrayList<Pojo>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull","root","root");
			PreparedStatement ps = connection.prepareStatement("SELECT sl_no,business_code,winter_internship.cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,name_customer,aging_bucket FROM winter_internship,customer WHERE winter_internship.cust_number=customer.cust_number order by "+orderBy+" "+order+" limit ?,?");
//			ps.setString(1, orderBy);
//			ps.setString(2, order);
			if (start=="" || start==null) 
			{
				ps.setInt(1,0);
			}
			else
			{
				ps.setInt(1,Integer.parseInt(start));
			}
			if (limit=="" || limit==null) 
			{
				ps.setInt(2,10);
			}
			else
			{
				ps.setInt(2,Integer.parseInt(limit));
			}
			ResultSet rs = ps.executeQuery();
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
				pojo.setName_customer(rs.getString("name_customer"));
				backend.add(pojo);	
			}
			Response.put("backend", backend);
            String sql = "SELECT COUNT(*) sl_no_count from winter_internship";
            ps=connection.prepareStatement(sql);
            rs=ps.executeQuery();
            while(rs.next()) {
                String count = rs.getString("sl_no_count");
                Response.put("count", count);
            }
		}catch(Exception e) {
			e.printStackTrace();
		}
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		String jsonResponse = gson.toJson(Response);
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().append(jsonResponse);
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
}
