using System;
using System.Collections.Generic;
using N_Course.API.Models;
using System.ComponentModel.DataAnnotations;

namespace N_Course.API.Dtos
{
    public class UserForCreateDto
    {
        public int Id { get; set; }
         [Required]
        public string Username { get; set; }
         [Required]
        public int INN { get; set; }
         [Required]
        public string workCode { get; set; }
         [Required]
        public string profession { get; set; }

        public string DateOfBirth { get; set; }

        public string placeOfBorn { get; set; }

        public string citizenship { get; set; }
        public string address { get; set; }
        public string number { get; set; }
        public DateTime Created { get; set; }

         public UserForCreateDto()
        {
            Created = DateTime.Now;
        }

    }
}