using Remitee.Core.Entities;

namespace Remitee.Core.Interfaces
{
    public interface ILibroRepository
    {
        Task<Libro> GetLibroByIdAsync(int id);
        Task<IReadOnlyList<Libro>> GetLibrosAsync();
    }
}
