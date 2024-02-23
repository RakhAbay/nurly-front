import { Outlet, useNavigate } from "react-router-dom"

export const AppLayout = (): JSX.Element => {
    const navigate = useNavigate()

    const token = localStorage.getItem('nurly-token')

    const handleLogout = () => {
        localStorage.removeItem('nurly-token')
        navigate('/login')
    }

    return (
        <>
        <div style={{ display: "flex", height: '100vh', width: '100vw' }}>
            <section className="sidebar" style={{ backgroundColor: 'gray' }}>
                <div style={{ marginRight: '10px' }}>
                <ul>
                    <li onClick={() => navigate('/register')}>Register</li>
                    <li onClick={() => navigate('/login')}>Login</li>
                    {token && <>
                        <li onClick={() => navigate('/category')}>Categories</li>
                    <li onClick={() => navigate('/subcategory')}>Subcategories</li>
                    <li onClick={() => navigate('/transaction')}>Transactions</li>
                    <li onClick={handleLogout}>Logout</li>
                    </>}
                </ul>
                </div>
            </section>
            <section className="main" style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: '1em' }}>
                <Outlet />
                </div>
            </section>
        </div>
        </>
    )
}