using GPTCodeReviewer.Web.GPT.Models;
using Newtonsoft.Json;
using System.Text;

namespace GPTCodeReviewer.Web.GPT
{
    public class Requester
    {
        private readonly HttpClient _httpClient;
        private readonly string _requestUrl;

        public Requester()
        {
            _httpClient = new HttpClient();
            _requestUrl = "http://127.0.0.1:5000/gpt/ask";
        }
        public async Task<string> MakeRequestAsync(string question)
        {
            // Serialize the data to JSON
            string jsonContent = JsonConvert.SerializeObject(new QuestionModel { question = question });
            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            // Send the POST request and await the response
            HttpResponseMessage response = await _httpClient.PostAsync(_requestUrl, httpContent).ConfigureAwait(false);

            // Check if the response was successful
            response.EnsureSuccessStatusCode();

            // Read the response content as a string
            return await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        }
    }
}
