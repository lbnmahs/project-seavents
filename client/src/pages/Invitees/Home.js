const Home = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <div>
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    );
}

export default Home;