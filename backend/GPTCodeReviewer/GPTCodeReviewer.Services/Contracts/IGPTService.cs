using GPTCodeReviewer.Web.Models.Request;
using GPTCodeReviewer.Web.Models.Response;

namespace GPTCodeReviewer.Services.Contracts
{
    public interface IGPTService
    {
        Task<string> MakeRequest(string message);

        Task<object> ReviewCode(string code);

        Task LoginInGPT();
    }
}
