using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UniBarber.Entities;
using UniBarber.Repository.Interfaces;

namespace UniBarber.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        public IBarbershopRepository<Service> _serviceRep { get; set; }
        public IBarbershopRepository<ServiceHistory> _serviceHistoryRep { get; set; }

        public ServiceController(IBarbershopRepository<Service> serviceRep, IBarbershopRepository<ServiceHistory> serviceHistoryRep)
        {
            _serviceRep = serviceRep;
            _serviceHistoryRep = serviceHistoryRep;
        }

        [HttpGet]
        public IEnumerable<Service> Get()
        {
            return _serviceRep.Get();
        }

        [HttpPost]
        public IEnumerable<Service> Post(Service service)
        {
            _serviceRep.Create(service);
            return _serviceRep.Get();
        }

        [HttpPut]
        public IEnumerable<Service> Put(Service service)
        {
            var previousPrice = _serviceRep.FindById(service.Id).CurrentPrice;
            _serviceHistoryRep.Create(new ServiceHistory
            {
                Service = service,
                ChangedToPrice = service.CurrentPrice,
                PreviousPrice = previousPrice
            });

            _serviceRep.Update(service);

            return _serviceRep.Get();
        }

        [HttpDelete]
        public IEnumerable<Service> Delete([FromQuery] string serviceId)
        {
            var service = _serviceRep.FindById(Guid.Parse(serviceId));

            if (service is not null)
                _serviceRep.Remove(service);

            return _serviceRep.Get();
        }

        [HttpGet]
        [Route("api/service/{serviceId}/history")]
        public IEnumerable<ServiceHistory> GetHistory(string serviceId)
        {
            return _serviceHistoryRep
                .Get()
                .Where(his => his.ServiceId == Guid.Parse(serviceId))
                .ToList();
        }

    }
}
