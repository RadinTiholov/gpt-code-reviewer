using GPTCodeReviewer.Services.Contracts;
using GPTCodeReviewer.Web.GPT;
using System.Text;
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

        public async Task<object> ReviewCode(string code, List<string> factors)
        {
            string factorsString = this.BuildFactors(factors);

            string query = ReviewCodeQuery(factorsString);

            return await this.requester.ReviewCodeAsync(query, code, "/gpt/review");
        }

        public async Task LoginInGPT()
        {
            await this.requester.Login("/gpt/login");
        }
        private string BuildFactors(List<string> factors)
        {
            StringBuilder builder = new StringBuilder();
            foreach (var factor in factors)
            {
                builder.Append($"\"{factor}Score\" : \"your {factor} score\", ");
                builder.Append($"\"{factor}ScoreMessage\" : \"your opinion for {factor}\", ");
            }
            return builder.ToString();
        }

    }
}
