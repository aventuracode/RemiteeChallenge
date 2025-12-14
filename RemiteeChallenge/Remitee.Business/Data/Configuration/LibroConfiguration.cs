using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remitee.Core.Entities;

namespace Remitee.Business.Data.Configuration
{
    public class LibroConfiguration : IEntityTypeConfiguration<Libro>
    {
        public void Configure(EntityTypeBuilder<Libro> builder)
        {
            builder.Property(l => l.Titulo).IsRequired().HasMaxLength(100);
            builder.Property(l => l.Autor).IsRequired().HasMaxLength(50);
            builder.HasOne(c => c.Categoria).WithMany().HasForeignKey(l => l.CategoriaId);
        }
    }
}
