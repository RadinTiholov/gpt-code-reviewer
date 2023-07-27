using GPTCodeReviewer.Services.Contracts;
using GPTCodeReviewer.Web.GPT;

namespace GPTCodeReviewer.Services
{
    public class GPTService : IGPTService
    {
        private Requester requester;

        public GPTService(Requester requester)
        {
            this.requester = requester;
        }

        public async Task<string> MakeRequest(string message)
        {
            return await this.requester.MakeRequestAsync(message);
        }
    }
}
