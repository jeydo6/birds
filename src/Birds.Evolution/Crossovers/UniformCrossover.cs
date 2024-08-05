using System;
using Birds.Core.Extensions;
using Birds.Evolution.Models;

namespace Birds.Evolution.Crossovers;

public sealed class UniformCrossover : ICrossover
{
    public float[] Crossover<TIndividual>(TIndividual parent1, TIndividual parent2)
        where TIndividual : IIndividual, new()
    {
        if (parent1.Genes.Length != parent2.Genes.Length)
            throw new Exception("Individuals must contain the same number of genes");

        var genes = new float[parent1.Genes.Length];
        for (var i = 0; i < genes.Length; i++)
        {
            genes[i] = Random.Shared.NextBool(0.5f) ? parent1.Genes[i] : parent2.Genes[i];
        }

        return genes;
    }
}
