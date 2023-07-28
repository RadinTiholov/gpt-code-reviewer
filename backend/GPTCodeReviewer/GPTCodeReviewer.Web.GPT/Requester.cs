using GPTCodeReviewer.Web.GPT.Models;
using Newtonsoft.Json;
using System.Text;

namespace GPTCodeReviewer.Web.GPT
{
    public class Requester
    {
        protected readonly HttpClient _httpClient;
        protected readonly string _requestUrl;

        public Requester()
        {
            _httpClient = new HttpClient();
            _requestUrl = "http://127.0.0.1:5000";
        }
        public async Task<string> AskQuestionAsing(string question, string path)
        {
            var model = new QuestionModel()
            {
                question = question
            };

            // Serialize the data to JSON
            string jsonContent = JsonConvert.SerializeObject(model);

            return await this.MakeRequestAsync(jsonContent, path);
        }

        public async Task<string> MakeRequestAsync(string jsonContent, string path)
        {
            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            // Send the POST request and await the response
            HttpResponseMessage response = await this._httpClient.PostAsync(this._requestUrl + path, httpContent).ConfigureAwait(false);

            // Check if the response was successful
            response.EnsureSuccessStatusCode();

            // Read the response content as a string
            return await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        }
    }
}
