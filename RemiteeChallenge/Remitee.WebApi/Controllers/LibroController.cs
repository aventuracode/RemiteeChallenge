using AutoMapper;
using BusinessLogic.Logic;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using Remitee.Core.Entities;
using WebApi.Controllers;
using WebApi.Dtos;
using WebApi.Errors;

namespace Remitee.WebApi.Controllers
{
    public class LibroController : BaseApiController
    {
        private readonly IGenericRepository<Libro> _libroRepository;
        private readonly IMapper _mapper;

        public LibroController(IGenericRepository<Libro> libroRepository, IMapper mapper)
        {
            _libroRepository = libroRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Obtiene una lista paginada de libros
        /// </summary>
        /// <param name="libroParams">Parámetros de filtrado y paginación</param>
        /// <returns>Lista paginada de libros</returns>
        /// <response code="200">Devuelve la lista de libros</response>
        /// <response code="400">Si los parámetros son inválidos</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pagination<LibroDto>>> GetLibros([FromQuery] LibroSpecificationParams libroParams)
        {
            var spec = new LibroWithCategoriaSpecification(libroParams);
            var libros = await _libroRepository.GetAllWithSpec(spec);
            var specCount = new LibroForCountingSpecification(libroParams);
            var totalLibros = await _libroRepository.CountAsync(specCount);
            var rounded = Math.Ceiling(Convert.ToDecimal(totalLibros / libroParams.PageSize));
            var totalPages = Convert.ToInt32(rounded);
            var data = _mapper.Map<IReadOnlyList<Libro>, IReadOnlyList<LibroDto>>(libros);
            return Ok(
                new Pagination<LibroDto>
                {
                    Count = totalLibros,
                    Data = data,
                    PageCount = totalPages,
                    PageIndex = libroParams.PageIndex,
                    PageSize = libroParams.PageSize
                }
                );

        }
        /// <summary>
        /// Obtiene un libro por su ID
        /// </summary>
        /// <param name="id">ID del libro</param>
        /// <returns>libro encontrado</returns>
        /// <response code="200">Devuelve el libro solicitado</response>
        /// <response code="404">Si el libro no existe</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<LibroDto>> GetLibro(int id)
        {
            var spec = new LibroWithCategoriaSpecification(id);
            var libro = await _libroRepository.GetByIdWithSpec(spec);
            if (libro == null)
            {
                return NotFound(new CodeErrorResponse(404, "El libro no existe"));
            }
            return _mapper.Map<Libro, LibroDto>(libro);
        }
    }
}
