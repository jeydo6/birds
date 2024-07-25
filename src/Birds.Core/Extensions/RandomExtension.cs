using System;

namespace Birds.Core.Extensions;

public static class RandomExtension
{
    public static bool NextBool(this Random random, float chance)
    {
        if (chance is < 0f or > 1f)
            return false;

        return random.NextSingle() + float.Epsilon <= chance;
    }

    public static float NextSingle(this Random random, int precision)
    {
        var multiplier = (int)Math.Pow(10, precision);

        return random.Next(-multiplier, multiplier + 1) / (multiplier * 1f);
    }

    public static float NextUSingle(this Random random, int precision)
    {
        var multiplier = (int)Math.Pow(10, precision);

        return random.Next(0, multiplier + 1) / (multiplier * 1f);
    }
}
