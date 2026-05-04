import React, { useState } from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";

const data = [
  {name:"北海道",region:"北海道",capital:"札幌市",tags:["自然","観光"]},
  {name:"大阪府",region:"近畿",capital:"大阪市",tags:["グルメ","都市"]},
  {name:"東京都",region:"関東",capital:"新宿区",tags:["都市","観光"]}
];

function App(){
  const [fav,setFav] = useState([]);

  const toggle = (name)=>{
    setFav(fav.includes(name) ? fav.filter(f=>f!==name) : [...fav,name]);
  };

  return (
    <div style={{padding:"20px",background:"#f4ede0",minHeight:"100vh"}}>
      <h1>日本47都道府県</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",
        gap:"14px"
      }}>
        {data.map(p=>(
          <div key={p.name} style={{
            background:"#fbf6ec",
            border:"1px solid #d6c9b0",
            borderRadius:"12px",
            padding:"10px"
          }}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <h3>{p.name}</h3>
              <span onClick={()=>toggle(p.name)} style={{cursor:"pointer"}}>
                {fav.includes(p.name)?"★":"☆"}
              </span>
            </div>

            <div style={{fontSize:"12px",color:"#8a7d6a"}}>
              {p.region} / {p.capital}
            </div>

            <div>
              {p.tags.map(t=>(
                <span key={t} style={{
                  fontSize:"11px",
                  border:"1px solid #d6c9b0",
                  padding:"2px 6px",
                  margin:"2px",
                  borderRadius:"6px"
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
