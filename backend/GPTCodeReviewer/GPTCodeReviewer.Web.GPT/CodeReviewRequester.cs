using GPTCodeReviewer.Web.GPT.Models;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Web;

namespace GPTCodeReviewer.Web.GPT
{
    public class CodeReviewRequester : Requester
    {
        public async Task<object> ReviewCodeAsync(string question, string code, string path)
        {
            var model = new ReviewCodeModel()
            {
                question = question,
                code = code
            };

            // Serialize the data to JSON
            string jsonContent = JsonConvert.SerializeObject(model);

            string jsonResult = await this.MakePostRequestAsync(jsonContent, path);

            object result = JsonConvert.DeserializeObject<object>(jsonResult);

            return result;
        }
    }
}
