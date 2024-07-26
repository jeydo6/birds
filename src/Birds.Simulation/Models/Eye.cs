using System;

namespace Birds.Simulation.Models;

public sealed class Eye
{
    private Eye(float range, float angle, int cellsCount)
    {
        Range = range;
        Angle = angle;
        CellsCount = cellsCount;
    }

    public float Range { get; }
    public float Angle { get; }
    public int CellsCount { get; }

    public static Eye Create()
    {
        const float range = 0.25f;
        const float angle = (float)Math.PI / 4.0f;
        const int cellsCount = 6;

        return new Eye(range, angle, cellsCount);
    }
}
