using System;
using System.ComponentModel.DataAnnotations;

namespace UniBarber.Entities
{
    public enum Sex
    {
        Male,
        Female
    }

    public class Customer
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Lastname { get; set; }
        [Phone]
        [Required]
        public string Phone { get; set; }
        [Required]
        public Sex Sex { get; set; }
        public double DiscountPercentage { get; set; }

        public Customer()
        {
            Id = Guid.NewGuid();
            DiscountPercentage = 0.0;
        }
    }
}
