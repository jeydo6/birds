using System;

namespace Birds.Simulation.Models;

public sealed class Eye
{
    public required float FovRange { get; init; }
    public required float FovAngle { get; init; }
    public required int CellsCount { get; init; }

    public static Eye Create()
    {
        const float fovRange = 0.25f;
        const float fovAngle = (float)Math.PI / 2.0f;
        const int cellsCount = 6;

        return new Eye
        {
            FovRange = fovRange,
            FovAngle = fovAngle,
            CellsCount = cellsCount
        };
    }
}
