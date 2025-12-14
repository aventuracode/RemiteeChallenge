using Microsoft.EntityFrameworkCore;
using Remitee.Business.Data;
using Remitee.WebApi;

namespace WebApi;
public class Program
{
    public static async Task Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();
        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            try
            {
                var context = services.GetRequiredService<RemiteeDbContext>();
                await context.Database.MigrateAsync();
                await RemiteeDbContextData.CargarDataAsync(context, loggerFactory);

            }
            catch (Exception e)
            {

                var logger = loggerFactory.CreateLogger<Program>();
                logger.LogError(e, "errores en el proceso de migracion");
            }
        }
        host.Run();

    }
    private static IHostBuilder CreateHostBuilder(string[] args)
     => Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
}
