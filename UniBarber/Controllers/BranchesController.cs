using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniBarber.Entities;
using UniBarber.Repository.Interfaces;

namespace UniBarber.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        public IBarbershopRepository<Branch> _repository { get; set; }

        public BranchesController(IBarbershopRepository<Branch> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<Branch> Get()
        {
            return _repository.Get();
        }

    }
}
