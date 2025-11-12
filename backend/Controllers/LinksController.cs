using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;  // ← Agregar este using
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

        // GET: api/links
        [HttpGet]
        public async Task<IActionResult> GetAllLinks()
        {
            try
            {
                var links = await _context.Links
                    .OrderByDescending(l => l.Created_At)
                    .ToListAsync();
                
                return Ok(links);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener los links", error = ex.Message });
            }
        }
    }
}