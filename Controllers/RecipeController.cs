using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace food_book.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly ILogger<RecipeController> _logger;

    public RecipeController(ILogger<RecipeController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "test"), Authorize]
    public IEnumerable<Recipe> Get()
    {
        var tempCat = new List<int>();
        tempCat.Add(1);        
        tempCat.Add(2);
            
        return Enumerable.Range(1, 5).Select(index => new Recipe
        {
            name = "Test" + index,
            categories = tempCat,
            hardLevel = Random.Shared.Next(1, 5),
            time = Random.Shared.Next(15,90),
            image = "https://picsum.photos/200/30" + index
        })
        .ToArray();
    }
}
