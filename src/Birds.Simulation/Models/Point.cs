using System;
using Birds.Core.Extensions;

namespace Birds.Simulation.Models;

public readonly struct Point
{
    private Point(float x, float y)
    {
        X = x;
        Y = y;
    }

    public float X { get; }
    public float Y { get; }

    public static Point Create()
    {
        var x = Random.Shared.NextUSingle(6);
        var y = Random.Shared.NextUSingle(6);

        return new Point(x, y);
    }
}
