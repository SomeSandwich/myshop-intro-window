namespace Api.Types.GlobalTypes;

public class ResBase
{
}

public class ResSuccess : ResBase
{
    public string Message { get; set; } = "Success";
}

public class ResFailure
{
    public string Message { get; set; } = "Failure";
}