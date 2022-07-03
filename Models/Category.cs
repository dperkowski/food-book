using System.ComponentModel.DataAnnotations;
namespace food_book;

public class Category
{
    [Key]
    public long id {get; set;}
    
    public string name { get; set; }
    
}