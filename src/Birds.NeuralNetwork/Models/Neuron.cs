using System;
using Birds.Core.Extensions;

namespace Birds.NeuralNetwork.Models;

internal sealed class Neuron
{
    private readonly float _bias;
    private readonly float[] _weights;

    private Neuron(float bias, float[] weights)
    {
        _bias = bias;
        _weights = weights;
    }

    public float Propagate(float[] inputs)
    {
        if (inputs.Length != _weights.Length)
            throw new Exception("Количество входных параметров не равно количеству весов");

        var output = _bias;
        for (var i = 0; i < inputs.Length; i++)
        {
            output += inputs[i] * _weights[i];
        }

        return output > 0 ? output : 0;
    }

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