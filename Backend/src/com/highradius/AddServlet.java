package com.highradius;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;


/**
 * Servlet implementation class addUser
 */
@WebServlet("/AddServlet")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			String business_code = request.getParameter("business_code");
			String cust_number =request.getParameter("cust_number");
			String clear_date =request.getParameter("clear_date");
			String buisness_year = request.getParameter("buisness_year");
			String doc_id = request.getParameter("doc_id");
			String posting_date = request.getParameter("posting_date");
			String document_create_date = request.getParameter("document_create_date");
			String due_in_date = request.getParameter("due_in_date");
			String invoice_currency = request.getParameter("invoice_currency");
			String document_type = request.getParameter("document_type");
			String posting_id = request.getParameter("posting_id");
			String total_open_amount = request.getParameter("total_open_amount");
			String baseline_create_date = request.getParameter("baseline_create_date");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			String invoice_id =request.getParameter("invoice_id");
			try {
				HashMap<Object, Object>Response = new HashMap<Object, Object>();
				Class.forName("com.mysql.cj.jdbc.Driver");
				Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull","root","root");
				String query = "INSERT INTO winter_internship(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				PreparedStatement ps = connection.prepareStatement(query);
				ps.setString(1, business_code);
				if (cust_number=="" || cust_number==null) 
				{
					ps.setNull(2,Types.INTEGER);
				}
				else
				{
					ps.setInt(2,Integer.parseInt(cust_number));
				}
				if (clear_date=="" || clear_date==null || clear_date=="undefined") 
				{
					ps.setNull(3,Types.DATE);
				}
				else
				{
					java.util.Date utilDate = new SimpleDateFormat("yyyy-MM-dd").parse(clear_date);
					ps.setDate(3,new java.sql.Date(utilDate.getTime()));
				}
				ps.setString(4,buisness_year);
				ps.setString(5,doc_id);
				if (posting_date==""|| posting_date==null) 
				{
					ps.setNull(6,Types.DATE);
				}
				else
				{
					java.util.Date utilDate = new SimpleDateFormat("yyyy-MM-dd").parse(posting_date);
					ps.setDate(6,new java.sql.Date(utilDate.getTime()));
				}
				if (document_create_date==""|| document_create_date==null) 
				{
					ps.setNull(7,Types.DATE);
				}
				else
				{
					java.util.Date utilDate = new SimpleDateFormat("yyyy-MM-dd").parse(document_create_date);
					ps.setDate(7,new java.sql.Date(utilDate.getTime()));
				}
				if (due_in_date==""|| posting_date==null) 
				{
					ps.setNull(8,Types.DATE);
				}
				else
				{
					java.util.Date utilDate = new SimpleDateFormat("yyyy-MM-dd").parse(due_in_date);
					ps.setDate(8,new java.sql.Date(utilDate.getTime()));
				}
				ps.setString(9,invoice_currency);
				ps.setString(10, document_type);
				if (posting_id=="" || posting_id==null) 
				{
					ps.setNull(11,Types.INTEGER);
				}
				else
				{
					ps.setInt(11,Integer.parseInt(posting_id));
				}
				if (total_open_amount=="" || total_open_amount==null) 
				{
					ps.setNull(12,Types.FLOAT);
				}
				else
				{
					ps.setFloat(12,Float.parseFloat(cust_number));
				}
				if (baseline_create_date==""|| posting_date==null) 
				{
					ps.setNull(13,Types.DATE);
				}
				else
				{
					java.util.Date utilDate = new SimpleDateFormat("yyyy-MM-dd").parse(baseline_create_date);
					ps.setDate(13,new java.sql.Date(utilDate.getTime()));
				}
				ps.setString(14, cust_payment_terms);
				if (invoice_id=="" || invoice_id==null) 
				{
					ps.setNull(15,Types.INTEGER);
				}
				else
				{
					ps.setInt(15,Integer.parseInt(invoice_id));
				}
				if(ps.executeUpdate() > 0) {
					Response.put("insert", true);
				}else {
					Response.put("insert", false);
				}
				Gson gson = new Gson();
				String jsonResponse = gson.toJson(Response);
				response.setHeader("Access-Control-Allow-Origin", "*");
				response.getWriter().append(jsonResponse);
			}catch(Exception e) {
				e.printStackTrace();
			}
			response.getWriter().append("Served at: ").append(request.getContextPath());
		}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}