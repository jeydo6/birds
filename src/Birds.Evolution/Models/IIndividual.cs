namespace Birds.Evolution.Models;

public interface IIndividual
{
    float Fitness { get; init; }
    float[] Genes { get; init; }
}
