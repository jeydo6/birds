using System.Threading;
using Birds.Evolution.Algorithms;
using Birds.Simulation.Models;
using Microsoft.AspNetCore.Mvc;

namespace Birds.Simulation.Controllers;

[ApiController]
[Route("api/world")]
public sealed class WorldController
{
    private readonly IGeneticAlgorithm<AnimalIndividual> _geneticAlgorithm;

    public WorldController(IGeneticAlgorithm<AnimalIndividual> geneticAlgorithm)
        => _geneticAlgorithm = geneticAlgorithm;

    [HttpGet("create")]
    public World CreateWorld(CancellationToken cancellationToken)
    {
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

        return World.Create(animals, foods);
    }

    [HttpPost("evolve")]
    public World EvolveWorld([FromBody] World world, CancellationToken cancellationToken)
    {
        var animalsCount = world.Animals.Length;
        var foodsCount = world.Foods.Length;

        var currentPopulation = new AnimalIndividual[animalsCount];
        for (var i = 0; i < animalsCount; i++)
        {
            currentPopulation[i] = AnimalIndividual.FromAnimal(world.Animals[i]);
        }

        var evolvedPopulation = _geneticAlgorithm.Evolve(currentPopulation);

        var animals = new Animal[animalsCount];
        for (var i = 0; i < animalsCount; i++)
        {
            animals[i] = evolvedPopulation[i].ToAnimal();
        }

        var foods = new Food[foodsCount];
        for (var i = 0; i < foodsCount; i++)
        {
            foods[i] = Food.Random();
        }

        return World.Create(animals, foods);
    }
}
