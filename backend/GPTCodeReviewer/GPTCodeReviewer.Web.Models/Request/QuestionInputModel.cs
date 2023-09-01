using System.ComponentModel.DataAnnotations;

namespace GPTCodeReviewer.Web.Models.Request
{
    public class QuestionInputModel
    {
        [Required]
        public string Question { get; set; } = null!;
    }
}
