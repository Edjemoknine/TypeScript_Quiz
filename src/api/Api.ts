// enum Difficulty{
//     	EASY="easy",
//          MEDIUM="meduim",
//          HARD="hard"
// }
export type questionsType={
    category:string,
    correct_answer:string,
    difficulty:string,
    incorrect_answers:[string],
    question:string,
    questions:string[],
    allQuestions:[string],
}
const shuffle=(array:any[])=>[...array].sort(() => Math.random()-0.5);
export const FetchQuiz=async()=>{
    const endpoint=`https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`
    const resp=await fetch(endpoint)
    const  data= await resp.json()
    return data?.results.map((ques:questionsType)=>{return {...ques,allQuestions:shuffle([...ques.incorrect_answers,ques.correct_answer])}})
}