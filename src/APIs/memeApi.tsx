export interface Meme {
    id:string;
    name:string;
    url:string;
    width:number;
    height:number;
    box_count:number;
}


export const fetchMemeImages = async()=>{
try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data= await response.json();

    if(data.success){
        console.log(data.data.memes)
        return data.data.memes as Meme[]
    }else{
        console.log("failed to fetch memes")
        return[]
    }
} catch (error) {
    console.log("Error fetching meme images : " , error)
    return []
}
}