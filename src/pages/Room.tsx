import { FormEvent, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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

export default function Room(){
    const {user, signInWithGoogle} = useContext(AuthContext);
    const params = useParams<RoomParamsProps>()
    const [newQuestion, setNewQuestion] = useState<string>('')
    const {questions, title, url} = useRoom(params.id)
    const history = useHistory()

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
    
    async function handlerLikeQuestion(questionId:string, likeId:string | undefined){

        if(likeId){
            await database.ref(`rooms/${params.id}/questions/${questionId}/likes/${likeId}`).remove()

        }else{
            await database.ref(`rooms/${params.id}/questions/${questionId}/likes`).push({
                authorId:user?.id,
            })

        }
        
    }

    function setVideo(){
        return url.split('/')?.[3];

    }
    
    return(
        <div id='page-room'>
            
            <header>
                <div className='content'>
                    <img onClick={()=>history.push('/')} src={logoImg} alt="Letmeask"/>
                    <RoomCode code={params.id}/>
                </div>
            </header>

            {url &&
            <section className='video'>
                <iframe title='video' width="560" height="315" src={`https://www.youtube.com/embed/${setVideo()}`} allowFullScreen={true}/>
            </section>
            }

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
                            <span>Para enviar uma pergunta <button onClick={signInWithGoogle}>faça seu login</button>.</span>
                        )}
                        <Button disabled={!user} type='submit'>Enviar pergunta</Button>
                    </div>
                </form>

                <div className="question-list">
                    {
                        questions.map(question=>{
                            return (
                                <Question 
                                key={question.id}
                                auth={question.author} 
                                content={question.content}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                                >
                                    
                                { !question.isAnswered &&
                                    
                                    <button 
                                    onClick={()=>handlerLikeQuestion(question.id, question.likeId)}
                                    className={`like-button ${question.likeId ? 'liked':''}`}
                                    type='button'
                                    aria-label='Marcar como gostei'
                                    >
                                        {question.likeCount>0 && <span>{question.likeCount}</span>}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                            <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                    </button>
                                    
                                    }

                                </Question>
                            )
                        })
                    }
                </div> 
            </main>
            
        </div>)
}