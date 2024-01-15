using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;

namespace ERPSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PartsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //getting data
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from erpsystem.parts";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ERPSysConn");
            MySqlDataReader myReader;
            using (MySqlConnection myConn = new MySqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myConn))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult(table);
        }

    }
}
