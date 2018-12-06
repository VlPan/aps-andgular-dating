using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace N_Course.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string name { get; set; }
        public int price { get; set; }
        public string amount { get; set; }
        public DateTime updatedAt {get; set;}

    }
}