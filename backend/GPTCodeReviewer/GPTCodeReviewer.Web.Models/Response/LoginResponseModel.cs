namespace GPTCodeReviewer.Web.Models.Response
{
    public class LoginResponseModel
    {
        public string AccessToken { get; set; } = null!;

        public string Id { get; set; } = null!;

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;
    }
}
