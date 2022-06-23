using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using food_book.Data;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace food_book.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly DataContext _context;

    public UserController(IConfiguration configuration, DataContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<object[]>> Register(UserRegisterDto request)
    {
        CreatePassHash(request.pass, out byte[] passHash, out byte[] passSalt);
        var user = new User
        {
            id = DateTime.Now.Ticks,
            name = request.name,
            mail = request.mail,
            createdAcc = DateTime.Now,
            passHash = passHash,
            passSalt = passSalt
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        string token = setUserToken(user);
        return Ok(new object[] {user.id, user.name, user.mail, token});

    }
    

    [HttpPost("login")]
    public async Task<ActionResult<object[]>> Login(UserLoginDto request)
    {
        var user = await _context.Users.Where(User => User.mail == request.mail).FirstAsync();
        
        if (user == null || !VerifyPassHash(request.pass, user.passHash, user.passSalt))
        {
            return BadRequest("Your mail or password is incorrect");
        }

        string token = setUserToken(user);
        return Ok(new object[] {user.id, user.name, user.mail, token});
    }

    private string setUserToken(User user)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.mail)
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
            _configuration.GetSection("AppSettings:Token").Value));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: cred
            );

        var JWT = new JwtSecurityTokenHandler().WriteToken(token);
        
        return JWT;
    }
    private void CreatePassHash(string pass, out byte[] passHash, out byte[] passSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passSalt = hmac.Key;
            passHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(pass));
        }
    }

    private bool VerifyPassHash(string pass, byte[] passHash, byte[] passSalt)
    {
        using (var hmac = new HMACSHA512(passSalt))
        {
            var hash = hmac.ComputeHash((System.Text.Encoding.UTF8.GetBytes(pass)));

            return hash.SequenceEqual(passHash); 
        }
    }
    
}
