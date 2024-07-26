using System;
using Birds.Core.Extensions;

namespace Birds.Simulation.Models;

public sealed class Neuron
{
    private Neuron(float bias, float[] weights)
    {
        Bias = bias;
        Weights = weights;
    }

    public float Bias { get; }
    public float[] Weights { get; }

    public static Neuron Create(int inputsCount)
    {
        var bias = Random.Shared.NextSingle(6);
        var weights = new float[inputsCount];
        for (var i = 0; i < weights.Length; i++)
        {
            weights[i] = Random.Shared.NextSingle(6);
        }

        return new Neuron(bias, weights);
    }
}
