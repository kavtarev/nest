export interface MessageDto {
  head: string;
  body: string;
}

export interface ClientMessage {
  msg: string;
  routes: string[];
}
