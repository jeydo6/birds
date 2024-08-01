namespace Birds.Simulation.Models;

public sealed class Food
{
    public required Point Position { get; init; }

    public static Food Random()
    {
        var position = Point.Random();

        return new Food
        {
            Position = position
        };
    }
}
