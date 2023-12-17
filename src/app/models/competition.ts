export interface ICompetition {
  id: number;
  code: string;
  date: string;
  numberOfParticipants: number;
  startTime: string;
  endTime: string;
  location: string;
  amount: number;
}

export class Competition implements ICompetition {
  constructor(
    public id: number = 0,
    public code: string = '',
    public date: string = '',
    public numberOfParticipants: number = 0,
    public startTime: string = '',
    public endTime: string = '',
    public location: string = '',
    public amount: number = 0
  ) {}
}