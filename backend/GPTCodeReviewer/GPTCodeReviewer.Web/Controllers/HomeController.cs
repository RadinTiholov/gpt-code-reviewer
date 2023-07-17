using Microsoft.AspNetCore.Mvc;

namespace GPTCodeReviewer.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        //[Authorize]
        public async Task<IActionResult> Get()
        {
            return this.Ok("Works");
        }
    }
}