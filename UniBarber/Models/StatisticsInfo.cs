using UniBarber.Entities;

namespace UniBarber.Models
{
    public class StatisticsInfo
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public Sex Sex { get; set; }
        public string Service { get; set; }
        public decimal Sum { get; set; }
        public double DiscountPercentage { get; set; }
        public int VisitsCount { get; set; }
    }
}
