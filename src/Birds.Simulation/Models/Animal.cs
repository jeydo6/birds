using System;
using Birds.Core.Extensions;

namespace Birds.Simulation.Models;

public sealed class Animal
{
    private Animal(Point position, float rotation, float speed, Eye eye, NeuralNetwork brain)
    {
        Position = position;
        Rotation = rotation;
        Speed = speed;
        Eye = eye;
        Brain = brain;
    }

    public Point Position { get; }
    public float Rotation { get; }
    public float Speed { get; }
    public Eye Eye { get; }
    public NeuralNetwork Brain { get; }

    public static Animal Create()
    {
        var position = Point.Create();
        var rotation = Random.Shared.NextUSingle(6);
        const float speed = 0.002f;

        var eye = Eye.Create();

        var layerSizes = new int[] { eye.CellsCount, 2 * eye.CellsCount, 2 };
        var brain = NeuralNetwork.Create(layerSizes);

        return new Animal(position, rotation, speed, eye, brain);
    }
}
