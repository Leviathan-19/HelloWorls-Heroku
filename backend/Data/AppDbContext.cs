using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Link> Links { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Link>().ToTable("Links", "public");
            modelBuilder.Entity<Link>().Property(l => l.Id).HasColumnName("id");
            modelBuilder.Entity<Link>().Property(l => l.Links).HasColumnName("links");
            modelBuilder.Entity<Link>().Property(l => l.Created_At).HasColumnName("created_at");
        }
    }
}