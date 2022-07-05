using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace food_book;

public class Recipe
{
    [Key]
    public long id { get; set; }
    
    public string name { get; set; }
    
    public string desc { get; set; }

    [NotMapped]
    public int[] categories { get; set; }

    public int hardLevel { get; set; }

    public int time { get; set; }
    
    public string image { get; set; }
}

public class UserRecipe : Recipe
{
    public long userId { get; set; }
    
    public int userFavorite { get; set; }
    
}

public class ExternalRecipe : Recipe
{
    private bool isOnUserList { get; set; }
    
    public string source { get; set; }
    
}