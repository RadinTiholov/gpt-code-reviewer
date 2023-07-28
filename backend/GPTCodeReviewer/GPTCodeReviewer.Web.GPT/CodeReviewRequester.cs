using GPTCodeReviewer.Web.GPT.Models;
using Newtonsoft.Json;

namespace GPTCodeReviewer.Web.GPT
{
    public class CodeReviewRequester : Requester
    {
        public async Task<string> ReviewCodeAsync(string question, string code, string path)
        {
            var model = new ReviewCodeModel()
            {
                question = question,
                code = code
            };

            // Serialize the data to JSON
            string jsonContent = JsonConvert.SerializeObject(model);

            return await this.MakeRequestAsync(jsonContent, path);
        }
    }
}
