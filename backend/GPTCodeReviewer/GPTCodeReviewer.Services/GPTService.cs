using GPTCodeReviewer.Services.Contracts;
using GPTCodeReviewer.Web.GPT;

namespace GPTCodeReviewer.Services
{
    public class GPTService : IGPTService
    {
        private readonly string apiKey;

        public GPTService(string apiKey)
        {
            this.apiKey = apiKey;
        }

        public async Task<string> MakeRequest(string message)
        {
            var requester = new Requester(this.apiKey);

            return await requester.MakeRequestAsync(message);
        }
    }
}
