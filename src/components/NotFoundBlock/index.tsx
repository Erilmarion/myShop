import React from 'react';
import styles from './NotFoundBlock.module.scss'


const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span> Смайл тест scss</span>
                Ничего не найдено</h1>
            <p className={styles.description}>К сожалению данная страница отсутсвует в нагем иниернеи манащине.</p>
        </div>
    );
};

export default NotFoundBlock;
