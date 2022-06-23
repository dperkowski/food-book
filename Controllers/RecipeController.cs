using food_book.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace food_book.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly ILogger<RecipeController> _logger;
    private readonly DataContext _context;
    public RecipeController(ILogger<RecipeController> logger,  DataContext context)
    {
        _logger = logger;
        _context = context;
    }
    
    [HttpGet("getAll")]
    public async Task<ActionResult<List<Recipe>>> GetAll()
    {
        return Ok(await _context.Recipes.ToListAsync());
    }

    [HttpPost("add"), Authorize]
    public async Task<ActionResult<string>> Register(RecipeAddDto request)
    {
        var recipe = new UserRecipe()
        {
            id = DateTime.Now.Ticks,
            name = request.name,
            desc = request. desc,
            hardLevel = request.hardLevel,
            time = request.time,
            image = request.image,
            userId = request.userId,
            userFavorite = request.userFavorite,
            categories = new []{1}
        };

        _context.UserRecipes.Add(recipe);
        await _context.SaveChangesAsync();

        return Ok("Successful");
    }
}
