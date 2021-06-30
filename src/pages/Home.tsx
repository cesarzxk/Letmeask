import ilustrationImg from '../assets/images/illustration.svg'
import logoImage from '../assets/images/logo.svg'
import googleLogoIcon from '../assets/images/google-icon.svg' 
import '../styles/auth.scss'
import Button from '../components/button'

import {useHistory} from 'react-router-dom'

export default function Home(){
    const history = useHistory()

    function navigateToNewRoom(){
        history.push('/rooms/new')
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
                <button onClick={navigateToNewRoom} className='create-room'>
                    <img src={googleLogoIcon} alt="Logo google" />
                    Crie sua sala com o google
                </button>
                <div className='separator'>ou entre em uma sala</div>
                <form action="">
                    <input 
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