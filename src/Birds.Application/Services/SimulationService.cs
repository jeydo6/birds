using System.Threading;
using System.Threading.Tasks;
using Birds.Application.Extensions;
using Birds.Evolution.Algorithms;
using Birds.Evolution.Models;
using Birds.Simulation.Models;

namespace Birds.Application.Services;

public interface ISimulationService
{
    Task<World> CreateWorld(CancellationToken cancellationToken = default);
    Task<World> EvolveWorld(World world, CancellationToken cancellationToken = default);
    Task<int> GetTotalSatiation(World world, CancellationToken cancellationToken);
}

public sealed class SimulationService : ISimulationService
{
    private readonly IGeneticAlgorithm<AnimalIndividual> _geneticAlgorithm;

    public SimulationService(IGeneticAlgorithm<AnimalIndividual> geneticAlgorithm)
        => _geneticAlgorithm = geneticAlgorithm;

    public Task<World> CreateWorld(CancellationToken cancellationToken = default)
    {
        const int generation = 0;
        const int animalsCount = 40;
        const int foodsCount = 60;

        var animals = new Animal[animalsCount];
        for (var i = 0; i < animals.Length; i++)
        {
            animals[i] = Animal.Random();
        }

        var foods = new Food[foodsCount];
        for (var i = 0; i < foods.Length; i++)
        {
            foods[i] = Food.Random();
        }

        var result = World.Create(generation, animals, foods);

        return Task.FromResult(result);
    }

    public Task<World> EvolveWorld(World world, CancellationToken cancellationToken = default)
    {
        var generation = world.Generation + 1;
        var animalsCount = world.Animals.Length;
        var foodsCount = world.Foods.Length;

        var currentPopulation = new AnimalIndividual[animalsCount];
        for (var i = 0; i < animalsCount; i++)
        {
            currentPopulation[i] = world.Animals[i].Map();
        }

        var evolvedPopulation = _geneticAlgorithm.Evolve(currentPopulation);

        var animals = new Animal[animalsCount];
        for (var i = 0; i < animalsCount; i++)
        {
            animals[i] = evolvedPopulation[i].Map();
        }

        var foods = new Food[foodsCount];
        for (var i = 0; i < foodsCount; i++)
        {
            foods[i] = Food.Random();
        }

        var result = World.Create(generation, animals, foods);

        return Task.FromResult(result);
    }

    public Task<int> GetTotalSatiation(World world, CancellationToken cancellationToken)
    {
        var result = 0;

        for (var i = 0; i < world.Animals.Length; i++)
        {
            result += world.Animals[i].Satiation;
        }

        return Task.FromResult(result);
    }
}
