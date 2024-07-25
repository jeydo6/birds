namespace Birds.Simulation.Models;

public sealed class Food
{
    private Food(Point position)
        => Position = position;

    public Point Position { get; }

    public static Food Create()
    {
        var position = Point.Create();

        return new Food(position);
    }
}
