using Birds.Core.Extensions;

namespace Birds.Simulation.Models;

public readonly struct Point
{
    public required float X { get; init; }
    public required float Y { get; init; }

    public static Point Random()
    {
        var x = System.Random.Shared.NextUSingle(6);
        var y = System.Random.Shared.NextUSingle(6);

        return new Point
        {
            X = x,
            Y = y
        };
    }
}
