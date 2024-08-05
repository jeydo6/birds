using System;
using Birds.Core.Extensions;

namespace Birds.Evolution.Mutations;

public sealed class GaussianMutation : IMutation
{
    private readonly float _chance;
    private readonly float _coefficient;

    public GaussianMutation(float chance, float coefficient)
    {
        _chance = chance;
        _coefficient = coefficient;
    }

    public void Mutate(float[] genes)
    {
        for (var i = 0; i < genes.Length; i++)
        {
            if (Random.Shared.NextBool(_chance))
            {
                genes[i] += _coefficient * Random.Shared.NextSingle(6);
            }
        }
    }
}
