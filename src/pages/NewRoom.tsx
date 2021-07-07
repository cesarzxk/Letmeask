import ilustrationImg from '../assets/images/illustration.svg'
import logoImage from '../assets/images/logo.svg'
import '../styles/auth.scss'
import Button from '../components/button'
import {FormEvent, useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { database } from '../services/firebase';
import { AuthContext } from '../context/AuthContext';

export default function NewRoom(){
    const [newRoom, setNewRoom] = useState<string>('')
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const [liveCode, setLiveCode] = useState<string>('')

    async function handleCreateRoom(event:FormEvent){
        event.preventDefault()
        if (newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId:user?.id,
            url:liveCode
        })

        history.push(`/rooms/admin/${firebaseRoom.key}`)
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
                <h2>Crie uma nova sala.</h2>
                <form onSubmit={handleCreateRoom}>

                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        placeholder='Nome da sala.'
                    />

                    <input
                        value={liveCode}
                        onChange={event => setLiveCode(event.target.value)}
                        type="text" 
                        name="" 
                        id="" 
                        placeholder='Linke da sua live (opcional).'
                    />

                    <Button type='submit'>Entrar na sala</Button>
                </form>
                <p>Quer entrar em alguma sala? <Link to='/'>click aqui.</Link></p>
            </div>
        </main>

    </div>
    )
}