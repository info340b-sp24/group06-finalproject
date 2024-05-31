// import statements
import ItemForm from './additemForm'

import { getDatabase, ref, push as FirebasePush } from 'firebase/database';




export default function Additem(props) {


    const addItem = (field, url) => {
        const { userId, userName } = props.currentUser;
        const newItemObj = {
            ...field,
            "userId": userId,
            "userName": userName,
            "timestamp": Date.now(),
            "img": url,
        }

        const db = getDatabase();
        const closetRef = ref(db, "closet");

        FirebasePush(closetRef, newItemObj)
            .catch((error) => {
                alert("Error : " + error.message);
            });

    }



    return (
        <div className="add-item-container">
            <h1>Add New Item to Your Closet</h1>
            <div className="add-item-form">
                <ItemForm addItemCallback={addItem} />
            </div>
        </div>
    );
}