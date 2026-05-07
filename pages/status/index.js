import useSWR from "swr";

async function fetchStatus() {
  const response = await fetch("/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseData />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div>
      <strong>Atualizado em:</strong> {updatedAtText}
    </div>
  );
}

function DatabaseData() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus);

  if (isLoading || !data) return;

  const db = data.dependencies.database;

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        maxWidth: "320px",
      }}
    >
      <div>
        <strong>Versão:</strong> {db.version}
      </div>

      <div>
        <strong>Conexões permitidas:</strong> {db.max_connections}
      </div>

      <div>
        <strong>Conexões abertas:</strong> {db.opened_connections}
      </div>
    </div>
  );
}
