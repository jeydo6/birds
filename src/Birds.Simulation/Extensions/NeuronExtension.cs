using System;
using Birds.Simulation.Models;

namespace Birds.Simulation.Extensions;

internal static class NeuronExtension
{
    public static float Propagate(this Neuron self, float[] inputs)
    {
        if (inputs.Length != self.Weights.Length)
            throw new Exception("Количество входных параметров не равно количеству весов");

        var output = self.Bias;
        for (var i = 0; i < inputs.Length; i++)
        {
            output += inputs[i] * self.Weights[i];
        }

        return output > 0 ? output : 0;
    }
}
