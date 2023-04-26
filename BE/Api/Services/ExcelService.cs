using Api.Context;
using Api.Context.Constants.Enums;
using API.Types.Objects.Import;
using Api.Types.Objects.Product;
using Api.Types.Results;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace Api.Services;

public interface IImportService
{
    Task<BaseResult> ImportExcelProductAsync(ImportExcelProductReq req);
}

public class ImportService : IImportService
{
    private readonly MyShopDbContext _context;
    private readonly IProductService _productService;

    private readonly IMapper _mapper;

    public ImportService(MyShopDbContext context, IProductService productService, IMapper mapper)
    {
        _context = context;
        _productService = productService;
        _mapper = mapper;
    }

    public async Task<BaseResult> ImportExcelProductAsync(ImportExcelProductReq req)
    {
        try
        {
            var stream = req.File.OpenReadStream();

            await using var excelFS = stream;
            excelFS.Position = 0;

            var workbook = new XSSFWorkbook(excelFS);
            var sheet = workbook.GetSheetAt(0);

            var numOfRow = sheet.LastRowNum;

            var cates = await _context.Categories
                .Select(e => e.Id)
                .ToListAsync();

            var success = 0;
            Console.WriteLine($"NumOfRow - {numOfRow}");
            for (var i = 3; i < numOfRow + 1; ++i)
            {
                // Console.WriteLine($"Row - {i}");
                var row = sheet.GetRow(i);
                //
                // for (var j = 0; j < row.LastCellNum; ++j)
                // {
                //     Console.Write(row.GetCell(j) + " - ");
                // }
                //
                // Console.WriteLine();
                var costCell = row.GetCell(1);
                if (costCell.CellType == CellType.Blank)
                    continue;
                var rawCost = costCell.NumericCellValue;
                var cost = (int)rawCost;
                // if (rawCost.IsNullOrEmpty() || !int.TryParse(rawCost, out var cost))
                // {
                //     continue;
                // }

                var priceCell = row.GetCell(2);
                if (priceCell.CellType == CellType.Blank)
                    continue;
                var rawPrice = priceCell.NumericCellValue;
                var price = (int)rawPrice;
                // if (rawPrice.IsNullOrEmpty() || !int.TryParse(rawPrice, out var price))
                // {
                //     continue;
                // }

                var discountCell = row.GetCell(3);
                if (discountCell.CellType == CellType.Blank)
                    continue;
                var rawDiscount = discountCell.NumericCellValue;
                var discount = (int)rawDiscount;
                // if (!rawDiscount.IsNullOrEmpty())
                // {
                //     if (!int.TryParse(rawDiscount, out discount))
                //     {
                //         continue;
                //     }
                // }

                var titleCell = row.GetCell(4);
                if (titleCell.CellType == CellType.Blank)
                    continue;
                var title = titleCell.StringCellValue.Trim();
                if (title.Length > 50)
                {
                    continue;
                }

                var description = row.GetCell(5).StringCellValue.Trim();

                var quantityCell = row.GetCell(6);
                if (quantityCell.CellType == CellType.Blank)
                    continue;
                var rawQuantity = quantityCell.NumericCellValue;
                var quantity = (int)rawQuantity;
                // if (rawQuantity.IsNullOrEmpty() || !int.TryParse(rawQuantity, out var quantity))
                // {
                //     continue;
                // }

                var author = row.GetCell(7).ToString().Trim();

                var isbn10 = row.GetCell(8).ToString().Trim();

                var isbn13 = row.GetCell(9).ToString().Trim();

                var publisher = row.GetCell(10).ToString().Trim();

                var publicationDateCell = row.GetCell(11);
                if (publicationDateCell.CellType == CellType.Blank)
                    continue;
                var rawPublicationDate = publicationDateCell.ToString().Trim();
                if (rawPublicationDate.IsNullOrEmpty() ||
                    !DateOnly.TryParse(rawPublicationDate, out var publicationDate))
                {
                    continue;
                }

                var dimensionHeightCell = row.GetCell(12);
                if (dimensionHeightCell.CellType == CellType.Blank)
                    continue;
                var rawDimensionHeight = dimensionHeightCell.NumericCellValue;
                var dimensionHeight = (int)rawDimensionHeight;
                // if (rawDimensionHeight.IsNullOrEmpty() || !int.TryParse(rawDimensionHeight, out var dimensionHeight))
                // {
                //     continue;
                // }

                var dimensionWidthCell = row.GetCell(13);
                if (dimensionWidthCell.CellType == CellType.Blank)
                    continue;
                var rawDimensionWidth = dimensionWidthCell.NumericCellValue;
                var dimensionWidth = (int)rawDimensionWidth;
                // if (rawDimensionWidth.IsNullOrEmpty() && int.TryParse(rawDimensionWidth, out var dimensionWidth))
                // {
                //     continue;
                // }

                var dimensionLengthCell = row.GetCell(14);
                if (dimensionLengthCell.CellType == CellType.Blank)
                    continue;
                var rawDimensionLength = dimensionLengthCell.NumericCellValue;
                var dimensionLength = (int)rawDimensionLength;
                // if (rawDimensionLength.IsNullOrEmpty() && int.TryParse(rawDimensionLength, out var dimensionLength))
                // {
                //     continue;
                // }

                var numPagesCell = row.GetCell(15);
                if (numPagesCell.CellType == CellType.Blank)
                    continue;
                var rawNumPages = numPagesCell.NumericCellValue;
                var numPages = (int)rawNumPages;
                // if (rawNumPages.IsNullOrEmpty() || !int.TryParse(rawNumPages, out var numPages))
                // {
                //     continue;
                // }

                var coverTypeCell = row.GetCell(16);
                if (coverTypeCell.CellType == CellType.Blank)
                    continue;
                var rawCoverType = coverTypeCell.NumericCellValue;
                var coverType = (int)rawCoverType;
                // if (rawDimensionHeight.IsNullOrEmpty() || !int.TryParse(rawCoverType, out var coverType) ||
                //     !Enum.IsDefined(typeof(CoverType), coverType))
                // {
                //     continue;
                // }

                var categoryIdCell = row.GetCell(17);
                if (categoryIdCell.CellType == CellType.Blank)
                    continue;
                var rawCategoryId = categoryIdCell.NumericCellValue;
                var categoryId = (int)rawCategoryId;
                if (!cates.Contains(categoryId))
                    continue;
                // if (rawDimensionHeight.IsNullOrEmpty() || !int.TryParse(rawDimensionHeight, out var categoryId) ||
                //     !cates.Contains(categoryId))
                // {
                //     continue;
                // }

                // TODO: Import Dimensions
                var args = new CreateProductArg()
                {
                    Cost = cost,
                    Price = price,
                    Discount = discount == -1 ? null : discount,
                    Title = title,
                    Description = description,
                    Quantity = quantity,
                    Author = author,
                    Isbn10 = isbn10,
                    Isbn13 = isbn13,
                    Publisher = publisher,
                    PublicationDate = publicationDate,
                    Dimension = null,
                    NumPages = numPages,
                    CoverType = (CoverType)coverType,
                    CategoryId = categoryId
                };


                await _productService.CreateAsync(args);

                success++;
                Console.WriteLine(success);
            }

            return new SuccessResult()
            {
                Message = $"Import {success} items"
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.StackTrace);
            var message = ex.Message;

            return new FailureResult()
            {
                Message = message
            };
        }
    }
}