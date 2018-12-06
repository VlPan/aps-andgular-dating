using N_Course.API.Models;
using Microsoft.EntityFrameworkCore;

namespace N_Course.API.Data
{
    public class  DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext>  options) : base (options) {}


        public DbSet<Product> Products { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}