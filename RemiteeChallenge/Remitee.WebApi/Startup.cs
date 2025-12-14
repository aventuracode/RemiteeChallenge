using BusinessLogic.Logic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using Remitee.Business.Data;
using Remitee.Business.Logic;
using Remitee.Core.Interfaces;
using System.Text;
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
            //services.AddScoped<ITokenService, TokenService>();
            //var builder = services.AddIdentityCore<Usuario>();
            //builder = new IdentityBuilder(builder.UserType, builder.Services);
            //builder.AddRoles<IdentityRole>();

            //builder.AddEntityFrameworkStores<SeguridadDBContext>();
            //builder.AddSignInManager<SignInManager<Usuario>>();
            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            //{
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:key"])),
            //        ValidIssuer = Configuration["Token:Issuer"],
            //        ValidateIssuer = true,
            //        ValidateAudience = false
            //    };
            //});


            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            //services.AddScoped(typeof(IGenericSeguridadRepository<>), (typeof(GenericSeguridadRepository<>)));
            //services.AddScoped<INotasDeCreditoService, NotaDeCreditoService>();

            services.AddDbContext<RemiteeDbContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            //services.AddDbContext<SeguridadDBContext>(x =>
            //{
            //    x.UseSqlServer(Configuration.GetConnectionString("IdentitySeguridad"));
            //});
            //services.TryAddSingleton<ISystemClock, SystemClock>();
            services.AddTransient<ILibroRepository, LibroRepository>();
            services.AddControllers();
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

            app.UseStatusCodePagesWithReExecute("/errors", "?code={0}");
            app.UseRouting();
            app.UseCors("CorsRule");
            //app.UseAuthentication();
            //app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
