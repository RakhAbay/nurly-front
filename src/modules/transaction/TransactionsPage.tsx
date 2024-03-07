import { useEffect, useState } from "react";
import { axiosInstance } from "../../common/config/axiosInstance";
import { ITransaction } from "../../common/types/ITransaction";
import { ICategory, ISubcategory } from "../../common/types/ICategory";

const defaultForm: ITransaction = {
    amount: 0,
    description: '',
    isActive: true,
    subCategoryId: '',
    transactionType: 'Expense'
}

export const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
    const [form, setForm] = useState<ITransaction>(defaultForm)
    const [subcategoryId, setSubcategoryId] = useState('');


    useEffect(() => {
        (async () => {
            const response = await axiosInstance.get("/Category/List");
            if (response.status === 200) {
                setCategories(response.data)
            }

            (async () => {
                const response = await axiosInstance.get("/WalletTransaction/List");
                if (response.status === 200) {
                    setTransactions(response.data)
                }
            })()
        })()
    }, [])

    const handleFormChange = (event: any) => {
        console.log(event)
        const key = event.target.name
        const value = event.target.value
        const few = { ...form, [key]: value }
        console.log(few)
        setForm(few)
    }

    const handleTransactionCreation = async () => {
        const response = await axiosInstance.post("/WalletTransaction/Create", form);
        if (response.status === 200) {
            (async () => {
                const response = await axiosInstance.get("/WalletTransaction/List");
                if (response.status === 200) {
                    setTransactions(response.data)
                }
            })()
        }


        
    }

   


    const handleCategorySelect = async (id: string) => {
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
            
            <h1>Add</h1>
            <select onChange={e => handleCategorySelect(e.target.value)} name="categories" id="categories-select">
                <option value="">--Please choose category--</option>
                {categories.map(item => <option key={item.name} value={item.categoryId}>{item.name}</option>)}
            </select> <br />

            <select onChange={e => handleFormChange(e)} name="subCategoryId" id="subcategories-select">
                <option value="">--Please choose subcategory--</option>
                {subcategories.map(item => <option key={item.name} value={item.subCategoryId}>{item.name}</option>)}
            </select> <br />

            <input name="amount" value={form.amount} onChange={e => handleFormChange(e)} /> <br />
            <input name="description" value={form.description} onChange={e => handleFormChange(e)} /> <br />

            <select onChange={e => handleFormChange(e)} name="transactionType" id="tpye-select">
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select> <br />

            <button onClick={handleTransactionCreation}>Add Transaction</button>

            {transactions.map(item => {
                return (
                    <div>
                        {item.amount} | {item.description} | {item.transactionType}
                    </div>
                    )
            })}
        </>
    );
};
