import React, {FC} from 'react';
import s from "../styles/components/form.module.scss"

interface Props {
    children: React.ReactNode
}

const Form:FC<Props> = ({children}) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    );
};

export default Form;