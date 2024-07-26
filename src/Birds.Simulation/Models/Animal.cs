using System;
using Birds.Core.Extensions;

namespace Birds.Simulation.Models;

public sealed class Animal
{
    private Animal(Point position, float rotation, float speed, Eye eye, Brain brain)
    {
        Position = position;
        Rotation = rotation;
        Speed = speed;
    }

    public Point Position { get; }
    public float Rotation { get; }
    public float Speed { get; }

    public static Animal Create(Eye eye, Brain brain)
    {
        var position = Point.Create();
        var rotation = Random.Shared.NextUSingle(6);
        const float speed = 0.002f;

        return new Animal(position, rotation, speed, eye, brain);
    }
}
