namespace Birds.Evolution.Models;

public interface IIndividual
{
    float[] Genes { get; init; }

    float Fitness();
}