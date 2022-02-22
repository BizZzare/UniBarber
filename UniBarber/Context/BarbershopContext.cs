using Microsoft.EntityFrameworkCore;
using UniBarber.Entities;

namespace UniBarber.Context
{
    public class BarbershopContext : DbContext
    {
        public BarbershopContext(DbContextOptions<BarbershopContext> options) : base(options)
        {
        }

        public DbSet<Branch> Branches { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<ServiceHistory> ServiceHistory { get; set; }
        public DbSet<Visit> Visits { get; set; }

    }
}
