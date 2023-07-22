using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;

namespace GPTCodeReviewer.Web.GPT
{
    public class Requester
    {
        private OpenAIAPI api;

        public Requester(string key)
        {
            this.api = new OpenAIAPI(key);
        }

        public async Task<string> MakeRequestAsync(string request)
        {
            var result = await api.Chat.CreateChatCompletionAsync(new ChatRequest()
            {
                Model = Model.ChatGPTTurbo,
                Temperature = 0.1,
                Messages = new ChatMessage[] {
                        new ChatMessage(ChatMessageRole.User, request)
                    }
            });

            var reply = result.Choices[0].Message;
            return reply.Content.Trim();
        }

    }
}
