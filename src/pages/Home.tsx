import ilustrationImg from '../assets/images/illustration.svg'
import logoImage from '../assets/images/logo.svg'
import googleLogoIcon from '../assets/images/google-icon.svg' 
import '../styles/auth.scss'
import Button from '../components/button'



import {useHistory} from 'react-router-dom'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { database } from '../services/firebase'

export default function Home(){
    const {signInWithGoogle,user} = useContext(AuthContext);
    const history = useHistory()
    const [roomCode, setRoomCode] = useState<string>('')


    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if (roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists.')
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }


    return(
    <div id='page-auth'>
        <aside>
            <img src={ilustrationImg} alt="Ilustração" />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo real.</p>
        </aside>
        <main>
            <div className='main-content'>
                <img src={logoImage} alt="LetmeAsk" />
                <button onClick={handleCreateRoom} className='create-room'>
                    <img src={googleLogoIcon} alt="Logo google" />
                    Crie sua sala com o google
                </button>
                <div className='separator'>ou entre em uma sala</div>
                <form onSubmit={handleJoinRoom}>
                    <input
                        value={roomCode}
                        onChange={event => setRoomCode(event.target.value)}
                        type="text" 
                        name="" 
                        id="" 
                        placeholder='Digite o codigo da sala'
                    />
                    <Button type='submit'>Entrar na sala</Button>
                </form>
            </div>
        </main>

    </div>
    )
}