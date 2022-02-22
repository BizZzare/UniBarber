using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniBarber.Entities
{
    public class Visit
    {
        [Key]
        public Guid Id { get; set; }

        public Guid BranchId { get; set; }
        public Branch Branch { get; set; }

        public Guid ServiceId { get; set; }
        public Service Service { get; set; }

        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }

        public DateTime VisitDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public Visit()
        {
            Id = Guid.NewGuid();
            VisitDate = DateTime.Now;
        }
    }
}
