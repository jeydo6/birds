namespace Birds.Simulation.Models;

public sealed class Simulation
{
    private Simulation(World world)
        => World = world;

    public World World { get; }

    public static Simulation Create()
    {
        var world = World.Create();

        return new Simulation(world);
    }
}
