using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniBarber.Entities
{
    public class Service
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal CurrentPrice { get; set; }

        public Service()
        {
            Id = Guid.NewGuid();
        }
    }
}
