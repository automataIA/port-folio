export function PublicationItem({title,venue,year,url,type,summary}){
  return (
    <article className="row">
      {type ? <div className="row-badge">{type}</div> : null}
      <div className="row-head">
        <div className="row-title">{title}</div>
        {year ? <div className="row-meta">{year}</div> : null}
      </div>
      {venue ? <div className="row-sub">{venue}</div> : null}
      {summary ? <p className="row-desc">{summary}</p> : null}
      {url ? <div className="row-links"><a href={url} target="_blank" rel="noopener">read ↗</a></div> : null}
    </article>
  );
}
