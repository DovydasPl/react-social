import { Link, NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import useAuth from '../../hooks/useAuth';

export const Navbar = () => {
    const { auth } = useAuth();

    return (
        <div className={styles.wrapper}>
            <header>
                <Link to='/feed'>
                    <img src="logo.svg" alt="logo" />
                </Link>
                <div className={styles.navigation}>
                    <nav>
                        {auth ? (
                            <>
                                <NavLink className={(data) => (data.isActive ? `${styles.active} ${styles.navlink}` : styles.navlink)} to={'/feed'}>Feed</NavLink>
                                <NavLink className={(data) => (data.isActive ? `${styles.active} ${styles.navlink}` : styles.navlink)} to={'/create-post'}>New post</NavLink>
                            </>

                        ) : (
                            <>
                                <NavLink className={(data) => (data.isActive ? `${styles.active} ${styles.navlink}` : styles.navlink)} to={'/login'}>Login</NavLink>
                                <NavLink className={(data) => (data.isActive ? `${styles.active} ${styles.navlink}` : styles.navlink)} to={'/register'}>Register</NavLink>
                            </>
                        )}
                    </nav>
                    {auth && (
                        <div className={styles.profile}>
                            {auth.email}
                        </div>
                    )}
                </div>
            </header>

        </div>
    );
};