using food_book.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace food_book.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly DataContext _context;

    public CategoryController(IConfiguration configuration, DataContext context)
    {
        _configuration = configuration;
        _context = context;
    }
    
    [HttpGet("getAll")]
    public async Task<ActionResult<List<Category>>> GetAll()
    {
        return Ok(await _context.Categories.ToListAsync());
    }
    
}