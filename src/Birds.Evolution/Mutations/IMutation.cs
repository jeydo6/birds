namespace Birds.Evolution.Mutations;

internal interface IMutation
{
    void Mutate(float[] genes);
}