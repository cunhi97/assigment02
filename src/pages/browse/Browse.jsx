import React from 'react';
import NavBar from '../Component/NavBar';
import RenderDom from '../Component/TakeDataAPI/RenderDom';
import styles from './Browse.module.css';
function Browse() {
	return (
		<div className={styles.main}>
			  <NavBar/> 
           <div>
		      <RenderDom/>
			</div>  
		
		</div>
	);
}

export default Browse;

