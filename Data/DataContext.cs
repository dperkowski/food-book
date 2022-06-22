using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;

namespace food_book.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; }
}
