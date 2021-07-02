import { ReactNode } from 'react';
import '../styles/question.scss';
import cx from 'classnames';

type QuestionProps ={
    content:string;
    auth:{
        name:string;
        avatar:string;
    }
    children?:ReactNode;
    isAnswered?:boolean;
    isHighlighted?:boolean;
}

export default function Question({
    content,
    auth,
    isAnswered = false,
    isHighlighted = false,
    children,
}:QuestionProps){

    return(
        <div className={
            cx('question', 
            {highlighted: isHighlighted},
            {answered: isAnswered})
        }>
            <p>{content}</p>
            <footer>
                <div className='user-info'>
                    <img src={auth.avatar} alt={auth.name} />
                    <span>{auth.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}