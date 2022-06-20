using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace food_book.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger)
    {
        _logger = logger;
    }

    byte[] salt = new byte[128 / 8];
    private static readonly RNGCryptoServiceProvider rngCsp = new RNGCryptoServiceProvider();
    

    [HttpGet]
    public IEnumerable<User> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new User
        {
            id = index,
            createdAcc = DateTime.Now.AddDays(index),
            name = "Testowy",
            mail = "test@test.pl",
            hashPass = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                                      password: "zaq1@WSX",
                                      salt: salt,
                                      prf: KeyDerivationPrf.HMACSHA256,
                                      iterationCount: 100000,
                                      numBytesRequested: 256 / 8))
        })
        .ToArray();
    }
}
