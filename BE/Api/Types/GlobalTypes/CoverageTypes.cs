namespace Api.Types.GlobalTypes;

/// <summary>
/// 
/// </summary>
public class ResBase
{
}

/// <summary>
/// 
/// </summary>
public class ResSuccess : ResBase
{
    /// <summary>
    /// 
    /// </summary>
    public string Message { get; set; } = "Success";
}

/// <summary>
/// 
/// </summary>
public class ResFailure
{
    /// <summary>
    /// 
    /// </summary>
    public string Message { get; set; } = "Failure";
}

public class ResFailureWithData : ResBase
{
    public string Messsage { get; set; } = "Failure";

    public object Data { get; set; }
}