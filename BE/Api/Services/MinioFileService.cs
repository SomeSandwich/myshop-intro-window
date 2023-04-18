using System.Reactive.Linq;
using API.Types.Constant;
using API.Types.Mapping;
using API.Types.Objects;
using Api.Types.Objects.File;
using AutoMapper;
using Minio;
using Minio.DataModel;
using Item = Minio.DataModel.Item;

namespace API.Services;

public interface IMinioFileService
{
    Task<bool> IsFileCanPreview(string contentType);

    Task<DetailStatFileRes> GetStatFileAsync(string key, string bucket = MinioOptions.DefaultBucket);

    Task<IEnumerable<StatFileRes>> GetListObjectAsync(string bucket = MinioOptions.DefaultBucket);

    Task<MemoryStream> DownloadFileAsync(string key, string bucket = MinioOptions.DefaultBucket);

    Task<bool> UploadSmallFileAsync(UploadFileDto args, string bucket = MinioOptions.DefaultBucket);

    Task DeleteFileAsync(string key, string bucket = MinioOptions.DefaultBucket);
}

public class MinioFileService : IMinioFileService
{
    private readonly MinioClient _client;
    private readonly IMapper _mapper;

    private static readonly string[] s_canPreviewTypes =
    {
        // Audio
        "audio/aac", "audio/mpeg", "audio/ogg", "audio/opus", "audio/wav", "audio/webm",

        // Video
        "video/mp4", "video/mpeg", "video/ogg", "video/mp2t", "video/webm",

        // Image
        "image/bmp", "image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/tiff", "image/webp",

        // Document
        "text/css", "text/csv", "text/html", "text/javascript", "application/json", "application/ld+json",
        "application/pdf", "text/plain", "application/xhtml+xml", "application/xml",
    };

    public MinioFileService(MinioClient client, IMapper mapper)
    {
        _client = client;

        _mapper = mapper;
    }

    public async Task<bool> IsFileCanPreview(string contentType)
    {
        return s_canPreviewTypes.Contains(contentType);
    }

    public async Task<DetailStatFileRes> GetStatFileAsync(string key, string bucket)
    {
        try
        {
            var args = new StatObjectArgs()
                .WithBucket(bucket)
                .WithObject(key);

            var rawStat = await _client.StatObjectAsync(args);

            return _mapper.Map<ObjectStat, DetailStatFileRes>(rawStat);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<IEnumerable<StatFileRes>> GetListObjectAsync(string bucket)
    {
        try
        {
            var args = new ListObjectsArgs()
                .WithBucket(bucket)
                .WithRecursive(true);

            var rtn = new List<StatFileRes>();

            var items = _client.ListObjectsAsync(args);
            await items.ForEachAsync(item => { rtn.Add(_mapper.Map<Item, StatFileRes>(item)); });

            return rtn;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<MemoryStream> DownloadFileAsync(string key, string bucket)
    {
        try
        {
            var rtnStream = new MemoryStream();

            GetObjectArgs getObjectArgs = new GetObjectArgs()
                .WithBucket(bucket)
                .WithObject(key)
                .WithCallbackStream(stream => stream.CopyTo(rtnStream));

            await _client.GetObjectAsync(getObjectArgs);

            rtnStream.Position = 0;

            return rtnStream;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<bool> UploadSmallFileAsync(UploadFileDto args, string bucket)
    {
        try
        {
            var putObjectArgs = new PutObjectArgs()
                .WithBucket(bucket)
                .WithObject(args.Key)
                .WithStreamData(args.Stream)
                .WithObjectSize(args.Stream.Length)
                .WithContentType(args.ContentType)
                .WithHeaders(args.Metadata);

            await _client.PutObjectAsync(putObjectArgs);

            return true;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task DeleteFileAsync(string key, string bucket)
    {
        try
        {
            var args = new RemoveObjectArgs()
                .WithBucket(bucket)
                .WithObject(key);

            await _client.RemoveObjectAsync(args);
        }
        catch (Exception ex)
        {
            throw;
        }
    }
}