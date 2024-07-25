using Birds.Evolution.Models;

namespace Birds.Evolution.Selections;

internal interface ISelection
{
    TIndividual Select<TIndividual>(TIndividual[] population) where TIndividual : IIndividual;
}