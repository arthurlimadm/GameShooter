export interface IEvent{
    nameKey: string
    controller: (socket: any)=> void 
}