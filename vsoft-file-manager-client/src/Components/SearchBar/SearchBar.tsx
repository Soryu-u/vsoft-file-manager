import React, {Dispatch, SetStateAction} from "react";
import styles from "./SearchBar.module.css";

interface ISearch {
    setInputText: Dispatch<SetStateAction<string>>
}
function SearchBar({setInputText}:ISearch) {
    const inputHandler = (e:any) => {
        let lowerCase:string = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                onChange={inputHandler}
                id="search-bar"
                type="text"
                placeholder="Enter text"/>
        </div>
    )
}

export default SearchBar;