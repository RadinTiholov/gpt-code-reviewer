using GPTCodeReviewer.Services.Contracts;
using GPTCodeReviewer.Web.GPT;
using static GPTCodeReviewer.Web.GPT.Queries.GPTQueries;

namespace GPTCodeReviewer.Services
{
    public class GPTService : IGPTService
    {
        private CodeReviewRequester requester;

        public GPTService(CodeReviewRequester requester)
        {
            this.requester = requester;
        }

        public async Task<string> MakeRequest(string message)
        {
            return await this.requester.AskQuestionAsing(message, "/gpt/ask");
        }

        public async Task<string> ReviewCode(string code)
        {
            return await this.requester.ReviewCodeAsync(ReviewCodeQuery, code, "/gpt/review");
        }
    }
}
