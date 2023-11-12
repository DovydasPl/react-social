import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import styles from './navbar.module.css';

export const Navbar = () => {
    const [user] = useAuthState(auth);
    const logOut = async () => {
        await signOut(auth);
    };

    return (
        <div className={styles.header}>
            <div className={styles.nav}>
                <Link className={styles.navlink} to={'/'}>Home</Link>
                {!user ? <Link className={styles.navlink} to={'/login'}>Login</Link> : <Link className={styles.navlink} to={'/create-post'}>Create post</Link>}
            </div>
            {user && (
                <div className={styles.profile}>
                    <div className={styles.profileName}>{user?.displayName}</div>
                    <img className={styles.profileImage} src={user?.photoURL || ""} alt='Test' />
                    <button onClick={logOut}>Sign out</button>
                </div>
            )}
        </div>
    );
};