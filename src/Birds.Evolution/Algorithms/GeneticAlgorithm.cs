using System;
using Birds.Evolution.Crossovers;
using Birds.Evolution.Models;
using Birds.Evolution.Mutations;
using Birds.Evolution.Selections;

namespace Birds.Evolution.Algorithms;

public interface IGeneticAlgorithm<TIndividual>
    where TIndividual : IIndividual
{
    public TIndividual[] Evolve(TIndividual[] population);
}

public sealed class GeneticAlgorithm<TIndividual> : IGeneticAlgorithm<TIndividual>
    where TIndividual : IIndividual, new()
{
    private readonly ISelection _selection;
    private readonly ICrossover _crossover;
    private readonly IMutation _mutation;

    public GeneticAlgorithm(
        ISelection selection,
        ICrossover crossover,
        IMutation mutation)
    {
        _selection = selection;
        _crossover = crossover;
        _mutation = mutation;
    }

    public TIndividual[] Evolve(TIndividual[] population)
    {
        if (population.Length is 0)
            throw new Exception("Популяция должна содержать хотя бы одну особь");

        var newPopulation = new TIndividual[population.Length];
        for (var i = 0; i < newPopulation.Length; i++)
        {
            var parent1 = _selection.Select(population);
            var parent2 = _selection.Select(population);

            var genes = _crossover.Crossover(parent1, parent2);
            _mutation.Mutate(genes);

            newPopulation[i] = new TIndividual { Genes = genes };
        }

        return newPopulation;
    }
}
