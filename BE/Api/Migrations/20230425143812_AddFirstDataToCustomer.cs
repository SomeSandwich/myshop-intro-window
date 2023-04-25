using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class AddFirstDataToCustomer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$xkMjcRQ0789Jl28ZKJIILuxP/i7QAD8bjj/TaVxqcxiZA.GQfzBxO");

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "JoinDate", "Name", "PhoneNumber" },
                values: new object[] { 1, new DateOnly(1, 1, 1), "Khách vãng lai", "0123456789" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$a.5OAvLG47uI3T.lQGlL8u6oidokNrI3auPezBuKhHEkFB8Dh31TG");
        }
    }
}
