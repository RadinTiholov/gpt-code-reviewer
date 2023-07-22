namespace GPTCodeReviewer.Services.Contracts
{
    public interface IGPTService
    {
        Task<string> MakeRequest(string message);
    }
}
