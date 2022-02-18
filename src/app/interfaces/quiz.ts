export interface Quiz{
    id:number;
    description:string;
    maxMarks:number;
    numberOfQuestions:number;
    title:string;
    active:boolean;
    category:{
        id:number;
        title:string;
        description:string;
    };
}