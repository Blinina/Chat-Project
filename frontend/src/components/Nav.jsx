import React from "react";
// const [href, setHref] = useState('login')
// const handleHref = ()=>{
//  setHref('/') 
// console.log('boomich')
export default function Nav () {
return(
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
            <a className="navbar-brand" href="login">Hexlet Chat</a>
        </div>
    </nav>
)
}