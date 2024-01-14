using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using ERPSystem.Models;

namespace ERPSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BomController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BomController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = "SELECT * FROM erpsystem.bom";

            DataTable table = new DataTable();

            //dependency injection
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
            // Convert DataTable to a list of Bom objects
            List<Bom> bomList = ConvertDataTableToBomList(table);

            // Building hirarchicalBom structure that is retrieved from Flat JSON Data
            List<Bom> hierarchicalBom = BuildHierarchy(bomList);

            return new JsonResult(hierarchicalBom);
        }

        private List<Bom> ConvertDataTableToBomList(DataTable table)
        {
            List<Bom> bomList = new List<Bom>();

            foreach (DataRow row in table.Rows)
            {
                bomList.Add(new Bom
                {
                    PARENT_NAME = row["PARENT_NAME"].ToString(),
                    QUANTITY = Convert.ToInt32(row["QUANTITY"]),
                    COMPONENT_NAME = row["COMPONENT_NAME"].ToString(),
                    Children = new List<Bom>()
                });
            }

            return bomList;
        }

        private List<Bom> BuildHierarchy(List<Bom> flatList)
        {
            Dictionary<string, Bom> lookup = new Dictionary<string, Bom>();

            foreach (var item in flatList)
            {
                if (!lookup.TryGetValue(item.PARENT_NAME, out var parent))
                {
                    lookup[item.PARENT_NAME] = parent = new Bom
                    {
                        PARENT_NAME = item.PARENT_NAME,
                        Children = new List<Bom>()
                    };
                }

                parent.Children.Add(item);
            }

            return lookup.Values.ToList();
        }


        [HttpGet("{parentName}")]
        public JsonResult GetBomDataByParentName(string parentName)
        {
            string query = @"
                SELECT 
                    PARENT_NAME,
                    B.COMPONENT_NAME,
                    IFNULL(P.PART_NUMBER, '') AS PART_NUMBER,
                    IFNULL(P.TITLE, '') AS TITLE,
                    B.QUANTITY,
                    IFNULL(P.TYPE, '') AS TYPE,
                    IFNULL(P.ITEM, '') AS ITEM,
                    IFNULL(P.MATERIAL, '') AS MATERIAL
                FROM 
                    erpsystem.bom B
                LEFT JOIN 
                    erpsystem.parts P ON B.COMPONENT_NAME = P.NAME
                WHERE
                     B.PARENT_NAME = @ParentName;";

            DataTable table = new DataTable();

            //dependency injection
            string sqlDataSource = _configuration.GetConnectionString("ERPSysConn");
            MySqlDataReader myReader;

            using (MySqlConnection myConn = new MySqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@ParentName", parentName);
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

