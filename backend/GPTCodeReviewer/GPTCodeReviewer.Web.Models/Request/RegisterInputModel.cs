﻿using System.ComponentModel.DataAnnotations;

namespace GPTCodeReviewer.Web.Models.Request
{
    public class RegisterInputModel
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
