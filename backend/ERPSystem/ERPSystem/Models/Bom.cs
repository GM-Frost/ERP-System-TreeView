using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERPSystem.Models
{
    public class Bom
    {
        public string PARENT_NAME { get; set; }
        public int QUANTITY { get; set; }

        public string COMPONENT_NAME { get; set; }
        public List<Bom> Children { get; set; }
    }
}
