import ilustrationImg from '../assets/images/illustration.svg'
import logoImage from '../assets/images/logo.svg'
import googleLogoIcon from '../assets/images/google-icon.svg' 
import '../styles/auth.scss'
import Button from '../components/button'

export default function Home(){
    return(
    <div id='page-auth'>
        <aside>
            <img src={ilustrationImg} alt="Ilustração" />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Testando</p>
        </aside>
        <main>
            <div className='main-content'>
                <img src={logoImage} alt="LetmeAsk" />
                <button className='create-room'>
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