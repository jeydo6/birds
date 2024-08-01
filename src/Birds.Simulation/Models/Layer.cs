using System;
using System.Collections.Generic;

namespace Birds.Simulation.Models;

public sealed class Layer
{
    public required Neuron[] Neurons { get; init; }

    public IEnumerable<float> ToWeights()
    {
        for (var i = 0; i < Neurons.Length; i++)
        {
            foreach (var weight in Neurons[i].ToWeights())
            {
                yield return weight;
            }
        }
    }

    public static Layer FromWeights(int inputsCount, int outputsCount, Span<float> weights)
    {
        var neurons = new Neuron[outputsCount];

        var start = 0;
        for (var i = 0; i < neurons.Length; i++)
        {
            var length = inputsCount + 1;
            neurons[i] = Neuron.FromWeights(inputsCount, weights.Slice(start, length));
            start += length;
        }

        return new Layer
        {
            Neurons = neurons
        };
    }

    public static Layer Random(int inputsCount, int outputsCount)
    {
        var neurons = new Neuron[outputsCount];
        for (var i = 0; i < neurons.Length; i++)
        {
            neurons[i] = Neuron.Random(inputsCount);
        }

        return new Layer
        {
            Neurons = neurons
        };
    }
}
