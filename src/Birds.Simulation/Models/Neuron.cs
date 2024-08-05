using System;
using System.Collections.Generic;
using Birds.Core.Extensions;

namespace Birds.Simulation.Models;

public sealed class Neuron
{
    public required float Bias { get; init; }
    public required float[] Weights { get; init; }

    public IEnumerable<float> ToWeights()
    {
        yield return Bias;

        for (var i = 0; i < Weights.Length; i++)
        {
            yield return Weights[i];
        }
    }

    public static Neuron FromWeights(int inputsCount, Span<float> inputWeights)
    {
        if (inputWeights.Length < inputsCount + 1)
            throw new Exception("Incorrect number of layers");

        var bias = inputWeights[0];
        var weights = inputWeights.Slice(1, inputsCount).ToArray();

        return new Neuron
        {
            Bias = bias,
            Weights = weights
        };
    }

    public static Neuron Random(int inputsCount)
    {
        var bias = System.Random.Shared.NextSingle(6);
        var weights = new float[inputsCount];
        for (var i = 0; i < weights.Length; i++)
        {
            weights[i] = System.Random.Shared.NextSingle(6);
        }

        return new Neuron
        {
            Bias = bias,
            Weights = weights
        };
    }
}
