using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;

namespace food_book.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IConfiguration _configuration;
    public static User user = new User();

    public UserController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserRegisterDto request)
    {
        CreatePassHash(request.pass, out byte[] passHash, out byte[] passSalt);
        
        user.id = DateTime.Now.Ticks;
        user.name = request.name;
        user.mail = request.mail;
        user.createdAcc = DateTime.Now;
        user.passHash = passHash;
        user.passSalt = passSalt;

        return Ok(user);

    }
    

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(UserLoginDto request)
    {
        if (user.mail != request.mail || !VerifyPassHash(request.pass, user.passHash, user.passSalt))
        {
            return BadRequest("Your mail or password is incorrect");
        }

        string token = setUserToken(user);
        return Ok(token);
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
