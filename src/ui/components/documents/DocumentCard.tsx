export default function DocumentCard({
  Title,
  Version,
  Contributors,
  Attachments,
  isColumnView = false,
}: DocumentCardProps) {
  return (
    <div
      className={`border w-full px-6 py-8 bg-white rounded flex ${
        isColumnView ? "flex-row justify-between" : "flex-col justify-between"
      }`}
    >
      <div className="flex flex-col">
        <h2 className="font-semibold">{Title}</h2>
        <p>Versión: {Version}</p>
      </div>

      <div
        className={`flex flex-col ${
          isColumnView ? "" : "space-y-2"
        }`}
      >
        {Contributors?.map((c, index) => (
          <p key={index}>{c.Name}</p>
        ))}
      </div>

      <div
        className={`flex flex-col ${
          isColumnView ? "" : "space-y-2"
        }`}
      >
        {Attachments?.map((attachment, index) => (
          <p key={index}>{attachment}</p>
        ))}
      </div>
    </div>
  );
}