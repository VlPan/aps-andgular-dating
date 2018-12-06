using System;
using System.Collections.Generic;
using N_Course.API.Models;
using System.ComponentModel.DataAnnotations;

namespace N_Course.API.Dtos
{
    public class ProductForUpdateDto
    {
     
        [Required]
        public string name { get; set; }
        [Required]
        public int price { get; set; }
        [Required]
        public string amount { get; set; }

    }
}