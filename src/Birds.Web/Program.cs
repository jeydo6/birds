using Birds.Application.Services;
using Birds.Evolution.Algorithms;
using Birds.Evolution.Crossovers;
using Birds.Evolution.Mutations;
using Birds.Evolution.Selections;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Birds.Web;

internal static class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors();
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddApplication();

        var app = builder.Build();

        app.UseRouting();
        app.UseCors(cfg => cfg
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.MapControllers();

        app.Run();
    }

    private static void AddApplication(this IServiceCollection services)
        => services
            .AddSingleton<ISelection, RouletteWheelSelection>()
            .AddSingleton<ICrossover, UniformCrossover>()
            .AddSingleton<IMutation>(_ => new GaussianMutation(0.01f, 0.3f))
            .AddSingleton(typeof(IGeneticAlgorithm<>), typeof(GeneticAlgorithm<>))
            .AddSingleton<ISimulationService, SimulationService>();
}
