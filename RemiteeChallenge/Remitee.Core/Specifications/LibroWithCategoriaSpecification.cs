using Remitee.Core.Entities;

namespace Core.Specifications
{
    public class LibroWithCategoriaSpecification : BaseSpecification<Libro>
    {
        public LibroWithCategoriaSpecification(LibroSpecificationParams libroParams) 
            : base(x => 
            (string.IsNullOrEmpty(libroParams.Search) || x.Titulo.Contains(libroParams.Search)) &&
            (!libroParams.Categoria.HasValue || x.CategoriaId == libroParams.Categoria)
            )
        {
            AddInclude(p => p.Categoria);
            //ApplyPaging(0,5)
            ApplyPaging(libroParams.PageSize * (libroParams.PageIndex - 1), libroParams.PageSize);

            if (!string.IsNullOrEmpty(libroParams.Sort))
            {
                switch (libroParams.Sort)
                {
                    case "tituloAsc":
                        AddOrderBy(p => p.Titulo);
                        break;

                    case "tituloDesc":
                        AddOrderByDescending(p => p.Titulo);
                        break;
                    case "descripcionAsc":
                        AddOrderBy(p => p.Autor);
                        break;
                    case "descripcionDesc":
                        AddOrderByDescending(p => p.Descripcion);
                        break;
                    default:
                        AddOrderBy(p => p.Titulo);
                        break;
                }
            }
        }
        public LibroWithCategoriaSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.Categoria);
        }
    }
}
