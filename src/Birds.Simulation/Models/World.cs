namespace Birds.Simulation.Models;

public sealed class World
{
    public required int Generation { get; init; }
    public required Animal[] Animals { get; init; }
    public required Food[] Foods { get; init; }

    public static World Create(int generation, Animal[] animals, Food[] foods)
        => new World
        {
            Generation = generation,
            Animals = animals,
            Foods = foods
        };
}
