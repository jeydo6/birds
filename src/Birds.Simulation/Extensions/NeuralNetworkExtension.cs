using Birds.Simulation.Models;

namespace Birds.Simulation.Extensions;

internal static class NeuralNetworkExtension
{
    public static float[] Propagate(this NeuralNetwork self, float[] inputs)
    {
        for (var i = 0; i < self.Layers.Length; i++)
        {
            inputs = self.Layers[i].Propagate(inputs);
        }

        return inputs;
    }
}
