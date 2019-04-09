using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PpldbLibrary
{
    public class PpldbMgr
    {
        private string _connectionstring;

        public PpldbMgr(string _ConnectionString)
        {
            _connectionstring = _ConnectionString;
        }

        public IEnumerable<Person> GetPeople()
        {
            List<Person> p = new List<Person>();
            using (SqlConnection con = new SqlConnection(_connectionstring))
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandText = "Select * from People";
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read())
                {
                    p.Add(new Person
                    {
                        Id= (int)reader["id"],
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        Age = (int)reader["Age"]

                    });
                }
            }
            return p;
        }
        public int AddPerson(Person person)
        {
            int x;
            using (SqlConnection con = new SqlConnection(_connectionstring))
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandText = @"Insert into People 
                                    Values(@FN,@LN,@Age)
                                    select Scope_Identity()";
                cmd.Parameters.AddWithValue("@FN",person.FirstName);
                cmd.Parameters.AddWithValue("@LN",person.LastName);
                cmd.Parameters.AddWithValue("@Age", person.Age);
                con.Open();
                x = (int)(decimal)cmd.ExecuteScalar();
            }
            return x;
        }
        public void UpdatePerson(Person person)
        {
            using (SqlConnection con = new SqlConnection(_connectionstring))
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandText = @"Update People 
                                    Set FirstName=@FN, LastName = @LN, Age=@Age
                                    Where id = @Id";
                cmd.Parameters.AddWithValue("@Id", person.Id);
                cmd.Parameters.AddWithValue("@FN", person.FirstName);
                cmd.Parameters.AddWithValue("@LN", person.LastName);
                cmd.Parameters.AddWithValue("@Age", person.Age);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
        public Person GetPersonById(int id)
        {
            var p = new Person();
            using (SqlConnection con = new SqlConnection(_connectionstring))
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandText = @"Select * from People
                                    Where id = @id";
                cmd.Parameters.AddWithValue("@id", id);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                p.Id = (int)reader["id"];
                p.FirstName = (string)reader["FirstName"];
                p.LastName = (string)reader["LastName"];
                p.Age = (int)reader["Age"];
            }
            return p;
        }
        public void DeletePersonById(int id)
        {
            using (SqlConnection con = new SqlConnection(_connectionstring))
            using (SqlCommand cmd = con.CreateCommand())
            {
                cmd.CommandText = @"Delete from people 
                                    Where id = @id";
                cmd.Parameters.AddWithValue("@id", id);
                con.Open();
                cmd.ExecuteNonQuery();
                
            }
        }
    }
}
