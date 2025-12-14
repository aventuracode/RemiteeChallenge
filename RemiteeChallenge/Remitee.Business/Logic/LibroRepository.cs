using Microsoft.EntityFrameworkCore;
using Remitee.Business.Data;
using Remitee.Core.Entities;
using Remitee.Core.Interfaces;

namespace Remitee.Business.Logic
{
    public class LibroRepository : ILibroRepository
    {
        private readonly RemiteeDbContext _context;
        public LibroRepository(RemiteeDbContext context)
        {
            _context = context;
        }
        public async Task<Libro> GetLibroByIdAsync(int id)
        {
            return await _context.Libro
                .Include(p => p.Categoria)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Libro>> GetLibrosAsync()
        {
            return await _context.Libro
                .Include(p => p.Categoria)
                .ToListAsync();
        }
        //public Task<Libro> GetLibroByIdAsync(int id)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<IReadOnlyList<Libro>> GetLibrosAsync()
        //{
        //    throw new NotImplementedException();
        //}
    }
}
