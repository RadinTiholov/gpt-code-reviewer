using GPTCodeReviewer.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace GPTCodeReviewer.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ApiController
    {
        private readonly IGPTService gptService;

        public HomeController(IGPTService gptService)
        {
            this.gptService = gptService;
        }


        //[Authorize]
        public async Task<IActionResult> Get()
        {
            try
            {
                // Test
                var response = await gptService.MakeRequest("Can you say hello for me?");

                return this.Ok("Works");
            }
            catch (Exception)
            {
                return this.BadRequest();
            }
        }
    }
}