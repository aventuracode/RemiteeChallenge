using Remitee.Core.Entities;

namespace Core.Specifications
{
    public class LibroForCountingSpecification : BaseSpecification<Libro>
    {
        public LibroForCountingSpecification(LibroSpecificationParams libroParams)
           : base(x =>
           (string.IsNullOrEmpty(libroParams.Search) || x.Titulo.Contains(libroParams.Search)) && 
           (!libroParams.Categoria.HasValue || x.CategoriaId == libroParams.Categoria)
           )
        { }

    }
}
