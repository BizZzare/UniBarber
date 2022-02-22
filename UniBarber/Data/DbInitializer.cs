using System.Linq;
using UniBarber.Context;
using UniBarber.Entities;

namespace UniBarber.Data
{
    public static class DbInitializer
    {
        public static void Initialize(BarbershopContext context)
        {
            context.Database.EnsureCreated();

            if (context.Branches.Any())
            {
                return;
            }

            var branches = new Branch[]
            {
                new Branch{ Name="Branch 1" },
                new Branch{ Name="Branch 2" }
            };

            var customers = new Customer[]
            {
                new Customer{ Name="John", Lastname="Doe", Phone="+38099999999", Sex=Sex.Male },
                new Customer{ Name="Jane", Lastname="Doe", Phone="+38088888888", Sex=Sex.Female }
            };

            var service = new Service[]
            {
                new Service{ Name="Male haircut", CurrentPrice=350.00m},
                new Service{ Name="Female haircut", CurrentPrice=450.00m}
            };

            context.Branches.AddRange(branches);
            context.Customers.AddRange(customers);
            context.Service.AddRange(service);

            context.SaveChanges();
        }
    }
}
