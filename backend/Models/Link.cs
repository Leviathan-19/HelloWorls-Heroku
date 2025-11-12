namespace Api.Models
{
    public class Link
    {
        public int Id { get; set; }
        public string Links { get; set; } = string.Empty;
        public DateTime Created_At { get; set; } = DateTime.UtcNow;
    }
}