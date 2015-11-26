using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Data.Entity.Migrations;

namespace NandosoFinal.Models
{
    [DbConfigurationType(typeof(MySql.Data.Entity.MySqlEFConfiguration))]
    public class NandosoFinalContext : DbContext
    {

        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public class MyConfiguration : DbMigrationsConfiguration<NandosoFinalContext>
        {
            public MyConfiguration()
            {
                this.AutomaticMigrationsEnabled = true;
                this.AutomaticMigrationDataLossAllowed = true;
            }

            protected override void Seed(NandosoFinalContext context)
            {
                var foods = new List<Food>
            {
                new Food { FoodName = "8 BBQ Ribs",   FoodPrice = "$1.50",
                    FoodDesc = "Bite sized chicken on the bone" },
                    new Food { FoodName = "5 BBQ Wings",   FoodPrice = "$0.50",
                    FoodDesc = "Reach new heights of enjoyment." },
                    new Food { FoodName = "Half Chicken",   FoodPrice = "$1.00",
                    FoodDesc = "Nothing half hearted here." },
                    new Food { FoodName = "5 BBQ Thigh Fillets",   FoodPrice = "$1.00",
                    FoodDesc = "Get high on some thighs." }
                
            };
                foods.ForEach(s => context.Foods.AddOrUpdate(p => p.FoodName, s));
                context.SaveChanges();

            }

        }

        public NandosoFinalContext() : base("name=NandosoFinalContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<NandosoFinalContext, MyConfiguration>());
        }

        public System.Data.Entity.DbSet<NandosoFinal.Models.Food> Foods { get; set; }
    
    }
}
