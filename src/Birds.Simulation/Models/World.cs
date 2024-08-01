namespace Birds.Simulation.Models;

public sealed class World
{
    public required Animal[] Animals { get; init; }
    public required Food[] Foods { get; init; }

    public static World Create(Animal[] animals, Food[] foods)
        => new World
        {
            Animals = animals,
            Foods = foods
        };
}
