(function(){
  var h=React.createElement;
  window.h=h;
  window.dsMount=function(sel,el){ReactDOM.createRoot(document.querySelector(sel)).render(el)};
  window.repeat=function(n,fn){var a=[];for(var i=0;i<n;i++)a.push(fn(i));return a};
  window.wrap=function(cls,children){return h('div',{className:cls},children)};
})();
