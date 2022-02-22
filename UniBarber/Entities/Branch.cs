using System;
using System.ComponentModel.DataAnnotations;

namespace UniBarber.Entities
{
    public class Branch
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }

        public Branch()
        {
            Id = Guid.NewGuid();
        }
    }
}
