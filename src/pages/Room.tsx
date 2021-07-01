import { FormEvent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import Button from '../components/button';
import RoomCode from '../components/RoomCode';
import { AuthContext } from '../context/AuthContext';
import { database } from '../services/firebase';
import '../styles/room.scss';

type FirebaseQuestionsProps = Record<string , {
    author:{
        name:string;
        avatar:string
    }
    content:string;
    isAnswered:boolean;
    isHighlighted:boolean;
}>

type QuestionProps={
    id:string;
    author:{
        name:string;
        avatar:string
    }
    content:string;
    isAnswered:boolean;
    isHighlighted:boolean;
}


type RoomParamsProps ={
    id:string;
}

export default function Room(){
    const {user} = useContext(AuthContext);

    const params =useParams<RoomParamsProps>()
    const [newQuestion, setNewQuestion] = useState<string>('')
    const [questions, setQuestions] = useState<QuestionProps[]>([])
    const [title, setTitle] = useState('')

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${params.id}`);
        
        roomRef.on('value', room =>{
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestionsProps = databaseRoom.questions ?? {}
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value])=>{
                return{
                    id: key,
                    content: value.content,
                    author:value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    },[params.id])

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
                name:user.name, 
                avatar: user.avatar,

            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`/.rooms/${params.id}/questions`).push(question)
        setNewQuestion('')
    } 
    return(
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt="Letmeask"/>
                    <RoomCode code={params.id}/>
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length>0 && (<span>{questions.length} perguntas</span>)}
                    
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea onChange={event => setNewQuestion(event.target.value)} value={newQuestion} placeholder='Q que você quer perguntar?'/>

                    <div className='form-footer'>
                        {user ? 
                            (<div className='user-info'>

                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>

                            </div>
                        ):(
                            <span>Para enviar uma pergunta <button>faça seu login</button>.</span>
                        )}
                        <Button disabled={!user} type='submit'>Enviar pergunta</Button>
                    </div>
                </form>

            </main>
            
        </div>)
}