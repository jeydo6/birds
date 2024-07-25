namespace Birds.NeuralNetwork.Models;

internal sealed class Layer
{
    private readonly Neuron[] _neurons;

    private Layer(Neuron[] neurons)
        => _neurons = neurons;

    public float[] Propagate(float[] inputs)
    {
        var outputs = new float[_neurons.Length];
        for (var i = 0; i < outputs.Length; i++)
        {
            outputs[i] = _neurons[i].Propagate(inputs);
        }

        return outputs;
    }

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