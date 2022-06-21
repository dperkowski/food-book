namespace food_book;

public class UserRegisterDto
{
    public string name  { get; set; } = string.Empty;

    public string mail { get; set; }= string.Empty;
    
    public string pass { get; set; }= string.Empty;
}

public class UserLoginDto
{
    public string mail { get; set; }= string.Empty;
    
    public string pass { get; set; }= string.Empty;
}