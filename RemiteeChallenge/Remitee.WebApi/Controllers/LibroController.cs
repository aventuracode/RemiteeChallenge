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

        /// <summary>
        /// Crea un nuevo libro
        /// </summary>
        /// <param name="createLibroDto">Datos del libro a crear</param>
        /// <returns>Libro creado</returns>
        /// <response code="201">Devuelve el libro creado</response>
        /// <response code="400">Si los datos son inválidos</response>
        /// <response code="500">Error al recuperar el libro creado</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<LibroDto>> CreateLibro([FromBody] CreateLibroDto createLibroDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new CodeErrorResponse(400, "Datos inválidos"));
                }

                var libro = _mapper.Map<CreateLibroDto, Libro>(createLibroDto);
                libro.CreatedAt = DateTime.UtcNow;

                await _libroRepository.Add(libro);

                var spec = new LibroWithCategoriaSpecification(libro.Id);
                var libroWithCategoria = await _libroRepository.GetByIdWithSpec(spec);

                if (libroWithCategoria == null)
                {
                    return StatusCode(500, new CodeErrorResponse(500, "Error al recuperar el libro creado"));
                }


                return StatusCode(StatusCodes.Status201Created, libroWithCategoria);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new CodeErrorException(500, "Error al crear el libro", ex.Message));
            }
        }
    }
}
