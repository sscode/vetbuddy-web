const Nav = () => {
    return (
      <nav className="text-black  mx-auto grid grid-cols-3 items-center">
          <ul className="flex space-x-4 justify-start">
            <li><a href="/" className="hover:text-slate-300">Home</a></li>
          </ul>
          <div className="text-lg font-bold text-center">VetBuddy</div>
          <ul className="flex space-x-4 justify-end">
            <li><a href="/templates" className="p-2 rounded hover:text-slate-300 hover:bg-slate-800">Templates</a></li>
            <li><a href="/history" className="p-2 rounded hover:text-slate-300 hover:bg-slate-800">History</a></li>
            <li><a href="/consult" className="p-2 rounded bg-green-300 hover:text-slate-300 hover:bg-slate-800">New Consult</a></li>
            {/* <li><p className="bg-blue-500 px-4 py-2 rounded-full">U</p></li> */}
          </ul>
      </nav>
    );
};
  
export default Nav;
