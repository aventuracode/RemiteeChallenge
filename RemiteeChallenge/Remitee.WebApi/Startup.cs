using BusinessLogic.Logic;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using Remitee.Business.Data;
using Remitee.Business.Logic;
using Remitee.Core.Interfaces;
using WebApi.Dtos;
using WebApi.Middleware;

namespace Remitee.WebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));

            services.AddDbContext<RemiteeDbContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            
            services.AddTransient<ILibroRepository, LibroRepository>();
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo 
                { 
                    Title = "Remitee API", 
                    Version = "v1",
                    Description = "API para la gestión de libros y categorías",
                    Contact = new OpenApiContact
                    {
                        Name = "Remitee Team",
                        Email = "support@remitee.com"
                    }
                });

                var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsRule", rule =>
                {
                    rule.AllowAnyHeader().AllowAnyMethod().WithOrigins("*");
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Remitee API V1");
                c.RoutePrefix = string.Empty; 
            });

            app.UseStatusCodePagesWithReExecute("/errors", "?code={0}");
            app.UseRouting();
            app.UseCors("CorsRule");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
