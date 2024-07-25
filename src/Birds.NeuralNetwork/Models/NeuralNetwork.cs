using System;

namespace Birds.NeuralNetwork.Models;

internal sealed class NeuralNetwork
{
    private readonly Layer[] _layers;

    private NeuralNetwork(Layer[] layers)
        => _layers = layers;

    public float[] Propagate(float[] inputs)
    {
        for (var i = 0; i < _layers.Length; i++)
        {
            inputs = _layers[i].Propagate(inputs);
        }

        return inputs;
    }

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
