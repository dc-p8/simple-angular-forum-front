import { ThreadPreview } from './ThreadPreview';

export class ThreadsDescription{
    threadsPreviews:Array<ThreadPreview>;
    numTotalThread:number;
    public ThreadsDescription(){
        this.threadsPreviews = [];
        this.numTotalThread = 0;
    }
}