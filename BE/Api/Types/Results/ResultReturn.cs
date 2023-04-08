namespace Api.Types.Results;

public class ResultReturn
{
    public StatusReturn Status { get; set; }

    public string? Message { get; set; }
}

public abstract class BaseResult
{
    public abstract StatusReturn Status { get; }

    public abstract string Message { get; set; }
}

public class NoneResult : BaseResult
{
    public override StatusReturn Status => StatusReturn.None;

    public override string Message { get; set; } = "None";
}

public class SuccessResult : BaseResult
{
    public override StatusReturn Status => StatusReturn.Success;

    public override string Message { get; set; } = "Success";
}

public class FailureResult : BaseResult
{
    public override StatusReturn Status => StatusReturn.Failure;

    public override string Message { get; set; } = "Failure";
}
