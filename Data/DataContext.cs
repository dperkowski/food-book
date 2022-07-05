using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;

namespace food_book.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<UserRecipe> UserRecipes { get; set; }
    
    public DbSet<Category> Categories { get; set; }
}
