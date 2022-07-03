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

    [HttpGet("getUserAll/{userId}")]
    public async Task<ActionResult<List<UserRecipe>>> GetUserAll(long userId)
    {
        return Ok(await _context.UserRecipes.Where(recipe => recipe.userId == userId).ToListAsync());
    }
    

    [HttpPost("add"), Authorize]
    public async Task<ActionResult<string>> Add(RecipeAddDto request)
    {
        var recipe = new UserRecipe()
        {
            id = reduceId(DateTime.Now.Ticks),
            name = request.name,
            desc = request. desc,
            hardLevel = request.hardLevel,
            time = request.time,
            image = request.image,
            userId = request.userId,
            userFavorite = request.userFavorite,
            categories = new []{1}
        };

        try
        {
            _context.UserRecipes.Add(recipe);
            await _context.SaveChangesAsync();
        }
        catch (ArgumentException e)
        {
            return BadRequest("Ops... Something went wrong");
        }

        var restUserRecepies = await _context.UserRecipes.Where(recipe => recipe.userId == request.userId).ToListAsync();
        return Ok(new UserRecipeResponseDto {UserRecipes = restUserRecepies, message = "Recipe added"});;
    }

    private long reduceId(long nowTicks)
    {
        var idString = nowTicks.ToString();
            idString = idString.Remove(0, 2);
            return long.Parse(idString);
    }

    [HttpPut("edit"), Authorize]
    public async Task<ActionResult<object>> Edit(RecipeEditDto request)
    {
        var recipe = await _context.UserRecipes.FindAsync(request.id);

        if (recipe == null) return BadRequest("Recipe not found");

        try
        {
            recipe.name = request.name;
            recipe.desc = request.desc;
            recipe.hardLevel = request.hardLevel;
            recipe.time = request.time;
            recipe.image = request.image;
            recipe.userId = request.userId;
            recipe.userFavorite = request.userFavorite;
            recipe.categories = new []{1};
            await _context.SaveChangesAsync();
        }
        catch (ArgumentException e)
        {
            return BadRequest("Ops... Something went wrong");
        }
        
        var restUserRecepies = await _context.UserRecipes.Where(recipe => recipe.userId == request.userId).ToListAsync();
        return Ok(new UserRecipeResponseDto {UserRecipes = restUserRecepies, message = "Recipe edited"});
    }
    
    [HttpDelete("remove"), Authorize]
    public async Task<ActionResult<UserRecipeResponseDto>> Delete(UserRecipeDeleteDto request)
    {
        var recipe = await _context.UserRecipes.FindAsync(request.id);

        if (recipe == null) return BadRequest("Recipe not found");
        
        try
        {
            _context.UserRecipes.Remove(recipe);
            await _context.SaveChangesAsync();
        }
        catch (ArgumentException e)
        {
            return BadRequest("Ops... Something went wrong");
        }
        
        var restUserRecepies = await _context.UserRecipes.Where(recipe => recipe.userId == request.userId).ToListAsync();
        return Ok(new UserRecipeResponseDto {UserRecipes = restUserRecepies, message = "Recipe removed"});
    }
}
