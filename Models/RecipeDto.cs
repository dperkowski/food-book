namespace food_book;

public class RecipeAddDto
{
    public string name { get; set; }
    
    public int hardLevel { get; set; }

    public int time { get; set; }
    
    public string image { get; set; }
    
    public long userId { get; set; }
    
    public bool userFavorite { get; set; }
}