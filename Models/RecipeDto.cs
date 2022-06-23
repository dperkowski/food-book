using Microsoft.AspNetCore.Mvc;

namespace food_book;

public class RecipeAddDto
{
    public string name { get; set; }
    
    public string desc { get; set; }
    
    public int hardLevel { get; set; }

    public int time { get; set; }
    
    public string image { get; set; }
    
    public long userId { get; set; }
    
    public bool userFavorite { get; set; }
}

public class RecipeEditDto
{
    public long id { get; set; }
    
    public string name { get; set; }
    
    public string desc { get; set; }
    
    public int hardLevel { get; set; }

    public int time { get; set; }
    
    public string image { get; set; }
    
    public long userId { get; set; }
    
    public bool userFavorite { get; set; }
}

public class UserRecipeResponseDto
{
    public ActionResult<List<UserRecipe>> UserRecipes { get; set; }
    
    public string message { get; set; }
}

public class UserRecipeDeleteDto
{
    public long userId { get; set; }
    
    public long id { get; set; }
}