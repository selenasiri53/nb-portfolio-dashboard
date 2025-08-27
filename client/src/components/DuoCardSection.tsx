const DuoCardSection = () => {
  return (
    <div className="lg:grid lg:grid-cols-3 space-x-4">
    <div className='card rounded-2xl p-8 bg-white/20'>
      <h2>Pie chart</h2>
    </div>
    <div className='col-span-2 card rounded-2xl p-8 bg-white/20 min-h-80'>
      <h2>Data logs</h2>
    </div>
  </div>
  )
}

export default DuoCardSection
