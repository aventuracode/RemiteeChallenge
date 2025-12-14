namespace Remitee.Core.Entities
{
    public class Libro:ClaseBase
    {
        public string Titulo { get; set; } = default!;
        public string Autor { get; set; } = default!;
        public string Descripcion { get; set; } = default!;
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
