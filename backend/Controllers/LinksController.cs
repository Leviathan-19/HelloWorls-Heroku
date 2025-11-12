using Microsoft.AspNetCore.Mvc;
using Api.Data;
using Api.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LinksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LinksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddLink([FromBody] Link link)
        {
            if (string.IsNullOrEmpty(link.Links))
                return BadRequest("El campo 'links' no puede estar vacío.");

            _context.Links.Add(link);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Link agregado correctamente", id = link.Id });
        }
    }
}
