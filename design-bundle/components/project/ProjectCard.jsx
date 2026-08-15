export function ProjectCard({title,description,tags=[],repo,demo,metric}){
  return (
    <article className="row">
      <div className="row-title">{title}</div>
      {metric ? <div className="row-metric">{metric}</div> : null}
      {description ? <p className="row-desc">{description}</p> : null}
      {tags.length ? <div className="row-tags">{tags.map((t,i)=><span className="row-tag" key={i}>{t}</span>)}</div> : null}
      {(repo||demo) ? (
        <div className="row-links">
          {repo ? <a href={repo} target="_blank" rel="noopener">repo ↗</a> : null}
          {demo ? <a href={demo} target="_blank" rel="noopener">demo ↗</a> : null}
        </div>
      ) : null}
    </article>
  );
}
