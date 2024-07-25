using Birds.Evolution.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Birds.Presentation;

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


// internal class Individual : IIndividual
// {
//     public float[] Genes { get; init; } = Array.Empty<float>();
//
//     public float Fitness()
//     {
//         var result = 0f;
//         for (var i = 0; i < Genes.Length; i++)
//         {
//             result += Genes[i];
//         }
//
//         return result;
//     }
// }
