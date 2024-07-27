using System;

namespace Birds.Simulation.Models;

public sealed class Eye
{
    private Eye(float fovRange, float fovAngle, int cellsCount)
    {
        FovRange = fovRange;
        FovAngle = fovAngle;
        CellsCount = cellsCount;
    }

    public float FovRange { get; }
    public float FovAngle { get; }
    public int CellsCount { get; }

    public static Eye Create()
    {
        const float fovRange = 0.25f;
        const float fovAngle = (float)Math.PI / 2.0f;
        const int cellsCount = 6;

        return new Eye(fovRange, fovAngle, cellsCount);
    }
}
