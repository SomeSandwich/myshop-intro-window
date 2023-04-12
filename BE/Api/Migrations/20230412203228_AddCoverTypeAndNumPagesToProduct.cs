using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCoverTypeAndNumPagesToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Hardcover",
                table: "Products",
                newName: "NumPages");

            migrationBuilder.AddColumn<int>(
                name: "CoverType",
                table: "Products",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$KXaziE0kbjZ5CZMT0CMhpeV0av2rTAMlbTQf9/SG4HRI1HF1rd.3a");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverType",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "NumPages",
                table: "Products",
                newName: "Hardcover");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$pv4WlPvU2lEX8811Wv0BlOZa4SmX9yDiQfPF6SLZzH8yw8ZLW/haq");
        }
    }
}
