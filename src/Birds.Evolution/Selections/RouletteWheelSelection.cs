using System;
using Birds.Core.Extensions;
using Birds.Evolution.Models;

namespace Birds.Evolution.Selections;

public sealed class RouletteWheelSelection : ISelection
{
    public TIndividual Select<TIndividual>(TIndividual[] population) where TIndividual : IIndividual
    {
        if (population.Length is 0)
            throw new Exception("The population must contain at least one individual");

        var totalFitness = 0f;
        for (var i = 0; i < population.Length; i++)
        {
            totalFitness += population[i].Fitness;
        }

        var targetFitness = Random.Shared.NextUSingle(6) * totalFitness;

        var currentFitness = 0f;
        for (var i = 0; i < population.Length; i++)
        {
            currentFitness += population[i].Fitness;
            if (currentFitness >= targetFitness)
                return population[i];
        }

        return population[^1];
    }
}
