import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Parse from 'parse'

const AuthorView = () => {
    const { id } = useParams();
    const [authorData, setAuthorData] = useState(null);

    useEffect ( () => {
        async function fetchAuthor() {
            const query = new Parse.Query(Parse.User);
            try {
                const user = await query.get(id);
                setAuthorData(user);
            } catch (err) {
                console.error("Error fetching Author", err);
            }
        }
        fetchAuthor();
    }, [id]);
    if (!authorData) return <div>Loading...</div>;

    return (
        <div>
            <h2>User: {authorData.get("username")}</h2>
            <p>Bio: {authorData.get("Bio") || "No Bio yet"}</p>
            <p>Interests: {authorData.get("Interests")}</p>
        </div>
    );
};
export default AuthorView;