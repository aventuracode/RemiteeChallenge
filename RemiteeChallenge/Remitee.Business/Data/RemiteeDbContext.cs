using Microsoft.EntityFrameworkCore;
using Remitee.Core.Entities;
using System.Reflection;

namespace Remitee.Business.Data
{
    public class RemiteeDbContext: DbContext
    {
        public RemiteeDbContext(DbContextOptions<RemiteeDbContext> options): base(options) { }
        
        public DbSet<Libro> Libro { get; set; }
        public DbSet<Categoria> Categoria { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
