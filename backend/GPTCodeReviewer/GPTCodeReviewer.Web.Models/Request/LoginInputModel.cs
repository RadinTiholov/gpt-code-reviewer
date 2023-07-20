using System.ComponentModel.DataAnnotations;

namespace GPTCodeReviewer.Web.Models.Request
{
    public class LoginInputModel
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
