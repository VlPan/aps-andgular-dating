using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using N_Course.API.Models;

namespace  N_Course.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }


        public async Task<Product> GetProduct(int id)
        {
            var query = _context.Products.AsQueryable();

            var product = await query.FirstOrDefaultAsync(u => u.Id == id);

            return product;
        }

        public async Task<List<Product>> GetProducts()
        {
            var products =  await _context.Products
                .OrderByDescending(u => u.updatedAt).ToListAsync();

            return products;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}