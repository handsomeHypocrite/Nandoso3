using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace NandosoFinal.Models
{
    public class Food
    {
        public int ID { get; set; }
        public string FoodName { get; set; }
        public string FoodPrice { get; set; }
        public string FoodDesc { get; set; }

        //[JsonIgnore]
        //public virtual ICollection<Enrollment> Enrollments { get; set; }

    }
}