export default function DocumentCard({
  Title,
  Version,
  Contributors,
  Attachments,
  isColumnView = false,
}: DocumentCardProps) {
  return (
    <div
      className={`border w-full px-6 py-8 bg-white rounded ${
        isColumnView ? "flex flex-row justify-between items-start gap-6" : "flex flex-col space-y-4"
      }`}
    >
      <div className="flex flex-col">
        <h2 className="font-semibold">{Title}</h2>
        <p>Versión: {Version}</p>
      </div>

      <div className="flex flex-col">
        {Contributors?.map((c, index) => (
          <p key={index} className="text-sm text-gray-700">{c.Name}</p>
        ))}
      </div>

      <div className="flex flex-col">
        {Attachments?.map((attachment, index) => (
          <p key={index} className="text-sm text-gray-700">{attachment}</p>
        ))}
      </div>
    </div>
  );
}