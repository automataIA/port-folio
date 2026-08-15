export function CertificationItem({name,issuer,year,badge,summary}){
  return (
    <article className="row">
      {badge ? <div className="row-badge">{badge}</div> : null}
      <div className="row-head">
        <div className="row-title">{name}</div>
        {year ? <div className="row-meta">{year}</div> : null}
      </div>
      {issuer ? <div className="row-sub">{issuer}</div> : null}
      {summary ? <p className="row-desc">{summary}</p> : null}
    </article>
  );
}
