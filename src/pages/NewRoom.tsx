import ilustrationImg from '../assets/images/illustration.svg'
import logoImage from '../assets/images/logo.svg'
import '../styles/auth.scss'
import Button from '../components/button'

import {Link} from 'react-router-dom';

export default function NewRoom(){
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
                <form action="">
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        placeholder='Nome da sala.'
                    />
                    <Button type='submit'>Entrar na sala</Button>
                </form>
                <p>Quer entrar em alguma sala? <Link to='/'>click aqui.</Link></p>
            </div>
        </main>

    </div>
    )
}