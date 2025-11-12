namespace Api.Models
{
    public class Link
    {
        public long Id { get; set; }
        public DateTime Created_At { get; set; }
        public string Links { get; set; } = string.Empty;
    }
}
