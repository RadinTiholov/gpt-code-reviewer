using System.ComponentModel.DataAnnotations;

namespace GPTCodeReviewer.Web.Models.Request
{
    public class ReviewInputModel
    {
        [Required]
        public string Code { get; set; } = null!;

        [Required]
        public List<string> Factors { get; set; } = null!;
    }
}
