using GPTCodeReviewer.Services.Contracts;
using GPTCodeReviewer.Web.Models.Request;
using GPTCodeReviewer.Web.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace GPTCodeReviewer.Web.Controllers
{
    public class ReviewerController : ApiController
    {
        private readonly IGPTService gptService;

        public ReviewerController(IGPTService gptService)
        {
            this.gptService = gptService;
        }

        [HttpPost]
        [Route(nameof(Review))]
        public async Task<ActionResult<object>> Review(ReviewInputModel model)
        {
            try
            {
                return await gptService.ReviewCode(model.Code, model.Factors);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route(nameof(AskQuestion))]
        public async Task<IActionResult> AskQuestion(QuestionInputModel model)
        {
            try
            {
                var response = await gptService.MakeRequest(model.Question);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }
    }
}
