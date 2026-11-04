declare module '@3d-dice/dice-box' {
 export interface DiceResult {value?:number;result?:number;sides:number;}
 export interface DiceGroup {rolls:DiceResult[];value:number;}
 export default class DiceBox {
  constructor(options:{container:string;assetPath:string;themeColor?:string;scale?:number;offscreen?:boolean;enableShadows?:boolean;id?:string});
  init():Promise<DiceBox>;
  roll(notation:{qty:number;sides:number}[]):Promise<DiceResult[]>;
  add(notation:{qty:number;sides:number}[]):Promise<DiceResult[]>;
  getRollResults():DiceGroup[];
  clear():DiceBox;
 }
}
