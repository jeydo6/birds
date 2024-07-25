using Birds.Evolution.Models;

namespace Birds.Evolution.Crossovers;

internal interface ICrossover
{
    float[] Crossover<TIndividual>(TIndividual parent1, TIndividual parent2) where TIndividual : IIndividual, new();
}