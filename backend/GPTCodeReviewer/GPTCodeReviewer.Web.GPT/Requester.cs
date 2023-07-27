using GPTCodeReviewer.Web.GPT.Models;
using Newtonsoft.Json;
using System.Text;

namespace GPTCodeReviewer.Web.GPT
{
    public class Requester
    {
        public async Task<string> MakeRequestAsync(string question)
        {
            string requestUrl = "http://localhost:5000/gpt/ask";

            using (var httpClient = new HttpClient())
            {
                // Serialize the data to JSON
                string jsonContent = JsonConvert.SerializeObject(new QuestionModel() { Question = question });
                var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                // Send the POST request and await the response
                HttpResponseMessage response = await httpClient.PostAsync(requestUrl, httpContent);

                // Check if the response was successful
                response.EnsureSuccessStatusCode();

                // Read the response content as a string
                string responseBody = await response.Content.ReadAsStringAsync();

                Console.WriteLine(responseBody);

                return responseBody;
            }
        }
    }
}
