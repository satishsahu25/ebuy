export default function TileComponent({ data, selected = [], onClick }) {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap items-center gap-1">


    {/* jo bhi select hogaya hai unka color change karna hai */}

      {data.map((dataitem) => (
        <label 
        onClick={()=>onClick(dataitem)}

        className={`cursor-pointer ${
          selected&&selected.length&&selected.map((item)=>item.id).indexOf(dataitem.id)!==-1?"bg-black":""
        }`} key={dataitem.id}>
          <span
          className={`rounded-lg border px-6 py-2 font-bold border-black ${
          selected&&selected.length&&selected.map((item)=>item.id).indexOf(dataitem.id)!==-1?"text-white":""
        }`}
          >
            {dataitem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}
