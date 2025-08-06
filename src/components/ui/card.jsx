export const Card = ({ children }) => {
  return <div className="border rounded shadow p-4 bg-white">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};
<Card>
  <h2 className="text-xl font-bold mb-4">Авторизація</h2>
  <CardContent>
    {/* форми */}
  </CardContent>
</Card>
