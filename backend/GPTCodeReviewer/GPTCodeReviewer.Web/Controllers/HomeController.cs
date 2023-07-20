using Microsoft.AspNetCore.Mvc;

namespace GPTCodeReviewer.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ApiController
    {
        //[Authorize]
        public async Task<IActionResult> Get()
        {
            return this.Ok("Works");
        }
    }
}