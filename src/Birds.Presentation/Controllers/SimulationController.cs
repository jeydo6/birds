using System.Threading;
using Microsoft.AspNetCore.Mvc;

namespace Birds.Presentation.Controllers;

[ApiController]
[Route("api/simulation")]
public class SimulationController
{
    [HttpGet]
    public Simulation.Models.Simulation GetSimulation(CancellationToken cancellationToken)
        => Simulation.Models.Simulation.Create();
}
