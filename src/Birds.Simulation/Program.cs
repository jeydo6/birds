using Birds.Evolution.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Birds.Simulation;

internal static class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors();
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddGeneticAlgorithm();

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
}
