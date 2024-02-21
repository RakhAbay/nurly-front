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
        const response = await axiosInstance.get("/Category/Create?categoryName="+categoryName);
        if (response.status === 200) {
            (async () => {
                const response = await axiosInstance.get("/Category/List");
                if (response.status === 200) {
                    setCategories(response.data)
                }
            })()
        }
    } 

    const handleCategoryDeletion = async (id: string) => {
        const response = await axiosInstance.get("/Category/Delete?categoryId="+id);
        if (response.status === 200) {
            (async () => {
                const response = await axiosInstance.get("/Category/List");
                if (response.status === 200) {
                    setCategories(response.data)
                }
            })()
        }
    }

    return (
        <>
            <h1>Categories</h1>
            {categories.map(item => {
                return (
                    <>
                    <h3>{item.name}</h3>
                    <button onClick={() => handleCategoryDeletion(item.categoryId)}>delete</button>
                    </>
                )
            })}
            <h1>Add</h1>
            <input value={categoryName} onChange={e => setCategoryName(e.target.value)} /> <br />
            <button onClick={handleCategoryCreation}>Create category</button>
        </>
    );
};
