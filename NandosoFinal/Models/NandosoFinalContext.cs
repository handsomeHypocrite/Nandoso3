using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace NandosoFinal.Models
{
    public class NandosoFinalContext : DbContext
    {
        public class MyConfiguration : DbMigrationsConfiguration<NandosoFinalContext>
        {
        }
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public NandosoFinalContext() : base("name=NandosoFinalContext")
        {
        }

        public System.Data.Entity.DbSet<NandosoFinal.Models.Dish> Dishes { get; set; }
    
    }
}
