
import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import deletImg from '../assets/images/delete.svg';
import answerImg from '../assets/images/answer.svg';
import checkImg from '../assets/images/check.svg';

import Button from '../components/button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';

import '../styles/room.scss';
import useRoom from '../hooks/useRoom';
import { database } from '../services/firebase';




type RoomParamsProps ={
    id:string;
}

export default function AdminRoom(){
    //const {user} = useContext(AuthContext);
    const params =useParams<RoomParamsProps>()
    const {questions, title} = useRoom(params.id)
    const history = useHistory();

    async function handleEndRoom(){
        await database.ref(`rooms/${params.id}`).update({
            endedAt: new Date(),
        })

        history.push('/')

    }

    async function handleDeleteQuestion(questionId:string){
        if(window.confirm('Tem certeza que você deseja excluir essa pergunta?')){
            await database.ref(`rooms/${params.id}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId:string){
        await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
            isAnswered:true
        })
    }

    async function handleHighlightQuestion(questionId:string) {
        await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
            isHighlighted:true
        })
        
    }

    
    return(
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt="Letmeask"/>
                    <div>
                        <RoomCode code={params.id}/>
                        <Button onClick={()=>handleEndRoom()} isOutlined >Encerrar sala</Button>
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
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                                key={question.id}
                                auth={question.author} 
                                content={question.content}>

                                    { !question.isAnswered &&
                
                                    <>
                                        <button
                                            type='button'
                                            onClick={()=>{handleCheckQuestionAsAnswered(question.id)}}
                                        >
                                        <img src={checkImg} alt="Marcar como respondida." />
                                        </button>

                                        <button
                                            type='button'
                                            onClick={()=>{handleHighlightQuestion(question.id)}}
                                        >
                                            <img src={answerImg} alt="Dar destaque na pergunta.." />
                                        </button>
                                    </>
                                    }

                                    
                                    <button
                                        type='button'
                                        onClick={()=>{handleDeleteQuestion(question.id)}}
                                    >
                                        <img src={deletImg} alt="Deletar pergunta." />
                                    </button>

                                </Question>
                            )
                        })
                    }
                </div> 
            </main>
            
        </div>)
}