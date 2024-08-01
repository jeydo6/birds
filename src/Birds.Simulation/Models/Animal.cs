using Birds.Core.Extensions;

namespace Birds.Simulation.Models;

public sealed class Animal
{
    public required Point Position { get; init; }
    public required float Rotation { get; init; }
    public required float Speed { get; init; }
    public required Eye Eye { get; init; }
    public required NeuralNetwork Brain { get; init; }

    public int Satiation { get; set; }

    public float[] ToGenes()
        => Brain.ToWeights();

    public static Animal FromGenes(float[] genes)
    {
        var position = Point.Random();
        var rotation = System.Random.Shared.NextUSingle(6);
        const float speed = 0.002f;

        var eye = Eye.Create();

        var layerSizes = new int[] { eye.CellsCount, 2 * eye.CellsCount, 2 };
        var brain = NeuralNetwork.FromWeights(layerSizes, weights: genes);

        return new Animal
        {
            Position = position,
            Rotation = rotation,
            Speed = speed,
            Eye = eye,
            Brain = brain
        };
    }

    public static Animal Random()
    {
        var position = Point.Random();
        var rotation = System.Random.Shared.NextUSingle(6);
        const float speed = 0.002f;

        var eye = Eye.Create();

        var layerSizes = new int[] { eye.CellsCount, 2 * eye.CellsCount, 2 };
        var brain = NeuralNetwork.Random(layerSizes);

        return new Animal
        {
            Position = position,
            Rotation = rotation,
            Speed = speed,
            Eye = eye,
            Brain = brain
        };
    }
}
