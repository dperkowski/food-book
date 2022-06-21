namespace food_book;

public class Recipe
{
    public string name { get; set; }

    public List<int> categories { get; set; }

    public int hardLevel { get; set; }

    public int time { get; set; }
    
    public string image { get; set; }
}

public class UserRecipe : Recipe
{
    public long userId { get; set; }
    
    public bool userFavorite { get; set; }

    public void Edit(string name, UserRecipe editedRecipe)
    {
        // Edit by name
    }

    public void Remove(string name)
    {
        // Remove from db
    }

    public void ToggleFav()
    {
        userFavorite = !userFavorite;
    }
}

public class ExternalRecipe : Recipe
{
    private bool isOnUserList { get; set; }
    
    public string source { get; set; }

    public void MoveToUser(long userId, bool isFavorite)
    {
        isOnUserList = true;
        
        // Add in db to userRecepies
        
    }
}