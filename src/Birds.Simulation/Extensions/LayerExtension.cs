using Birds.Simulation.Models;

namespace Birds.Simulation.Extensions;

internal static class LayerExtension
{
    public static float[] Propagate(this Layer self, float[] inputs)
    {
        var outputs = new float[self.Neurons.Length];
        for (var i = 0; i < outputs.Length; i++)
        {
            outputs[i] = self.Neurons[i].Propagate(inputs);
        }

        return outputs;
    }
}
