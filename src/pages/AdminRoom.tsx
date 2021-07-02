import { FormEvent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import Button from '../components/button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';
import { AuthContext } from '../context/AuthContext';
import { database } from '../services/firebase';
import '../styles/room.scss';
import useRoom from '../hooks/useRoom';


type RoomParamsProps ={
    id:string;
}

export default function AdminRoom(){
    const {user} = useContext(AuthContext);
    const params =useParams<RoomParamsProps>()
    const [newQuestion, setNewQuestion] = useState<string>('')
    const {questions, title} = useRoom(params.id)

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault()

        if (newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new Error('You mus be logged in')
        }
        const question ={
            content: newQuestion,
            author:{
                id: user.id,
                name:user.name, 
                avatar:user.avatar,

            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`/rooms/${params.id}/questions`).push(question)
        setNewQuestion('')
    } 
    
    return(
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt="Letmeask"/>
                    <div>
                        <RoomCode code={params.id}/>
                        <Button isOutlined >Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length>0 && (<span>{questions.length} perguntas</span>)}
                    
                </div>

                <div className="question-list">
                    {
                        questions.map(question=>{
                            return (
                                <Question 
                                key={question.id}
                                auth={question.author} 
                                content={question.content}/>
                            )
                        })
                    }
                </div> 
            </main>
            
        </div>)
}