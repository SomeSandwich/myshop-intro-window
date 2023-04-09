namespace Api.Utils;

public static class PasswordUtil
{
    public static string HashPassword(this string password)
    {
        return BCrypt.Net.BCrypt.EnhancedHashPassword(password);
    }

    public static bool ValidatePassword(this string password, string correctHash)
    {
        return BCrypt.Net.BCrypt.EnhancedVerify(password, correctHash);
    }
}