using Microsoft.Extensions.Logging;

namespace Api.App.Extensions;

public interface ILoggerAdapter<T>
{
    void LogInformation(string message);
    void LogInformation<T0>(string message, T0 arg0);
    void LogInformation<T0, T1>(string message, T0 arg0, T1 arg1);

    void LogError(string message);
    void LogError<T0>(string message, T0 arg0);
    void LogError<T0, T1>(string message, T0 arg0, T1 arg1);

    void LogWarning(string message);
    void LogWarning<T0>(string message, T0 arg0);
    void LogWarning<T0, T1>(string message, T0 arg0, T1 arg1);

}
public class LoggerAdapter<T> : ILoggerAdapter<T>
{
    private readonly ILogger<T> _logger;
    public LoggerAdapter(ILogger<T> logger)
    {
        _logger = logger;
    }

    public void LogInformation(string message)
    {
        if (_logger.IsEnabled(LogLevel.Information))
        {
            _logger.LogInformation(message);
        }
    }

    public void LogInformation<T0>(string message, T0 arg0)
    {
        if (_logger.IsEnabled(LogLevel.Information))
        {
            _logger.LogInformation(message, arg0);
        }
    }

    public void LogInformation<T0, T1>(string message, T0 arg0, T1 arg1)
    {
        if (_logger.IsEnabled(LogLevel.Information))
        {
            _logger.LogInformation(message, arg0, arg1);
        }
    }

    public void LogError(string message)
    {
        if (_logger.IsEnabled(LogLevel.Error))
        {
            _logger.LogError(message);
        }
    }

    public void LogError<T0>(string message, T0 arg0)
    {
        if (_logger.IsEnabled(LogLevel.Error))
        {
            _logger.LogError(message, arg0);
        }
    }

    public void LogError<T0, T1>(string message, T0 arg0, T1 arg1)
    {
        if (_logger.IsEnabled(LogLevel.Error))
        {
            _logger.LogError(message, arg0, arg1);
        }
    }

    public void LogWarning(string message)
    {
        if (_logger.IsEnabled(LogLevel.Warning))
        {
            _logger.LogWarning(message);
        }
    }

    public void LogWarning<T0>(string message, T0 arg0)
    {
        if (_logger.IsEnabled(LogLevel.Warning))
        {
            _logger.LogWarning(message, arg0);
        }
    }

    public void LogWarning<T0, T1>(string message, T0 arg0, T1 arg1)
    {
        if (_logger.IsEnabled(LogLevel.Warning))
        {
            _logger.LogWarning(message, arg0, arg1);
        }
    }
}

