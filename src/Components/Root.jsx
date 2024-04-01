import { Outlet } from "react-router-dom";
import Header from "./Header";


const Root = () => {
    return (
        <div className="container mx-auto px-8">
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Root;