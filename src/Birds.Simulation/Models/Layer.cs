namespace Birds.Simulation.Models;

public sealed class Layer
{
    private Layer(Neuron[] neurons)
        => Neurons = neurons;

    public Neuron[] Neurons { get; }

    public static Layer Create(int inputsCount, int outputsCount)
    {
        var neurons = new Neuron[outputsCount];
        for (var i = 0; i < neurons.Length; i++)
        {
            neurons[i] = Neuron.Create(inputsCount);
        }

        return new Layer(neurons);
    }
}
