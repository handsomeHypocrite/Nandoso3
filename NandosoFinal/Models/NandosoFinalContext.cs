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
                new Food { FoodName = "Carsfon",   FoodPrice = "Alexander",
                    FoodDesc = "ftbs" },
                    new Food { FoodName = "Carsoadsfn",   FoodPrice = "Alexander",
                    FoodDesc = "ftbs" },
                    new Food { FoodName = "Caraaason",   FoodPrice = "Alexander",
                    FoodDesc = "ftbs" }
                
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
