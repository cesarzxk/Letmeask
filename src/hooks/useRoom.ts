import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { database } from "../services/firebase"

type FirebaseQuestionsProps = Record<string , {
    author:{
        name:string;
        avatar:string
    }
    content:string;
    isAnswered?:boolean;
    isHighlighted?:boolean;
    likes: Record<string, {
        authorId:string;
    }>
    url:string;
    
}>

type QuestionProps={
    id:string;
    author:{
        name:string;
        avatar:string
    }
    content:string;
    isAnswered?:boolean;
    isHighlighted?:boolean;
    likeCount:number;
    likeId:string | undefined;

}

export default function useRoom(roomId:string){
    const {user} = useContext(AuthContext);
    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`);
        
        roomRef.on('value', room =>{
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestionsProps = databaseRoom.questions ?? {}
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value])=>{
                return{
                    id: key,
                    content: value.content,
                    author:value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
            setUrl(databaseRoom.url)
        })

        return()=>{
            roomRef.off('value');
        }
    },[roomId, user?.id])


    return{questions, title, url}
}