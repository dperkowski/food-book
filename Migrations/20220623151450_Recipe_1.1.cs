using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace food_book.Migrations
{
    public partial class Recipe_11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "desc",
                table: "Recipes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "desc",
                table: "Recipes");
        }
    }
}
