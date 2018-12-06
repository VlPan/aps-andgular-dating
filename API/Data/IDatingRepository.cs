using System.Collections.Generic;
using System.Threading.Tasks;
using N_Course.API.Models;

namespace N_Course.API.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<List<Product>> GetProducts();
         Task<Product> GetProduct(int id); 
    }
}