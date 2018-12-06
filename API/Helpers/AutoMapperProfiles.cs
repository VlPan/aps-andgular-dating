using System;
using System.Linq;
using AutoMapper;
using N_Course.API.Dtos;
using N_Course.API.Models;

namespace N_Course.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Product, ProductForUpdateDto>();
            CreateMap<ProductForUpdateDto, Product>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}