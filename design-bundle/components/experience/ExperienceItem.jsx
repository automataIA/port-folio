export function ExperienceItem({role,company,period,bullets=[],stack=[]}){
  return (
    <article className="row">
      <div className="row-head">
        <div>
          <div className="row-title">{role}</div>
          {company ? <div className="row-sub">{company}</div> : null}
        </div>
        {period ? <div className="row-meta">{period}</div> : null}
      </div>
      {bullets.length ? <ul className="row-bullets">{bullets.slice(0,4).map((b,i)=><li key={i}>{b}</li>)}</ul> : null}
      {stack.length ? <div className="row-tags">{stack.map((t,i)=><span className="row-tag" key={i}>{t}</span>)}</div> : null}
    </article>
  );
}
