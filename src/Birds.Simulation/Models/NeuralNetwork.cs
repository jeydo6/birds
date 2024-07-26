using System;

namespace Birds.Simulation.Models;

public sealed class NeuralNetwork
{
    private NeuralNetwork(Layer[] layers)
        => Layers = layers;

    public Layer[] Layers { get; }

    public static NeuralNetwork Create(int[] layerSizes)
    {
        if (layerSizes.Length < 2)
            throw new Exception("Неверное количество слоёв");

        var layers = new Layer[layerSizes.Length];
        for (var i = 0; i < layers.Length - 1; i++)
        {
            layers[i] = Layer.Create(layerSizes[i], layerSizes[i + 1]);
        }

        layers[^1] = Layer.Create(layerSizes[^1], 1);

        return new NeuralNetwork(layers);
    }
}
