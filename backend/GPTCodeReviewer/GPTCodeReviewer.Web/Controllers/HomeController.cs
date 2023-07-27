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

        // Test
        [Route(nameof(AskQuestion))]
        public async Task<IActionResult> AskQuestion()
        {
            try
            {
                var response = await gptService.MakeRequest("Explain me what is Nuclear Fusion?");

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }
    }
}