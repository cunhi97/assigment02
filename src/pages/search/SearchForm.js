import React, { useState } from 'react';
import styles from "./SearchForm.module.css"

function SearchForm(props) {
  const [searchText, setSearchText] = useState("");// chứa nội dung người dùng nhập vào input 

  
  function handleSubmit(event) {
    event.preventDefault();//tránh tự động tải lại trang 
    props.onSearch(searchText);//gửi nội dung của ô input tới ResultList thông qua props 
  }
  
  function handleSearchText(event) {
    setSearchText(event.target.value);// hàm này được gọi khi user nhập vào input và câp nhât lại state searchText
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form_search}>
      <div className={styles.form_container}>
      <div className={styles.form_search_container}>
        <input 
        type="text" 
        value={searchText} 
        onChange={handleSearchText} 
        className={styles.form_search_input}
        />     
         <button type="submit" className={styles.form_search_icon}>
        <svg
          className={`svg-inline--fa_fa-search_fa-w-16 `}// nút icon thay đổi khi cuộn chuột 
          aria-hidden='true'
          data-prefix='fas'
          data-icon='search'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
        </button>
      </div>
      <div className={styles.form_search_button}>
      <button type="reset"  className={styles.form_search_button_child}>RESET</button>
      <button type="submit"  className={styles.form_search_button_child}>SEARCH</button>
      </div>
      </div>
    </form>
  );
}

export default SearchForm;
