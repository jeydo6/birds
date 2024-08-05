using Birds.Evolution.Models;
using Birds.Simulation.Models;

namespace Birds.Application.Extensions;

internal static class MappingExtension
{
    public static AnimalIndividual Map(this Animal source)
        => new AnimalIndividual
        {
            Fitness = source.Satiation,
            Genes = source.ToGenes()
        };

    public static Animal Map(this AnimalIndividual source)
        => Animal.FromGenes(source.Genes);
}
