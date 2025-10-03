export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  age: number;
}

export interface IUserSemAge {
  name: string;
  email: string;
}

// TIPAGEM DE OBJETOS QUE RETORNAM DO BANCO DE DADOS
// INTERFACE -> ESQUELETO, CONTRATO