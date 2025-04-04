import { useState, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

const SearchBox = () => {
    const [searchFields, setSearchFields] = useState("");
    const context = useContext(MyContext);  

    const handleSearch = async () => {
        if (!searchFields.trim()) return; // Prevent empty search

        context.setProgress(40);
        try {
            const res = await fetchDataFromApi(`/api/search?q=${searchFields}`);
            context.setProductList(res);
            setSearchFields(""); // Clear input field after search
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            context.setProgress(100);
        }
    };

    return (
        <div className="searchBox position-relative d-flex align-items-center">
            <IoSearch onClick={handleSearch} className="cursor-pointer" />
            <input 
                type="text" 
                placeholder="Search here..." 
                value={searchFields} 
                onChange={(e) => setSearchFields(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
        </div>
    );
};

export default SearchBox;
