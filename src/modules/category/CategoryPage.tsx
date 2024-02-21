import { useEffect, useState } from "react";
import { axiosInstance } from "../../common/config/axiosInstance";
import { ICategory } from "../../common/types/ICategory";



export const CategoryPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const [refetchFlag, setRefetchFlag] = useState(false);

    useEffect(()=> {
        (async () => {
            const response = await axiosInstance.get("/Category/List");
            if (response.status === 200) {
                setCategories(response.data)
            }
        })()
    }, [refetchFlag])

    const handleCategoryCreation = async () => {
        const response = await axiosInstance.get("/Category/List");
        if (response.status === 200) {
            setRefetchFlag(!!refetchFlag)
        }
    } 

    return (
        <>
            <h1>Categories</h1>
            {categories.map(item => {
                return <h3>{item.name}</h3>
            })}
            <h1>Add</h1>
            <input value={categoryName} onChange={e => setCategoryName(e.target.value)} /> <br />
            <button onClick={handleCategoryCreation}>Create category</button>
        </>
    );
};
