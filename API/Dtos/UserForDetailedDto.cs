using System;
using System.Collections.Generic;
using N_Course.API.Models;

namespace N_Course.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int INN { get; set; }
        public string workCode { get; set; }
        public string profession { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string placeOfBorn { get; set; }
        public string citizenship { get; set; }
        public string address { get; set; }
        public string number { get; set; }
        public DateTime Created { get; set; }

    }
}