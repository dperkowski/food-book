using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace food_book.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    public static User newUser = new User();

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserDto request)
    {
        CreatePassHash(request.pass, out byte[] passHash, out byte[] passSalt);
        
        newUser.id = DateTime.Now.Ticks;
        newUser.name = request.name;
        newUser.mail = request.mail;
        newUser.createdAcc = DateTime.Now;
        newUser.passHash = passHash;
        newUser.passSalt = passSalt;

        return Ok(newUser);

    }

    private void CreatePassHash(string pass, out byte[] passHash, out byte[] passSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passSalt = hmac.Key;
            passHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(pass));
        }
    }
}
