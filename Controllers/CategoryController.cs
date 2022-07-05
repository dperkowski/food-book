using food_book.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace food_book.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ILogger<CategoryController> _logger;
    private readonly DataContext _context;

    public CategoryController(ILogger<CategoryController> logger, DataContext context)
    {
        _logger = logger;
        _context = context;
    }
    
    [HttpGet("getAll")]
    public async Task<ActionResult<List<Category>>> GetAll()
    {
        return Ok(await _context.Categories.ToListAsync());
    }
    
}