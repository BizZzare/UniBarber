using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UniBarber.Entities;
using UniBarber.Models;
using UniBarber.Repository.Interfaces;

namespace UniBarber.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitsController : ControllerBase
    {
        public IBarbershopRepository<Customer> _customersRep { get; set; }
        public IBarbershopRepository<Service> _serviceRep { get; set; }
        public IBarbershopRepository<Visit> _visitsRep { get; set; }

        public VisitsController(IBarbershopRepository<Customer> customersRep,
            IBarbershopRepository<Service> serviceRep,
            IBarbershopRepository<Visit> visitsRep)
        {
            _customersRep = customersRep;
            _serviceRep = serviceRep;
            _visitsRep = visitsRep;
        }

        [HttpGet]
        public IEnumerable<Visit> Get()
        {
            return _visitsRep.Get();
        }

        [HttpPost]
        public IEnumerable<Visit> Post(Visit visit)
        {
            var customer = _customersRep.Get().First(customer => customer.Id == visit.CustomerId);
            var selectedService = _serviceRep.Get().First(service => service.Id == visit.ServiceId);

            visit.Price = selectedService.CurrentPrice - (selectedService.CurrentPrice * (decimal)customer.DiscountPercentage / 100);
            _visitsRep.Create(visit);

            var clientsVisitsCount = _visitsRep.Get().Where(visit => visit.CustomerId == visit.CustomerId).Count();
            if (clientsVisitsCount == 5)
            {
                customer.DiscountPercentage = 3;
                _customersRep.Update(customer);
            }

            return _visitsRep.Get();
        }

        [HttpGet]
        [Route("api/{branchId}/visits/statistics")]
        public IEnumerable<StatisticsInfo> GetStatisticsOnBranch(string branchId)
        {
            var customers = _customersRep.Get();
            var services = _serviceRep.Get();
            var visits = _visitsRep.Get().Where(visits => visits.BranchId == Guid.Parse(branchId));

            var statistics = new List<StatisticsInfo>();

            foreach (var customer in customers)
            {
                var customersVisits = visits.Where(visit => visit.CustomerId == customer.Id);
                var customersLastServiceId = customersVisits.Last().ServiceId;

                statistics.Add(new StatisticsInfo
                {
                    Name = $"{customer.Name} {customer.Lastname}",
                    Phone = customer.Phone,
                    DiscountPercentage = customer.DiscountPercentage,
                    Sex = customer.Sex,
                    VisitsCount = customersVisits.Count(),
                    Service = services.First(service => service.Id == customersLastServiceId).Name,
                    Sum = visits.Sum(visit => visit.Price)
                });
            }

            return statistics;
        }
    }
}
