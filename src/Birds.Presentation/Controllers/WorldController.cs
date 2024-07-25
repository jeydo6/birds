using System.Threading;
using Birds.Simulation.Models;
using Microsoft.AspNetCore.Mvc;

namespace Birds.Presentation.Controllers;

[ApiController]
[Route("api/world")]
public sealed class WorldController
{
    [HttpGet]
    public World CreateWorld(CancellationToken cancellationToken)
        => World.Create();
}
