using GPTCodeReviewer.Data;
using GPTCodeReviewer.Data.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using GPTCodeReviewer.Web.Infrastructure.Extensions;
using GPTCodeReviewer.Services.Contracts;
using GPTCodeReviewer.Services;
using GPTCodeReviewer.Web;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequiredLength = 6;
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
})
    .AddEntityFrameworkStores<ApplicationDbContext>();

var applicationSettingsConfiguration = builder.Configuration.GetSection("ApplicationSettings");
builder.Services.Configure<ApplicationSettings>(applicationSettingsConfiguration);

var appSettings = applicationSettingsConfiguration.Get<ApplicationSettings>();
var jwtKey = Encoding.ASCII.GetBytes(appSettings.Secret);
var openAIKey = appSettings.OpenAIKey;

Console.WriteLine($"jwtKey: {jwtKey}");
Console.WriteLine($"openAIKey: {openAIKey}");

builder.Services.AddTransient<IGPTService>(x => new GPTService(openAIKey));

builder.Services.
    AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(jwtKey),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");

    app.UseHsts();
}

app.UseRouting();

app.UseCors(options => options
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed((x) => true)
    .AllowCredentials());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.ApplyMigration();

app.Run();