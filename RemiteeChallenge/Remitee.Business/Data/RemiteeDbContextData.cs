using Microsoft.Extensions.Logging;
using Remitee.Core.Entities;
using System.Text.Json;

namespace Remitee.Business.Data
{
    public class RemiteeDbContextData
    {
        public static async Task CargarDataAsync(RemiteeDbContext context, ILoggerFactory loggerFactory)
        {
            try
            {

                if (!context.Categoria.Any())
                {
                    var categoriaData = File.ReadAllText("../Remitee.Business/CargarData/categoria.json");
                    var categorias = JsonSerializer.Deserialize<List<Categoria>>(categoriaData);
                    foreach (var categoria in categorias)
                    {
                        context.Categoria.Add(categoria);
                    }
                    await context.SaveChangesAsync();

                }
                if (!context.Libro.Any())
                {
                    var libroData = File.ReadAllText("../Remitee.Business/CargarData/libro.json");
                    var libros = JsonSerializer.Deserialize<List<Libro>>(libroData);
                    foreach (var libro in libros)
                    {
                        context.Libro.Add(libro);
                    }
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                var logger = loggerFactory.CreateLogger<RemiteeDbContextData>();
                logger.LogError(e.Message);

            }
        }
    }
}
