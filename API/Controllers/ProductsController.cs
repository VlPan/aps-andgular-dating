using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using N_Course.API.Data;
using N_Course.API.Dtos;
using N_Course.API.Models;

namespace N_Course.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public ProductsController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _repo.GetProducts();

            var productsToReturn = products;

            return Ok(productsToReturn);
        }

        [HttpGet("{id}", Name = "GetProduct")]
        // public async Task<IActionResult> GetProduct(int id)
        // {
        //     var product = await _repo.GetProduct(id);

        //     var productToReturn = _mapper.Map<pPoductForDetailedDto>(user);

        //     return Ok(userToReturn);
        // }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductForUpdateDto productForUpdateDto)
        {
            var productFromRepo = await _repo.GetProduct(id);
            _mapper.Map(productForUpdateDto, productFromRepo);

            if (await _repo.SaveAll())
                return Ok(productFromRepo);

            throw new Exception($"Updating product {id} failed on save");
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> RemoveUser(int id)
        {
            var productFromRepo = await _repo.GetProduct(id);
            _repo.Delete(productFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating product {id} failed on save");
        }

        [HttpPost]
         public async Task<IActionResult> CreateProduct(ProductForUpdateDto productForCreatingDto)
        {
     
            var productToCreate = _mapper.Map<Product>(productForCreatingDto);
            _repo.Add(productToCreate);

            if (await _repo.SaveAll())
                return Ok(productToCreate);

            throw new Exception($"Updating product failed on save");
        }


    }
}