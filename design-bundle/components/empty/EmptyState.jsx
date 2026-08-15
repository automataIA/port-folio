export function EmptyState({label='No entries yet',hint}){
  return (
    <div className="empty">
      <b>{label}</b>
      {hint ? <span>{hint}</span> : null}
    </div>
  );
}
