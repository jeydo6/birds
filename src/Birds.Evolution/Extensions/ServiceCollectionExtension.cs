using Birds.Evolution.Algorithms;
using Microsoft.Extensions.DependencyInjection;

namespace Birds.Evolution.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddGeneticAlgorithm(this IServiceCollection services)
        => services.AddSingleton(typeof(IGeneticAlgorithm<>), typeof(GeneticAlgorithm<>));
}
