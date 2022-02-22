using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using UniBarber.Entities;
using UniBarber.Repository.Interfaces;

namespace UniBarber.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        public IBarbershopRepository<Customer> _repository { get; set; }

        public CustomersController(IBarbershopRepository<Customer> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            return _repository.Get();
        }

        [HttpPost]
        public IEnumerable<Customer> Post(Customer customer)
        {
            _repository.Create(customer);
            return _repository.Get();
        }

        [HttpPut]
        public IEnumerable<Customer> Put(Customer customer)
        {
            _repository.Update(customer);
            return _repository.Get();
        }

        [HttpDelete]
        public IEnumerable<Customer> Delete([FromQuery] string customerId)
        {
            var customer = _repository.FindById(Guid.Parse(customerId));

            if (customer is not null)
                _repository.Remove(customer);

            return _repository.Get();
        }
    }
}
