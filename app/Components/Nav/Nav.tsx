// Nav.js or Nav.jsx
const Nav = () => {
    return (
      <nav className=" text-black">
        <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-slate-300">Home</a></li>
            <li><a href="/" className="hover:text-slate-300"></a></li>
          </ul>
          <div className="text-lg font-bold">VetBuddy</div>
          <ul className="flex space-x-4">
            <li><a href="/templates" className="hover:text-slate-300">Templates</a></li>
            <li><a href="/consult" className="hover:text-slate-300">Consult</a></li>
            {/* <li><a href="/services" className="hover:text-blue-200">Login</a></li> */}
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Nav;
  