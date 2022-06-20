namespace food_book;

public class User
{
    internal long id {get; set;}

    internal DateTime createdAcc { get; set; }

    public string name  { get; set; } = string.Empty;

    public string mail { get; set; }= string.Empty;

    public byte[] passHash  { get; set; }
    
    public byte[] passSalt { get; set; }
}
