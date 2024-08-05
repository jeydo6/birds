using System.Threading;
using System.Threading.Tasks;
using Birds.Application.Services;
using Birds.Simulation.Models;
using Microsoft.AspNetCore.Mvc;

namespace Birds.Web.Controllers;

[ApiController]
[Route("api/simulation")]
public class SimulationController
{
    private readonly ISimulationService _service;

    public SimulationController(ISimulationService service)
        => _service = service;

    [HttpGet("create-world")]
    public Task<World> CreateWorld(CancellationToken cancellationToken)
        => _service.CreateWorld(cancellationToken);

    [HttpPost("evolve-world")]
    public Task<World> EvolveWorld([FromBody] World world, CancellationToken cancellationToken)
        => _service.EvolveWorld(world, cancellationToken);

    [HttpPost("get-total-satiation")]
    public Task<int> GetTotalSatiation([FromBody] World world, CancellationToken cancellationToken)
        => _service.GetTotalSatiation(world, cancellationToken);
}
