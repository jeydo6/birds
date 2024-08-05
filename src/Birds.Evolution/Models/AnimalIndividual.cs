namespace Birds.Evolution.Models;

public class AnimalIndividual : IIndividual
{
    public required float Fitness { get; init; }
    public required float[] Genes { get; init; }

    // public Animal ToAnimal()
    //     => Animal.FromGenes(Genes);
    //
    // public static AnimalIndividual FromAnimal(Animal animal)
    //     => new AnimalIndividual
    //     {
    //         Fitness = animal.Satiation,
    //         Genes = animal.ToGenes()
    //     };
}
