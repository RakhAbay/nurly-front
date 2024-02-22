import { useEffect, useState } from "react";
import { axiosInstance } from "../../common/config/axiosInstance";
import { ICategory, ISubcategory } from "../../common/types/ICategory";



export const SubcategoryPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');

    useEffect(() => {
        (async () => {
            const response = await axiosInstance.get("/Category/List");
            if (response.status === 200) {
                setCategories(response.data);

                // const response2 = await axiosInstance.get("/Subcategory/List?categoryId="+response.data);
                // if (response2.status === 200) {
                //     setSubcategories(response2.data)
                // }
            }
            
            
        })()
    }, [])

    const handleCategoryCreation = async () => {
        const response = await axiosInstance.post("/Subcategory/Create", {
            subCategoryName: subcategoryName,
            isCustom: true,
            categoryId: categoryId
        });
        if (response.status === 200) {
            (async () => {
                const response = await axiosInstance.get("/Category/List");
                if (response.status === 200) {
                    setCategories(response.data)
                }
            })()
        }
    }

    const handleSubCategoryDeletion = async (id: string) => {
        const response = await axiosInstance.get("/SubCategory/Delete?subCategoryId=" + id);
        if (response.status === 200) {
            (async () => {
                const response = await axiosInstance.get("/Category/List");
                if (response.status === 200) {
                    setCategories(response.data)
                }
            })()
        }
    }

    const handleSubCategoryUpdate = async (id: string) => {
        const response = await axiosInstance.post(`/SubCategory/Update`, {
            // ?subCategoryId=${id}&newSubCategoryName=${subcategoryName}
            subCategoryId: id,
            newSubCategoryName: subcategoryName,
        });
        if (response.status === 200) {
            (async () => {
                const response = await axiosInstance.get("/Category/List");
                if (response.status === 200) {
                    setCategories(response.data)
                }
            })()
        }
    }

    const handleCategorySelect = async (id: string) => {
        setCategoryId(id)
        if (id == null){
            return;
        }

        const response2 = await axiosInstance.get("/Subcategory/List?categoryId="+id);
        if (response2.status === 200) {
            setSubcategories(response2.data)
        }
    }

    return (
        <>
        <select onChange={e => handleCategorySelect(e.target.value)} name="categories" id="categories-select">
            <option value="">--Please choose an option--</option>
            {categories.map(item => <option key={item.name} value={item.categoryId}>{item.name}</option>)}
            </select> <br />
            <h1>Subcategories</h1>
            {subcategories.map(item => {
                return (
                    <div key={item.name}>
                        <h3>{item.name} | {categories.find(s => s.categoryId === item.categoryId)?.name}</h3>
                        <button onClick={() => handleSubCategoryDeletion(item.subCategoryId)}>delete</button>
                        <button onClick={() => handleSubCategoryUpdate(item.subCategoryId)}>update</button>
                    </div>
                )
            })}
            <h1>Add</h1>
            <input value={subcategoryName} onChange={e => setSubcategoryName(e.target.value)} /> <br />
            
            <button onClick={handleCategoryCreation}>Create sub category</button>

        </>
    );
};
