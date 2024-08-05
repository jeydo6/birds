using System;
using System.Collections.Generic;

namespace Birds.Simulation.Models;

public sealed class NeuralNetwork
{
    public required Layer[] Layers { get; init; }

    public float[] ToWeights()
    {
        var weights = new List<float>();
        for (var i = 0; i < Layers.Length; i++)
        {
            foreach (var weight in Layers[i].ToWeights())
            {
                weights.Add(weight);
            }
        }

        return weights.ToArray();
    }

    public static NeuralNetwork FromWeights(int[] layerSizes, Span<float> weights)
    {
        if (layerSizes.Length < 2)
            throw new Exception("Incorrect number of layers");

        var layers = new Layer[layerSizes.Length - 1];

        var start = 0;
        for (var i = 0; i < layers.Length; i++)
        {
            var inputsCount = layerSizes[i];
            var outputsCount = layerSizes[i + 1];

            var length = (inputsCount + 1) * outputsCount;
            layers[i] = Layer.FromWeights(inputsCount, outputsCount, weights.Slice(start, length));
            start += length;
        }

        return new NeuralNetwork
        {
            Layers = layers
        };
    }

    public static NeuralNetwork Random(int[] layerSizes)
    {
        if (layerSizes.Length < 2)
            throw new Exception("Incorrect number of layers");

        var layers = new Layer[layerSizes.Length - 1];
        for (var i = 0; i < layers.Length; i++)
        {
            layers[i] = Layer.Random(layerSizes[i], layerSizes[i + 1]);
        }

        return new NeuralNetwork
        {
            Layers = layers
        };
    }
}
