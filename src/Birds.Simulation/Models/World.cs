namespace Birds.Simulation.Models;

public sealed class World
{
    private World(Animal[] animals, Food[] foods)
    {
        Animals = animals;
        Foods = foods;
    }

    public Animal[] Animals { get; }
    public Food[] Foods { get; }

    public static World Create()
    {
        const int animalsCount = 40;
        const int foodsCount = 60;

        var eye = Eye.Create();

        // TODO: Create better Brain
        var brain = Brain.Create(System.Array.Empty<int>());

        var animals = new Animal[animalsCount];
        for (var i = 0; i < animals.Length; i++)
        {
            animals[i] = Animal.Create(eye, brain);
        }

        var foods = new Food[foodsCount];
        for (var i = 0; i < foods.Length; i++)
        {
            foods[i] = Food.Create();
        }

        return new World(animals, foods);
    }
}
