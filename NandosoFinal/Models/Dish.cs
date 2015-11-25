using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace NandosoFinal.Models
{
    public class Dish
    {
        public int ID { get; set; }
        public string DishName { get; set; }
        public string DishPrice { get; set; }
        public string Describtion { get; set; }

        //[JsonIgnore]
        //public virtual ICollection<Enrollment> Enrollments { get; set; }

    }
}