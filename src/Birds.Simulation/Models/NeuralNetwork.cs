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

        var layers = new Layer[layerSizes.Length - 1];
        for (var i = 0; i < layers.Length; i++)
        {
            layers[i] = Layer.Create(layerSizes[i], layerSizes[i + 1]);
        }

        return new NeuralNetwork(layers);
    }
}
