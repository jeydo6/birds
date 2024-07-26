namespace Birds.Simulation.Models;

public sealed class Brain
{
    private Brain(NeuralNetwork neuralNetwork)
        => NeuralNetwork = neuralNetwork;

    public NeuralNetwork NeuralNetwork { get; }

    public static Brain Create(int[] layerSizes)
    {
        var neuralNetwork = NeuralNetwork.Create(layerSizes);

        return new Brain(neuralNetwork);
    }
}
