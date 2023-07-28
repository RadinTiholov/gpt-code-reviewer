using GPTCodeReviewer.Web.Models.Request;

namespace GPTCodeReviewer.Services.Contracts
{
    public interface IGPTService
    {
        Task<string> MakeRequest(string message);

        Task<string> ReviewCode(string code);
    }
}
