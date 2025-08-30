const Header = () => {
  return (
    <div className="flex items-center justify-between text-white tracking-wider font-thin px-2 py-4">
    <h1 className="text-3xl lg:text-4xl">Hello, <span className="text-indigo-200">welcome</span></h1>
    {/* right side */}
    <div
          className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition text-xl tracking-wider font-thin"
        >
          NB
        </div>
    </div>
  )
}

export default Header
