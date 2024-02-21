import { useEffect, useState } from "react";
import { axiosInstance } from "../../common/config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../common/types/ICategory";



export const CategoryPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(()=> {
        (async () => {
            const response = await axiosInstance.get("/Category/List");
            if (response.status === 200) {
                setCategories(response.data)
            }
        })()
    }, [])

    return (
        <>
            <h1>Categories</h1>
            {categories.map(item => {
                return <h3>{item.name}</h3>
            })}
            
        </>
    );
};
