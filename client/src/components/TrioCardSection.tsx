const TrioCardSection = () => {
  return (
    <div className="lg:grid lg:grid-cols-4 space-x-2">
      <div className='card rounded-2xl p-4 bg-white/30'>
        {/* circular img + title */}
        <div className="flex gap-2 items-center">
           <div
                className="w-12 h-12 rounded-full bg-indigo-300 flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition text-2xl tracking-wider font-thin"
                >
                <h1 className="text-3xl">A</h1>
            </div>
            <div>
                <h2 className="text-neutral-100 font-thin tracking-wide text-lg">Apple</h2> 
                <h3 className="text-xs text-gray-900">Total revenue increased 33%</h3>
            </div>
        </div>
      </div>
      <div className='card rounded-2xl p-4 bg-white/30'>
        {/* circular img + title */}
        <div className="flex gap-2 items-center">
           <div
                className="w-12 h-12 rounded-full bg-indigo-300 flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition text-2xl tracking-wider font-thin"
                >
                <h1 className="text-3xl">A</h1>
            </div>
            <div>
                <h2 className="text-neutral-100 font-thin tracking-wide text-lg">Apple</h2> 
                <h3 className="text-xs text-gray-900">Total revenue increased 33%</h3>
            </div>
        </div>
      </div>
      <div className='card rounded-2xl p-4 bg-white/30'>
        {/* circular img + title */}
        <div className="flex gap-2 items-center">
           <div
                className="w-12 h-12 rounded-full bg-indigo-300 flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition text-2xl tracking-wider font-thin"
                >
                <h1 className="text-3xl">A</h1>
            </div>
            <div>
                <h2 className="text-neutral-100 font-thin tracking-wide text-lg">Apple</h2> 
                <h3 className="text-xs text-gray-900">Total revenue increased 33%</h3>
            </div>
        </div>
      </div>
      <div className='card rounded-2xl p-4 bg-white/30'>
        {/* circular img + title */}
        <div className="flex gap-2 items-center">
           <div
                className="w-12 h-12 rounded-full bg-indigo-300 flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition text-2xl tracking-wider font-thin"
                >
                <h1 className="text-3xl">A</h1>
            </div>
            <div>
                <h2 className="text-neutral-100 font-thin tracking-wide text-lg">Apple</h2> 
                <h3 className="text-xs text-gray-900">Total revenue increased 33%</h3>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TrioCardSection
