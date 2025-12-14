using BusinessLogic.Logic;
using Microsoft.AspNetCore.Mvc;
using Remitee.Core.Entities;

namespace WebApi.Controllers
{
    /// <summary>
    /// CategoriaController
    /// </summary>
    public class CategoriaController : BaseApiController
    {
        private readonly IGenericRepository<Categoria> _categoriaRepository;

        public CategoriaController(IGenericRepository<Categoria> categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;

        }
        /// <summary>
        /// getCategoriaAll
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Categoria>>> getCategoriaAll()
        {
            return Ok(await _categoriaRepository.GetAllAsync());

        }
        /// <summary>
        /// GetCategoriaById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategoriaById(int id)
        {
            return await _categoriaRepository.GetByIdAsync(id);
        }
    }
}
