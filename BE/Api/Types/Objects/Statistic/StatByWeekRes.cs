﻿namespace API.Types.Objects.Statistic;

public class StatByWeekRes
{
    /// <summary>
    /// Ngay
    /// </summary>
    public ICollection<DateOnly> Date { get; set; } = new List<DateOnly>();

    /// <summary>
    /// So luong
    /// </summary>
    public ICollection<int> Quantity { get; set; } = new List<int>();

    /// <summary>
    /// Chi phi
    /// </summary>
    public ICollection<int> Cost { get; set; } = new List<int>();

    /// <summary>
    /// Doanh thu
    /// </summary>
    public ICollection<int> Revenue { get; set; } = new List<int>();

    /// <summary>
    /// Loi nhuan
    /// </summary>
    /// <returns></returns>
    public ICollection<int> Profit { get; set; } = new List<int>();
}