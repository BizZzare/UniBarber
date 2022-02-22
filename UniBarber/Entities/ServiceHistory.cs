using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniBarber.Entities
{
    public class ServiceHistory
    {
        [Key]
        public Guid Id { get; set; }

        public Guid ServiceId { get; set; }
        public Service Service { get; set; }

        public DateTime DateChanged { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal PreviousPrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ChangedToPrice { get; set; }

        public ServiceHistory()
        {
            Id = Guid.NewGuid();
            DateChanged = DateTime.Now;
        }
    }
}
