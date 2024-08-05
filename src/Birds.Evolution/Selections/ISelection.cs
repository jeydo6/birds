using Birds.Evolution.Models;

namespace Birds.Evolution.Selections;

public interface ISelection
{
    TIndividual Select<TIndividual>(TIndividual[] population) where TIndividual : IIndividual;
}
