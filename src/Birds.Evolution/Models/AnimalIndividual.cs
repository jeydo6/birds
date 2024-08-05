namespace Birds.Evolution.Models;

public class AnimalIndividual : IIndividual
{
    public required float Fitness { get; init; }
    public required float[] Genes { get; init; }
}
