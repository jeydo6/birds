using Birds.Evolution.Algorithms;
using Birds.Evolution.Crossovers;
using Birds.Evolution.Mutations;
using Birds.Evolution.Selections;
using Microsoft.Extensions.DependencyInjection;

namespace Birds.Evolution.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddGeneticAlgorithm(this IServiceCollection services)
        => services
            .AddSingleton<ISelection, RouletteWheelSelection>()
            .AddSingleton<ICrossover, UniformCrossover>()
            .AddSingleton<IMutation>(_ => new GaussianMutation(0.01f, 0.3f))
            .AddSingleton(typeof(IGeneticAlgorithm<>), typeof(GeneticAlgorithm<>));
}
